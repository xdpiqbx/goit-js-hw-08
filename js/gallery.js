import galleryItems from "./gallery-items.js"

const galleryList = document.querySelector(".js-gallery")
const lightBox = document.querySelector(".js-lightbox")
const closeButton = document.querySelector("[data-action=close-lightbox]")
const lightboxContent = document.querySelector(".lightbox__content")
const img = lightboxContent.querySelector(".lightbox__image")

const createList = () => {
    let fullList = ""
    for(const item of galleryItems){
        fullList +=`
        <li class="gallery__item">
         <a class="gallery__link" href="${item.original}">
               <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}">
         </a>
        </li>
        `;
    }
    galleryList.insertAdjacentHTML('beforeend', fullList)
}

createList() // выростил деревцо

// посадил события
const allA = document.querySelectorAll(".gallery__link")
for (let link of allA){
    link.addEventListener("click", (event) => {
        event.preventDefault();
    })    
}

const modalAction = (event) => {
    document.addEventListener("keydown", closeModalEsc)
    document.addEventListener("keydown", carousel)

    let currentImage = event.target;
    if(currentImage.nodeName === "IMG"){
        lightBox.classList.toggle("is-open")
    
        img.setAttribute("alt", currentImage.getAttribute("alt"))
        img.setAttribute("src", currentImage.dataset.source)
    }
}

const closeModal = () => {
    lightBox.classList.remove("is-open")

    document.removeEventListener("keydown", closeModalEsc)
    document.removeEventListener("keydown", carousel)

    img.setAttribute("src", "")
    img.setAttribute("alt", "")
}

const closeModalEsc = (event) => {
    if (event.code === "Escape"){
        closeModal()
    }
}

const closeModalBox = (event) => {
    if (event.target.className === "lightbox__content"){
        closeModal()
    }
}

const images = document.querySelectorAll(".gallery__image")


const carousel = (event) => {
    if(lightBox.classList.contains("is-open")){
        
        const arrImages = []
        images.forEach(image => arrImages.push(image))

        let currImageFromArray = arrImages.find(image => image.alt == img.alt)
        let currIndex = arrImages.indexOf(currImageFromArray)
        
        if(event.code === "ArrowRight"){
            if (currIndex == arrImages.length-1){
                currIndex = 0
                img.src = arrImages[currIndex].dataset.source
                img.alt = arrImages[currIndex].alt
                return
            }
            img.src = arrImages[currIndex + 1].dataset.source
            img.alt = arrImages[currIndex + 1].alt
        }
        else if(event.code === "ArrowLeft"){
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