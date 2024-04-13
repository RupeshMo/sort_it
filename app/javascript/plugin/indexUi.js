// Add a click event on how-to-play-button to set-up-description
function showDescription() {
  // Read and store the how-to-play-button 
  const howToPlayButton = document.querySelector('.how-to-play-button');
  const gameNavigation = document.querySelector('.game-navigation');

  console.log(howToPlayButton);
  console.log(document.querySelector('.how-to-play-button'));

  if (howToPlayButton != null){
  howToPlayButton.addEventListener('click', () => {
    // Hide all buttons 
    const btns = document.querySelectorAll('.btn');
    btns[0].style.display = 'none';
    btns[1].style.display = 'none';
    btns[2].style.display = 'none';

    const setUp = document.querySelector('.set-up-description');
    const closeButton = document.querySelector('.close-description');
    const toAppendList = document.querySelector('.description-list');

    setUp.append(closeButton);
    setUp.append(toAppendList);

    toAppendList.classList.add('flex-direction-setup');

    closeButton.style.display = 'flex';
    toAppendList.style.display = 'flex';
    
    
  })

}
else {
  console.log(document.querySelector('.how-to-play-button'));
}
}

function closeDescription() {
  const closeButton = document.querySelector('.close-description');

  if (closeButton != null) {
  closeButton.addEventListener('click', () => {

    const setUp = document.querySelector('.set-up-description');
    const closeButton = document.querySelector('.close-description');
    const toAppendList = document.querySelector('.description-list');
    const gameNavigation = document.querySelector('.game-navigation');

    gameNavigation.append(toAppendList);
    gameNavigation.append(closeButton);
    // setUp.remove(toAppendList);

    closeButton.style.display = 'none';
    toAppendList.style.display = 'none';
    
    const btns = document.querySelectorAll('.btn');
    btns[0].style.display = 'flex';
    btns[1].style.display = 'flex';
    btns[2].style.display = 'flex';
    // console.log(btns);
   

    console.log(gameNavigation);
    
  })
  }
 

}
// if (document.readyState == 'interactive'){
document.addEventListener('turbo:load', () => {
  console.log(document.readyState); 
  console.log('hi');
  showDescription();
  closeDescription();
}) 
// }