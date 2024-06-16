import { test, expect } from '@playwright/test';
import { NAVBAR, LOGIN_FORM, LOGGED_NAVBAR } from '../utilities/locators.js';
import { ALERT, BASE_URL, TEST_URL, TEST_USER } from '../utilities/constants.js';

// Navigation

test('Verify [All books] link is visible - example 1', async({page}) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);
})

test('Verify [All books] link is visible - example 2', async({page}) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible();
})

test('Verify [Login] button is visible', async({page}) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
})

test('Verify [Register] button is visible', async({page}) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible();
})

test('Verify [ALL BOOKS] link is visible after user login', async({page}) => {
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();

    await page.locator(NAVBAR.LOGIN_BUTTON).click();

    await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
})

test('Verify user emails is visible after user login', async({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);
    await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    await expect(page.locator(LOGGED_NAVBAR.USER_EMAIL)).toBeVisible();
    await expect(page.locator(LOGGED_NAVBAR.ADD_BOOKS)).toBeVisible();
    await expect(page.locator(LOGGED_NAVBAR.MY_BOOKS)).toBeVisible();
    await expect(page.locator(LOGGED_NAVBAR.LOGOUT)).toBeVisible();
})

//Login

test('Login with valid credentials', async({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);
    // await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
})

test('Login with invalid credentials', async({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);
    
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    })

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL)
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
})

test('Login with empty email field', async({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);
    
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    })

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL)
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
})

test('Login with empty passowrd field', async({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);
    
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    })

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL)
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
})

//Register
//Navigate to REG FORM , map the elements (email, password, repeat password)

// Add book page
test('Add book with correct data', async ({page}) => {
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    
    await Promise.all([
        await page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
        await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);
    
})
