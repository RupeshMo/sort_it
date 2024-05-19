import { LinkedList } from "plugin/linkedlist";
import { getRandomCharBetween, pushToServer, showPromptName} from "plugin/hardmode";

// This function 'checkNumber' takes n number of random numbers and returns a ascending ordered linkedlist and randomly filled array with the n numbers.
export function checkNumber(randomNumber, numberInList, list, biggestListNumber, randomsequence, index, caseFor, startBound, endBound) {

  // Case 1
  if (randomNumber == numberInList) {
    list.rightMost = biggestListNumber;
    checkNumber(getRandomCharBetween(startBound, endBound, caseFor), list.rightMost.data, list, biggestListNumber, randomsequence, index, caseFor, startBound, endBound);
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
    } else {
      list.rightMost = list.rightMost.previous;
      checkNumber(randomNumber, list.rightMost.data, list, biggestListNumber, randomsequence, index, caseFor, startBound, endBound);
    }
  }
}

export function ObjectiveSequence(size, startBound, endBound, caseFor) {
  const sequenceList = new LinkedList();
  let count = 0;
  const randomSequence = new Array();

  // Initial check for head
  if (sequenceList.leftMost == null) {
    sequenceList.addElement(getRandomCharBetween(startBound, endBound, caseFor));
    randomSequence[count] = String.fromCharCode(sequenceList.rightMost.data);
    count++;
  }
  // loop starts for creating a list till given size
  while (count <= size - 1) {
    checkNumber(getRandomCharBetween(startBound, endBound, caseFor), sequenceList.rightMost.data, sequenceList, sequenceList.rightMost, randomSequence, count, caseFor, startBound, endBound);
    count++;
  }
  return [sequenceList, randomSequence];
}

export function gameSequenceSize() {
  return 5;
}

// function getRandomCharBetween(startBound, endBound) {
//   return Math.floor(Math.random() * (endBound - startBound) + startBound);
// }



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

export function clearPlatform() {
  let containerOne = document.querySelector(".game-objective");
  let containerTwo = document.querySelector(".game-solution");

  if (containerOne != null && containerTwo != null) {
    containerOne.remove();
    containerTwo.remove();
  }
  else if (containerOne != null) {
    containerOne.remove();
  }
}

function setUpskeltonElements(parentGameContainerInput, size, containerValue, forCase, gameShow, parentGameContainer = null) {
  console.log(forCase);
  if (forCase == 'keyup') {

    console.log('parentGameContainerInput');

    const parentGameContainer = document.createElement("div");

    parentGameContainer.setAttribute("class", "game-objective");
    parentGameContainerInput.setAttribute("class", "game-solution");

    gameShow.append(parentGameContainer);
    gameShow.append(parentGameContainerInput);
    for (let i = 0; i < size; i++) {
      if (parentGameContainer != null && parentGameContainerInput != null) {
        parentGameContainer.append(document.createElement("label"));
        parentGameContainer.children[i].setAttribute("class", "character");
        parentGameContainerInput.append(document.createElement("input"));
        parentGameContainerInput.children[i].setAttribute("class", "userInput");
        parentGameContainerInput.children[i].setAttribute("maxlength", 1);
        parentGameContainerInput.children[i].setAttribute("disabled", "true");
        parentGameContainer.children[i].textContent = containerValue[i].toUpperCase();

        // Set focus for the first input field
        parentGameContainerInput.children[0].removeAttribute("disabled");
        parentGameContainerInput.children[0].focus();
      }
    }
  }
  else if (forCase == 'click') {
    console.log('parentGameContainerInput');
    for (let i = 0; i < size; i++) {
      parentGameContainerInput.setAttribute("class", "game-objective");
      gameShow.append(parentGameContainerInput);

      parentGameContainerInput.append(document.createElement("label"));
      parentGameContainerInput.children[i].setAttribute("class", "character");
      parentGameContainerInput.children[i].value = containerValue[i];
      parentGameContainerInput.children[i].textContent = parentGameContainerInput.children[i].value;
    }
  }
}
;
// objectiveLists[1][i]
// Sets up the skeleton of the game
export function setUpGame(forCase, size, caseFor) {
  clearPlatform();

  const gameShow = document.querySelector(".game-show-container");
  const objectiveLists = ObjectiveSequence(size, 65, 91, caseFor);
  // console.log(objectiveLists);
  const parentGameContainerInput = document.createElement("div");
  // console.log(objectiveLists[1]);
  setUpskeltonElements(parentGameContainerInput, size, objectiveLists[1], forCase, gameShow);
  return [objectiveLists[0], parentGameContainerInput];
}


