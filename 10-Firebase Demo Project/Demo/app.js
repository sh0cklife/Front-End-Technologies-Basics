// Unique Firebase Object
const firebaseConfig = {
    apiKey: "AIzaSyCJSPqMexlurWq-oqGGppdxOuUDXa9CaE0",
    authDomain: "fir-project-afea1.firebaseapp.com",
    projectId: "fir-project-afea1",
    storageBucket: "fir-project-afea1.appspot.com",
    messagingSenderId: "668053402779",
    appId: "1:668053402779:web:c06a601ba597b93e39423e",
    measurementId: "G-RHZ63MHPJD"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

// Variable to access the DB
const db = firestore.collection('responsiveForm');

// [Submit] button
const submitButton = document.getElementById('submit');

// Add eventListener to the submitButton
submitButton.addEventListener('click', (e) => {
  e.preventDefault(); //prevents default submission
  // Get form values
  let firstName = document.getElementById('fname').value;
  let lastName = document.getElementById('lname').value;
  let email = document.getElementById('email').value;
  let country = document.getElementById('country-input').value;
  
  // Save data the the DB
  db.doc().set({
    fname: firstName,
    lname: lastName,
    email: email,
    country: country
  }).then(() => {
    console.log('Data is saved!');
  }).catch((error) => {
    console.log(error);
  })
  //alert
  alert('Form is submitter successfully!');

});

//Function to fetch and display data from DB
function fetchRecords(){
  const recordList = document.getElementById('records-list');
  recordList.innerHTML = '';

  db.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) =>{
      const record = doc.data();
      const item = document.createElement('li');
      item.textContent = 
      `First name: ${record.fname},
      Last name: ${record.lname},
      Email: ${record.email},
      Country: ${record.country}`;
      recordList.appendChild(item);
    });
  }).catch((error) => {
    console.log('Error while fetching data', error)
  })
}

let getUserButton = document.getElementById('getRecords');
getUserButton.addEventListener('click', fetchRecords);

// ???
window.fetchRecords = fetchRecords;