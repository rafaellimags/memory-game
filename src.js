
loadCards = function () {

    for (let i = 1; i <= 12; i++) {

        const card = document.createElement("div")
        card.setAttribute("class", "flip-card")
        document.body.appendChild(card)

        const cardInner = document.createElement("div")
        cardInner.setAttribute("id", `card${i}`)
        cardInner.setAttribute("class", "flip-card-inner")
        cardInner.setAttribute("onclick", "flip(this)")
        card.appendChild(cardInner)

        const cardFront = document.createElement("div")
        cardFront.setAttribute("class", "flip-card-front")
        const cardBack = document.createElement("div")
        cardBack.setAttribute("class", "flip-card-back")
        cardInner.appendChild(cardFront)
        cardInner.appendChild(cardBack)

        const cardFrontImg = document.createElement("div")
        cardFrontImg.setAttribute("class", "card-img card-front-img")
        const cardBackImg = document.createElement("div")
        cardBackImg.setAttribute("class", "card-img card-back-img")
        cardFront.appendChild(cardFrontImg)
        cardBack.appendChild(cardBackImg)

        localStorage.clear()

    }
}()


function flip(elem) {
    elem.style.transform = 'rotateY(180deg)'
    const imgUrl = getComputedStyle(elem.querySelector(".flip-card-back").children.item(0)).backgroundImage
    // const imgName = imgUrl.split("/").pop().split(".").shift()
    const rotated = []

    document.querySelectorAll(".flip-card-inner").forEach(elem => {
        if (elem.style.transform === 'rotateY(180deg)') rotated.push(elem.id) 
    })

    // const imgName = rotated.map(card => {
    //    return getComputedStyle(card.querySelector(".flip-card-back").children.item(0)).backgroundImage
    // })//.join("").split("/").pop().split(".").shift()

    console.log(rotated)

    /* USAR LOCAL STORAGE PARA GUARDAR PONTUAÇÃO */

    // for (let i = 0; i <= localStorage.length; i++) {
    //     if (localStorage.getItem(localStorage.key(i)) === imgName) {
    //         alert("Iguais!")
    //         localStorage.setItem("score")
    //     } else {
    //         elem.style.transform = 'rotateY(0deg)'
    //     }
    // }

    // localStorage.setItem(elem.id, imgName)
}