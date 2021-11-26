/* Flipping card */
const cards = document.querySelectorAll('.memory-card')

let flippedCards = 0
let firstCard
let secondCard

function flipCard() {
    // count flipped amt
    flippedCards++

    // block board
    if (flippedCards > 2) return

    this.classList.add('flip')

    // get images
    if (flippedCards < 2) {
        firstCard = this
    } else {
        secondCard = this
    }

    if(flippedCards == 2) {
        // match images
        if (firstCard.dataset.image === secondCard.dataset.image) {
            // remove click
            firstCard.removeEventListener('click', flipCard)
            secondCard.removeEventListener('click', flipCard)
            flippedCards = 0
            // return true
        } else {
            flippedCards = 2
            setTimeout(() => {
                firstCard.classList.remove('flip')
                secondCard.classList.remove('flip')
                flippedCards = 0
            }, 1500)
        }
    }

}

cards.forEach(card => card.addEventListener('click', flipCard))