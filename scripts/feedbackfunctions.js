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
localStorage.setItem("lastname", "Smith");
const userIDForFeedback = localStorage.getItem("lastname");
firebase.initializeApp(firebaseConfig);
const feedbackFormDB = firebase.database().ref('feedback-form');
console.log(feedbackFormDB);

const stars = document.querySelectorAll('.star-rating .bi-star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', (e) => {
        const rating = parseInt(e.target.getAttribute('data-rating'));
        selectedRating = rating;
        updateRating(rating);
    });
});

document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const feedbackContent = document.getElementById('feedback-message').value;
    try {
        await feedbackFormDB.push({
            userId : userIDForFeedback,
            message: feedbackContent,
            rating: selectedRating
        });
        console.log('Data added successfully!');
        document.getElementById('feedback-form').reset();
        selectedRating = 0; // Reset the selected rating after submission
    } catch (error) {
        console.error('Error adding document: ', error);
    }
});

function updateRating(rating) {
    console.log('Selected rating: ', rating);
    // Here, you can update the UI to reflect the selected rating if needed
}