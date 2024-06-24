const baseUrl = 'http://localhost:3030';

let user = {
    username: '',
    email: '',
    password: '123456',
    gender: 'male'
}

let token = '';
let userId = '';

let meme = {
    title: '',
    description: '',
    imageUrl: '/images/2.png'
}

let lastCreatedMemeId = '';

QUnit.config.reorder = false;

QUnit.module('User functionalities', () => {
    QUnit.test('Register Testing', async (assert) => {
        let path = '/users/register';
        let random = Math.floor(Math.random() * 10000);
        let randomUsername = `TEST_USER_${random}`;
        let randomEmail = `TEST_EMAIL${random}@abv.bg`;

        user.username = randomUsername;
        user.email = randomEmail;

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(user)
        });

        assert.ok(response.ok, 'Verify if the response is successful');
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        //email
        assert.ok(jsonResponse.hasOwnProperty('email'), 'email property exists');
        assert.equal(jsonResponse.email, user.email, 'expected email');
        assert.strictEqual(typeof jsonResponse.email, 'string', 'email value is correct');
        //gender
        assert.ok(jsonResponse.hasOwnProperty('gender'), 'gender property exists');
        assert.equal(jsonResponse.gender, user.gender, 'expected gender');
        assert.strictEqual(typeof jsonResponse.gender, 'string', 'gender value is correct');
        //password
        assert.ok(jsonResponse.hasOwnProperty('password'), 'password property exists');
        assert.equal(jsonResponse.password, user.password, 'expected password');
        assert.strictEqual(typeof jsonResponse.password, 'string', 'password value is correct');
        //username
        assert.ok(jsonResponse.hasOwnProperty('username'), 'username property exists');
        assert.equal(jsonResponse.username, user.username, 'expected username value');
        assert.strictEqual(typeof jsonResponse.username, 'string', 'username value is correct');
        //token
        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'accessToken property exists');
        assert.strictEqual(typeof jsonResponse.accessToken, 'string', 'accessToken value is correct');
        //id
        assert.ok(jsonResponse.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof jsonResponse._id, 'string', '_id value is correct');



        token = jsonResponse.accessToken
        // token = jsonResponse['accessToken'];
        userId = jsonResponse['_id'];
        sessionStorage.setItem('meme-user', JSON.stringify(user)); //keeps logged in user in session storage 
    })
    

    QUnit.test('LOGIN Testing', async (assert) => {
        let path = '/users/login';
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });

        assert.ok(response.ok, 'successful response');
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        //email
        assert.ok(jsonResponse.hasOwnProperty('email'), 'email property exists');
        assert.equal(jsonResponse.email, user.email, 'expected email');
        assert.strictEqual(typeof jsonResponse.email, 'string', 'email value is correct');
        //gender
        assert.ok(jsonResponse.hasOwnProperty('gender'), 'gender property exists');
        assert.equal(jsonResponse.gender, user.gender, 'expected gender');
        assert.strictEqual(typeof jsonResponse.gender, 'string', 'gender value is correct');
        //password
        assert.ok(jsonResponse.hasOwnProperty('password'), 'password property exists');
        assert.equal(jsonResponse.password, user.password, 'expected password');
        assert.strictEqual(typeof jsonResponse.password, 'string', 'password value is correct');
        //username
        assert.ok(jsonResponse.hasOwnProperty('username'), 'username property exists');
        assert.equal(jsonResponse.username, user.username, 'expected username value');
        assert.strictEqual(typeof jsonResponse.username, 'string', 'username value is correct');
        //token
        assert.ok(jsonResponse.hasOwnProperty('accessToken'), 'accessToken property exists');
        assert.strictEqual(typeof jsonResponse.accessToken, 'string', 'accessToken value is correct');
        //id
        assert.ok(jsonResponse.hasOwnProperty('_id'), '_id property exists');
        assert.strictEqual(typeof jsonResponse._id, 'string', '_id value is correct');

        token = jsonResponse.accessToken
        userId = jsonResponse._id
        sessionStorage.setItem('meme-user', JSON.stringify(user));
    })
});

