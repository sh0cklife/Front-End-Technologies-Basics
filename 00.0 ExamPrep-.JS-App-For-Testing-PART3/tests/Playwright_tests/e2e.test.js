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

let book = {
    title : '',
    description : 'DEMO',
    imageUrl : 'images/book1.png'
}

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
            user.email = `TEST_EMAIL${random}@abv.bg`
            
            //act
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.locator('#repeat-pass').fill(user.confirmPass);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/register") && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let userData = await response.json();
            console.log(userData);

            //assert
            expect(response.ok()).toBeTruthy();
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
            await page.locator('#password').fill(user.password);
            
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/login") && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let userData = await response.json();
            console.log(userData);

            //assert
            expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);

        })

        test('LOGOUT from application', async () => {
            //arrange

            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]')

            //act
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/logout") && response.status() == 204),
                page.locator('//*[@id="user"]/a[3]').click()
            ])
            
            //assert
            expect(response.ok()).toBeTruthy();
            await page.waitForSelector('text=Login');
            expect(page.url()).toBe(host + '/');

        })
    })

    describe("navbar", () => {
        test('Navigation for Logged-in users', async () => {
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]')

            await expect(page.locator('nav >> text=Dashboard')).toBeVisible();
            await expect(page.locator('nav >> text=My Books')).toBeVisible();
            await expect(page.locator('nav >> text=Add Book')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();

            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        })

        test('Navigation for Guest users', async () => {
            await page.goto(host);

            await expect(page.locator('nav >> text=Dashboard')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();

            await expect(page.locator('nav >> text=My Books')).toBeHidden();
            await expect(page.locator('nav >> text=Add Book')).toBeHidden();
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
        })
        test('Create a Book Testing', async () => {
            await page.click('a[href="/create"]');
            await page.waitForSelector('form');

            await page.fill('[name="title"]', 'TEST title')
            await page.fill('[name="description"]', 'TEST description')
            await page.fill('[name="imageUrl"]', 'images/TEST image.png')
            await page.locator('#type').selectOption('Other');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/books") && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let bookData = await response.json();
            console.log(bookData);

            expect(response.ok()).toBeTruthy();
            expect(bookData.title).toEqual('TEST title');
            expect(bookData.description).toEqual('TEST description');
            expect(bookData.imageUrl).toEqual('images/TEST image.png');
            expect(bookData.type).toEqual('Other');

            expect(bookData).toHaveProperty('_id');
            expect(bookData).toHaveProperty('_createdOn');
        })

        test('EDIT a Book Testing', async () => {
            await page.click('text=My Books');
            await page.locator('text=Details').first().click();
            await page.click('text=Edit');
            await page.waitForSelector('form');

            await page.fill('[name="title"]', 'EDITED TEST title')
            await page.locator('#type').selectOption('Other');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/books") && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let bookData = await response.json();
            console.log(bookData);

            expect(response.ok()).toBeTruthy();
            expect(bookData.title).toEqual('EDITED TEST title');
            expect(bookData.description).toEqual('TEST description');
            expect(bookData.imageUrl).toEqual('images/TEST image.png');
            expect(bookData.type).toEqual('Other');
        })

        test('DELETE book', async () => {
            await page.click('text=My Books');
            await page.locator('text=Details').first().click();

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/books") && response.status() == 200),
                page.click('text=Delete')
            ])
            
            expect(response.ok()).toBeTruthy();
        })
    })
})