// Reference to the Firebase database
const db = firebase.database();

// Function to update leaderboard
function updateLeaderboard(username) {
  // Get current score from database
  db.ref(`leaderscore/b123`).once("value", (snapshot) => {
    const userData = snapshot.val() || { score: 0 };
    let score = userData.score; // If score doesn't exist, set it to 0
    score++; // Increase score
    // Update score in the database
    db.ref(`leaderscore/b123/score`).set(score);
  });
}

// Function to display leaderboard
function displayLeaderboard() {
  const leaderboardContainer = document.getElementById("leaderboard-container");
  leaderboardContainer.innerHTML = ""; // Clear previous leaderboard

  // Get leaderboard data from database
  db.ref("leaderscore")
    .orderByValue()
    .limitToLast(5)
    .on("child_added", (snapshot) => {
      const leaderboardData = snapshot.val(); // Get data from snapshot
      if (leaderboardData) {
        // Convert data to array of objects
        const leaderboardArray = Object.entries(leaderboardData).map(
          ([score, username]) => ({ username, score })
        );
        // Sort leaderboard by score
        leaderboardArray.sort((a, b) => b.score - a.score);
        // Display leaderboard
        leaderboardArray.forEach((entry, index) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${index + 1}. ${entry.username}: ${
            entry.score
          } points`;
          leaderboardContainer.appendChild(listItem);
        });
      }
    });
}

// Function to compare user input with word fetched from the database
function compareWords(userInput) {
  // Reference to the Firebase database for fetching the word
  const wordRef = db.ref("words/word");

  // Fetch the word from the database
  wordRef.once("value", (snapshot) => {
    const word = snapshot.val(); // Get the word from the snapshot
    if (word && userInput === word) {
      const username = getUsernameFromDatabase(); // Get username from database
      if (username) {
        updateLeaderboard(username);
        displayLeaderboard();
      }
    }
  });
}

// Function to get username from database
function getUsernameFromDatabase() {
  return db
    .ref("leaderscore/b123")
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Get the first username from the object keys
        const username = Object.keys(data)[0];
        return username;
      } else {
        return null;
      }
    });
}

// Example: Listen for user input and call compareWords function
document
  .getElementById("input-field")
  .addEventListener("input", function (event) {
    const userInput = event.target.value.trim();
    compareWords(userInput);
  });
