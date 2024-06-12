function sum (a, b){
    return a + b;
}

function isEven(num){
    return num % 2 === 0;
}

function factorial(n){
    if (n === 0 || n === 1 || n < 0){
        return 1;
    }
    return n * factorial(n -1);
}

function isPalidrome(str){
    if (str === ''){
        return false;
    }
    const cleanStr = str.toLowerCase().replace(/[\W_]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}

function fibonacci(n){
    if (n === 0){
        return [];
    }
    if (n === 1){
        return [0];
    }
    let sequence = [0, 1];
    for (let i = 2; i < n; i++){
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function nthPrime(n){
    let count = 0;
    let num = 2;
    while (count < n){
        if (isPrime(num)){
            count++;
        }
        num++;
    }
    return num - 1;
}

//nested
function isPrime(num){
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i+=6){
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function pascalTriangle(rows){
    let triangle = [];
    for (let i = 0; i < rows; i++) {
        triangle[i] = [];
        triangle[i][0] = 1;
        for (let j = 1; j < i; j++) {
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
            
        }
        triangle[i][i] = 1;
    }
    return triangle;
}

//GPT
// function generatePascalTriangle(numRows) {
//     if (numRows <= 0) return [];
    
//     const triangle = [[1]];  // Initialize Pascal's Triangle with the first row

//     for (let i = 1; i < numRows; i++) {
//         const prevRow = triangle[i - 1];
//         const currentRow = [1];  // Every row starts with a 1

//         // Generate the values for the current row
//         for (let j = 1; j < i; j++) {
//             currentRow[j] = prevRow[j - 1] + prevRow[j];
//         }

//         currentRow.push(1);  // Every row ends with a 1
//         triangle.push(currentRow);  // Add the current row to the triangle
//     }

//     return triangle;
// }

function isPerfectSquare(number){
    return Math.sqrt(number) % 1 === 0;
}

module.exports = {
    sum,
    isEven,
    factorial,
    isPalidrome,
    fibonacci,
    nthPrime,
    pascalTriangle,
    isPerfectSquare
}