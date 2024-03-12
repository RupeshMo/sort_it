// // Lets first capture parent element from a file

// // Main container for game objective. i.e. the string to be sorted. It will be inside the game-objective container
// const gameObjectiveContainer = document.querySelector(".game-objective");
// const gameSolutionContainer = document.querySelector(".game-solution");
// const startGame = document.querySelector(".start-game");

// const forArra = [gameSequenceSize];

// function getRandomNumber(max, min){
//   // return Math.floor(Math.random() * num);
//   return Math.random() * (max - min) + min;

//   }

// function compareInput(compareStrQuestion, compareStrInput){
//   if (compareStrInput === compareStrQuestion){
//   return true;
//   }
// }

// for (let i = 0 ; i < gameSequenceSize; i++) {
//   forArra[i] = String.fromCharCode(getRandomNumber(65,90));
// }
// // console.log(forArra);

// const objectiveChar = [gameSequenceSize];

// // console.log(getRandomNumber(gameSequenceSize));
// for (let i = 0; i < gameSequenceSize ; i++){
//   gameObjectiveContainer.append(document.createElement('div'));
//   gameObjectiveContainer.children[i].setAttribute("class", "character");
//   // gameObjectiveContainer.children[i].textContent = String.fromCharCode(getRandomNumber(65, 90));
//   objectiveChar[i] = String.fromCharCode(getRandomNumber(65, 90));
//   gameObjectiveContainer.children[i].textContent = objectiveChar[i];
//   gameSolutionContainer.append(document.createElement("input"));
//   gameSolutionContainer.children[i].setAttribute("class", "userInput");
//   gameSolutionContainer.children[i].setAttribute("minlength", "1");
//   gameSolutionContainer.children[i].setAttribute("maxlength", "1");

//   }


//  const sortedObjectiveSequence = objectiveChar.sort();

// function calculateTimeTaken(par){
//   let i = 0 ;
//   while (par != gameSequenceSize) {
//     console.log(i);
//     i += 1;
//   }
// }

// const gameCharacterInput = gameSolutionContainer.querySelectorAll(".userInput");
// for (let i = 0; i < gameSequenceSize; i++){
//   // setInterval(calculateTimeTaken(i), 1);
//   // gameCharacterInput[0].addEventListener("click", setInterval(calculateTimeTaken(i), 1000));
//   gameCharacterInput[i].addEventListener("keyup", () => {
//     console.log(gameCharacterInput[i].value);
//     if (compareInput(sortedObjectiveSequence[i], gameCharacterInput[i].value )){
//     console.log(compareInput(sortedObjectiveSequence[i], gameCharacterInput[i].value ));
//     // gameCharacterInput[i].style.backgroundColor = "Green";
//     gameCharacterInput[i+1].focus();
//     }
//   })
// }

const gameSequenceSize = 5;
function getRandomCharBetween(startBound, endBound) {
  return String.fromCharCode(Math.random() * (startBound - endBound) + endBound);  
}

function compareInput(compareStrInput, sortedSolutionString) {
  if (compareStrInput === sortedSolutionString) {
    return true;
  }
}

function setGoalAndRetain(whereTo, whatTo){
  whereTo.textContent = whatTo
  return whatTo;
}


// Read parent elements and setup game skeleton
let timeStart = 0;
const gameObjectiveContainer = document.querySelector(".game-objective");
const gameSolutionContainer = document.querySelector(".game-solution");
const ObjectiveSequence = [];
let sortedObjectiveSequence = new Array(gameSequenceSize);
const startGame = document.querySelector(".start-game");
let gameCount = 0 ; 
startGame.addEventListener("click", () => {

  if (gameCount != 0){
    let elements = gameSequenceSize-1;
    while (elements >= 0) {
      gameObjectiveContainer.children[elements].remove();
      gameSolutionContainer.children[elements].remove();
    elements--;
  }
  document.querySelector(".game-heaing").textContent = "Welcome again";
  gameCount = 0;
}
  
  for (let i = 0 ; i < gameSequenceSize; i++) {
    gameCount++;
    gameObjectiveContainer.append(document.createElement("label"));
    gameSolutionContainer.append(document.createElement("input"));

    // Saves character and sets character
    ObjectiveSequence[i] = setGoalAndRetain(gameObjectiveContainer.children[i], getRandomCharBetween(65, 90));
    timeStart = new Date().getTime();
    gameObjectiveContainer.children[i].setAttribute("class", "character");
    gameSolutionContainer.children[i].setAttribute("class", "userInput");
    gameSolutionContainer.children[i].setAttribute("maxlength", "1");
  }
  gameSolutionContainer.children[0].focus();
  sortedObjectiveSequence = ObjectiveSequence.sort();
  console.log(sortedObjectiveSequence);
});

startGame.addEventListener("click", () => {
  for (let i = 0 ; i < gameSequenceSize; i++) {
    gameSolutionContainer.children[i].addEventListener("keyup", () => {
      
      // console.log(compareInput(sortedObjectiveSequence[i],gameSolutionContainer.children[i].value));
      if (compareInput(sortedObjectiveSequence[i],gameSolutionContainer.children[i].value)){
        console.log(gameSolutionContainer.children[i].value);
        gameSolutionContainer.children[i].style.backgroundColor = "#6895D2";
        // gameSolutionContainer.children[i+1].focus();
        if (i < gameSequenceSize-1){ gameSolutionContainer.children[i+1].focus();}
        if (i == gameSequenceSize-1) {
          const currentDate = new Date().getTime();
          //  console.log("Time Taken: " + ((currentDate - timeStart)/1000).toPrecision(7) + " seconds ('-')");
          document.querySelector(".game-heaing").textContent = "Time Taken: " + ((currentDate - timeStart)/1000).toPrecision(7) + " seconds ('-')";
        }
      }
      else {
        gameSolutionContainer.children[i].style.backgroundColor = "#FA9884";
        gameSolutionContainer.children[i].value = null;

      }
    })
  }
})

