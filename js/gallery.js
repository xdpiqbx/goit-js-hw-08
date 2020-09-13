import galleryItems from "./gallery-items.js"

const galleryList = document.querySelector(".js-gallery")
const lightBox = document.querySelector(".js-lightbox")
const closeButton = document.querySelector("[data-action=close-lightbox]")
const lightboxContent = document.querySelector(".lightbox__content")
const img = lightboxContent.querySelector(".lightbox__image")

for(const item of galleryItems){
    let li = document.createElement("li")
    let a = document.createElement("a")
    let img = document.createElement("img")

    a.addEventListener("click", (event) => {
        event.preventDefault();
    })

    li.classList = "gallery__item"

    a.classList = "gallery__link"
    a.setAttribute("href", item.original)
    
    img.classList = "gallery__image"
    img.setAttribute("src", item.preview)
    img.setAttribute("data-source", item.original)
    img.setAttribute("alt", item.description)

    a.insertAdjacentElement('beforeend', img)
    li.insertAdjacentElement('beforeend', a)
    galleryList.insertAdjacentElement('beforeend', li)
}

const modalAction = (event) => {
    let currentImage = event.target
    lightBox.classList.toggle("is-open")

    img.setAttribute("src", "")
    img.setAttribute("alt", "")

    img.setAttribute("alt", currentImage.getAttribute("alt"))
    img.setAttribute("src", currentImage.dataset.source)
}

const closeModal = () => {
    lightBox.classList.remove("is-open")
}

const closeModalEsc = (event) => {
    if (event.code == "Escape"){
        lightBox.classList.remove("is-open")
    }
}

const closeModalBox = (event) => {
    if (event.target.className == "lightbox__content"){
        lightBox.classList.remove("is-open")
    }
}

const images = document.querySelectorAll(".gallery__image")

const arrImages = []
images.forEach(image => arrImages.push(image))

const carousel = (event) => {
    if(lightBox.classList.contains("is-open")){
        let currImageFromArray = arrImages.find(image => image.alt == img.alt)
        let currIndex = arrImages.indexOf(currImageFromArray)
        
        if(event.code == "ArrowRight"){
            console.log(currIndex)
            if (currIndex == arrImages.length-1){
                currIndex = 0
                img.src = arrImages[currIndex].dataset.source
                img.alt = arrImages[currIndex].alt
                return
            }
            img.src = arrImages[currIndex + 1].dataset.source
            img.alt = arrImages[currIndex + 1].alt
        }else if(event.code == "ArrowLeft"){
            if (currIndex == 0){
                currIndex = arrImages.length-1
                img.src = arrImages[currIndex].dataset.source
                img.alt = arrImages[currIndex].alt
                return
            }
            img.src = arrImages[currIndex - 1].dataset.source
            img.alt = arrImages[currIndex - 1].alt
        }
    }
}

galleryList.addEventListener("click", modalAction)
closeButton.addEventListener("click", closeModal)
lightBox.addEventListener("click", closeModalBox)
document.addEventListener("keydown", closeModalEsc)
document.addEventListener("keydown", carousel)