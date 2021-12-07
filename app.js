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


const startClock = (min = 0, sec = 0, state = true) => ({
    min,
    sec,
    start: state,
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

const watchFlippedCards = () => {
    const cards = {}
    return {
        setCard: (cardName, cardValue) => cards[cardName] = cardValue,
        getCard: (cardName) => cards[cardName]
    }
}

const countScore = () => {
    let score = 0
    let multiplier = 1
    return {
        increaseScore: () => localStorage.setItem('score', score += 10 * (multiplier++)),
        resetMultiplier: () => multiplier = 1,
    }
}

function flipCard() {

    flippedCard.setCard(`card_${flipper.getFlipCount() + 1}`, this)

    if (flipper.getFlipCount() == 0 || flippedCard.getCard('card_1') != flippedCard.getCard('card_2')) flipper.incrementFlip()
    if (flipper.getFlipCount() > 2) return
    if (clock.start) countTime()
    clock.start = false
    this.classList.add('flip')


    if (flipper.getFlipCount() == 2 && flippedCard.getCard('card_1') != flippedCard.getCard('card_2')) {
        flippedCard.getCard('card_1').dataset.image === flippedCard.getCard('card_2').dataset.image
            ? lockEquals()
            : unflipCards()
    }
}

function lockEquals() {
    flippedCard.getCard('card_1').removeEventListener('click', flipCard)
    flippedCard.getCard('card_2').removeEventListener('click', flipCard)
    score.increaseScore()
    flipper.resetCount()
    writeScore()
}

function unflipCards() {
    flipper.setCount(2)
    resetMultiplier()
    setTimeout(() => {
        flippedCard.getCard('card_1').classList.remove('flip')
        flippedCard.getCard('card_2').classList.remove('flip')
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
    selectElement('.total-score').innerText = `Total Score ${localStorage.getItem('score')}`
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

const flipper = countFlip()
const flippedCard = watchFlippedCards()
const score = countScore()
const clock = startClock()