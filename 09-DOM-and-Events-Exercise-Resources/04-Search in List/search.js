function search() {
   let input = document.getElementById('searchText').value;
   let liElements = document.querySelectorAll('li');
   let result = document.getElementById('result');

   let matches = 0;

   for (let index = 0; index < liElements.length; index++) {
      if((liElements[index].textContent.toLowerCase().includes(input.toLowerCase()))){
         liElements[index].style.fontWeight = 'bold';
         liElements[index].style.textDecoration = 'underline';
         matches++;
      }
      else{
         liElements[index].style.fontWeight = '';
         liElements[index].style.textDecoration = '';
      }
   }
   result.textContent = `${matches} matches found`;
}
