for (let i = 1; i <= 12; i++) {

    let flip = document.createElement("div")
    flip.setAttribute("class", "flip-card")
    flip.setAttribute("id", `card${i}`)
    document.body.appendChild(flip)

    let flipInner = document.createElement("div")
    flipInner.setAttribute("class", "flip-card-inner")
    flipInner.setAttribute("onclick", "flip(this)")
    flip.appendChild(flipInner)

    let flipFront = document.createElement("div")
    flipFront.setAttribute("class", "flip-card-front")
    let flipBack = document.createElement("div")
    flipBack.setAttribute("class", "flip-card-back")
    flipInner.appendChild(flipFront)
    flipInner.appendChild(flipBack)

    let cardFrontImg = document.createElement("div")
    cardFrontImg.setAttribute("class", "card-img card-front-img")
    let cardBackImg = document.createElement("div")
    cardBackImg.setAttribute("class", "card-img card-back-img")
    flipFront.appendChild(cardFrontImg)
    flipBack.appendChild(cardBackImg)

    console.log(flip)

}


function flip(elem) {
    elem.style.transform = `rotateY(${180}deg)`
    const imgUrl = getComputedStyle(elem.querySelector(".flip-card-back").children.item(0)).backgroundImage
    const imgName = imgUrl.split("/").pop().split(".").shift()
    console.log(imgName)

}