function flip(elem) {
    console.log(elem.id);
    elem.style.transform = `rotateY(${180}deg)`
    const img = elem.querySelector(".flip-card-back").children.item(0).src
    const imgName = img.split("/").pop().split(".").shift()
    console.log(imgName);
}