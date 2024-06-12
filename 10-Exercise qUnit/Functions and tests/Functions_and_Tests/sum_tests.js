//import the function sum from file test_functions
const { sum } = require('./test_functions.js')

//first we will create a test unit module
//then write the test cases inside the module
QUnit.module('sum function tests', () =>{
    QUnit.test('Adding two positive numbers', (assert) =>{
        assert.equal(sum(2, 3), 5, 'Adding two positive numbers')
    })

    QUnit.test('Adding positive and negative numbers', (assert) =>{
        assert.equal(sum(5, -3), 2, 'Adding positive and negative numbers')
    })

    QUnit.test('Adding two negative numbers', (assert) => {
        assert.equal(sum(-3, -2), -5, 'Adding two negative numbers')
    })
    //test with 2 real numbers, comparing two real numbers in JS can be complex, we need to cast them to int and then check if they are equal
    QUnit.test('Adding two floating-point numbers', (assert) =>{
        assert.equal(Math.floor(sum(0.2, 0.1) * 10), 3, 'Adding two floating-point numbers')
        //Math. floor() is a JavaScript method that returns the largest integer less than or equal to a given number.
        //It basically rounds down a number to its nearest integer.
    })
    //edge case- additional homerwork
    QUnit.test('Adding two zeros', (assert) => {
        assert.equal(sum(0, 0), 0, 'Adding two zeros')
    })

    QUnit.test('Adding positive int and positive double', (assert) => {
        assert.equal(Math.floor(sum(1, 0.5) * 10), 15, 'Adding positive int and positive double')
    })
})
//npm test Functions_and_Tests/sum_tests.js