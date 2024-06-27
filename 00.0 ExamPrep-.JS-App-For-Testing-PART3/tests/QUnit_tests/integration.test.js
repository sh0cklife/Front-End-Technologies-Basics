const baseURL = 'http://localhost:3030/';

let user = {
    email: '',
    password: '123456',
    confirmPassword: '123456'
};

let token = '';
let userID = '';

let book = {
    title: '',
    description: '',
    imageUrl: 'images/book.png',
    type: 'Classic'
};

let lastCreatedBookId = '';

let random = Math.floor(Math.random() * 10000);

QUnit.config.reorder = false;

QUnit.module('User Functionality', () => {
    QUnit.test('Register Testing', async (assert) => {
        let path = 'users/register';
        let email = `TEST_MAIL${random}@abv.bg`;
        user.email = email;

        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(user)
        });
        let userData = await response.json();
        console.log(userData);

        assert.ok(response.ok);

        assert.ok(userData.hasOwnProperty('email'), 'Email property exists');
        assert.equal(userData.email, user.email, 'expected email value');
        assert.strictEqual(typeof userData.email, 'string', 'email has correct type');

        assert.ok(userData.hasOwnProperty('password'), 'Password property exists');
        assert.equal(userData.password, user.password, 'expected password value');
        assert.strictEqual(typeof userData.password, 'string', 'password has correct type');

        assert.ok(userData.hasOwnProperty('confirmPassword'), 'confirmPassword property exists');
        assert.equal(userData.confirmPassword, user.confirmPassword, 'expected confirmPassword value');
        assert.strictEqual(typeof userData.confirmPassword, 'string', 'confirmPassword has correct type');

        assert.ok(userData.hasOwnProperty('_createdOn'), '_createdOn property exists');
        assert.strictEqual(typeof userData._createdOn, 'number', '_createdOn has correct type');

        assert.ok(userData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof userData._id, 'string', '_id has correct type');

        assert.ok(userData.hasOwnProperty('accessToken'), 'accessToken property exists');
        assert.strictEqual(typeof userData.accessToken, 'string', 'accessToken has correct type');

        token = userData.accessToken;
        userID = userData._id;
        sessionStorage.setItem('event-user', JSON.stringify(user));

    })

    QUnit.test('LOGIN Testing', async (assert) => {
        let path = 'users/login';
        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(user)
        });
        let userData = await response.json();

        assert.ok(response.ok);

        assert.ok(userData.hasOwnProperty('email'), 'Email property exists');
        assert.equal(userData.email, user.email, 'expected email value');
        assert.strictEqual(typeof userData.email, 'string', 'email has correct type');

        assert.ok(userData.hasOwnProperty('password'), 'Password property exists');
        assert.equal(userData.password, user.password, 'expected password value');
        assert.strictEqual(typeof userData.password, 'string', 'password has correct type');

        assert.ok(userData.hasOwnProperty('confirmPassword'), 'confirmPassword property exists');
        assert.equal(userData.confirmPassword, user.confirmPassword, 'expected confirmPassword value');
        assert.strictEqual(typeof userData.confirmPassword, 'string', 'confirmPassword has correct type');

        assert.ok(userData.hasOwnProperty('_createdOn'), '_createdOn property exists');
        assert.strictEqual(typeof userData._createdOn, 'number', '_createdOn has correct type');

        assert.ok(userData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof userData._id, 'string', '_id has correct type');

        assert.ok(userData.hasOwnProperty('accessToken'), 'accessToken property exists');
        assert.strictEqual(typeof userData.accessToken, 'string', 'accessToken has correct type');
    })
})

