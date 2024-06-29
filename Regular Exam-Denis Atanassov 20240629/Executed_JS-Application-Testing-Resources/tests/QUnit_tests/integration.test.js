const baseURL = 'http://localhost:3030';
let random = Math.floor(Math.random() * 10000);

let user = {
    email: '',
    password: '123456',
    confirmPassword: '123456'
}

let token = '';
let userID = '';

let album = {
    name: '',
    artist: 'TEST_ARTIST',
    description: '',
    genre: 'Other',
    imgUrl: '/images/Lorde.jpg',
    price: '19.99',
    releaseDate: '29 June 2024'
}

let lastCreatedAlbumId = '';

QUnit.config.reorder = false;

QUnit.module('User Functionality', () => {
    QUnit.test('Register Testing', async (assert) => {
        let path = '/users/register';
        let email = `TEST_EMAIL${random}@abv.bg`;
        user.email = email;
        

        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(user)
        })

        let userData = await response.json();
        console.log(userData);

        assert.ok(response.ok, 'Response is OK');

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

    QUnit.test('Login Testing', async (assert) => {
        let path = '/users/login';
        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(user)
        });
        let userData = await response.json();
        console.log(userData);

        assert.ok(response.ok, 'Response is OK');

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

QUnit.module('Album Functionality', () => {
    QUnit.test('GET all albums', async (assert) => {
        let path = '/data/albums';
        let queryParams = '?sortBy=_createdOn%20desc&distinct=name';

        let response = await fetch(baseURL + path + queryParams);
        let jsonData = await response.json();
        console.log(jsonData);

        assert.ok(Array.isArray(jsonData), 'jsonData is an array response');

        jsonData.forEach(albumData => {

            assert.ok(albumData.hasOwnProperty('artist'), 'artist property exists');
            assert.strictEqual(typeof albumData.artist, 'string', 'artist is from correct type');

            assert.ok(albumData.hasOwnProperty('description'), 'description property exists');
            assert.strictEqual(typeof albumData.description, 'string', 'description is from correct type');

            assert.ok(albumData.hasOwnProperty('genre'), 'genre property exists');
            assert.strictEqual(typeof albumData.genre, 'string', 'genre is from correct type');

            assert.ok(albumData.hasOwnProperty('imgUrl'), 'imgUrl property exists');
            assert.strictEqual(typeof albumData.imgUrl, 'string', 'imgUrl is from correct type');

            assert.ok(albumData.hasOwnProperty('name'), 'name property exists');
            assert.strictEqual(typeof albumData.name, 'string', 'name is from correct type');

            assert.ok(albumData.hasOwnProperty('price'), 'price property exists');
            assert.strictEqual(typeof albumData.price, 'string', 'price is from correct type');

            assert.ok(albumData.hasOwnProperty('releaseDate'), 'releaseDate property exists');
            assert.strictEqual(typeof albumData.releaseDate, 'string', 'releaseDate is from correct type');

            assert.ok(albumData.hasOwnProperty('_createdOn'), '_createdOn property exists');
            assert.strictEqual(typeof albumData._createdOn, 'number', '_createdOn is from correct type');

            assert.ok(albumData.hasOwnProperty('_id'), '_id property exists');
            assert.strictEqual(typeof albumData._id, 'string', '_id is from correct type');

            assert.ok(albumData.hasOwnProperty('_ownerId'), '_ownerId property exists');
            assert.strictEqual(typeof albumData._ownerId, 'string', '_ownerId is from correct type');
        })

    })

    QUnit.test('CREATE album', async (assert) => {
        let path = '/data/albums';
        album.name = `TEST_ALBUM_TITLE${random}`;
        album.description = `TEST_DESCRIPTION${random}`;
        
        let response = await fetch (baseURL + path, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(album)
        });
        let albumData = await response.json();
        console.log(albumData);

        assert.ok(response.ok, 'Response is OK');

        assert.ok(albumData.hasOwnProperty('artist'), 'artist property exists');
        assert.equal(albumData.artist, album.artist, 'expected artist value');
        assert.strictEqual(typeof albumData.artist, 'string', 'artist is from correct type');

        assert.ok(albumData.hasOwnProperty('description'), 'description property exists');
        assert.equal(albumData.title, album.title, 'expected title value');
        assert.strictEqual(typeof albumData.description, 'string', 'description is from correct type');

        assert.ok(albumData.hasOwnProperty('genre'), 'genre property exists');
        assert.equal(albumData.genre, album.genre, 'expected genre value');
        assert.strictEqual(typeof albumData.genre, 'string', 'genre is from correct type');

        assert.ok(albumData.hasOwnProperty('imgUrl'), 'imgUrl property exists');
        assert.equal(albumData.imgUrl, album.imgUrl, 'expected imgUrl value');
        assert.strictEqual(typeof albumData.imgUrl, 'string', 'imgUrl is from correct type');

        assert.ok(albumData.hasOwnProperty('name'), 'name property exists');
        assert.equal(albumData.name, album.name, 'expected name value');
        assert.strictEqual(typeof albumData.name, 'string', 'name is from correct type');

        assert.ok(albumData.hasOwnProperty('price'), 'price property exists');
        assert.equal(albumData.price, album.price, 'expected price value');
        assert.strictEqual(typeof albumData.price, 'string', 'price is from correct type');

        assert.ok(albumData.hasOwnProperty('releaseDate'), 'releaseDate property exists');
        assert.equal(albumData.releaseDate, album.releaseDate, 'expected releaseDate value');
        assert.strictEqual(typeof albumData.releaseDate, 'string', 'releaseDate is from correct type');

        assert.ok(albumData.hasOwnProperty('_createdOn'), '_createdOn property exists');
        assert.strictEqual(typeof albumData._createdOn, 'number', '_createdOn is from correct type');

        assert.ok(albumData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof albumData._id, 'string', '_id is from correct type');

        assert.ok(albumData.hasOwnProperty('_ownerId'), '_ownerId property exists');
        assert.strictEqual(typeof albumData._ownerId, 'string', '_ownerId is from correct type');

        lastCreatedAlbumId = albumData._id;
    })

    QUnit.test('EDIT last created album', async (assert) => {
        let path = '/data/albums';
        let queryParams = `/${lastCreatedAlbumId}`;
        album.name = `EDITED_ALBUM_TITLE${random}`;
        album.description = `EDITED_DESCRIPTION${random}`;

        let response = await fetch(baseURL + path + queryParams, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(album)
        });
        let albumData = await response.json();
        console.log(albumData);

        assert.ok(response.ok, 'Response is OK');

        assert.ok(albumData.hasOwnProperty('artist'), 'artist property exists');
        assert.equal(albumData.artist, album.artist, 'expected artist value');
        assert.strictEqual(typeof albumData.artist, 'string', 'artist is from correct type');

        assert.ok(albumData.hasOwnProperty('description'), 'description property exists');
        assert.equal(albumData.title, album.title, 'expected title value');
        assert.strictEqual(typeof albumData.description, 'string', 'description is from correct type');

        assert.ok(albumData.hasOwnProperty('genre'), 'genre property exists');
        assert.equal(albumData.genre, album.genre, 'expected genre value');
        assert.strictEqual(typeof albumData.genre, 'string', 'genre is from correct type');

        assert.ok(albumData.hasOwnProperty('imgUrl'), 'imgUrl property exists');
        assert.equal(albumData.imgUrl, album.imgUrl, 'expected imgUrl value');
        assert.strictEqual(typeof albumData.imgUrl, 'string', 'imgUrl is from correct type');

        assert.ok(albumData.hasOwnProperty('name'), 'name property exists');
        assert.equal(albumData.name, album.name, 'expected name value');
        assert.strictEqual(typeof albumData.name, 'string', 'name is from correct type');

        assert.ok(albumData.hasOwnProperty('price'), 'price property exists');
        assert.equal(albumData.price, album.price, 'expected price value');
        assert.strictEqual(typeof albumData.price, 'string', 'price is from correct type');

        assert.ok(albumData.hasOwnProperty('releaseDate'), 'releaseDate property exists');
        assert.equal(albumData.releaseDate, album.releaseDate, 'expected releaseDate value');
        assert.strictEqual(typeof albumData.releaseDate, 'string', 'releaseDate is from correct type');

        assert.ok(albumData.hasOwnProperty('_createdOn'), '_createdOn property exists');
        assert.strictEqual(typeof albumData._createdOn, 'number', '_createdOn is from correct type');

        assert.ok(albumData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof albumData._id, 'string', '_id is from correct type');

        assert.ok(albumData.hasOwnProperty('_ownerId'), '_ownerId property exists');
        assert.strictEqual(typeof albumData._ownerId, 'string', '_ownerId is from correct type');

        assert.ok(albumData.hasOwnProperty('_updatedOn'), '_updatedOn property exists');
        assert.strictEqual(typeof albumData._updatedOn, 'number', '_updatedOn is from correct type');
    })
    
    QUnit.test('DELETE last created album', async (assert) => {
        let path = '/data/albums';
        let queryParams = `/${lastCreatedAlbumId}`;

        let response = await fetch(baseURL + path + queryParams, {
            method: 'DELETE',
            headers: { 'X-Authorization' : token }
        });

        assert.ok(response.ok, 'Successfully deleted album')

    })
})