function subtract() {
    const firstNumber = document.getElementById("firstNumber");
    const secondNumber = document.getElementById("secondNumber");
    const resultDiv = document.getElementById("result");
    
    let firstValue = Number(firstNumber.value);
    let secondValue = Number(secondNumber.value);
    let finalResult = firstValue - secondValue;

    resultDiv.textContent = finalResult;
} 