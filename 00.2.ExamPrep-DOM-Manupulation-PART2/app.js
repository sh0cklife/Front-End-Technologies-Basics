window.addEventListener('load', solution);

function solution() {
  
  //MAPPING OF THE ELEMENTS
  let employeeElement = document.getElementById('employee');
  let categoryElement = document.getElementById('category');
  let urgencyElement = document.getElementById('urgency');
  let teamElemenent = document.getElementById('team');
  let descriptionElement = document.getElementById('description');
  let addButtonElement = document.getElementById('add-btn')

  let previewElement = document.querySelector('.preview-list'); // map by class
  let pendingElement = document.querySelector('.pending-list');
  let resolvedElement = document.querySelector('.resolved-list');

  //add listener for the [ADD] button
  addButtonElement.addEventListener('click', onNext);
  function onNext(e) {
    e.preventDefault();
    if (
      employeeElement.value == '' || 
      categoryElement.value == '' ||
      urgencyElement.value == '' ||
      teamElemenent.value == '' ||
      descriptionElement.value == ''

    ) {
     return; 
    }

    //DYNAMIC HTML BUILD, BUILD ELEMENTS TO ADD INTO THE UL FOR PREVIEW LIST
    let liElement = document.createElement('li');
    liElement.setAttribute('class', 'problem-content');

    let articleElement = document.createElement('article');

    let fromParagraph = document.createElement('p');
    fromParagraph.textContent = `From: ${employeeElement.value}`

    let categoryParagraph = document.createElement('p');
    categoryParagraph.textContent = `Category: ${categoryElement.value}`

    let urgencyParagraph = document.createElement('p');
    urgencyParagraph.textContent = `Urgency: ${urgencyElement.value}`

    let teamParagraph = document.createElement('p');
    teamParagraph.textContent = `Assigned to: ${teamElemenent.value}`

    let descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = `Category: ${descriptionElement.value}`

    let editButton = document.createElement('button');
    editButton.setAttribute('class', 'edit-btn')
    editButton.textContent = "Edit"

    let continueButton = document.createElement('button');
    continueButton.setAttribute('class', 'continue-btn')
    continueButton.textContent = "Continue"

    //append all children
    articleElement.appendChild(fromParagraph);
    articleElement.appendChild(categoryParagraph);
    articleElement.appendChild(urgencyParagraph);
    articleElement.appendChild(teamParagraph);
    articleElement.appendChild(descriptionParagraph);
    
    liElement.appendChild(articleElement);
    liElement.appendChild(editButton);
    liElement.appendChild(continueButton);

    previewElement.appendChild(liElement);

    //before removing the values from the fields we should keep the input data
    //ohterwise we will lose it

    let editedEmployee = employeeElement.value;
    let editedCategory = categoryElement.value;
    let editedUrgency = urgencyElement.value;
    let editedTeam = teamElemenent.value;
    let editedDescription = descriptionElement.value;

    //clear the input fields
    employeeElement.value = '';
    categoryElement.value = '';
    urgencyElement.value = '';
    teamElemenent.value = '';
    descriptionElement.value = '';
    addButtonElement.disabled = true;

    //add event listener to [EDIT]button

    editButton.addEventListener('click', onEdit);
    function onEdit() {
      employeeElement.value = editedEmployee
      categoryElement.value = editedCategory
      urgencyElement.value = editedUrgency
      teamElemenent.value = editedTeam
      descriptionElement.value = editedDescription

      liElement.remove();
      addButtonElement.disabled = false;
    }

    continueButton.addEventListener('click', onContinue);
    function onContinue() {
      let liElementContinue = document.createElement('li');
      liElementContinue.setAttribute('class', 'problem-content');

      let articleElementContinue = document.createElement('article');
      articleElementContinue = articleElement;

      let resolvedButton = document.createElement('button');
      resolvedButton.setAttribute('class', 'resolve-btn');
      resolvedButton.textContent = 'Resolved';

      liElementContinue.appendChild(articleElementContinue);
      liElementContinue.appendChild(resolvedButton);
      pendingElement.appendChild(liElementContinue);

      addButtonElement.disabled = false;
      liElement.remove();

      //on clicking [RESOLVE] button
      resolvedButton.addEventListener('click', onResolve);
      function onResolve() {
        let liElementResolved = document.createElement('li');
        liElementResolved.setAttribute('class', 'problem-content');

        let articleElementResolved = document.createElement('article');
        articleElementResolved = articleElementContinue;

        let clearButton = document.createElement('button');
        clearButton.setAttribute('class', 'clear-btn');
        clearButton.textContent = 'Clear';

        liElementResolved.appendChild(articleElementResolved);
        liElementResolved.appendChild(clearButton);

        resolvedElement.appendChild(liElementResolved);
        liElementContinue.remove();

        //[CLEAR] button
        clearButton.addEventListener('click', onClear);
        function onClear() {
          liElementResolved.remove();
        }

      }
    }
  }
}


    
    
