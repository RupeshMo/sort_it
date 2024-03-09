// Lets first capture parent element from a file

// Main container for game objective. i.e. the string to be sorted. It will be inside the game-objective container
const gameObjectiveContainer = document.querySelector(".game-objective");
const forArra = [15];
const forArra2 = [15];
function getRandomNumber(max, min){
  // return Math.floor(Math.random() * num);
  return Math.random() * (max - min) + min;

  }

for (let i = 0 ; i < 15; i++) {
  forArra[i] = String.fromCharCode(getRandomNumber(65,91 ));
}


console.log(forArra.toString());
console.log(String.fromCharCode(90));
// console.log(getRandomNumber(15));
for (let i = 0; i < 15 ; i++){
  gameObjectiveContainer.append(document.createElement('div'));
  gameObjectiveContainer.children[i].setAttribute("class", "character");
  gameObjectiveContainer.children[i].textContent = String.fromCharCode(getRandomNumber(65, 90));



}