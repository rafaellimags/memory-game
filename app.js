const selectElement = selector => document.querySelector(selector)
const selectNode = selector => document.querySelectorAll(selector)

localStorage.setItem('score', 0)

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

const waitForShuffle = () => setTimeout(shuffle, 5000);

const waitForClick = () => setTimeout(addClickEvent, 5500)

const imagesPromise = generateImagesPromises()

Promise.all(imagesPromise)
    .then(insertImagesIntoCards)
    .then(genereateHTML)
    .then(previewCards)
    .then(waitForShuffle)
    .then(waitForClick)


const createClock = (min = 0, sec = 0, start = true) => ({
    min,
    sec,
    start
})

const countFlip = () => {
    let flips = 0
    return {
        incrementFlip: () => ++flips,
        getFlipCount: () => flips,
        resetCount: () => flips = 0,
        setCount: (quantity) => flips = quantity
    }
}

const getFlippedCards = (cardName, cardValue) => ({ [cardName]: cardValue })

function countScore() {
    let score = 0
    let multiplier = 1
    return {
        increaseScore: () => localStorage.setItem('score', score += 10 * (multiplier++)),
        resetMultiplier: () => multiplier = 1,
        getScore: () => localStorage.getItem('score')
    }
}

const flipper = countFlip()
const clock = createClock()
let flippedCard

function flipCard() {

    flippedCard = {
        ...flippedCard,
        ...getFlippedCards(`card${flipper.getFlipCount() + 1}`, this)
    }

    if (flipper.getFlipCount() == 0 || flippedCard.card1 != flippedCard.card2) flipper.incrementFlip()
    if (flipper.getFlipCount() > 2) return
    if (clock.start) countTime()

    clock.start = false

    this.classList.add('flip')

    matchCards()
}

function matchCards() {
    if (flipper.getFlipCount() == 2 && flippedCard.card1 != flippedCard.card2) {
        flippedCard.card1.dataset.image === flippedCard.card2.dataset.image
            ? lockEquals()
            : unflipCards()
    }
}

const score = countScore()

function lockEquals() {
    flippedCard.card1.removeEventListener('click', flipCard)
    flippedCard.card2.removeEventListener('click', flipCard)
    score.increaseScore()
    flipper.resetCount()
    writeScore()
}

function unflipCards() {
    flipper.setCount(2)
    resetMultiplier()
    setTimeout(() => {
        flippedCard.card1.classList.remove('flip')
        flippedCard.card2.classList.remove('flip')
        flipper.resetCount()
    }, 1500)
}

function resetMultiplier() {
    score.resetMultiplier()
}

function shuffle() {
    document.querySelectorAll(".memory-card").forEach(card => {
        card.style.order = Math.floor(Math.random() * 12)
    });
};

function writeScore() {
    selectElement('.total-score').innerText = `Total Score ${score.getScore()}`
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

    clock.sec++

    if (clock.sec > 59) {
        clock.min++
        clock.sec = 0
    }

    if (Number(clock.sec) < 10) {
        clock.sec = '0' + clock.sec
    }

    return `Tempo total: ${clock.min}:${clock.sec}`
}