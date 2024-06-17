const BASE_URL = 'http://localhost:3000';

const TEST_URL = {
    TEST_HOME_URL: BASE_URL + '/',
    TEST_LOGIN_URL: BASE_URL + '/login',
    TEST_REGISTER_URL: BASE_URL + '/register',
    TEST_CATALOG_URL: BASE_URL + '/catalog'
}

const TEST_USER = {
    EMAIL: 'peter@abv.bg',
    PASSWORD: '123456'
}

const TEST_BOOK = {
    TITLE: 'Test Book Title',
    DESCRIPTION: 'Test Book Description',
    IMAGE: 'https://example.com/book-image.jpg',
    TEST_BOOK_OPTIONS: {
        FICTION: 'Fiction',
        ROMANCE: 'Romance',
        MYSTERY: 'Mistery',
        CLASSIC: 'Clasic',
        OTHER: 'Other'
    }
    
}

const ALERT = {
    ALERT_MESSAGE: 'All fields are required!'
}

const ALL_BOOKS_LIST = '//li[@class="otherBooks"]';

export {
    BASE_URL,
    TEST_URL,
    TEST_USER,
    ALERT,
    TEST_BOOK,
    ALL_BOOKS_LIST
}