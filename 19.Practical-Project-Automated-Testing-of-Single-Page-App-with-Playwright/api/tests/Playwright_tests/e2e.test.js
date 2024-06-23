const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000';
let browser;
let context;
let page;

let user = {
    email: '',
    password: '123456',
    confirmPass: '123456'
};

let game = {
    title: 'Random title',
    category: 'Random category',
    maxLevel: '99',
    imageUrl: './images/ZombieLang.png',
    summary: 'Random Summary'
}

describe('e2e tests', () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });
    afterAll(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });
    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('authentication', () => {
        test('register makes correct API calls', async () => {
            //arrange
            await page.goto(host);
            let random = Math.floor(Math.random() * 10000);
            user.email = `abv${random}@abv.bg`;

            //act
            await page.click('text=Register');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#register-password').fill(user.password);
            await page.locator('#confirm-password').fill(user.confirmPass);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('[type="submit"]')
            ])
            let userData = await response.json();

            //assert
            await expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);


        })

        test('register does not work with empty email/password fields', async () => {
            //arrange
            await page.goto(host);

            //act
            await page.click('text=Register');
            await page.click('[type="submit"]');

            //assert
            expect(page.url()).toBe(host+'/register');
        })

        test('login makes correct API call', async () => {
            //arrange
            await page.goto(host);
            await page.click('text="Login"');
            await page.waitForSelector('form');

            //act
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() === 200),
                page.click('[type="submit"]')
            ]);
            let userData = await response.json();

            //assert
            expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        })

        test('login does not work with empty fields', async () => {
            //arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector("form");

            //act
            await page.click('[type="submit"]');

            //assert
            expect(page.url()).toBe(host + '/login')
        })

        test('logout makes correct API call', async () => {
            //arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector("form");
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            page.click('[type="submit"]');

            //act
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/logout') && response.status() === 204),
                page.click('text=Logout')
            ]);
            await page.waitForSelector('text=Login');
            
            //assert
            expect(response.ok).toBeTruthy();
            expect(page.url()).toBe(host + "/");
             
        })
    })

    describe('navbar', () => {
        test('Naviagation buttons are visible for logged-in user', async () => {
            //arrange
            await page.goto(host);

            //act
            await page.click('text="Login"');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            await page.click('[type="submit"]')

            //assert
            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Game')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();

            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        })

        test('Guest user navbar buttons', async () => {
            await page.goto(host);

            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();
            await expect(page.locator('nav >> text=All games')).toBeVisible();
            
            await expect(page.locator('nav >> text=Create Game')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();

        })
    })

    describe('CRUD', () => {
        beforeEach(async () => {
            await page.goto(host);
            await page.click("text=Login");
            await page.waitForSelector('form');
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            await page.click('[type="submit"]');
        })

        test('Create does not work empty fields', async () => {
            //arrange
            await page.click("text=Create Game");
            await page.waitForSelector('form');

            //act
            await page.click('[type="submit"]');

            //assert
            expect(page.url()).toBe(host + '/create');
        })

        test('Create makes correct API call for logged in user', async () => {
            //arrange
            await page.click("text=Create Game");
            await page.waitForSelector('form');

            //act
            await page.fill('#title', game.title);
            await page.fill('#category', game.category);
            await page.fill('#maxLevel', game.maxLevel);
            await page.fill('#imageUrl', game.imageUrl);
            await page.fill('#summary', game.summary);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/games') && response.status() == 200),
                page.click('[type="submit"]')
            ]) 
            let gameData = await response.json();

            //assert
            expect(response.ok()).toBeTruthy();
            expect(gameData.title).toEqual(game.title);
            expect(gameData.category).toEqual(game.category);
            expect(gameData.maxLevel).toEqual(game.maxLevel);
            expect(gameData.imageUrl).toEqual(game.imageUrl);
            expect(gameData.summary).toEqual(game.summary);
        })

        test('Edit/Delete buttons are visible for games created by user', async () => {
            //arrange
            await page.goto(host + '/catalog');

            //act
            await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);

            //assert
            await expect(page.locator('text="Delete"')).toBeVisible();
            await expect(page.locator('text="Edit"')).toBeVisible();

        })

        test('Edit/Delete buttons are NOT visible for games created by other user', async () => {
            await page.goto(host + '/catalog');

            await page.click(`.allGames .allGames-info:has-text("MineCraft") .details-button`);

            await expect(page.locator('text="Delete"')).toBeHidden();
            await expect(page.locator('text="Edit"')).toBeHidden();
        })

        test('Edit makes correct API call', async () => {
            //arrange
            await page.goto(host + '/catalog');
            await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);
            await page.click('text=Edit');
            await page.waitForSelector('form');

            //act
            await page.locator('[name="title"]').fill("Edited Title");
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/games') && response.status() == 200),
                page.click('[type="submit"]')
            ]) 
            let gameData = await response.json();

            //assert
            expect(gameData.title).toEqual('Edited Title');
            expect(gameData.category).toEqual(game.category);
            expect(gameData.maxLevel).toEqual(game.maxLevel);
            expect(gameData.summary).toEqual(game.summary);

        })

        test('Delete makes correct API call', async () => {
            await page.goto(host + '/catalog');
            await page.click(`.allGames .allGames-info:has-text("Edited title") .details-button`);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/games') && response.status() == 200),
                page.click('text=Delete')
            ]) 
            
            expect(response.ok()).toBeTruthy();

        })
    })

    describe('Home Page', () => {
        test('Home Page has correct data', async () => {
            //arrange
            await page.goto(host);

            //assert
            await expect(page.locator(".welcome-message h2")).toHaveText("ALL new games are");
            await expect(page.locator(".welcome-message h3")).toHaveText("Only in GamesPlay");
            await expect(page.locator("#home-page h1")).toHaveText("Latest Games");

            const games = await page.locator("#home-page .game").all();
            expect(games.length).toBeGreaterThanOrEqual(3);
        })
    })
});