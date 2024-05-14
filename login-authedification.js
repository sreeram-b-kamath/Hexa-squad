// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Get the form element
const form = document.querySelector('form');

// Add an event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  // Get the username and password values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  

  // Get a reference to the user data in the database
  const userRef = database.ref('hexa-squad-user-auth/qweqererfwefew');

  // Read the user data from the database
  userRef.once('value')
    .then((snapshot) => {
      const userData = snapshot.val();
      console.log(typeof(userData));
      console.log(typeof(userData.username));
      console.log(typeof(username));
      console.log(typeof(userData.password));
      console.log(typeof(password));




      
      // Check if the provided username and password match the data in the database
      if (userData.username === username && userData.password === password) {
        console.log('Authenticated');
      } else {
        console.log('Authentication failed');
      }
    })
    .catch((error) => {
      console.error('Error reading user data:', error);
    });
});