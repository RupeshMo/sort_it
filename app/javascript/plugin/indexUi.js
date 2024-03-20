function descriptionButton() {
  // Read the button
  const descriptionTrigger = document.querySelector('.how-to-play');
  descriptionTrigger.addEventListener('click', () => {
    // hide other two buttons, combine with description body.
    const toHide = document.querySelector('.how-to');
    toHide.children[0].style.display = 'none';
    toHide.children[1].style.display = 'none';  

    // Append description to  descriptionTrigger and unhide
    descriptionTrigger.appendChild(document.querySelector('.how-to-description'));
    descriptionTrigger.children[1].style.setProperty('display', 'flex');
    
    // Turn on close button
    document.querySelector('.close').style.setProperty('display', 'initial');
  });
}

descriptionButton();


// const close = document.querySelector('.close');
// close.addEventListener('click', () => {
//   const howTo = document.querySelector('.how-to');
//    let a = 0; 
//    while (a != 3){  
//   howTo.children[a].style.border = '2px dashed deeppink ';
//   a++;
//    }
// })


// howTo.children[1].removeAttribute('class');

// howTo.append(document.createElement('div'));















































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

