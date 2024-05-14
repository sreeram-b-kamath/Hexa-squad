// Initialize leaderboard with empty scores
let leaderboard = {};

// Function to update leaderboard
function updateLeaderboard(username) {
  if (!leaderboard[username]) {
    leaderboard[username] = 1;
  } else {
    leaderboard[username]++;
  }
}

// Function to display leaderboard
function displayLeaderboard() {
  const leaderboardContainer = document.getElementById("leaderboard-container");
  leaderboardContainer.innerHTML = ""; // Clear previous leaderboard

  const sortedLeaderboard = Object.entries(leaderboard).sort(
    (a, b) => b[1] - a[1]
  ); // Sort leaderboard by score
  sortedLeaderboard.forEach(([username, score], index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${username}: ${score} points`;
    leaderboardContainer.appendChild(listItem);
  });
}

// Function to compare user input with word fetched from the array
function compareWords(userInput) {
  const words = ["apple", "banana", "orange", "pear"]; // Array of words for comparison

  if (words.includes(userInput)) {
    const username = prompt("Congratulations! Enter your username:");
    if (username) {
      updateLeaderboard(username);
      displayLeaderboard();
    }
  }
}

// Example: Listen for user input and call compareWords function
document
  .getElementById("input-field")
  .addEventListener("input", function (event) {
    const userInput = event.target.value.trim();
    compareWords(userInput);
  });


// // Initialize leaderboard with empty scores
// let leaderboard = {};

// // Function to update leaderboard
// function updateLeaderboard(username) {
//   if (!leaderboard[username]) {
//     leaderboard[username] = 1;
//   } else {
//     leaderboard[username]++;
//   }
// }

// // Function to display leaderboard
// function displayLeaderboard() {
//   const leaderboardContainer = document.getElementById("leaderboard-container");
//   leaderboardContainer.innerHTML = ""; // Clear previous leaderboard

//   const sortedLeaderboard = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]); // Sort leaderboard by score
//   sortedLeaderboard.forEach(([username, score], index) => {
//     const listItem = document.createElement("li");
//     listItem.textContent = `${index + 1}. ${username}: ${score} points`;
//     leaderboardContainer.appendChild(listItem);
//   });
// }

// // Function to compare user input with word fetched from the array
// function compareWords(userInput) {
//   const words = ["apple", "banana", "orange", "pear"]; // Array of words for comparison

//   if (words.includes(userInput)) {
//     const username = prompt("Congratulations! Enter your username:");
//     if (username) {
//       if (!isWordAlreadyGuessed(userInput)) { // Check if word has already been guessed
//         updateLeaderboard(username);
//         displayLeaderboard();
//       } else {
//         alert("Sorry, this word has already been guessed by another user.");
//       }
//     }
//   }
// }

// // Function to check if word has already been guessed
// function isWordAlreadyGuessed(word) {
//   return Object.values(leaderboard).includes(word);
// }

// // Example: Listen for user input and call compareWords function
// document.getElementById("input-field").addEventListener("input", function (event) {
//   const userInput = event.target.value.trim();
//   compareWords(userInput);
// });
