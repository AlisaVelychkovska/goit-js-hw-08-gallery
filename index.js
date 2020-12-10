const galleryElements = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
    index: "0",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
    index: "1",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
    index: "2",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
    index: "3",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
    index: "4",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
    index: "5",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
    index: "6",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
    index: "7",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
    index: "8",
  },
];
const list = document.querySelector(".gallery");
const refs = {
  lightboxImage: document.querySelector(".lightbox__image"),
  lightbox: document.querySelector(".lightbox"),
  lightboxButton: document.querySelector(".lightbox__button"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

const createElement = (item) => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");
  const link = document.createElement("a");
  link.classList.add("gallery__link");
  link.setAttribute("href", item.original);
  li.appendChild(link);
  const image = document.createElement("img");
  image.classList.add("gallery__image");
  image.setAttribute("src", item.preview);
  link.appendChild(image);
  image.setAttribute("alt", item.description);
  image.setAttribute("data-source", item.original);
  image.setAttribute("data-index", item.index);
  return li;
};

const newGallery = galleryElements.map(createElement);
list.append(...newGallery);
list.addEventListener("click", onGalleryClick);
function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  refs.lightbox.classList.add("is-open");
  refs.lightboxImage.src = event.target.dataset.source;
  refs.lightboxImage.alt = event.target.alt;
  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      changeImageRight();
    } else if (event.code === "ArrowLeft") {
      changeImageLeft();
    }
  });
}
//arrows functions
const originalImageArray = galleryElements.map((element) => element.original);
// console.log(originalImageArray);
let currentIndex;

function changeImageRight() {
  findCurrentItem();
  if (currentIndex === originalImageArray.length - 1) {
    refs.lightboxImage.src = originalImageArray[0];
  } else {
    refs.lightboxImage.src = originalImageArray[currentIndex + 1];
  }
}

function changeImageLeft() {
  findCurrentItem();
  if (currentIndex === 0) {
    refs.lightboxImage.src = originalImageArray[originalImageArray.length - 1];
  } else {
    refs.lightboxImage.src = originalImageArray[currentIndex - 1];
  }
}

function findCurrentItem() {
  let currentItem = originalImageArray.find(
    (element) => element === refs.lightboxImage.src
  );
  currentIndex = originalImageArray.indexOf(currentItem);
  return currentIndex;
}

function closeLightbox() {
  window.removeEventListener("keydown", onPressEscape);
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
}
//add close by button click
refs.lightboxButton.addEventListener("click", closeLightbox);
//close modal by Escape keydown
window.addEventListener("keydown", onPressEscape);
function onPressEscape(event) {
  if (event.code === "Escape") {
    closeLightbox();
  }
}
//close modal by overlay click
refs.lightboxOverlay.addEventListener("click", closeLightbox);
