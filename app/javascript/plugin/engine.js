function gameSequenceSize() {
  return 5;
}

function getRandomCharBetween(startBound, endBound) {
  return String.fromCharCode(
    Math.random() * (startBound - endBound) + endBound
  );
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

// Read parent elements and setup game skeleton
function startGame() {
  let timeStart = 0;
  const gameObjectiveContainer = document.querySelector(".game-objective");
  const gameSolutionContainer = document.querySelector(".game-solution");
  const ObjectiveSequence = [];
  let sortedObjectiveSequence = new Array(gameSequenceSize());
  const startGame = document.querySelector(".start-game");
  let gameCount = 0;
  startGame.addEventListener("click", () => {
    if (gameCount != 0) {
      let elements = gameSequenceSize() - 1;
      while (elements >= 0) {
        gameObjectiveContainer.children[elements].remove();
        gameSolutionContainer.children[elements].remove();
        elements--;
      }
      document.querySelector(".game-heaing").textContent = "Welcome again";
      gameCount = 0;
    }

    for (let i = 0; i < gameSequenceSize(); i++) {
      gameCount++;
      gameObjectiveContainer.append(document.createElement("label"));
      gameSolutionContainer.append(document.createElement("input"));

      // Saves character and sets character
      ObjectiveSequence[i] = setGoalAndRetain(
        gameObjectiveContainer.children[i],
        getRandomCharBetween(65, 90)
      );
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
    for (let i = 0; i < gameSequenceSize(); i++) {
      gameSolutionContainer.children[i].addEventListener("keyup", () => {
        // console.log(compareInput(sortedObjectiveSequence[i],gameSolutionContainer.children[i].value));
        if (
          compareInput(
            sortedObjectiveSequence[i],
            gameSolutionContainer.children[i].value
          )
        ) {
          console.log(gameSolutionContainer.children[i].value);
          gameSolutionContainer.children[i].style.backgroundColor = "#6895D2";
          // gameSolutionContainer.children[i+1].focus();
          if (i < gameSequenceSize() - 1) {
            gameSolutionContainer.children[i + 1].focus();
          }
          if (i == gameSequenceSize() - 1) {
            const currentDate = new Date().getTime();
            //  console.log("Time Taken: " + ((currentDate - timeStart)/1000).toPrecision(7) + " seconds ('-')");
            document.querySelector(".game-heaing").textContent =
              "Time Taken: " +
              ((currentDate - timeStart) / 1000).toPrecision(7) +
              " seconds ('-')";
            // const gameTiming = "Time Taken: " + ((currentDate - timeStart)/1000).toPrecision(7) + " seconds ('-')";
            const gameTiming = ((currentDate - timeStart) / 1000).toPrecision(
              7
            );
            // const game = {gameTiming, ObjectiveSequence, sortedObjectiveSequence};
            const game = {
              gametime: gameTiming,
              player_name: ObjectiveSequence.toString(),
              objective_sequence: sortedObjectiveSequence.toString(),
            };

            const data = { game };
            // console.log(gameTimingObject);
            // console.log(gameTiming);

            const options = {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": document
                  .querySelector('meta[name="csrf-token"]')
                  .getAttribute("content"),
                Accept: "application/json",
              },
              body: JSON.stringify(game),
            };
            fetch("/unicorn", options).then(response => {
              console.log(response);
              return response.json();
            }).then(f => {
              if (f.status == 302) {
                window.location.href = '/unicorns';
              }
            });
              
          }
        } else {
          gameSolutionContainer.children[i].style.backgroundColor = "#FA9884";
          gameSolutionContainer.children[i].value = null;
        }
      });
    }
  });
}

startGame();
