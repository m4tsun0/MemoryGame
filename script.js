const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function viraCarta() {
    if(lockBoard) return; // Impede que as outras cartas sejam viradas antes das outras desvirarem;
    if(this === firstCard) return;

    this.classList.add('flip'); // Adiciona apenas uma vez;
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false; // Reseta a função;
    checkForMath(); // Função que verifica se as cartas são iguais;
};

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) { // Verifica se as cartas são iguais;
        disableCards();
        return;
    } else {
        unflipCards();
    };
};

function disableCards() { // Função que vira as cartas;
    firstCard.removeEventListener('click', viraCarta);
    secondCard.removeEventListener('click', viraCarta);

    resetBoard();
};

function unflipCards() {
    lockBoard = true; // Isso impede do jogo bugar;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
};

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

(function shuffle() { // Embaralha as cartas;
    cards.forEach((card) => {
        let posicao = Math.floor(Math.random() * 12);
        card.style.order = posicao;
    });
})(); // Função imediata;

cards.forEach((card) => {
    card.addEventListener('click', viraCarta);
});