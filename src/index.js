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
        renderImages(hits);
        simpleLightbox = new SimpleLightbox('.gallery a').refresh();
        loadBtn.classList.remove('invisible');
      }
    });
  }
};

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
    }
  });
};

loadBtn.addEventListener('click', handlerLoadBtn);

const clearGalery = e => {
  if (!e.currentTarget.value) {
    loadBtn.classList.add('invisible');
    gallery.innerHTML = '';
  }
};
form.addEventListener('submit', handlerInput);

input.addEventListener('input', clearGalery);
