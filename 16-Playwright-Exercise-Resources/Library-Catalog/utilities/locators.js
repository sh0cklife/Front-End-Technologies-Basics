const NAVBAR = {
    NAV_NAVBAR: 'nav.navbar',
    ALL_BOOKS_LINK: 'a[href="/catalog"]',
    LOGIN_BUTTON: 'a[href="/login"]',
    REGISTER_BUTTON: 'a[href="/register"]'
}

const LOGIN_FORM = {
    LOGIN_FORM: '#login-form',
    EMAIL: 'input[id="email"]',
    PASSWORD: 'input[id="password"]',
    LOGIN_BUTTON: '#login-form input[type="submit"]'
}

const LOGGED_NAVBAR = {
    USER_EMAIL: '//span[text()="Welcome, peter@abv.bg"]',
    MY_BOOKS: 'a[href="/profile"]',
    ADD_BOOKS: 'a[href="/create"]',
    LOGOUT: '#logoutBtn'

}

const CREATE_FORM = {
    TITLE: 'input[id="title"]',
    DESCRIPTION: 'textarea[id="description"]',
    IMAGE: 'input[id="image"]',
    TYPE_OPTION: '#type',
    ADD_BOOK_BUTTON: '#create-form input["type=submit"]'
}

export {
    NAVBAR,
    LOGIN_FORM,
    LOGGED_NAVBAR,
    CREATE_FORM
}