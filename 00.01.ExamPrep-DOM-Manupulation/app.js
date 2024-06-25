window.addEventListener("load", solve);

function solve() {
  let snowmanNameElement = document.getElementById('snowman-name');
  let snowmanHeightElement = document.getElementById('snowman-height');
  let locationElement = document.getElementById('location');
  let creatorNameElement = document.getElementById('creator-name');
  let attributeElement = document.getElementById('special-attribute');

  let addButtonElement = document.querySelector('.add-btn');

  let snowListElement = document.querySelector('.snowman-preview');
  let showSnowmanElement = document.querySelector('.snow-list');

  let main = document.getElementById('hero');
  let bodyElement = document.querySelector('.body');
  let backImg = document.getElementById('back-img');

  addButtonElement.addEventListener('click', onAdd);

  function onAdd(e) {
    e.preventDefault();
    if (
      snowmanNameElement == '' || 
      snowmanHeightElement == '' || 
      locationElement == '' || 
      creatorNameElement == '' || 
      attributeElement == ''
    ){
      return;
    }

    
    let articleElementInfo = document.createElement('article');

    let liElementInfo = document.createElement('li');
    liElementInfo.setAttribute('class', 'snowman-info');

    let btnContainer = document.createElement('div');
    btnContainer.setAttribute('class', 'btn-container');

    //CREATE PARAGRAPH ELEMENTS FOR THE SNOWMAN DETAILS LIST
    let snowmanName = document.createElement('p');
    snowmanName.textContent = `Name: ${snowmanNameElement.value}`;

    let snowmanHeight = document.createElement('p');
    snowmanHeight.textContent = `Height: ${snowmanHeightElement.value}`;

    let location = document.createElement('p');
    location.textContent = `Location: ${locationElement.value}`;

    let creator = document.createElement('p');
    creator.textContent = `Creator: ${creatorNameElement.value}`;

    let attribute = document.createElement('p');
    attribute.textContent = `Attribute: ${attributeElement.value}`;

    //CREATE BUTTON ELEMENTS FOR THE [EDIT] AND [NEXT] BUTTONS
    let editButton = document.createElement('button')
    editButton.setAttribute('class', 'edit-btn')
    editButton.textContent = 'Edit';

    let nextButton = document.createElement('button')
    nextButton.setAttribute('class', 'next-btn')
    nextButton.textContent = 'Next';

    //ADD ALL FIELDS AND BUTTONS TO THE articleElementInfo
    articleElementInfo.appendChild(snowmanName);
    articleElementInfo.appendChild(snowmanHeight);
    articleElementInfo.appendChild(location);
    articleElementInfo.appendChild(creator);
    articleElementInfo.appendChild(attribute);

    btnContainer.appendChild(editButton);
    btnContainer.appendChild(nextButton);

    liElementInfo.appendChild(articleElementInfo);
    liElementInfo.appendChild(btnContainer);

    snowListElement.append(liElementInfo);

    //SAVE FILLED-IN FIELDS IN LET VARIABLES AND RESET FORM
    let editedSnowmanName = snowmanNameElement.value;
    let editedSnowmanHeight = snowmanHeightElement.value;
    let editedLocation = locationElement.value;
    let editedCreator = creatorNameElement.value;
    let editedAttribute = attributeElement.value;

    //LET RESET FORM
    snowmanNameElement.value = ''
    snowmanHeightElement.value = ''
    locationElement.value = ''
    creatorNameElement.value = ''
    attributeElement.value = ''

    addButtonElement.disabled = true;

    //ADD [EDIT] BUTTON FUNCTIONALITY
    editButton.addEventListener('click', onEdit);
    function onEdit() {
      snowmanNameElement.value = editedSnowmanName;
      snowmanHeightElement.value = editedSnowmanHeight;
      locationElement.value = editedLocation;
      creatorNameElement.value = editedCreator;
      attributeElement.value = editedAttribute;

      liElementInfo.remove();
      addButtonElement.disabled = false;
    }

    //ADD [NEXT] BUTTON FUNCTIONALITY
    nextButton.addEventListener('click', onNext);

    function onNext() {
      //create confirm element container to store the final snowman data
      let liElementConfirm = document.createElement('li');
      liElementConfirm.setAttribute('class', 'snowman-content');

      //create article element to store the [SEND] button
      let arictleElementContinue = document.createElement('article');
      arictleElementContinue = articleElementInfo;

      //create [SEND] button
      let sendButton = document.createElement('button');
      sendButton.setAttribute('class', 'send-btn');
      sendButton.textContent = "Send";

      // add [SEND] button to the article element and the article element to the li element
      arictleElementContinue.appendChild(sendButton);
      liElementConfirm.appendChild(arictleElementContinue);

      //remove the li element where the data were stored
      liElementInfo.remove();
      //add the element with the whole data and button to the existing element
      showSnowmanElement.appendChild(liElementConfirm);

      // logic on lick [SEND] button
      sendButton.addEventListener('click', onConfirm);
      function onConfirm() {
        // remove main element as stated in the requirements
        main.remove();

      //create [BACK] button
      let backButton = document.createElement('button');
      backButton.setAttribute('class', 'back-btn');
      backButton.textContent = "Back";

      //make back image visible
      backImg.hidden = false;

      //add [BACK] button to the body element
      bodyElement.appendChild(backButton);
      backButton.addEventListener('click', onBack);
      function onBack(){
        window.location.reload();
      }

      }
    }
  }
}
