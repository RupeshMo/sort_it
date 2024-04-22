import { LinkedList } from "plugin/linkedlist";

function checkNumber(randomNumber, numberInList = null, list = null, biggestListNumber) {
  console.log(randomNumber, list.rightMost.data, biggestListNumber, 'Inside Check');
  let position = biggestListNumber;
  console.log(randomNumber, list.rightMost.data, position, 'Inside Check');
  // Case 1: Random Number = number already in list, find another one that does not match.
  if (randomNumber == numberInList){
    // Reset rightMost 
    console.log(randomNumber, list.rightMost.data, '==');
    list.rightMost = position;
    checkNumber(getRandomCharBetween(65,90), list.rightMost.data, list, position);
  }

  // Case 2: Random Number > number already in list, add it to the list.
  else if (randomNumber > numberInList){
    // Reset rightMost
    console.log(randomNumber, list.rightMost.data, '>');
    
    // This adds the number right next to current number in list as it is bigger than that.
    list.addElement(randomNumber);
    list.rightMost = position;

    console.log("list:", list.rightMost.data, list.rightMost.previous.data);
 
  }

  // Case 3: Random Number < number already in list, check again with previous element as the current.
  else if (randomNumber < numberInList || numberInList == undefined){
    /* There could be two possibilities :
    First: The number already in the list could be first and only, so the position left next to it is null, and the random number will be added there.
    */
    console.log(randomNumber, list.rightMost.data, '<');
   if (list.rightMost.previous == null){
    // Reset rightMost
    console.log(randomNumber, list.rightMost.data, '< == null');
    list.rightMost = position;
    list.addElementStart(randomNumber);
    console.log("list:", list.rightMost.data, list.rightMost.previous.data);

   }
    /* 
    Second: The previous position is not null, then we need to check it again. But with different position.
    */  
   else {
    // Position here is the previous of current.
    console.log(randomNumber, list.rightMost.data, '< !null');
    list.rightMost = list.rightMost.previous;
    // console.log(list.rightMost.data, 'data', randomNumber);
    checkNumber(randomNumber, list.rightMost.data, list, position);
   }
  }
}

function ObjectiveSequence(size = null) {
  const sequenceList = new LinkedList();
  let count = 0;

  // Initial check for head
  if (sequenceList.leftMost == null) {
    sequenceList.addElement(getRandomCharBetween(65, 90));
    console.log(sequenceList.rightMost.data, 'Initial');
    count++;
  }
  // loop starts for creating a list till given size
  while (count != size - 1) {
    console.log(sequenceList.rightMost.data, sequenceList.leftMost.data, 'size -1');
    checkNumber(getRandomCharBetween(65, 90), sequenceList.rightMost.data, sequenceList, sequenceList.rightMost);
    count++;
    // console.log("w", "hold", sequenceList.rightMost);
  }
  // console.log("list:", sequenceList);
  sequenceList.printListValues();
}
ObjectiveSequence(8);

export function gameSequenceSize() {
  return 5;
}

function getRandomCharBetween(startBound, endBound) {
  const minCeiled = Math.ceil(startBound);
  const maxFloored = Math.floor(endBound);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  // return String.fromCharCode(
  //   Math.random() * (startBound - endBound) + endBound
  // );
}

function compareInput(compareStrInput, sortedSolutionString) {
  if (compareStrInput.toUpperCase() === sortedSolutionString.toUpperCase()) {
    return true;
  }
}

function setGoalAndRetain(whereTo, whatTo) {
  whereTo.textContent = whatTo;
  return whatTo;
}

function setUpGame(forCase, size) {
  const gameShow = document.querySelector(".game-show-container");

  const parentGameContainer = document.createElement("div");
  const parentGameContainerInput = document.createElement("div");

  parentGameContainer.setAttribute("class", "game-objective");
  parentGameContainerInput.setAttribute("class", "game-solution");

  if (forCase === "keyboard") {
    gameShow.append(parentGameContainer);
    gameShow.append(parentGameContainerInput);

    console.log("inside setUpGame();");
    // Keyboard
    for (let i = 0; i < size; i++) {
      if (parentGameContainer != null && parentGameContainerInput != null) {
        parentGameContainer.append(document.createElement("label"));
        parentGameContainer.children[i].setAttribute("class", "character");
        parentGameContainerInput.append(document.createElement("input"));
        parentGameContainerInput.children[i].setAttribute("class", "userInput");
        parentGameContainerInput.children[i].setAttribute("maxlength", 1);
      }
    }
  } else if (forCase === "mouse") {
    gameShow.append(parentGameContainer);

    for (let i = 0; i < size; i++) {
      parentGameContainer.append(document.createElement("div"));
      parentGameContainer.children[i].setAttribute("class", "character");
    }
  } else {
    console.log("Sorry");
  }
}

function loadingTimer(value, size) {
  let a = 1;
  const intID = setInterval(() => {
    if (a <= 3) {
      document.querySelector(".game-show-container").textContent = a;
      a++;
    } else {
      clearInterval(intID);
      document.querySelector(".game-show-container").textContent = null;
      setUpGame(value, size);
      return true;
    }
  }, 500);
}