function checkValidKey(key) {
  console.log(key.charCodeAt(), 'D');
  if ((key.charCodeAt() >= 65 && key.charCodeAt() < 91) || (key.charCodeAt() >= 97 && key.charCodeAt() < 123)) {
    return true;
  }
  else return false;
}


function restartGame(previousUsedInputMode, size, intervalId, mode) {
  document.querySelector('.prompt-container').style.display = 'none';
  console.log(previousUsedInputMode, size, intervalId);
  const restartButton = document.querySelector('.restart');
  restartButton.style.display = 'flex';

  restartButton.addEventListener('click', function elogic(e) {
    clearInterval(intervalId);

    const gameLogicData = setUpGame(previousUsedInputMode, size, mode);
    gameLogic(gameLogicData[0], gameLogicData[1], previousUsedInputMode, mode);
    restartButton.removeEventListener('click', elogic);
  });
}



export function timer(iID = null) {
  console.log(console.trace('timer: ', iID));
  const startTime = new Date().getTime();
  const timerContainer = document.querySelector('.time');
  timerContainer.style.display = "flex";
  timerContainer.style.fontSize = '20px';
  timerContainer.style.margin = 'initial';
  let currentTime = null;

  iID = setInterval(() => {
    // console.log('inter: ', iID);

    currentTime = (new Date().getTime() - startTime) / 1000;
    timerContainer.textContent = currentTime.toPrecision(4);
    timerContainer.dataset.timetaken = currentTime;

  }, 1);
  return iID;

}

export function showUserScore() {
  const timerContainer = document.querySelector('.time');
  timerContainer.style.fontSize = '4rem';
  timerContainer.style.margin = '8px';
}

export function gameLogic(objectiveListSorted, parentGameContainerInput, userInputModes, mode) {
  parentGameContainerInput.after(document.querySelector(".game-button-group"));

  //Timer
  let id = timer();

  // Restart game function
  restartGame(userInputModes, parentGameContainerInput.childElementCount, id, mode);

  // Read all the elements for input;
  for (let i = 0; i < parentGameContainerInput.childElementCount; i++) {
    parentGameContainerInput.children[i].addEventListener(userInputModes, function eLogic(e) {
      if (compareInput(e.target.value, objectiveListSorted.leftMost.data) == true) {

        e.target.value = e.target.value.toUpperCase();
        e.target.setAttribute("disabled", "true");
        console.log(e.target);
        e.target.style.backgroundColor = "#7AB2B2";
        e.target.removeEventListener(userInputModes, eLogic);
        objectiveListSorted.leftMost = objectiveListSorted.leftMost.next;

        if (i + 1 < parentGameContainerInput.childElementCount) {
          parentGameContainerInput.children[i + 1].removeAttribute("disabled");
          parentGameContainerInput.children[i + 1].focus();
        }

        // When reached end clear timer.
        if (e.target.value == String.fromCharCode(objectiveListSorted.rightMost.data)) {
          clearInterval(id);
          showUserScore();
          showPromptName(document.querySelector('.time').dataset.timetaken, mode);
          // let current_player = showPromptName();
          // console.log(current_player);
          // // console.log(id[1], 'id[1]');
          // const data = { game: {gametime: document.querySelector('.time').dataset.timetaken, mode: mode}};
          // pushToServer(data);
          parentGameContainerInput.nextSibling.focus();
        }
      }
      else  {
        e.target.style.backgroundColor = "#FF6500";
        if (userInputModes == "keyup") {
          e.target.value = "";
        }
      }
    });
  }
}




// document.addEventListener("turbo:load", () => {
//   userInputMode('normal', 6, 65, 91);
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
