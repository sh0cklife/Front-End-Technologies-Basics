const { fetchData } = require('./async_test_functions.js')

QUnit.module('fetchData function tests', () => {
    QUnit.test('Fetch data from correct URL', async(assert) => {
        const data = await fetchData('https://www.zippopotam.us/bg/8000');

        assert.ok(data.hasOwnProperty('post code'), 'Response has post code property');
        assert.equal(data['post code'], '8000');
        assert.ok(data.hasOwnProperty('country'), 'Response has country property');
        assert.equal(data['country'], 'Bulgaria');
        assert.ok(data.hasOwnProperty('country abbreviation'), 'Response has country abbreviation property');
        assert.equal(data['country abbreviation'], 'BG');

        assert.ok(Array.isArray(data.places))
        assert.equal(data.places.length, 1)

        const place = data.places[0];
        assert.ok(place.hasOwnProperty('place name'), 'Response has place name property');
        assert.equal(place['place name'], 'Бургас / Burgas');
        assert.ok(place.hasOwnProperty('longitude'), 'Response has longitude property');
        assert.equal(place['longitude'], '27.4667');
        assert.ok(place.hasOwnProperty('latitude'), 'Response has atitude property');
        assert.equal(place['latitude'], '42.5');
    })

    QUnit.test('Fetch data from invalid post code', async(assert) => {
        const data = await fetchData('https://www.zippopotam.us/bg/112445')

        assert.notOk(data);
    })

    QUnit.test('Fetch data from invalid URL', async(assert) => {
        const data = await fetchData('https://www.zippopodtam.us/bg/8000')

        assert.equal(data, 'fetch failed')
    })
    
})