QUnit.module('Meme functionalities', () => {
    QUnit.test('Get All Memes Testing', async (assert) => {
        let path = '/data/memes';
        let queryParam = '?sortBy=_createdOn%20desc';

        let response = await fetch(baseUrl + path + queryParam)
        assert.ok(response.ok, '00. successful response');

        let jsonResponse = await response.json();
        console.log(jsonResponse);

        assert.ok(Array.isArray(jsonResponse), '0. response is an array');

        jsonResponse.forEach(element => {
            assert.ok(element.hasOwnProperty('description'), '1. property description exists')
            assert.strictEqual(typeof element['description'], 'string', '1. property description has correct value type')

            assert.ok(element.hasOwnProperty('imageUrl'), '2. property imageUrl exists')
            assert.strictEqual(typeof element['imageUrl'], 'string', '2. property imageUrl has correct value type')

            assert.ok(element.hasOwnProperty('title'), '3. property title exists')
            assert.strictEqual(typeof element['title'], 'string', '3. property title has correct value type')

            assert.ok(element.hasOwnProperty('_createdOn'), '4. property _createdOn exists')
            assert.strictEqual(typeof element['_createdOn'], 'number', '4. property _createdOn has correct value type')

            assert.ok(element.hasOwnProperty('_id'), '5. property _id exists')
            assert.strictEqual(typeof element['_id'], 'string', '5. property _id has correct value type')

            assert.ok(element.hasOwnProperty('_ownerId'), '6. property _ownerId exists')
            assert.strictEqual(typeof element['_ownerId'], 'string', '6. property _ownerId has correct value type')
        })
            
        });

        QUnit.test('Create Meme Testing', async (assert) => {
            let path = '/data/meme';
            let random = Math.floor(Math.random() * 10000);

            meme.title = `DEMO_MEME${random}`;
            meme.description = `DEMO_DESCRIPTION${random}`;

            let response = await fetch(baseUrl + path, {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json',
                    'X-Authorization' : token
                },
                body: JSON.stringify(meme)
            })

            assert.ok(response.ok, 'successful response');
            let jsonResponse = await response.json();
            console.log(jsonResponse);

            
                assert.ok(jsonResponse.hasOwnProperty('description'), '1. property description exists')
                assert.strictEqual(typeof jsonResponse['description'], 'string', '1. property description has correct value type')
    
                assert.ok(jsonResponse.hasOwnProperty('imageUrl'), '2. property imageUrl exists')
                assert.strictEqual(typeof jsonResponse['imageUrl'], 'string', '2. property imageUrl has correct value type')
    
                assert.ok(jsonResponse.hasOwnProperty('title'), '3. property title exists')
                assert.strictEqual(typeof jsonResponse['title'], 'string', '3. property title has correct value type')
    
                assert.ok(jsonResponse.hasOwnProperty('_createdOn'), '4. property _createdOn exists')
                assert.strictEqual(typeof jsonResponse['_createdOn'], 'number', '4. property _createdOn has correct value type')
    
                assert.ok(jsonResponse.hasOwnProperty('_id'), '5. property _id exists')
                assert.strictEqual(typeof jsonResponse['_id'], 'string', '5. property _id has correct value type')
    
                assert.ok(jsonResponse.hasOwnProperty('_ownerId'), '6. property _ownerId exists')
                assert.strictEqual(typeof jsonResponse['_ownerId'], 'string', '6. property _ownerId has correct value type')
            

             lastCreatedMemeId = jsonResponse._id;
        })
    
        QUnit.test('Edit Meme Testing', async (assert) => {
            let path = '/data/meme';
            let random = Math.floor(Math.random() * 10000);

            meme.title = `EDITED_TITLE${random}`;
            
            let response = await fetch(baseUrl + path + `/${lastCreatedMemeId}`, {
                method: 'PUT',
                headers: {
                    'content-type' : 'application/json',
                    'X-Authorization' : token
                },
                body: JSON.stringify(meme)
            })

            assert.ok(response.ok, 'successful response');
            let jsonResponse = await response.json();
            console.log(jsonResponse);

                assert.ok(jsonResponse.hasOwnProperty('description'), '1. property description exists')
                assert.strictEqual(typeof jsonResponse['description'], 'string', '1. property description has correct value type')
                assert.equal(jsonResponse.description, meme.description, '!! expected description value');
    
                assert.ok(jsonResponse.hasOwnProperty('imageUrl'), '2. property imageUrl exists')
                assert.strictEqual(typeof jsonResponse['imageUrl'], 'string', '2. property imageUrl has correct value type')
                assert.equal(jsonResponse.imageUrl, meme.imageUrl, '!! expected imageUrl value');
    
                assert.ok(jsonResponse.hasOwnProperty('title'), '3. property title exists')
                assert.strictEqual(typeof jsonResponse['title'], 'string', '3. property title has correct value type')
                assert.equal(jsonResponse.title, meme.title, '!! expected title value');
    
                assert.ok(jsonResponse.hasOwnProperty('_createdOn'), '4. property _createdOn exists')
                assert.strictEqual(typeof jsonResponse['_createdOn'], 'number', '4. property _createdOn has correct value type')
    
                assert.ok(jsonResponse.hasOwnProperty('_id'), '5. property _id exists')
                assert.strictEqual(typeof jsonResponse['_id'], 'string', '5. property _id has correct value type')
                
                assert.ok(jsonResponse.hasOwnProperty('_ownerId'), '6. property _ownerId exists')
                assert.strictEqual(typeof jsonResponse['_ownerId'], 'string', '6. property _ownerId has correct value type')
                
                assert.ok(jsonResponse.hasOwnProperty('_updatedOn'), 'property _updatedOn exists');
                assert.strictEqual(typeof jsonResponse['_updatedOn'], 'number', 'property _updatedOn has correct value type');
        })
    
        QUnit.test('Delete Meme Testing', async (assert) => {
            let path = '/data/meme';

            let response = await fetch (baseUrl + path + `/${lastCreatedMemeId}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization' : token
                }
            });
            assert.ok(response.ok, 'successfully deleted meme')
        })
})

    


   
