const { fibonacci } = require('./test_functions.js')

QUnit.module('Fibonacci function tests', () => {
    QUnit.test('0 as input', (assert) => {
        assert.deepEqual(fibonacci(0), [], 'Zero input should pass')
    })

    QUnit.test('1 as input', (assert) => {
        assert.deepEqual(fibonacci(1), [0], 'One as input should pass')
    })

    QUnit.test('5 as input', (assert) => {
        assert.deepEqual(fibonacci(5), [0, 1, 1, 2, 3], '5 as input should pass')
    })

    QUnit.test('10 as input', (assert) => {
        assert.deepEqual(fibonacci(10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], '5 as input should pass')
    })
})