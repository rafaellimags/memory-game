const cards = document.querySelectorAll('.memory-card')
let scoreBoard = document.querySelector('.total-score')
let timeBoard = document.querySelector('.total-time')

localStorage.clear()

let flippedAmount = 0
let firstCard
let secondCard
let score = 0
let multiplier = 1
let min = 0
let sec = 0
let triggerClock = true

function flipCard() {

    countFlipped()

    if(flippedAmount > 2) return

    if (triggerClock) countTime()

    triggerClock = false

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
})();

function getScore() {
    scoreBoard.innerText = `Total Score ${localStorage.getItem('score')}`
}

function setScore() {
    multiplier++
    localStorage.setItem('score', score += 10 * multiplier)
    getScore()
}

function hasFinished() {
    const cardList = [...document.querySelectorAll('.memory-card')]
    return cardList.every(card => {
       return card.classList.contains('flip')
    })
}

function countTime() {

    let time = handleTimeFormat()

    timeBoard.innerText = time
    setTimeout(() => {
        if (hasFinished()) return
        countTime()
    }, 1000);
}

function handleTimeFormat() {
    sec++

    if (sec > 59) {
        min++
        sec = 0
    }

    if (Number(sec) < 10) {
        sec = '0' + sec
    }

    return `Tempo total: ${min}:${sec}`
}

cards.forEach(card => card.addEventListener('click', flipCard))