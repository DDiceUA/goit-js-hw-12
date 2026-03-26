import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSearchForm);

export function handlerSearchForm(e) {
  e.preventDefault();

  const data = new FormData(e.target);
  const searchText = data.get('search-text').trim();

  if (searchText === '' || searchText === undefined) {
    iziToast.show({
      position: 'topRight',
      backgroundColor: 'red',
      message: 'Введіть текст для пошуку',
    });
    return;
  }
  showLoader();
  clearGallery();
  const result = getImagesByQuery(searchText);

  result
    .then(response => {
      const imgs = response;

      if (imgs.length === 0) {
        iziToast.show({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      createGallery(imgs);
    })
    .catch(error => {
      iziToast.show({
        position: 'topRight',
        message: error,
      });
    })
    .finally(data => {
      hideLoader();
    });
}
