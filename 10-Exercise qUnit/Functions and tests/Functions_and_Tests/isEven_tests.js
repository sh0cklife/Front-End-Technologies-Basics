const { isEven } = require('./test_functions.js')

QUnit.module('isEven function tests', () => {
    //A bool check - assert.ok
    QUnit.test('Even numbers', (assert) =>{
        assert.ok(isEven(2), 'Even number passed')
        assert.ok(isEven(4), 'Even number passed')
        assert.ok(isEven(10), 'Even number passed')
    })
    //assert.notOk
    //Good practice to keep them separated in different test cases
    QUnit.test('Odd numbers', (assert) =>{
        assert.notOk(isEven(3), 'Odd number passed')
        assert.notOk(isEven(9), 'Odd number passed')
        assert.notOk(isEven(21), 'Odd number passed')
    })

    //edge case testing 0 input, according to the specifications the 0 number is even
    QUnit.test('Zero input', (assert) => {
        assert.ok(isEven(0), 'Zero number passed')
    })

    //Negative numbers
    QUnit.test('Negative Even numbers', (assert) =>{
        assert.ok(isEven(-2), 'Negative Even numbers')
        assert.ok(isEven(-4), 'Negative Even numbers')
        assert.ok(isEven(-10), 'Negative Even numbers')
    })

    QUnit.test('Negative Odd numbers', (assert) =>{
        assert.notOk(isEven(-3), 'Negative Odd numbers')
        assert.notOk(isEven(-9), 'Negative Odd numbers')
        assert.notOk(isEven(-21), 'Negative Odd numbers')
    })
})