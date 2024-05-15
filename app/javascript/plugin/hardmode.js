import { gameLogic, timer, setUpGame, ObjectiveSequence, clearPlatform, showUserScore } from 'plugin/enginefunctions';

export function getRandomCharBetween(startBound, endBound, caseFor) {
  const randomNumber = Math.floor(Math.random() * (endBound - startBound) + startBound);
  // console.log(caseFor);
  // return randomNumber;
  if (caseFor == 'normal') {
    return randomNumber;
  }
  else if (caseFor == 'hard') {
    if ((randomNumber > 64 && randomNumber < 91) || (randomNumber > 96 && randomNumber < 123)) {
      return randomNumber;
    }
    else {
      return getRandomCharBetween(startBound, endBound, caseFor);
    }
  }
}


// Computes win state for player
function calculateGameLogicHardMode(gridContainer, sortedSolutionString, timerID, mode) {

  gridContainer.addEventListener('click', function elogic(e) {
    if (compareInputHardMode(e.target.value, sortedSolutionString.leftMost.data) == true) {
      e.target.style.backgroundColor = 'lightskyblue';
      e.target.style.pointerEvents = 'none';
      
      sortedSolutionString.leftMost = sortedSolutionString.leftMost.next;
      if (sortedSolutionString.leftMost == null) {
        console.log('end:', timerID);
        clearInterval(timerID);
        showUserScore();
        const data = {game: {gametime: document.querySelector('.time').dataset.timetaken, mode: mode}};
        pushToServer(data);
      }
    }
    else if (e.target.value !== undefined) {
      e.target.style.backgroundColor = 'lightcoral';
    }
  })
}


// Compares user input with goal sequence
function compareInputHardMode(compareStrInput, sortedSolutionString) {
  if (compareStrInput === String.fromCharCode(sortedSolutionString)) {
    return true;
  }
  else {
    return false;
  }
}


// Sets up basic game structure
function setUpskeltonElementsHardMode(cellValues, size) {

  const gameShow = document.querySelector(".game-show-container");
  const gridContainer = document.createElement('div');

  gridContainer.setAttribute('class', 'grid-container');
  gameShow.append(gridContainer);
  // 4 * 4 
  for (let i = 0; i < size; i++) {
    // Create first row
    const row = document.createElement('div');
    row.setAttribute('class', 'hard-mode-row');

    gridContainer.append(row);

    for (let j = 0; j < Math.sqrt(size); j++) {
      row.append(document.createElement('div'));
      row.children[j].setAttribute('class', 'hard-mode-cell');
      row.children[j].value = cellValues[i + j];
      row.children[j].textContent = row.children[j].value;

      if (j == Math.sqrt(size) - 1) {
        i = i + j;
      }
    }
  }
  return gridContainer;
}


// Clears any existing grid/ DOM elements
function clearGrid() {
  const gridContainer = document.querySelector('.grid-container');
  if (gridContainer != null) {
    gridContainer.remove();
  }

}


// callback function for Radiobutton events : computes required unordered array and sorted linked lists according to mode: (hard / normal)
function gameModes(startGame, mode, radioInput) {
  startGame.style.display = "none";

  if (mode == 'normal') {
    clearGrid();
    clearPlatform();
    const objectiveListAndInput = setUpGame(radioInput, 6, mode);
    gameLogic(objectiveListAndInput[0], objectiveListAndInput[1], radioInput, mode);
  }
  else if (mode == 'hard') {
    clearGrid();
    clearPlatform();
    const objectiveListAndInput = ObjectiveSequence(16, 65, 123, mode);
    let timerID = timer();
    console.log('start id:', timerID);
    const gridContainer = setUpskeltonElementsHardMode(objectiveListAndInput[1], 16, mode);
    calculateGameLogicHardMode(gridContainer, objectiveListAndInput[0], timerID, mode);
  }
}

// For removing events on radioinputs
// function radioInputCallBack(){

// }

// Adds event listeners to radio labels and calls radioInputCallBack
export function userInputMode() {
  // removeRadioInputEvents();
  const radioInput = document.querySelectorAll(".radio-button");
  const startGame = document.querySelector(".start-game");

  if (startGame.dataset.clickstate === 'not-clicked' || startGame.dataset.clickstate === 'mode') {
    console.log(startGame.dataset.clickstate);
    startGame.dataset.clickstate = 'clicked';

    for (let i = 0; i < 2; i++) {
      radioInput[i].children[0].addEventListener("click", function elogic() {
        hideToggleMode();
        const mode = document.querySelector('.mode').dataset.mode;
        console.log(mode, 'userinput');
        // startGame.dataset.clickstate = 'clicked';
        gameModes(startGame, mode, radioInput[i].children[0].dataset.input);
        radioInput[i].children[0].removeEventListener('click', elogic);
      });
    }
  }
}

function hideToggleMode(){
  document.querySelector('.mode').style.display = 'none';
}

// To remove already existing events on radio buttons
// function removeRadioInputEvents(){

// }


// Function to change game mode to hard or normal 
function toggleMode() {
  const modeChangeButton = document.querySelector('.mode');
  const startGame = document.querySelector('.start-game');
  // Run normal mode first time by default
  userInputMode();

  // Change text title to show current mode
  modeChangeButton.textContent = 'Mode: Normal';


  // Add click event to mode change button
  modeChangeButton.addEventListener('click', (e) => {

    if (e.target.dataset.mode === 'normal') {
      modeChangeButton.classList.replace('normal-mode', 'hard-mode');
      startGame.dataset.clickstate = 'mode';
      modeChangeButton.textContent = 'Mode: Hard';
      e.target.dataset.mode = 'hard';
    }
    else if (e.target.dataset.mode === 'hard') {
      modeChangeButton.classList.replace('hard-mode', 'normal-mode');
      startGame.dataset.clickstate = 'mode';
      modeChangeButton.textContent = 'Mode: Normal';
      e.target.dataset.mode = 'normal';
    }
  });
}

export function pushToServer(data){

  fetch('/unicorn', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: JSON.stringify(data),
  });
}


document.addEventListener("turbo:load", () => {
  toggleMode();
});