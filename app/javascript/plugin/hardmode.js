// import { checkNumber } from 'plugin/enginefunctions';
import { LinkedList } from 'plugin/linkedlist';
import { userInputMode } from 'plugin/enginefunctions';
import { ObjectiveSequence } from 'plugin/enginefunctions';

function getRandomCharBetween(startBound, endBound) {
  const randomNumber = Math.floor(Math.random() * (endBound - startBound) + startBound);
    if ((randomNumber < 91 && randomNumber > 64) || (randomNumber > 96 && randomNumber < 123)) {
      console.log(randomNumber, ` :${String.fromCharCode(randomNumber)}`);
      return randomNumber;
    }
    else {
      getRandomCharBetween(startBound, endBound);
    }
}



function compareInputHardMode(compareStrInput, sortedSolutionString){
  if (compareInput === String.fromCharCode(sortedSolutionString)){
    return true;
  }
  else {
    return false;
  }
}

function setUpskeltonElementsHardMode(cellValues, size){

  const gameShow = document.querySelector(".game-show-container");

  // 4 * 4 
  for (let i = 0; i < size; i++){
    // Create first row
    const row = document.createElement('div');
    row.setAttribute('class', 'hard-mode-row');

    gameShow.append(row);

    for(let j = 0; j < Math.sqrt(size); j++) {
      row.append(document.createElement('div'));
      row.children[j].setAttribute('class', 'hard-mode-cell');
      row.children[j].value = cellValues[i+j];
      row.children[j].textContent = row.children[j].value;

      if (j == Math.sqrt(size)-1){
        i = i + (j+1);
      }
    }
  }
}

