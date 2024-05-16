
// Your Firebase configuration here
var firebaseConfig = {
  apiKey: "AIzaSyDSPmxx3T3NydlQlFwA5lfctSR-7vEonv8",
  authDomain: "hexa-squad.firebaseapp.com",
  databaseURL: "https://hexa-squad-default-rtdb.firebaseio.com",
  projectId: "hexa-squad",
  storageBucket: "hexa-squad.appspot.com",
  messagingSenderId: "550225963727",
  appId: "1:550225963727:web:81fa3b4bb3feae38d425ba",
  measurementId: "G-LZXR9GNSH7"
// ...
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the Firebase Realtime Database
const database = firebase.database();


// Function to get a reference to the user data in the database
const getUserDataRef = () => {
  return new Promise((resolve, reject) => {
    try {
      // Get a reference to the user data in the database
      const userRef = database.ref('users');
      console.log(userRef)
      resolve(userRef);
      
    } catch (error) {
      reject(`Error getting user data reference: ${error}`);
    }
  });
};

// Get the form element
const form = document.querySelector('#login-form');


// Add an event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission

  // Get the username and password values
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  try {
    // Get a reference to the user data in the database
    const userRef = await getUserDataRef();
    userRef.on('child_added', async (snapshot) => {
      const userData = snapshot.val();
      console.log(typeof(userData));
      console.log(userData.username);

    // Read the user data from the database
    // const snapshot = await userRef.once('value');
    // const userData = snapshot.val();
    console.log(userRef)

    console.log(typeof(userData));
    console.log(typeof(userData.username));
    console.log(typeof(username));
    console.log(typeof(userData.password));
    console.log(typeof(password));

    // Check if the provided username and password match the data in the database
    if (userData.username === username && userData.password === password) {
      console.log('Authenticated');

      // Ivde nmk local set and routing kodukknm - Hari
      // conflit vana nen nan kolum  - jobin
      // conflit varum..But we'll resolve dude.. All is well nn alle.. - Hari
      localStorage.setItem("username", username);
      // window.location.href="loby.html"

    } else {
      console.log('Authentication failed');

      // Ivde routing login page thanne redirect aaknm..
      // Athreoll..

    }
  });
  } catch (error) {
    console.error(error);
  }
});