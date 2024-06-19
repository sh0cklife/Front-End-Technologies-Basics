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

        })

        test('logout makes correct API call', async () => {
            
        })
    })
});