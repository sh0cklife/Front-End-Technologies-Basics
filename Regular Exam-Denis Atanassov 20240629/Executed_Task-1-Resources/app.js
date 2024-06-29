window.addEventListener("load", solve);

function solve() {
    const ticketsElement = document.getElementById('num-tickets');
    const seatsElement = document.getElementById('seating-preference');
    const nameElement = document.getElementById('full-name');;
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone-number');

    const purchaseTicketsButtonElement = document.getElementById('purchase-btn');

    const ticketPreviewElement = document.getElementById('ticket-preview');
    const ticketPurchaseElement = document.getElementById('ticket-purchase');
    const final = document.querySelector('.bottom-content');
    

    purchaseTicketsButtonElement.addEventListener('click', onPurchase);
    function onPurchase(e){
        e.preventDefault();

        if (
            ticketsElement.value == '' || seatsElement.value == '' || nameElement.value == '' || emailElement.value == '' || phoneElement.value == ''
        ) {
            return;
        }

        let liElement = document.createElement('li');
        liElement.setAttribute('class', 'ticket-purchase');
    
        let articleElement = document.createElement('article');
        
        let ticketsParagrapth = document.createElement('p');
        ticketsParagrapth.textContent = `Count: ${ticketsElement.value}`;
    
        let preferenceParagraph = document.createElement('p');
        preferenceParagraph.textContent = `Preference: ${seatsElement.value}`;
    
        let nameParagraph = document.createElement('p');
        nameParagraph.textContent = `To: ${nameElement.value}`;
    
        let emailParagraph = document.createElement('p');
        emailParagraph.textContent = `Email: ${emailElement.value}`;
    
        let phoneParagraph = document.createElement('p');
        phoneParagraph.textContent = `Phone number: ${phoneElement.value}`;
    
        let editButton = document.createElement('button');
        editButton.setAttribute('class', 'edit-btn');
        editButton.textContent = 'Edit';
    
        //its 'edit-btn' in the instructions?
        let onNextButton = document.createElement('button');
        onNextButton.setAttribute('class', 'edit-btn');
        onNextButton.textContent = 'Next';
    
        articleElement.append(ticketsParagrapth, preferenceParagraph, nameParagraph, emailParagraph, phoneParagraph)
        liElement.append(articleElement, editButton, onNextButton)
        ticketPreviewElement.appendChild(liElement);
    
        purchaseTicketsButtonElement.disabled = true;

        let editTicketsElement = ticketsElement.value;
        let editSeatsElement = seatsElement.value;
        let editNameElement = nameElement.value;
        let editEmailElement = emailElement.value;
        let editPhoneElement = phoneElement.value;

        ticketsElement.value = '';
        seatsElement.value = '';
        nameElement.value = '';
        emailElement.value = '';
        phoneElement.value = '';

        editButton.addEventListener('click', onEdit);
        function onEdit() {

            ticketsElement.value = editTicketsElement;
            seatsElement.value = editSeatsElement;
            nameElement.value = editNameElement;
            emailElement.value = editEmailElement;
            phoneElement.value = editPhoneElement;

            liElement.remove();
            purchaseTicketsButtonElement.disabled = false;
        }

        onNextButton.addEventListener('click', onNext);
        function onNext() {

            let liPurchaseElement = document.createElement('li');
            liPurchaseElement.setAttribute('class', 'ticket-purchase')

            let articlePurchaseElement = document.createElement('article');
            articlePurchaseElement = articleElement;

            let buyButton = document.createElement('button');
            buyButton.setAttribute('class', 'buy-btn');
            buyButton.textContent = 'Buy';

            liPurchaseElement.append(articlePurchaseElement, buyButton);
            ticketPurchaseElement.append(liPurchaseElement);

            liElement.remove();
            purchaseTicketsButtonElement.disabled = false;

            buyButton.addEventListener('click', onBuy);
            function onBuy() {

            liPurchaseElement.remove();
            let h2Element = document.createElement('h2');
            h2Element.textContent = 'Thank you for your purchase!';

            let backButton = document.createElement('button');
            backButton.setAttribute('class', 'back-btn');
            backButton.textContent = 'Back';
            
            final.append(h2Element, backButton);
            
            backButton.addEventListener('click', function(){
                location.reload();
            })

            }
            
        }
    }
}