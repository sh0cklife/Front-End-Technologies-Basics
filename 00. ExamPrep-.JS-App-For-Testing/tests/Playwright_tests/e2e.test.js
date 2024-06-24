const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    username : "",
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

    //Parallel execution in new tabs
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
            await page.goto(host);
            await page.locator('a[href="/register"]').first().click();
            await page.waitForSelector('#register-form');

            let random = Math.floor(Math.random() * 10000);
            user.username = `DEMO_USERNAME_${random}`;
            user.email = `DEMO_EMAIL_${random}@abv.bg`;

            await page.locator('#username').fill(user.username);
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.locator('#repeatPass').fill(user.confirmPass);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('input[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();
            let userData = await response.json();
            
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
            
        })

        test('Login with Valid Data', async () => {
            await page.goto(host);
            await page.locator('a[href="/login"]').first().click();

            await page.waitForSelector('#login-form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() === 200),
                page.click('input[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();
            let userData = await response.json();
            console.log(userData);
            
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        })

        test('LOGOUT from the application', async () => {
            await page.goto(host);
            await page.locator('a[href="/login"]').first().click();

            await page.waitForSelector('#login-form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('input[type="submit"]')

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/logout') && response.status() === 204),
                page.locator('a[href="/logout"]').click()
            ]);

            expect(response.ok()).toBeTruthy();
            await page.locator('a[href="/login"]');

            await page.waitForURL(host + '/');
            expect(page.url()).toBe(host + '/');
        })
    });

    describe("navbar", () => {
        test('Navigation for Logged-In User Testing', async () => {
            await page.goto(host);
            await page.locator('a[href="/login"]').first().click();

            await page.waitForSelector('#login-form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('input[type="submit"]')

            //visible
            await expect(page.locator('a[href="/logout"]')).toBeVisible();
            await expect(page.locator('a[href="/myprofile"]')).toBeVisible();
            await expect(page.locator('a[href="/create"]')).toBeVisible();
            await expect(page.locator('a[href="/catalog"]')).toBeVisible();
            await expect(page.locator('//*[@id="container"]/nav/div/div/span')).toBeVisible();
            
            //hidden
            await expect(page.locator('a[href="/login"]').first()).toBeHidden();
            await expect(page.locator('a[href="/register"]').first()).toBeHidden();
        })

        test('Navigation for Guest User Testing', async () => {
            await page.goto(host);

            //visible
            await expect(page.locator('a[href="/login"]').first()).toBeVisible();
            await expect(page.locator('a[href="/register"]').first()).toBeVisible();
            await expect(page.locator('a[href="/"]').first()).toBeVisible(); //homepage
            await expect(page.locator('a[href="/catalog"]')).toBeVisible();
            
            //hidden
            await expect(page.locator('//*[@id="container"]/nav/div/div/span')).toBeHidden();
            await expect(page.locator('a[href="/logout"]')).toBeHidden();
            await expect(page.locator('a[href="/myprofile"]')).toBeHidden();
            await expect(page.locator('a[href="/create"]')).toBeHidden();

        })
    });

    describe("CRUD", () => {
        beforeEach(async () => {
            await page.goto(host);
            await page.locator('a[href="/login"]').first().click();

            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('input[type="submit"]');
        });

        test('CREATE a Meme Testing', async () => {
            await page.click('a[href="/create"]');
            await page.waitForSelector('form');

            await page.fill('[name="title"]', 'Random title');
            await page.fill('[name="description"]', 'Random description');
            await page.fill('[name="imageUrl"]', 'https://i.kym-cdn.com/photos/images/original/002/845/252/65a.png');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/memes') && response.status() === 200),
                page.click('input[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();
            let memeData = await response.json();
            console.log(memeData);
            expect(memeData.title).toBe('Random title');
            expect(memeData.description).toBe('Random description');
            expect(memeData.imageUrl).toBe('https://i.kym-cdn.com/photos/images/original/002/845/252/65a.png');
        })

        test('EDIT a Meme Testing', async () => {
            await page.click('a[href="/myprofile"]');
            await page.locator('//a[text()="Details"]').first().click();
            await page.locator('//a[text()="Edit"]').click();
            
            await page.waitForSelector('form');
            await page.fill('[name="description"]', 'Edited description');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/memes') && response.status() === 200),
                page.click('input[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();
            let memeData = await response.json();
            console.log(memeData);
            expect(memeData.title).toBe('Random title');
            expect(memeData.description).toBe('Edited description');
            expect(memeData.imageUrl).toBe('https://i.kym-cdn.com/photos/images/original/002/845/252/65a.png');
        })

        test('DELETE a Meme Testing', async () => {
            await page.click('a[href="/myprofile"]');
            await page.locator('//a[text()="Details"]').first().click();

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/memes') && response.status() === 200),
                page.click('//button[text()="Delete"]')
            ]);
            expect(response.ok()).toBeTruthy();
        })
    });
});