import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import { renderImages } from './js/renderImages';
import { getImages, limit } from './js/getImages';

import './scss/index.scss';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more--btn');
const input = document.querySelector('.input');

// Adding a smooth scroll for the page

const scrollAdding = heightIndex => {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * heightIndex,
    behavior: 'smooth',
  });
};

//

let searchVal = '';
API_KEY = '35565772-7bd4f47208013e8d69d75afde';
let page = 1;

const handlerInput = e => {
  e.preventDefault();
  searchVal = e.currentTarget.searchQuery.value.trim();
  if (!form.elements.searchQuery.value) {
    return;
  } else {
    getImages(searchVal, page).then(({ hits, totalHits }) => {
      if (totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        gallery.innerHTML = '';
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        renderImages(hits);
        simpleLightbox = new SimpleLightbox('.gallery a').refresh();
        loadBtn.classList.remove('invisible');
        scrollAdding(1);
      }
    });
  }
};

//

const handlerLoadBtn = () => {
  page++;
  getImages(searchVal, page).then(({ hits, totalHits }) => {
    if (page > Math.ceil(totalHits / limit)) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadBtn.classList.add('invisible');
    } else {
      renderImages(hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      scrollAdding(1.7);
    }
  });
};

// remove DOM el after clearing the input

const clearGalery = e => {
  if (!e.currentTarget.value) {
    loadBtn.classList.add('invisible');
    gallery.innerHTML = '';
  }
};

form.addEventListener('submit', handlerInput);
loadBtn.addEventListener('click', handlerLoadBtn);
input.addEventListener('input', clearGalery);
