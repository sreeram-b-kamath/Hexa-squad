const firebaseConfig = {
    apiKey: "AIzaSyDSPmxx3T3NydlQlFwA5lfctSR-7vEonv8",
    authDomain: "hexa-squad.firebaseapp.com",
    databaseURL: "https://hexa-squad-default-rtdb.firebaseio.com/",
    projectId: "hexa-squad",
    storageBucket: "hexa-squad.appspot.com",
    messagingSenderId: "550225963727",
    appId: "1:550225963727:web:81fa3b4bb3feae38d425ba",
    measurementId: "G-LZXR9GNSH7"
  };

  firebase.initializeApp(firebaseConfig);
  const feedbackFormDB = firebase.database().ref('feedback-form');
  console.log(feedbackFormDB)

    document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const feedbackContent = document.getElementById('feedback-message').value;
    console.log(feedbackContent)

    try {
      await feedbackFormDB.push({
        message: feedbackContent
      });
      console.log('Data added successfully!');
      document.getElementById('feedback-form').reset();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  });

 