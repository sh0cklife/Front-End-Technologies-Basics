const baseURL = 'http://localhost:3030/';

let user = {
    email: '',
    password: '123456',
    repeatPassword: '123456'
};

let lastCreatedEventId = '';
let myEvent = {
    author: 'DEMO_AUTHOR',
    date: '6/26/2024',
    title: '',
    description: '',
    imageUrl: '/images/Moulin-Rouge!-The-Musical.jpg'
}

let token = '';
let userId = '';

QUnit.config.reorder = false;

QUnit.module('user functionalities', () => {
    QUnit.test('User Registration', async (assert) => {
        //arrange
        let path = 'users/register';

        let random = Math.floor(Math.random() * 10000);
        let email = `DEMO_EMAIL${random}@abv.bg`;
        user.email = email;

        //act
        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: { 'content-type' : 'application/json'},
            body:JSON.stringify(user) 
        });
        let userData = await response.json();
        

        //assert
        assert.ok(response.ok);

        assert.ok(userData.hasOwnProperty('email'), 'Email property exists');
        assert.equal(userData.email, user.email, 'expected email value');
        assert.strictEqual(typeof userData.email, 'string', 'email has correct type');

        assert.ok(userData.hasOwnProperty('password'), 'Password property exists');
        assert.equal(userData.password, user.password, 'expected password value');
        assert.strictEqual(typeof userData.password, 'string', 'password has correct type');

        assert.ok(userData.hasOwnProperty('_createdOn'), '_createdOn property exists');
        assert.strictEqual(typeof userData._createdOn, 'number', '_createdOn has correct type');

        assert.ok(userData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof userData._id, 'string', '_id has correct type');

        assert.ok(userData.hasOwnProperty('accessToken'), 'accessToken property exists');
        assert.strictEqual(typeof userData.accessToken, 'string', 'accessToken has correct type');

        token = userData.accessToken;
        userId = userData._id;
        sessionStorage.setItem('event-user', JSON.stringify(user));
    })

    QUnit.test('User LOGIN', async (assert) => {
        let path = 'users/login';

        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: { 'content-type' : 'application/json'},
            body:JSON.stringify(user) 
        });
        let userData = await response.json();
        

        //assert
        assert.ok(response.ok, 'response code is OK');

        assert.ok(userData.hasOwnProperty('email'), 'Email property exists');
        assert.equal(userData.email, user.email, 'expected email value');
        assert.strictEqual(typeof userData.email, 'string', 'email has correct type');

        assert.ok(userData.hasOwnProperty('password'), 'Password property exists');
        assert.equal(userData.password, user.password, 'expected password value');
        assert.strictEqual(typeof userData.password, 'string', 'password has correct type');

        assert.ok(userData.hasOwnProperty('_createdOn'), '_createdOn property exists');
        assert.strictEqual(typeof userData._createdOn, 'number', '_createdOn has correct type');

        assert.ok(userData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof userData._id, 'string', '_id has correct type');

        assert.ok(userData.hasOwnProperty('accessToken'), 'accessToken property exists');
        assert.strictEqual(typeof userData.accessToken, 'string', 'accessToken has correct type');
    })
})

