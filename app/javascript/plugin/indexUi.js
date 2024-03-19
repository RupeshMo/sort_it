// const mainElement = document.querySelector("body");
// // console.log(mainElement.childElementCount);
// for (let i = 0; i < (1920 / 100) * 5; i++) {
//   mainElement.append(document.createElement("div"));
//   mainElement.children[i].setAttribute("class", "customPixelColumn");
//   for (let j = 0; j < (1080 / 100) * 5; j++) {
//     mainElement.children[i].append(document.createElement("div"));
//     mainElement.children[i].children[j].setAttribute("class", "customPixel");
//   }
// }


// function randomIndexGenerator() {
//   let indexes = [];
//   indexes[0] = Math.floor((Math.random() * 96));
//   indexes[1] = Math.floor((Math.random() * 56));
//   return indexes;
// }

// // console.log(randomIndexGenerator());


// function randomColorGenerator() {
//   let rgb = [];
//   rgb[0] = Math.floor((Math.random() * 256));
//   rgb[1] = Math.floor((Math.random() * 256));
//   rgb[2] = Math.floor((Math.random() * 256));
//   return rgb;
// }

// setInterval(() => {
  
//   mainElement.children[randomIndexGenerator()[0]].children[randomIndexGenerator()[1]].style.backgroundColor = "rgb(" + randomColorGenerator()[0] + "," + randomColorGenerator()[1] + "," + randomColorGenerator()[2];
//   mainElement.children[randomIndexGenerator()[0]].children[randomIndexGenerator()[1]].style.borderRadius = '20px';

// }, 1000);

const howTo = document.querySelector('.how-to');
// howTo.append(document.createElement('button'));

