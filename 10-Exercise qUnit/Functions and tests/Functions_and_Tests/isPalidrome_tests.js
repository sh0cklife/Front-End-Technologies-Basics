const { isPalidrome } = require('./test_functions.js')

QUnit.module('isPalidrome function tests', () => {
    QUnit.test('Single palindrome word', (assert) => {
        assert.ok(isPalidrome('racecar', 'Single palindrome word passed'))
    })

    QUnit.test('Multiple palindrome words', (assert) => {
        assert.ok(isPalidrome('A man, a plan, a canal, Panama!', 'Multiple palindrome words passed'))
    })

    QUnit.test('Non-palindrome single word', (assert) => {
        assert.notOk(isPalidrome('hello', 'Non-palindrome single word passed'))
    })

    QUnit.test('Empty string', (assert) => {
        assert.notOk(isPalidrome('', 'Empty string passed'))
    })
})