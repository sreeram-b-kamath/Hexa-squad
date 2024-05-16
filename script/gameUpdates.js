let database=firebase.database();


//choosing the word to draw
const chooseWord=()=> {
    let wordRefer=database.ref('/words');
   wordRefer.on('value',function(snapshot){
   data=snapshot.val() 
   data.splice(0,1);
  
   wordLength = Object.keys(data).length;
   const randomIndex = Math.floor(Math.random() * wordLength);
    currentWord = data[randomIndex];

  database.ref('/drawer-question').push({"question": currentWord})
   })
}
  

function shuffleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  }
  
  
  
  function startInterval() {
    // Execute myFunction every n second
    let currentWordRefer=database.ref('/drawer-question')
    let data;
    let currentWord;
    let wordlength;
  
    currentWordRefer.limitToLast(1).on('value',function(snapshot){
    data=snapshot.val();
    
    keys=Object.keys(data);
    console.log(keys)
    wordlength = Object.keys(data).length;
    console.log(wordlength)
    currentWord=data[keys].question;
    console.log(currentWord);
    const wordLength = currentWord.length;
    const shuffledIndices = shuffleIndices(wordLength);
    let wordGap="";
    for(i=0;i<wordLength;++i)
      {
        wordGap+="_ ";
      }
    console.log(wordGap)
    document.getElementById('word').textContent = wordGap;
       wordInterval = setInterval(() => {
         if (wordIndex >= wordLength) {
           clearInterval(wordInterval);
           return;
         }
     
         // Construct the partially guessed word with random order
         let partiallyGuessedWord = '';
         for (let i = 0; i < wordLength; i++) {
           if (i <= wordIndex) {
             partiallyGuessedWord += currentWord[shuffledIndices[i]]; // Add guessed letters in shuffled order
           } else {
             partiallyGuessedWord += '_ '; // Add underscores for unguessed letters
           }
         }
     
         // Display the partially guessed word
         document.getElementById('word').textContent = partiallyGuessedWord;
         wordIndex++;
       }, 4000);
    })
     }
  
  function startWordInterval() {
    const wordLength = 10;
    const shuffledIndices = shuffleIndices(wordLength);
    console.log(currentWord)
    
    setTimeout(startInterval,5000);
    
    }
    
    // Function to shuffle the indices of the word
    function shuffleIndices(length) {
      const indices = Array.from({ length: length }, (_, index) => index);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]]; // Swap elements
      }
      return indices;
    }
  

    const updateScoreBoard=(username)=>{
        let scoreBoardRefer=database.ref('score-board-refer');
        scoreBoardRefer.once('value',function(snapshot){
      
          data=snapshot.val();
      
          console.log(data)
          console.log(Object.keys(data)[0])
          let userKey = Object.keys(data)[0]
          console.log(data[username],"data type",typeof(data[username]));
          currentScore=data[username];
          ++currentScore;
          var updateData = {};
          updateData[username] = currentScore;
          
          scoreBoardRefer.update(updateData)
          currentScore=data[username];
          console.log("new score: ",data[username]);
          // data.username
      
        })
      
      }
      