QUnit.module('Book Functionality', () => {
    QUnit.test('GET all books', async (assert) => {
        let queryParams = '?sortBy=_createdOn%20desc';
        let path = 'data/books';

        let response = await fetch(baseURL + path + queryParams)
        let jsonData = await response.json();
        console.log(jsonData);

        assert.ok(response.ok, 'Status code is OK');
        assert.ok(Array.isArray(jsonData), 'Response is an array');

        jsonData.forEach(booksData => {
            
            assert.ok(booksData.hasOwnProperty('description'), 'description property exists');
            assert.strictEqual(typeof booksData.description, 'string', 'description is from correct type');

            assert.ok(booksData.hasOwnProperty('imageUrl'), 'imageUrl property exists');
            assert.strictEqual(typeof booksData.imageUrl, 'string', 'imageUrl is from correct type');

            assert.ok(booksData.hasOwnProperty('title'), 'title property exists');
            assert.strictEqual(typeof booksData.title, 'string', 'title is from correct type');

            assert.ok(booksData.hasOwnProperty('type'), 'type property exists');
            assert.strictEqual(typeof booksData.type, 'string', 'type is from correct type');

            assert.ok(booksData.hasOwnProperty('_createdOn'), 'date property exists');
            assert.strictEqual(typeof booksData._createdOn, 'number', '_createdOn is from correct type');

            assert.ok(booksData.hasOwnProperty('_id'), '_id property exists');
            assert.strictEqual(typeof booksData._id, 'string', '_id is from correct type');

            assert.ok(booksData.hasOwnProperty('_ownerId'), '_ownerId property exists');
            assert.strictEqual(typeof booksData._ownerId, 'string', '_ownerId is from correct type');
        })
        
    })

    QUnit.test('CREATE new book', async (assert) => {
        let path = 'data/books';
        book.title = `RANDOM_TITLE${random}`;
        book.description = `RANDOM_DESCRIPTION${random}`;

        let response = await fetch (baseURL + path, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(book)
        });
        let booksData = await response.json();
        console.log(booksData);
        
        assert.ok(response.ok, 'Status code is OK')

        assert.ok(booksData.hasOwnProperty('description'), 'description property exists');
        assert.equal(booksData.title, book.title, 'expected title value');
        assert.strictEqual(typeof booksData.description, 'string', 'description is from correct type');

        assert.ok(booksData.hasOwnProperty('imageUrl'), 'imageUrl property exists');
        assert.equal(booksData.imageUrl, book.imageUrl, 'expected imageUrl value');
        assert.strictEqual(typeof booksData.imageUrl, 'string', 'imageUrl is from correct type');

        assert.ok(booksData.hasOwnProperty('title'), 'title property exists');
        assert.equal(booksData.title, book.title, 'expected title value');
        assert.strictEqual(typeof booksData.title, 'string', 'title is from correct type');

        assert.ok(booksData.hasOwnProperty('type'), 'type property exists');
        assert.equal(booksData.type, book.type, 'expected type value');
        assert.strictEqual(typeof booksData.type, 'string', 'type is from correct type');

        assert.ok(booksData.hasOwnProperty('_createdOn'), 'date property exists');
        assert.strictEqual(typeof booksData._createdOn, 'number', '_createdOn is from correct type');

        assert.ok(booksData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof booksData._id, 'string', '_id is from correct type');

        assert.ok(booksData.hasOwnProperty('_ownerId'), '_ownerId property exists');
        assert.strictEqual(typeof booksData._ownerId, 'string', '_ownerId is from correct type');

        lastCreatedBookId = booksData._id;
    })

    QUnit.test('EDIT book', async (assert) => {
        let path = 'data/books';
        book.title = `EDITED_TITLE${random}`;
        let queryParams = `/${lastCreatedBookId}`

        let response = await fetch (baseURL + path + queryParams, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(book)
        });
        let booksData = await response.json();
        console.log(booksData);

        assert.ok(response.ok, 'Status code is OK')

        assert.ok(booksData.hasOwnProperty('description'), 'description property exists');
        assert.equal(booksData.title, book.title, 'expected title value');
        assert.strictEqual(typeof booksData.description, 'string', 'description is from correct type');

        assert.ok(booksData.hasOwnProperty('imageUrl'), 'imageUrl property exists');
        assert.equal(booksData.imageUrl, book.imageUrl, 'expected imageUrl value');
        assert.strictEqual(typeof booksData.imageUrl, 'string', 'imageUrl is from correct type');

        assert.ok(booksData.hasOwnProperty('title'), 'title property exists');
        assert.equal(booksData.title, book.title, 'expected title value');
        assert.strictEqual(typeof booksData.title, 'string', 'title is from correct type');

        assert.ok(booksData.hasOwnProperty('type'), 'type property exists');
        assert.equal(booksData.type, book.type, 'expected type value');
        assert.strictEqual(typeof booksData.type, 'string', 'type is from correct type');

        assert.ok(booksData.hasOwnProperty('_createdOn'), 'date property exists');
        assert.strictEqual(typeof booksData._createdOn, 'number', '_createdOn is from correct type');

        assert.ok(booksData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof booksData._id, 'string', '_id is from correct type');

        assert.ok(booksData.hasOwnProperty('_ownerId'), '_ownerId property exists');
        assert.strictEqual(typeof booksData._ownerId, 'string', '_ownerId is from correct type');
    })

    QUnit.test('DELETE book', async (assert) => {
        let path = 'data/books';
        let queryParams = `/${lastCreatedBookId}`

        let response = await fetch(baseURL + path + queryParams, {
            method: 'DELETE',
            headers: {'X-Authorization' : token}
        })
        assert.ok(response.ok, 'Status code is OK')

    })
})
    