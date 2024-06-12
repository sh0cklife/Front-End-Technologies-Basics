const { factorial } = require('./test_functions.js')

//Add module
QUnit.module('Factorial function tests', () => {
    QUnit.test('Positive number', (assert) => {
        assert.equal(factorial(5), 120, 'Positive number passed')
    })

    QUnit.test('Negative number', (assert) => {
        assert.equal(factorial(-1), 1, 'Negative number passed')
    })

    //it's known that 0! == 1
    QUnit.test('Zero number', (assert) => {
        assert.equal(factorial(0), 1, 'Zero number passed')
    })

    QUnit.test('Large number', (assert) => {
        assert.equal(factorial(20), 2432902008176640000, 'Large number passed')
    })
})