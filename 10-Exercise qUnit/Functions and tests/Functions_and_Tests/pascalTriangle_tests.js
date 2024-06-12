const { pascalTriangle } = require('./test_functions.js')

QUnit.module('pascalTriangle functions tests', () => {
    //function returns an empty jagged array when the parameter is 0
    QUnit.test('0 as input', (assert) => {
        assert.deepEqual(pascalTriangle(0), [], '0 as input should return empty array')
    })
    //function returns a jagged array with value [[1]] when given parameter is 1
    QUnit.test('1 as input', (assert) => {
        assert.deepEqual(pascalTriangle(1), [[1]], '1 as input should pass')
    })

    QUnit.test('5 as input', (assert) => {
        assert.deepEqual(pascalTriangle(5), [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]], '5 as input should pass')
    })

    QUnit.test('8 as input', (assert) => {
        assert.deepEqual(pascalTriangle(8), [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1], [1, 7, 21, 35, 35, 21, 7, 1]], '8 as input should pass')
    })

})