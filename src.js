const cards = document.querySelectorAll('.memory-card')
localStorage.clear()
let flippedAmount = 0
let firstCard
let secondCard
let score = 0
let multiplier = 1

function flipCard() {

    countFlipped()

    if(moreThanTwo()) return

    this.classList.add('flip')

    getFlipped(this)

    if (flippedAmount == 2) {
        firstCard.dataset.image === secondCard.dataset.image
            ? lockEquals()
            : unflipCards()
    }
}

function countFlipped() {
    flippedAmount++
}

function moreThanTwo() {
    if (flippedAmount > 2) return true
}

function getFlipped(card) {
    if (flippedAmount < 2) {
        firstCard = card
    } else {
        secondCard = card
    }
}

function lockEquals() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    setScore()
    flippedAmount = 0
}

function setScore() {
    localStorage.setItem('score', score += 10 * multiplier)
    multiplier++
    console.log(localStorage);
}

function unflipCards() {
    flippedAmount = 2
    removeMultiplier()
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        flippedAmount = 0
    }, 1500)
}

function removeMultiplier() {
    multiplier = 1
}

(function shuffle() {
    document.querySelectorAll(".memory-card").forEach(card => {
        card.style.order = Math.floor(Math.random() * 12)
    });
})()

cards.forEach(card => card.addEventListener('click', flipCard))