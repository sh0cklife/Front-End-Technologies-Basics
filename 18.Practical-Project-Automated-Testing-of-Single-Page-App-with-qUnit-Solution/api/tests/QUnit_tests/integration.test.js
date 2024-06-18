const baseURL = 'http://localhost:3030/';
let user = {
    email: '',
    password: '123456'
}

let token = '';
let userId = '';

let game = {
    title: '',
    category: '',
    maxLevel: '100',
    imageUrl: './images/ZombieLang.png',
    summary: ''
}

let lastCreatedGameID = '';

let gameIdForComments = '';

QUnit.config.reorder = false;

QUnit.module('user functionalities', () => {
    QUnit.test('registration' , async (assert) => {
        //arrange
        let path = 'users/register';
        let random = Math.floor(Math.random() * 10000);
        let email = `abv${random}@abv.bg`;
        user.email = email;

        //act
        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        let json = await response.json();

        //assert
        assert.ok(response.ok, 'User registered successfully')
        
        assert.ok(json.hasOwnProperty('email'), 'Email exists');
        assert.equal(json['email'], user.email, 'Expected email');
        assert.strictEqual(typeof json.email, 'string', 'Email has correct property type');

        assert.ok(json.hasOwnProperty('password'), 'Password exists');
        assert.equal(json['password'], user.password, 'Expected password');
        assert.strictEqual(typeof json.password, 'string', 'Password has correct property type');

        assert.ok(json.hasOwnProperty('accessToken'), 'Access Token exists');
        assert.strictEqual(typeof json.accessToken, 'string', 'Access Token has correct property type');

        assert.ok(json.hasOwnProperty('_id'), 'ID exists');
        assert.strictEqual(typeof json._id, 'string', 'ID has correct property type');

        token = json.accessToken
        userId = json.id
        sessionStorage.setItem('game-user', JSON.stringify(user)) // creates item that keeps data for our user
    })

    QUnit.test('login', async (assert) => {
        //arrange
        let path = 'users/login';

        //act
        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        let json = await response.json();

        //assert
        assert.ok(response.ok, 'Successfull LOGIN');

        assert.ok(json.hasOwnProperty('email'), 'Email exists');
        assert.equal(json['email'], user.email, 'Expected email');
        assert.strictEqual(typeof json.email, 'string', 'Email has correct property type');

        assert.ok(json.hasOwnProperty('password'), 'Password exists');
        assert.equal(json['password'], user.password, 'Expected password');
        assert.strictEqual(typeof json.password, 'string', 'Password has correct property type');

        assert.ok(json.hasOwnProperty('accessToken'), 'Access Token exists');
        assert.strictEqual(typeof json.accessToken, 'string', 'Access Token has correct property type');

        assert.ok(json.hasOwnProperty('_id'), 'ID exists');
        assert.strictEqual(typeof json._id, 'string', 'ID has correct property type');

        userId = json._id;
        token = json.accessToken;
        sessionStorage.setItem('game-user', JSON.stringify(user));
    })
})

