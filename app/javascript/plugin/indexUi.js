console.log('indexUj: loaded');
// Add a click event on how-to-play-button to set-up-description
function showDescription() {
  // Read and store the how-to-play-button 
  const howToPlayButton = document.querySelector('.how-to-play-button');
  const gameShowContainer = document.querySelector('.game-show-container');

  if (howToPlayButton != null){
  howToPlayButton.addEventListener('click', () => {
    gameShowContainer.style.display = 'none';

    const setUp = document.querySelector('.set-up-description');
    setUp.style.display = 'flex';
  })
}}

function closeDescription() {
  const closeButton = document.querySelector('.close-description');

  if (closeButton != null) {
  closeButton.addEventListener('click', () => {

    const setUp = document.querySelector('.set-up-description');
    const gameShowContainer = document.querySelector('.game-show-container');

    setUp.style.display = 'none';
    gameShowContainer.style.display = 'flex';
  })
  }
}

document.addEventListener('turbo:load', () => {
  showDescription();
  closeDescription();
});
