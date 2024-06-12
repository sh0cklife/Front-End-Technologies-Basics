const  {nthPrime } = require('./test_functions.js')

//nthPrime functions invokes another function isPrime
//we are not exporting the isPrime function
//when we call the nthPrime function it automatically uses the isPrime

QUnit.module('nthPrime function tests', () => {
    QUnit.test('1st prime number', (assert) => {
        assert.equal(nthPrime(1), 2, '1st Prime number should be 2')
    })

    QUnit.test('5th prime number', (assert) => {
        assert.equal(nthPrime(5), 11, '5th Prime should be 11')
    })

    QUnit.test('11th prime number', (assert) => {
        assert.equal(nthPrime(11), 31, '11th Prime should be 29')
    })

    // Write more test cases here:

})