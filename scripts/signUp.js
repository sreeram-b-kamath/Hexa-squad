// Your Firebase configuration here

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Get a reference to the form element
const form = document.querySelector('#sign-in-form');

// Add an event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission

  // Get the username and password values
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  try {
    // Create an anonymous user
  const userCredential = await firebase.auth().signInAnonymously().catch((error)=>{
  var errorCode=error.code;
  console.log('This is working1')

  var errorMessage=error.message;

  console.log(errorCode,errorMessage);
  });

    // Get the user's UID
    const uid = userCredential.user.uid;
    const scoreboard= firebase.database().ref('scorebord');
    // username
    // document.addEventListener('submit', async (e) => {
    //   e.preventDefault();
    //   console.log('button is working');
   
    // Store the username and password in the database
    await database.ref('users/' + uid).set({
      username: username,
      password: password
    });




      scoreboard.once('value', snapshot => {
      let lobbyPlayers = snapshot.val() || {}; // Existing lobby players data or an empty object if there's none
      let score=0;
      lobbyPlayers[username] = score; // Use userName variable as key
      console.log('This is working')
      scoreboard.set(lobbyPlayers);
      window.location.href="login.html";


  });
    // window.location.href="login.html";

  //   console.log('User data stored successfully');
  // });
  } catch (error) {
    console.error('Error signing in anonymously: ', error);
  }
});