QUnit.module('games functionalities', () => {
    QUnit.test('get all games', async(assert) => {
        //arrange
        let path = 'data/games';
        let queryParams = '?sortBy=_createdOn%20desc';

        //act
        let response = await fetch(baseURL + path + queryParams);
        let json = await response.json();

        //assert
        assert.ok(response.ok, 'Response OK');
        assert.ok(Array.isArray(json), "Response is an array");

        json.forEach(jsonProperty => {
            assert.ok(jsonProperty.hasOwnProperty('category'), "Property category exists");
            assert.strictEqual(typeof jsonProperty.category, 'string', "Property category has correct type");

            assert.ok(jsonProperty.hasOwnProperty('imageUrl'), "Property imageUrl exists");
            assert.strictEqual(typeof jsonProperty.imageUrl, 'string', "Property imageUrl has correct type");

            assert.ok(jsonProperty.hasOwnProperty('maxLevel'), "Property maxLevel exists");
            assert.strictEqual(typeof jsonProperty.maxLevel, 'string', "Property maxLevel has correct type");

            assert.ok(jsonProperty.hasOwnProperty('title'), "Property title exists");
            assert.strictEqual(typeof jsonProperty.title, 'string', "Property title has correct type");

            assert.ok(jsonProperty.hasOwnProperty('summary'), "Property summary exists");
            assert.strictEqual(typeof jsonProperty.summary, 'string', "Property summary has correct type");

            assert.ok(jsonProperty.hasOwnProperty('_createdOn'), "Property _createdOn exists");
            assert.strictEqual(typeof jsonProperty._createdOn, 'number', "Property _createdOn has correct type");

            assert.ok(jsonProperty.hasOwnProperty('_id'), "Property _id exists");
            assert.strictEqual(typeof jsonProperty._id, 'string', "Property _id has correct type");

            assert.ok(jsonProperty.hasOwnProperty('_ownerId'), "Property _ownerId exists");
            assert.strictEqual(typeof jsonProperty._ownerId, 'string', "Property _ownerId has correct type");
        });
        
    })

    QUnit.test('create game', async(assert) => {
        //arrange
        let path = 'data/games';
        let random = Math.floor(Math.random() * 10000);

        game.title = `Test title - ${random}`;
        game.category = `Test category - ${random}`;
        game.summary = `Test summary - ${random}`;

        //act
        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(game)
        });
        let json = await response.json();
        lastCreatedGameID = json._id;

        //assert
        assert.ok(response.ok, 'Success response');

        assert.ok(json.hasOwnProperty('category'), 'Property category exists');
        assert.strictEqual(typeof json.category, 'string', 'The property category has correct type');
        assert.strictEqual(json.category, game.category, 'Property category has expected value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property imageUrl exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'The property imageUrl has correct type');
        assert.strictEqual(json.imageUrl, game.imageUrl, 'Property imageUrl has expected value');

        assert.ok(json.hasOwnProperty('maxLevel'), 'Property maxLevel exists');
        assert.strictEqual(typeof json.maxLevel, 'string', 'The property maxLevel has correct type');
        assert.strictEqual(json.maxLevel, game.maxLevel, 'Property maxLevel has expected value');

        assert.ok(json.hasOwnProperty('summary'), 'Property summary exists');
        assert.strictEqual(typeof json.summary, 'string', 'The property summary has correct type');
        assert.strictEqual(json.summary, game.summary, 'Property summary has expected value');

        assert.ok(json.hasOwnProperty('title'), 'Property title exists');
        assert.strictEqual(typeof json.title, 'string', 'The property title has correct type');
        assert.strictEqual(json.title, game.title, 'Property title has expected value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property _createdOn exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'The property _createdOn has correct type');

        assert.ok(json.hasOwnProperty('_id'), 'Property _id exists');
        assert.strictEqual(typeof json._id, 'string', 'The property _id has correct type');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property _ownerId exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'The property _ownerId has correct type');
    })

    QUnit.test('get by id functionality', async(assert) => {
        //arrange
        let path = 'data/games';

        //act
        let response = await fetch(baseURL + path + `/${lastCreatedGameID}`);
        let json = await response.json();

        //assert
        assert.ok(response.ok, 'Success response');

        assert.ok(json.hasOwnProperty('category'), 'Property category exists');
        assert.strictEqual(typeof json.category, 'string', 'The property category has correct type');
        assert.strictEqual(json.category, game.category, 'Property category has expected value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property imageUrl exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'The property imageUrl has correct type');
        assert.strictEqual(json.imageUrl, game.imageUrl, 'Property imageUrl has expected value');

        assert.ok(json.hasOwnProperty('maxLevel'), 'Property maxLevel exists');
        assert.strictEqual(typeof json.maxLevel, 'string', 'The property maxLevel has correct type');
        assert.strictEqual(json.maxLevel, game.maxLevel, 'Property maxLevel has expected value');

        assert.ok(json.hasOwnProperty('summary'), 'Property summary exists');
        assert.strictEqual(typeof json.summary, 'string', 'The property summary has correct type');
        assert.strictEqual(json.summary, game.summary, 'Property summary has expected value');

        assert.ok(json.hasOwnProperty('title'), 'Property title exists');
        assert.strictEqual(typeof json.title, 'string', 'The property title has correct type');
        assert.strictEqual(json.title, game.title, 'Property title has expected value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property _createdOn exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'The property _createdOn has correct type');

        assert.ok(json.hasOwnProperty('_id'), 'Property _id exists');
        assert.strictEqual(typeof json._id, 'string', 'The property _id has correct type');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property _ownerId exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'The property _ownerId has correct type');

    })

    QUnit.test('edit game', async(assert) => {
        //arrange
        let path = 'data/games'
        let random = Math.floor(Math.random() * 10000);

        game.title = `UpdatedTitle ${random}`;
        game.category = `UpdatedCategory ${random}`;
        game.summary = `UpdatedSummary ${random}`;

        //act
        let response = await fetch(baseURL + path + `/${lastCreatedGameID}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(game)
        })
        let json = await response.json();

        //assert

        assert.ok(response.ok, 'Success response');

        assert.ok(json.hasOwnProperty('category'), 'Property category exists');
        assert.strictEqual(typeof json.category, 'string', 'The property category has correct type');
        assert.strictEqual(json.category, game.category, 'Property category has expected value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property imageUrl exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'The property imageUrl has correct type');
        assert.strictEqual(json.imageUrl, game.imageUrl, 'Property imageUrl has expected value');

        assert.ok(json.hasOwnProperty('maxLevel'), 'Property maxLevel exists');
        assert.strictEqual(typeof json.maxLevel, 'string', 'The property maxLevel has correct type');
        assert.strictEqual(json.maxLevel, game.maxLevel, 'Property maxLevel has expected value');

        assert.ok(json.hasOwnProperty('summary'), 'Property summary exists');
        assert.strictEqual(typeof json.summary, 'string', 'The property summary has correct type');
        assert.strictEqual(json.summary, game.summary, 'Property summary has expected value');

        assert.ok(json.hasOwnProperty('title'), 'Property title exists');
        assert.strictEqual(typeof json.title, 'string', 'The property title has correct type');
        assert.strictEqual(json.title, game.title, 'Property title has expected value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property _createdOn exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'The property _createdOn has correct type');

        assert.ok(json.hasOwnProperty('_id'), 'Property _id exists');
        assert.strictEqual(typeof json._id, 'string', 'The property _id has correct type');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property _ownerId exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'The property _ownerId has correct type');

        assert.ok(json.hasOwnProperty('_updatedOn'), 'Property _updatedOn exists');
        assert.strictEqual(typeof json._updatedOn, 'number', 'The property _updatedOn has correct type');
    })

    QUnit.test('newly created game - no comments', async(assert) => {
        let path = 'data/comments'

        let gameId = (await fetch(baseURL + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(game)
        })
        .then(response => response.json()))._id

        gameIdForComments = gameId;

        let queryParams = `?where=gameId%3D%22${gameId}%22`;

        //act
        let response = await fetch(baseURL + path + queryParams);
        let json = await response.json();

        //assert
        assert.ok(response.ok, 'Status OK');
        assert.ok(Array.isArray(json), 'Response is array');
        assert.ok(json.length == 0, 'Array lenght is 0, array is empty')
    })

    QUnit.test('create new comment', async(assert) => {
        //arrange
        let path = 'data/comments';
        let random = Math.floor(Math.random() * 10000);
        let comment = {
            gameId: gameIdForComments,
            comment: `New comment ${random}`
        };

        //act
        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(comment)
        })
        let json = await response.json();

        //assert
        assert.ok(response.ok, 'Response is OK');

        assert.ok(json.hasOwnProperty('comment'), 'Property comment exists');
        assert.strictEqual(typeof json.comment, 'string', 'Property comment has correct type');
        assert.strictEqual(json.comment, comment.comment, 'Property comment has expected value');

        assert.ok(json.hasOwnProperty('gameId'), 'Property gameId exists');
        assert.strictEqual(typeof json.gameId, 'string', 'Property gameId has correct type');
        assert.strictEqual(json.gameId, comment.gameId, 'Property gameId has expected value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property _createdOn exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property _createdOn has correct type');

        assert.ok(json.hasOwnProperty('_id'), 'Property _id exists');
        assert.strictEqual(typeof json._id, 'string', 'Property _id has correct type');
    })

    QUnit.test('get comments by game ID', async(assert) => {
        //arrange
        let path = 'data/comments';
        let queryParams = `?where=gameId%3D%22${gameIdForComments}%22`

        //act
        let response = await fetch(baseURL + path + queryParams);
        let json = await response.json();

        //assert
        assert.ok(response.ok, 'Status OK');
        assert.ok(Array.isArray(json), 'The response is an array');

        json.forEach(comments => {

            assert.ok(comments.hasOwnProperty('comment'), 'Property comment exists');
            assert.strictEqual(typeof comments.comment, 'string', 'Property comment has correct type');

            assert.ok(comments.hasOwnProperty('gameId'), 'Property gameId exists');
            assert.strictEqual(typeof comments.gameId, 'string', 'Property gameId has correct type');

            assert.ok(comments.hasOwnProperty('_createdOn'), 'Property _createdOn exists');
            assert.strictEqual(typeof comments._createdOn, 'number', 'Property _createdOn has correct type');

            assert.ok(comments.hasOwnProperty('_id'), 'Property _id exists');
            assert.strictEqual(typeof comments._id, 'string', 'Property _id has correct type');
            
        })
    })
})