QUnit.module('even funtctionalities', () => {
    QUnit.test('get all events', async (assert) => {
        //arrange
        let path = 'data/theaters';
        let queryParams = '?sortBy=_createdOn%20desc&distinct=title';

        //act
        let response = await fetch(baseURL + path + queryParams); //default GET request
        let json = await response.json();

        //assert
        assert.ok(response.ok, 'response is OK');
        assert.ok(Array.isArray(json), 'Response is an array');

        json.forEach(jsonData => {
            
            assert.ok(jsonData.hasOwnProperty('author'), 'author property exists');
            assert.strictEqual(typeof jsonData.author, 'string', 'author is from correct type');

            assert.ok(jsonData.hasOwnProperty('date'), 'date property exists');
            assert.strictEqual(typeof jsonData.date, 'string', 'date is from correct type');

            assert.ok(jsonData.hasOwnProperty('description'), 'description property exists');
            assert.strictEqual(typeof jsonData.description, 'string', 'description is from correct type');

            assert.ok(jsonData.hasOwnProperty('imageUrl'), 'imageUrl property exists');
            assert.strictEqual(typeof jsonData.imageUrl, 'string', 'imageUrl is from correct type');

            assert.ok(jsonData.hasOwnProperty('title'), 'title property exists');
            assert.strictEqual(typeof jsonData.title, 'string', 'title is from correct type');

            assert.ok(jsonData.hasOwnProperty('_createdOn'), 'date property exists');
            assert.strictEqual(typeof jsonData._createdOn, 'number', '_createdOn is from correct type');

            assert.ok(jsonData.hasOwnProperty('_id'), '_id property exists');
            assert.strictEqual(typeof jsonData._id, 'string', '_id is from correct type');

            assert.ok(jsonData.hasOwnProperty('_ownerId'), '_ownerId property exists');
            assert.strictEqual(typeof jsonData._ownerId, 'string', '_ownerId is from correct type');
        })
    })

    QUnit.test('create event', async (assert) => {
        //arrange
        let path = 'data/theaters';
        let random = Math.floor(Math.random() * 10000);
        myEvent.title = `DEMO_TITLE${random}`;
        myEvent.description = `DEMO_DESCRIPTION${random}`;

        //act
        let response = await fetch(baseURL + path, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(myEvent)
        });

        let jsonData = await response.json();
        console.log(jsonData);

        //assert
        assert.ok(response.ok, 'response status is OK');

        assert.ok(jsonData.hasOwnProperty('author'), 'author property exists');
        assert.equal(jsonData.author, myEvent.author, 'expected author value');
        assert.strictEqual(typeof jsonData.author, 'string', 'author is from correct type');

        assert.ok(jsonData.hasOwnProperty('date'), 'date property exists');
        assert.equal(jsonData.date, myEvent.date, 'expected date value');
        assert.strictEqual(typeof jsonData.date, 'string', 'date is from correct type');

        assert.ok(jsonData.hasOwnProperty('description'), 'description property exists');
        assert.equal(jsonData.description, myEvent.description, 'expected description value');
        assert.strictEqual(typeof jsonData.description, 'string', 'description is from correct type');

        assert.ok(jsonData.hasOwnProperty('imageUrl'), 'imageUrl property exists');
        assert.equal(jsonData.imageUrl, myEvent.imageUrl, 'expected imageUrl value');
        assert.strictEqual(typeof jsonData.imageUrl, 'string', 'imageUrl is from correct type');

        assert.ok(jsonData.hasOwnProperty('title'), 'title property exists');
        assert.equal(jsonData.title, myEvent.title, 'expected title value');
        assert.strictEqual(typeof jsonData.title, 'string', 'title is from correct type');

        assert.ok(jsonData.hasOwnProperty('_createdOn'), 'date property exists');
        assert.strictEqual(typeof jsonData._createdOn, 'number', '_createdOn is from correct type');

        assert.ok(jsonData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof jsonData._id, 'string', '_id is from correct type');

        assert.ok(jsonData.hasOwnProperty('_ownerId'), '_ownerId property exists');
        assert.strictEqual(typeof jsonData._ownerId, 'string', '_ownerId is from correct type');

        lastCreatedEventId = jsonData._id;
    })

    QUnit.test('edit event', async (assert) => {
        //arrange
        let path = 'data/theaters';
        let queryParams = `/${lastCreatedEventId}`
        let random = Math.floor(Math.random() * 10000);
        myEvent.title = `EDITED_DEMO_TITLE${random}`;
        

        //act
        let response = await fetch(baseURL + path + queryParams, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(myEvent)
        });

        let jsonData = await response.json();
        console.log(jsonData);

        //assert
        assert.ok(response.ok, 'response status is OK');

        assert.ok(jsonData.hasOwnProperty('author'), 'author property exists');
        assert.equal(jsonData.author, myEvent.author, 'expected author value');
        assert.strictEqual(typeof jsonData.author, 'string', 'author is from correct type');

        assert.ok(jsonData.hasOwnProperty('date'), 'date property exists');
        assert.equal(jsonData.date, myEvent.date, 'expected date value');
        assert.strictEqual(typeof jsonData.date, 'string', 'date is from correct type');

        assert.ok(jsonData.hasOwnProperty('description'), 'description property exists');
        assert.equal(jsonData.description, myEvent.description, 'expected description value');
        assert.strictEqual(typeof jsonData.description, 'string', 'description is from correct type');

        assert.ok(jsonData.hasOwnProperty('imageUrl'), 'imageUrl property exists');
        assert.equal(jsonData.imageUrl, myEvent.imageUrl, 'expected imageUrl value');
        assert.strictEqual(typeof jsonData.imageUrl, 'string', 'imageUrl is from correct type');

        assert.ok(jsonData.hasOwnProperty('title'), 'title property exists');
        assert.equal(jsonData.title, myEvent.title, 'expected title value');
        assert.strictEqual(typeof jsonData.title, 'string', 'title is from correct type');

        assert.ok(jsonData.hasOwnProperty('_createdOn'), 'date property exists');
        assert.strictEqual(typeof jsonData._createdOn, 'number', '_createdOn is from correct type');

        assert.ok(jsonData.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof jsonData._id, 'string', '_id is from correct type');

        assert.ok(jsonData.hasOwnProperty('_ownerId'), '_ownerId property exists');
        assert.strictEqual(typeof jsonData._ownerId, 'string', '_ownerId is from correct type');

        lastCreatedEventId = jsonData._id;
    })

    QUnit.test('delete event', async (assert) => {
        //arrange
        let path = 'data/theaters';
        let queryParams = `/${lastCreatedEventId}`
        
        //act
        let response = await fetch(baseURL + path + queryParams, {
            method: 'DELETE',
            headers: {
                'X-Authorization' : token
            }
        });

        assert.ok(response.ok, 'Successfully deleted Event')
        
    })
    

})