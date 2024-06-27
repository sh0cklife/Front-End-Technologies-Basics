window.addEventListener('load', solve);

function solve() {

    //1.map the elements
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const placeElement = document.getElementById('place');
    const eventElement = document.getElementById('event-name');
    const contactsElement = document.getElementById('email');

    const addEventButtonElement = document.getElementById('add-btn');

    const checkListElement = document.getElementById('check-list');
    const upcomingListElement = document.getElementById('upcoming-list');
    const finishedListElement = document.getElementById('finished-list');

    const cleartButtonElement = document.getElementById('clear');

    //2. add event listener for [ADD EVENT] button
    addEventButtonElement.addEventListener('click', onNext); //function by reference without ()
    function onNext(e) {
        e.preventDefault(); // browser doesn't refresh the page after changes are made

        //logic to check if any of the fields is empty
        if (
            timeElement.value == '' || dateElement.value == '' || placeElement.value == '' || eventElement.value == '' || contactsElement.value == ''
        ) {
            return;
        }

        //build li element with all children inside
        let liElement = document.createElement('li');
        liElement.setAttribute('class', 'event-content');

        let articleElement = document.createElement('article');
        
        let timeParagrapth = document.createElement('p');
        timeParagrapth.textContent = `Begins: ${dateElement.value} at: ${timeElement.value}`;

        let placeParagraph = document.createElement('p');
        placeParagraph.textContent = `In: ${placeElement.value}`;

        let eventParagraph = document.createElement('p');
        eventParagraph.textContent = `Event: ${eventElement.value}`;

        let contactsParagraph = document.createElement('p');
        contactsParagraph.textContent = `Contact: ${contactsElement.value}`;

        let editButton = document.createElement('button');
        editButton.setAttribute('class', 'edit-btn');
        editButton.textContent = 'Edit';

        let continueButton = document.createElement('button');
        continueButton.setAttribute('class', 'continue-btn');
        continueButton.textContent = 'Continue';

        articleElement.append(timeParagrapth, placeParagraph, eventParagraph, contactsParagraph);
        liElement.append(articleElement, editButton, continueButton);
        checkListElement.appendChild(liElement);

        addEventButtonElement.disabled = true;

        //save the date in variables so we can't lose it on Edit

        let editTimeElement = timeElement.value;
        let editDateElement = dateElement.value;
        let editPlaceElement = placeElement.value;
        let editEventElement = eventElement.value;
        let editContactsElement = contactsElement.value;

        //clear all inputs
        timeElement.value = '';
        dateElement.value = '';
        placeElement.value = '';
        eventElement.value = '';
        contactsElement.value = '';

        //[EDIT] button logic

        editButton.addEventListener('click', onEdit);
        function onEdit() {
            timeElement.value = editTimeElement
            dateElement.value = editDateElement
            placeElement.value = editPlaceElement
            eventElement.value = editEventElement
            contactsElement.value = editContactsElement

            liElement.remove();
            addEventButtonElement.disabled = false;
        }

        //[CONTINUE] button logic
        continueButton.addEventListener('click', onContinue);
        function onContinue() {

        //build li element with all children inside
        let liUpcomingElement = document.createElement('li');
        liUpcomingElement.setAttribute('class', 'event-content');

        let articleUpcomingElement = document.createElement('article');
        articleUpcomingElement = articleElement;

        let moveButton = document.createElement('button');
        moveButton.setAttribute('class', 'finished-btn');
        moveButton.textContent = 'Move to Finished';

        liUpcomingElement.append(articleUpcomingElement, moveButton);
        upcomingListElement.appendChild(liUpcomingElement);
        liElement.remove();
        addEventButtonElement.disabled = false;

        //[MOVE] button logic
        moveButton.addEventListener('click', onMove);
        function onMove() {
            let liFinishElement = document.createElement('li');
            liFinishElement.setAttribute('class', 'event-content');

            let articleFinishElement = document.createElement('article');
            articleFinishElement = articleUpcomingElement;

            liFinishElement.append(articleFinishElement);
            finishedListElement.append(liFinishElement);
            liUpcomingElement.remove();

            //[CLEAR] button logic

            cleartButtonElement.addEventListener('click', onClear);

            function onClear() {
            liFinishElement.remove();
            }
        }
    }
}
}


    
    
