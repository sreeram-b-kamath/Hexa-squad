// Reference to the Firebase database
const db = firebase.database();

// Function to display leaderboard with user data
function displayLeaderboard() {
  const leaderboardContainer = document.querySelector(".lboard-item");
  leaderboardContainer.innerHTML = ""; // Clear previous content

  // Fetch data from Firebase and populate leaderboard
  db.ref("/scorebord")
    .once("value")
    .then((snapshot) => {
      const userData = snapshot.val(); // Get user data from snapshot
      if (userData) {
        // Convert user data to an array of objects
        const leaderboardArray = Object.entries(userData).map(
          ([username, score]) => ({
            username,
            score,
          })
        );

        // Sort usersArray in descending order based on score
        leaderboardArray.sort((a, b) => b.score - a.score);

        const topFive = leaderboardArray.slice(0, 6);

        // Iterate over usersArray
        topFive.forEach((user, index) => {
          const totalScore = leaderboardArray.reduce(
            (acc, cur) => acc + cur.score,
            0
          );
          const percentage = (user.score / totalScore) * 100;
          // Create a div element for the user
          const userDiv = document.createElement("div");
          userDiv.classList.add("lboard-mem");

          // Create an image element for the user's icon
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("img");
          const img = document.createElement("img");
          img.src = `assets/avatar${(index % 6) + 1}.jpg`; // Assuming you have five avatar images
          img.alt = "User Avatar";
          imgDiv.appendChild(img);
          userDiv.appendChild(imgDiv);

          // Create a div element for the user's name
          const nameBarDiv = document.createElement("div");
          nameBarDiv.classList.add("name-bar");
          nameBarDiv.innerHTML = `<p><span>${index + 1}.</span>${
            user.username
          }</p>`;
          userDiv.appendChild(nameBarDiv);

          // Create a div element for the user's progress bar
          const barWrapDiv = document.createElement("div");
          barWrapDiv.classList.add("bar-wrap");
          // Create inner bar for the progress
          const innerBarDiv = document.createElement("div");
          innerBarDiv.classList.add("inner-bar");
          innerBarDiv.style.width = `${percentage}%`;
          barWrapDiv.appendChild(innerBarDiv);

          userDiv.appendChild(barWrapDiv);

          // Create a div element for the user's points
          const pointsDiv = document.createElement("div");
          pointsDiv.classList.add("points");
          pointsDiv.textContent = `${user.score} points`;
          userDiv.appendChild(pointsDiv);

          // Append the userDiv to the leaderboard container
          leaderboardContainer.appendChild(userDiv);
        });
      }
    });
}

// Call the function to display the leaderboard
displayLeaderboard();
