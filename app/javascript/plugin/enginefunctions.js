import { LinkedList } from "plugin/linkedlist";

// This function 'checkNumber' takes n number of random numbers and returns a ascending ordered linkedlist and randomly filled array with the n numbers.
function checkNumber(randomNumber, numberInList, list, biggestListNumber, randomsequence, index) {
  // Case 1
  if (randomNumber == numberInList) {
    list.rightMost = biggestListNumber;
    checkNumber(getRandomCharBetween(65, 91), list.rightMost.data, list, biggestListNumber, randomsequence, index);
  }

  // Case 2 >
  else if (randomNumber > numberInList) {
    list.addElement(randomNumber);
    
    if (biggestListNumber.next == null || biggestListNumber.next == undefined) {
      list.rightMost = biggestListNumber;
    }
    randomsequence[index] = String.fromCharCode(randomNumber);
  }

  // Case 3 <
  else if (randomNumber < numberInList) {
    
    if (list.rightMost.previous === null || list.rightMost.previous === undefined) {
      list.addElementStart(randomNumber);
      list.rightMost = biggestListNumber;
      randomsequence[index] = String.fromCharCode(randomNumber);
    } 
    else {
      list.rightMost = list.rightMost.previous;
      checkNumber(randomNumber, list.rightMost.data, list, biggestListNumber, randomsequence, index);
    }
  }
}

function ObjectiveSequence(size = null) {
  const sequenceList = new LinkedList();
  let count = 0;
  const randomSequence = new Array();

  // Initial check for head
  if (sequenceList.leftMost == null) {
    sequenceList.addElement(getRandomCharBetween(65, 91));
    randomSequence[count] = String.fromCharCode(sequenceList.rightMost.data);
    count++;
  }
  // loop starts for creating a list till given size
  while (count <= size - 1) {
    checkNumber(getRandomCharBetween(65, 91), sequenceList.rightMost.data, sequenceList, sequenceList.rightMost, randomSequence, count);
    count++;
  }
  return [sequenceList, randomSequence];
}

export function gameSequenceSize() {
  return 5;
}

function getRandomCharBetween(startBound, endBound) {
  return Math.floor(Math.random() * (endBound - startBound) + startBound);
}

function compareInput(compareStrInput, sortedSolutionString) {
  if (compareStrInput.toUpperCase() === String.fromCharCode(sortedSolutionString).toUpperCase()) {
    return true;
  } 
  else { 
    return false;
  }
}

function setGoalAndRetain(whereTo, whatTo) {
  whereTo.textContent = whatTo;
  return whatTo;
}

function clearPlatform() {
  let containerOne = document.querySelector(".game-objective");
  let containerTwo = document.querySelector(".game-solution");

  if ((containerOne != null && containerTwo != null)) {
    containerOne.remove();
    containerTwo.remove();
  }
  else if (containerOne != null){
    containerOne.remove();
  }
}


// Sets up the skeleton of the game
function setUpGame(forCase, size) {

  clearPlatform();

  const gameShow = document.querySelector(".game-show-container");
  const objectiveLists = ObjectiveSequence(size);

  if (forCase === "keyup") {

    const parentGameContainer = document.createElement("div");
    const parentGameContainerInput = document.createElement("div");
  
    parentGameContainer.setAttribute("class", "game-objective");
    parentGameContainerInput.setAttribute("class", "game-solution");
  
    gameShow.append(parentGameContainer);
    gameShow.append(parentGameContainerInput);
   
    // Keyboard
    for (let i = 0; i < size; i++) {

      
      if (parentGameContainer != null && parentGameContainerInput != null) {

        parentGameContainer.append(document.createElement("label"));
        parentGameContainer.children[i].setAttribute("class", "character");
        parentGameContainerInput.append(document.createElement("input"));
        parentGameContainerInput.children[i].setAttribute("class", "userInput");
        parentGameContainerInput.children[i].setAttribute("maxlength", 1);
        parentGameContainerInput.children[i].setAttribute("disabled", "true");
        parentGameContainer.children[i].textContent = objectiveLists[1][i].toUpperCase();

        // Set focus for the first input field
        parentGameContainerInput.children[0].removeAttribute("disabled");
        parentGameContainerInput.children[0].focus();        
      }
    }
    return [objectiveLists[0], parentGameContainerInput];
  }

  // Mouse  
  else if (forCase === "click") {

    const parentGameContainerInput = document.createElement("div");
    parentGameContainerInput.setAttribute("class", "game-objective");
    gameShow.append(parentGameContainerInput);

    for (let i = 0; i < size; i++) {

      parentGameContainerInput.append(document.createElement("label"));
      parentGameContainerInput.children[i].setAttribute("class", "character");
      parentGameContainerInput.children[i].value = objectiveLists[1][i];
      parentGameContainerInput.children[i].textContent = parentGameContainerInput.children[i].value;
      
    }
    return [objectiveLists[0], parentGameContainerInput];
  }
}

function restartGame(lastUsedInput, size, intervaID){
  
  const restartButton = document.querySelector('.restart');

  restartButton.addEventListener('click', () => {
    clearInterval(intervaID);
    const objectiveListAndInput = setUpGame(lastUsedInput, size);
    gameLogic(objectiveListAndInput[0], objectiveListAndInput[1], lastUsedInput);

  });
}
function userInputMode() {
  const radioInput = document.querySelectorAll(".radio-button");
  const startGame = document.querySelector(".start-game");
  
  let objectiveListAndInput = null;
  for (let i = 0; i < 2; i++) {
    radioInput[i].children[1].addEventListener("click", () => {
    startGame.style.display = "none";
    objectiveListAndInput = setUpGame(radioInput[i].children[0].value, 6);

    // Start gameLogic
    gameLogic(objectiveListAndInput[0], objectiveListAndInput[1], radioInput[i].children[0].value);
    });
  }
}

function gameLogic(objectiveListSorted, parentGameContainerInput, userInputMode ){

  parentGameContainerInput.after(document.querySelector('.restart'));
  
  // Timer functionality
  const startTime = new Date().getTime();
  const timerContainer = document.querySelector('.time');
  timerContainer.style.display = 'flex';
  let ctime = null;
  const iID = setInterval(() => {
    ctime = (new Date().getTime() - startTime) / 1000;
    timerContainer.textContent = ctime;
  }, 100);



  // Read all the elements for input;
  for (let i = 0; i < parentGameContainerInput.childElementCount; i++) {
    parentGameContainerInput.children[i].addEventListener(userInputMode, function eLogic(e) {

      if (compareInput(e.target.value, objectiveListSorted.leftMost.data) == true){
        e.target.value = e.target.value.toUpperCase();
        e.target.setAttribute('disabled', 'true');
        e.target.style.backgroundColor = 'skyblue';
        e.target.removeEventListener(userInputMode, eLogic);
        objectiveListSorted.leftMost = objectiveListSorted.leftMost.next;
        
        if (i+1 < parentGameContainerInput.childElementCount){

        parentGameContainerInput.children[i+1].removeAttribute('disabled');
        parentGameContainerInput.children[i+1].focus();
        }
        
        // When reached end clear timer.
        if (e.target.value == String.fromCharCode(objectiveListSorted.rightMost.data))  {
          clearInterval(iID);
          // console.log(ctime);
        }
      }

      else {

        e.target.style.backgroundColor = 'red';
        if(userInputMode == 'keyup'){
          e.target.value = '';
        }
      }
    })
    
  }
  
}



// gameLogic();
userInputMode();

// loadingTimer();

// document.addEventListener("turbo:load", () => {
//   setUpGame("mouse", 6);
// });

//

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
//
