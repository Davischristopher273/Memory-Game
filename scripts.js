const cards = document.querySelectorAll('.memory-card');
const gameContainer = document.getElementById("game");
const buttons = document.querySelector("#buttons");
const scoreContainer = document.querySelector("#score");
const highScoreContainer = document.querySelector("#highScore");

let clickCount = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let highScore = localStorage.getItem("highScore");
let matches = 0;


if (!highScore) {
  highScore = 0;
}
highScoreContainer.innerText = " " + highScore;
scoreContainer.innerText = "  " + score;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    
    hasFlippedCard = true;
    firstCard = this;

    return;
  }


  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));