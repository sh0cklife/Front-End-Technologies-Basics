function solve() {
  const[input, output] = document.getElementsByTagName('textarea');
  const [generateButton, buyButton] = document.getElementsByTagName('button');
  const tableBody = document.getElementsByTagName('tbody')[0];

  generateButton.addEventListener('click', generateRow);
  buyButton.addEventListener('click', buyItems);

  function generateRow(){
    let items = JSON.parse(input.value)

    for (let index = 0; index < items.length; index++) {
      let tableRow = document.createElement('tr');

      //add tableData for image
      let imageTableData = document.createElement('td');
      let image = document.createElement('img');
      image.src = items[index].img;
      imageTableData.appendChild(image);
      tableRow.appendChild(imageTableData);
      
      //add tableData for name
      let nameTableData = document.createElement('td');
      let nameParagraph = document.createElement('p');
      nameParagraph.textContent = items[index].name;
      nameTableData.appendChild(nameParagraph);
      tableRow.appendChild(nameTableData);

      //add tableData for price
      let priceTableData = document.createElement('td');
      let priceParagraph = document.createElement('p');
      priceParagraph.textContent = items[index].price;
      priceTableData.appendChild(priceParagraph);
      tableRow.appendChild(priceTableData);

      //add tableData for decoration
      let decorationTableData = document.createElement('td');
      let decorationParagraph = document.createElement('p');
      decorationParagraph.textContent = items[index].decFactor;
      decorationTableData.appendChild(decorationParagraph);
      tableRow.appendChild(decorationTableData);

      //add checkbox
      let markTableData = document.createElement('td');
      let markInput = document.createElement('input');
      markInput.type = 'checkbox';
      markTableData.appendChild(markInput);
      tableRow.appendChild(markTableData);


      tableBody.appendChild(tableRow);
    }
  }

  function buyItems(){
    let furniture = [];
    let price = 0;
    let avgDecFactor = 0;
    let checkItemCount = 0;
    let tableRows = document.getElementsByTagName('tr');

    for (let i = 1; i < tableRows.length; i++) {
      let isMarkChecked = tableRows[i].children[4].children[0].checked;
      if(isMarkChecked){
        checkItemCount +=1;
        furniture.push(tableRows[i].children[1].children[0].textContent);
        price += Number(tableRows[i].children[2].children[0].textContent);
        avgDecFactor += Number(tableRows[i].children[3].children[0].textContent);
      }
    }

    const result = `Bought furniture: ${furniture.join(', ')}
    Total price: ${price}
    Average decoration factor: ${avgDecFactor/checkItemCount}`

    output.textContent = result;
  }
}