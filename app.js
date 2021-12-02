
const selectElement = selector => document.querySelector(selector)
const selectNode = selector => document.querySelectorAll(selector)

localStorage.setItem('score', 0)

let flippedAmount = 0
let firstCard
let secondCard
let score = 0
let multiplier = 1
let min = 0
let sec = 0
let triggerClock = true

const createMemoryCard = (imgName, imgSrc) => `
    <div class="memory-card" data-image="${imgName}">
        <img class="front-face" src="${imgSrc}" alt="">
        <img class="back-face" src="img/back-face-card.png" alt="Question mark badge">
    </div>`.repeat(2)

const createProgressBoard = () => `
    <div class="score-board">
        <span class="total-score">Pontuação: 0</span>
        <span class="total-time">Tempo total: 0:00</span>
    </div>`

const getImgUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generateRandomIds = () => Math.ceil(Math.random() * 100)

const generateImagesPromises = () => Array(6).fill().map(() =>
    fetch(getImgUrl(generateRandomIds())).then(image => image.json()))

const insertImagesIntoCards = images => {
    return images.reduce((accumulator, elem) => {
        return accumulator += createMemoryCard(elem.name, elem.sprites.other['official-artwork'].front_default)
    }, '')
}
const genereateHTML = memoryCards => {
    selectElement('.memory-game').innerHTML = memoryCards
    selectElement('.score').innerHTML = createProgressBoard()
}

const addClickEvent = () => {
    selectNode('.memory-card').forEach(card => card.addEventListener('click', flipCard))
}

const previewCards = (isVisible = true, timer = 1000) => {
    setTimeout(() => {
        selectNode('.memory-card').forEach(card => {
            !card.classList.contains('flip')
                ? card.classList.add('flip')
                : card.classList.remove('flip')

        })
        if (!isVisible) return
        previewCards(false, 3000)
    }, timer);
}

const waitForShuffle = () => {
    setTimeout(shuffle, 5000);
}

const imagesPromise = generateImagesPromises()

Promise.all(imagesPromise)
    .then(insertImagesIntoCards)
    .then(genereateHTML)
    .then(previewCards)
    .then(waitForShuffle)
    .then(addClickEvent)

function flipCard() {

    countFlipped()
    if (flippedAmount > 2) return
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

function shuffle() {
    document.querySelectorAll(".memory-card").forEach(card => {
        card.style.order = Math.floor(Math.random() * 12)
    });
};

function getScore() {
    selectElement('.total-score').innerText = `Total Score ${localStorage.getItem('score')}`
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

    selectElement('.total-time').innerText = time
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
