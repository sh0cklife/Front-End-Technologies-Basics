function solve() {
  let input = document.getElementById('text').value.toLowerCase();
  let convention = document.getElementById('naming-convention').value;
  let result = document.getElementById('result');

  let arrayInput = input.split(' ');
  let resultText = '';

  if(convention == "Camel Case"){
    resultText += arrayInput[0];
    for(let i = 1; i < arrayInput.length; i++){
      resultText += arrayInput[i][0].toUpperCase() + arrayInput[i].slice(1, arrayInput[i].length);
    }

    result.textContent = resultText;
  }
  else if(convention == "Pascal Case"){
    resultText += arrayInput[0][0].toUpperCase() + arrayInput[0].slice(1, arrayInput[0].length);
    for (let i = 1; i < arrayInput.length; i++) {
      resultText += arrayInput[i][0].toUpperCase() + arrayInput[i].slice(1, arrayInput[i].length);
    }

    result.textContent = resultText;
  }
  else{
    result.textContent = "Error!"
  }
}