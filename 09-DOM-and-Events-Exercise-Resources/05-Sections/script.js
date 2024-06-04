function create(words) {
   let divContent = document.getElementById('content');

   for (let index = 0; index < words.length; index++) {
      let newDiv = document.createElement('div');
      let newPara = document.createElement('p');
      newPara.textContent = words[index];
      newPara.style.display = 'none';

      newDiv.appendChild(newPara);
      divContent.appendChild(newDiv);
      
      newDiv.addEventListener('click', function(){
         newPara.style.display = '';
      })
      
   }
}