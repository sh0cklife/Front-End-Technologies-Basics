const { fakeDelay } = require('./async_test_functions.js');

QUnit.module('fakeDelay function tests', () => {
    QUnit.test('Test with 1 second delay', async(assert) => {
        const start = Date.now();
        await fakeDelay(1000);
        const end = Date.now();

        const diff = end - start;
        
        assert.ok(diff >= 1000, 'Delay is at least 1000ms')
    })
})