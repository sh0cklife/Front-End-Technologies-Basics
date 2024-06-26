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
        test('Registration with Valid Data', async () => {
            //arrange
            await page.goto(host);
            await page.click('text=Register');
            await page.waitForSelector('form');
            let random = Math.floor(Math.random() * 10000);
            user.email = `DEMO_MAIL${random}@abv.bg`;

            //act
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.locator('#repeatPassword').fill(user.confirmPass)

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let userData = await response.json();

            //assert
            await expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);

        })

        test('LOGIN with Valid Data', async () => {
            //arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');

            //act
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password)

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let userData = await response.json();

            //assert
            expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        })

        test('LOGOUT from the application', async () => {
            //first need to be logged in
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]');

            //act
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/logout') && response.status() == 204),
                page.click('nav >> text=Logout')
            ])
            // let userData = await response.json();
            //assert
            expect(response.ok()).toBeTruthy();
            await page.waitForSelector('nav >> text=Login' || 'nav >> text=Register');
            expect(page.url()).toBe(host + '/');
        })
    });

    describe("navbar", () => {
        test('Navigation for Logged-In User Testing', async () => {
            //arrange
            await page.goto(host);

            //act
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]');

            //assert
            await expect(page.locator('nav >> text=Theater' && 'nav >> text=Create Event' 
                && 'nav >> text=Profile' && 'nav >> text=Logout')).toBeVisible();
            await expect(page.locator('nav >> text=Login' && 'nav >> text=Register')).toBeHidden();
        })

        test('Navigation for Guest User Testing', async () => {
            //act
            await page.goto(host);

            //assert
            await expect(page.locator('nav >> text=Create Event' && 'nav >> text=Profile' && 'nav >> text=Logout')).toBeHidden();
            await expect(page.locator('nav >> text=Theater' && 'nav >> text=Login' && 'nav >> text=Register')).toBeVisible();
        })
    });

    describe("CRUD", () => {
        beforeEach(async () => {
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]');
        })

        test('Create an Event Testing', async () => {
            //arrange
            await page.click('nav >> text=Create Event');
            await page.waitForSelector('form');

            //act
            await page.fill('#title', 'Random title');
            await page.fill('#date', 'Random date');
            await page.fill('#author', 'Random author');
            await page.fill('#description', 'Random description');
            await page.fill('#imageUrl', '/images/Moulin-Rouge!-The-Musical.jpg');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/theaters') && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let eventData = await response.json();
            console.log(eventData);

            //assert
            expect(response.ok).toBeTruthy();

            expect(eventData.title).toBe('Random title');
            expect(eventData.date).toBe('Random date');
            expect(eventData.author).toBe('Random author');
            expect(eventData.imageUrl).toBe('/images/Moulin-Rouge!-The-Musical.jpg');
            expect(eventData.description).toBe('Random description');
        })

        test('Edit an Event Testing', async () => {
            //arrange
            await page.click('nav >> text=Profile');
            await page.locator('text=Details').first().click();
            await page.click('text=Edit');
            await page.waitForSelector('form');

            //act
            await page.fill('#title', 'Edited title');
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/theaters') && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let eventData = await response.json();

            expect(response.ok).toBeTruthy();
            expect(eventData.title).toBe('Edited title');
        })

        test('Delete an Event Testing', async () => {
            await page.click('nav >> text=Profile');
            await page.locator('text=Details').first().click();

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/theaters') && response.status() == 200),
                page.click('text=delete'),
                page.on('dialog', dialog => dialog.accept())
            ])

            expect(response.ok).toBeTruthy();
        })
    })
})