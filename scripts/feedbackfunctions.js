// import { userIdToPass } from "./login.js";
import { firebaseConfig } from "./config.js";

const feedbackFormDB = firebase.database().ref('feedback-form');
console.log(feedbackFormDB);

const stars = document.querySelectorAll('.star-rating .bi-star');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', async (e) => {
    const rating = parseInt(e.target.getAttribute('data-rating'));
    selectedRating = rating;
    await updateRating(rating);
  });
});
let userIdForFeedback = localStorage.getItem('username')
document.getElementById('feedback-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const feedbackContent = document.getElementById('feedback-message').value;
  try {
    await pushFeedbackData(userIdForFeedback, feedbackContent, selectedRating);
    console.log('Data added successfully!');
    document.getElementById('feedback-form').reset();
    selectedRating = 0; // Reset the selected rating after submission
  } catch (error) {
    console.error('Error adding document: ', error);
  }
});

async function updateRating(rating) {
  console.log('Selected rating: ', rating);
  // Here, you can update the UI to reflect the selected rating if needed
}

const getAllUserFeedbacks = async () => {
  try {
    // Get a reference to the user data in the database
    const userFeedbackHistory = await firebase.database().ref('feedback-form').once('value');
    return userFeedbackHistory.val();
  } catch (error) {
    console.error(`Error getting user data references: ${error}`);
    throw error;
  }
};

const pushFeedbackData = (userId, message, rating) => {
  return new Promise((resolve, reject) => {
    userId = localStorage.getItem('username')
    feedbackFormDB.push({ userId, message, rating }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
const viewFeedbacksBtn = document.getElementById("view-feedbacks");
const feedbackListContainer = document.getElementById("feedback-list");
const feedbackContainer = document.querySelector(".feedback-container");

let isListShown=false;

viewFeedbacksBtn.addEventListener("click", () => {
     if (isListShown) {
    feedbackContainer.classList.remove('slide-left');
    feedbackListContainer.classList.remove('show');
    isListShown = false;
     }
     else{
         feedbackContainer.classList.add("slide-left");
         feedbackListContainer.classList.add("show");
         displayFeedbacks();
         isListShown=true;
     }
});

function displayFeedbacks() {
  feedbackListContainer.innerHTML = "<h2>Feedbacks</h2><ul></ul>";
  const feedbackList = feedbackListContainer.querySelector("ul");

  feedbackFormDB.on("child_added", (snapshot) => {
    const feedback = snapshot.val();
    const userId = feedback.userId;
    const message = feedback.message;
    const rating = feedback.rating;

    const feedbackItem = document.createElement("li");
     feedbackItem.innerHTML = `
      <strong>${userId}</strong>
      <span class="rating">Rating: ${rating}/5</span>
      <p>${message}</p>
    `;

    feedbackList.appendChild(feedbackItem);
  });
}
