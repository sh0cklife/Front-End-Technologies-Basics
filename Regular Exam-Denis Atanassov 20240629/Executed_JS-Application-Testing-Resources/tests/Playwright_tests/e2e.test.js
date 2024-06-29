const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

let albumName = "";


describe("e2e tests", () => {
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

    
    describe("authentication", () => {
        test('Registration', async () => {
            await page.goto(host);
            await page.click('text=Register');
            await page.waitForSelector('form');
            let random = Math.floor(Math.random() * 10000);
            user.email = `TEST_EMAIL${random}@abv.bg`

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.locator('#conf-pass').fill(user.confirmPass);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let userData = await response.json();

            expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);

        })

        test('LOGIN with valid user data', async () => {
            
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');

            
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/login") && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let userData = await response.json();
            
            expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        })

        test('LOGOUT from the application', async () => {
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]')

            
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/logout") && response.status() == 204),
                page.locator('text=Logout').click()
            ])
            
            expect(response.ok()).toBeTruthy();
            await page.waitForSelector('text=Login');
            expect(page.url()).toBe(host + '/');
            
        })
    });

    describe("navbar", () => {
        test('Navigation for Logged-in Users', async () => {
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]')

            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Catalog')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();
            await expect(page.locator('nav >> text=Create Album')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();

            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        })

        test('Navigation for Guest Users', async () => {
            await page.goto(host);

            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();
            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Catalog')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();

            await expect(page.locator('nav >> text=Create Album')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();
        })
    });

    describe("CRUD", () => {
        beforeEach(async () => {
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]')
            console.log(user.email)
            console.log(user.password)
            
        })
        
        test('CREATE an Album', async () => {
            await page.click('text=Create Album');
            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 10000);
            albumName = `RANDOM_NAME${random}`
            await page.fill('#name', albumName);
            await page.fill('#imgUrl', 'images/Lorde.jpg');
            await page.fill('#price', '19.99');
            await page.fill('#releaseDate', '2024-01-01');
            await page.fill('#artist', 'TEST_ARTIST');
            await page.fill('#genre', 'TEST_GENRE');
            await page.fill('//*[@name="description"]', 'TEST_DESCRIPTION');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/albums") && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let albumData = await response.json();
            
            expect(response.ok()).toBeTruthy();
            expect(albumData.name).toEqual(albumName);
            expect(albumData.imgUrl).toEqual('images/Lorde.jpg');
            expect(albumData.price).toEqual('19.99');
            expect(albumData.releaseDate).toEqual('2024-01-01');
            expect(albumData.artist).toEqual('TEST_ARTIST');
            expect(albumData.genre).toEqual('TEST_GENRE');
            expect(albumData.description).toEqual('TEST_DESCRIPTION');

            expect(albumData).toHaveProperty('_ownerId');
            expect(albumData).toHaveProperty('_id');
            expect(albumData).toHaveProperty('_createdOn');
        })

        test('EDIT an Album', async () => {
            //arrange
            await page.click('nav >> text=Search');
            await page.waitForSelector('#searchPage');
            await page.locator('#search-input').fill(albumName);
            await page.click('.button-list');

            await page.locator('text=Details').first().click();
            await page.click('text=Edit');
            await page.waitForSelector('form');

            //act
            
            await page.fill('#imgUrl', 'Edited image');
            await page.fill('#price', 'Edited price');
            await page.fill('#releaseDate', 'Edited date');
            await page.fill('#artist', 'Edited artist');
            await page.fill('#genre', 'Edited genre');
            await page.fill('//*[@name="description"]', 'Edited description');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/albums') && response.status() == 200),
                page.click('[type="submit"]')
            ])

            let albumData = await response.json();
            
            expect(response.ok).toBeTruthy();
            expect(albumData.name).toBe(albumName);
            expect(albumData.imgUrl).toEqual('Edited image');
            expect(albumData.price).toEqual('Edited price');
            expect(albumData.releaseDate).toEqual('Edited date');
            expect(albumData.artist).toEqual('Edited artist');
            expect(albumData.genre).toEqual('Edited genre');
            expect(albumData.description).toEqual('Edited description');

        })

        test('DELETE an Album', async () => {
            await page.click('nav >> text=Search');
            await page.waitForSelector('#searchPage');
            await page.locator('#search-input').fill(albumName);
            await page.click('.button-list');

            await page.locator('text=Details').first().click();
            
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/albums') && response.status() == 200),
                page.click('text=Delete'),
                page.on('dialog', dialog => dialog.accept())
            ])

            expect(response.ok).toBeTruthy();
        })
    });
});