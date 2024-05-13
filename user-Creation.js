

(function () {
     // firabase creation of user
     firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        //You're logged in!
        playerId = user.uid;
        playerRef = firebase.database().ref(`players/${playerId}`);
  
        // const name = createName();
        // playerNameInput.value = name;
  
        // const {x, y} = getRandomSafeSpot();
  
  
        playerRef.set({
          id: playerId,
          name:"john",
        })
  
        //Remove me from Firebase when I diconnect
        playerRef.onDisconnect().remove();
  
        //Begin the game now that we are signed in
        // initGame();
      } else {
        //You're logged out.
      }
    })
    firebase.auth().signInAnonymously().catch((error)=>{
      var errorCode=error.code;
      var errorMessage=error.message;

      console.log(errorCode,errorMessage);
      });

   

})();

