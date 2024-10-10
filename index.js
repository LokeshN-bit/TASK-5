const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;

const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const shuffledCards = shuffle([...cards]);
    gameBoard.innerHTML = '';

    shuffledCards.forEach((cardValue, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-card-value', cardValue);
        card.setAttribute('data-index', index);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.innerText = this.getAttribute('data-card-value');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-card-value') === secondCard.getAttribute('data-card-value');
    
    if (isMatch) {
        matchesFound++;
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.classList.remove('flipped');
            secondCard.innerText = '';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
    matchesFound = 0;
    createBoard();
}

restartButton.addEventListener('click', restartGame);
createBoard();