function userInputMode() {
  const radioInput = document.querySelectorAll(".radio-button");
  const startGame = document.querySelector(".start-game");
  // console.log(radioInput);
  let a = 0;
  for (let i = 0; i < 2; i++) {
    radioInput[i].children[1].addEventListener("click", () => {
      startGame.style.display = "none";
      a = loadingTimer(radioInput[i].children[0].value, 6);
    });
  }
}

// userInputMode();

// loadingTimer();

// document.addEventListener("turbo:load", () => {
//   setUpGame("mouse", 6);
// });

// let eventFired = false;
// Read parent elements and setup game skeleton
// function startGame() {

//   let timeStart = 0;
//   const gameObjectiveContainer = document.querySelector(".game-objective");
//   const gameSolutionContainer = document.querySelector(".game-solution");
//   const ObjectiveSequence = [];
//   let sortedObjectiveSequence = new Array(gameSequenceSize());
//   const startGameBtn = document.querySelector(".start-game");
//   let gameCount = 0;
//   startGameBtn.addEventListener("click", () => {
//     // eventFired = true;
//     if (gameCount != 0) {
//       let elements = gameSequenceSize() - 1;
//       while (elements >= 0) {
//         gameObjectiveContainer.children[elements].remove();
//         gameSolutionContainer.children[elements].remove();
//         elements--;
//       }
//       document.querySelector(".game-heaing").textContent = "Welcome again";
//       gameCount = 0;
//     }

//     for (let i = 0; i < gameSequenceSize(); i++) {
//       gameCount++;
//       gameObjectiveContainer.append(document.createElement("label"));
//       gameSolutionContainer.append(document.createElement("input"));

//       // Saves character and sets character
//       ObjectiveSequence[i] = setGoalAndRetain(
//         gameObjectiveContainer.children[i],
//         getRandomCharBetween(65, 90)
//       );
//       timeStart = new Date().getTime();
//       gameObjectiveContainer.children[i].setAttribute("class", "character");
//       gameSolutionContainer.children[i].setAttribute("class", "userInput");
//       gameSolutionContainer.children[i].setAttribute("maxlength", "1");
//     }
//     gameSolutionContainer.children[0].focus();
//     sortedObjectiveSequence = ObjectiveSequence.sort();
//     console.log(sortedObjectiveSequence);
//     console.log(document.readyState);
//   });

//   startGameBtn.addEventListener("click", () => {
//     for (let i = 0; i < gameSequenceSize(); i++) {
//       gameSolutionContainer.children[i].addEventListener("keyup", () => {
//         // console.log(compareInput(sortedObjectiveSequence[i],gameSolutionContainer.children[i].value));
//         if (
//           compareInput(
//             sortedObjectiveSequence[i],
//             gameSolutionContainer.children[i].value
//           )
//         ) {
//           console.log(gameSolutionContainer.children[i].value);
//           gameSolutionContainer.children[i].style.backgroundColor = "#6895D2";
//           // gameSolutionContainer.children[i+1].focus();
//           if (i < gameSequenceSize() - 1) {
//             gameSolutionContainer.children[i + 1].focus();
//           }
//           if (i == gameSequenceSize() - 1) {
//             const currentDate = new Date().getTime();
//             //  console.log("Time Taken: " + ((currentDate - timeStart)/1000).toPrecision(7) + " seconds ('-')");
//             document.querySelector(".game-heaing").textContent =
//               "Time Taken: " +
//               ((currentDate - timeStart) / 1000).toPrecision(7) +
//               " seconds ('-')";
//             // const gameTiming = "Time Taken: " + ((currentDate - timeStart)/1000).toPrecision(7) + " seconds ('-')";
//             const gameTiming = ((currentDate - timeStart) / 1000).toPrecision(
//               7
//             );
//             // const game = {gameTiming, ObjectiveSequence, sortedObjectiveSequence};
//             const game = {
//               gametime: gameTiming,
//               player_name: ObjectiveSequence.toString(),
//               objective_sequence: sortedObjectiveSequence.toString(),
//             };

//             const data = { game };
//             // console.log(gameTimingObject);
//             // console.log(gameTiming);

//             const options = {
//               method: "post",
//               headers: {
//                 "Content-Type": "application/json",
//                 "X-CSRF-Token": document
//                   .querySelector('meta[name="csrf-token"]')
//                   .getAttribute("content"),
//                 Accept: "application/json",
//               },
//               body: JSON.stringify(game),
//             };
//             fetch("/unicorn", options).then(response => {
//               console.log(response);
//               return response.json();
//             }).then(f => {
//               if (f.status == 302) {
//                 window.location.href = '/unicorns';
//               }
//             });

//           }
//         } else {
//           gameSolutionContainer.children[i].style.backgroundColor = "#FA9884";
//           gameSolutionContainer.children[i].value = null;
//         }
//       });
//     }
//   });
// }
