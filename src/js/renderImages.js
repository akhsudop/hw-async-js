const gallery = document.querySelector('.gallery');

export const renderImages = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery__link" href="${largeImageURL}">
          <div class="gallery__item">
    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    <div class="gallery__info">
      <p class="gallery__info--item">
        <b>Likes</b><span>${likes}</span>
      </p>
      <p class="gallery__info--item">
        <b>Views</b><span>${views}</span>
      </p>
      <p class="gallery__info--item">
        <b>Comments</b><span>${comments}</span>
      </p>
      <p class="gallery__info--item">
        <b>Downloads</b><span>${downloads}</span>
      </p>
    </div>
  </div>
  </a>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};
