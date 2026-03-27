import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, totalPages } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  loadMoreBtn,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');

let insertedText = '';
let currentPage = 1;

form.addEventListener('submit', handlerSearchForm);
loadMoreBtn.addEventListener('click', handlerLoadMoreBtn);

export function handlerSearchForm(e) {
  e.preventDefault();

  currentPage = 1;

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
  insertedText = searchText;
  showLoader();
  clearGallery();
  hideLoadMoreButton();
  // const result = getImagesByQuery(searchText, currentPage);

  //new code async
  setTimeout(async () => {
    try {
      const data = await getImagesByQuery(searchText, currentPage);
      const imgs = data.hits;
      if (imgs.length === 0) {
        iziToast.show({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      createGallery(imgs);
      showLoadMoreButton();
      currentPage++;
    } catch (error) {
      iziToast.show({
        message: `Error: ${error}`,
        color: 'red',
        position: 'topRight',
      });
    } finally {
      hideLoader();
      form.reset();
    }
  }, 200);

  //delete
  //   result
  //     .then(response => {
  //       const imgs = response.hits;

  //       if (imgs.length === 0) {
  //         iziToast.show({
  //           position: 'topRight',
  //           message:
  //             'Sorry, there are no images matching your search query. Please try again!',
  //         });
  //         return;
  //       }

  //       createGallery(imgs);
  //       showLoadMoreButton();

  //       if (currentPage >= totalPages) {
  //         return iziToast.error({
  //           position: 'topRight',
  //           message: "We're sorry, there are no more posts to load",
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);

  //       iziToast.show({
  //         position: 'topRight',
  //         message: error,
  //       });
  //     })
  //     .finally(data => {
  //       hideLoader();
  //     });
}

function handlerLoadMoreBtn() {
  currentPage += 1;

  hideLoadMoreButton();

  if (currentPage > totalPages) {
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }

  showLoader();

  // const result = getImagesByQuery(insertedText, currentPage);

  //new code async
  setTimeout(async () => {
    try {
      const data = await getImagesByQuery(insertedText, currentPage);
      const imgs = data.hits;
      if (imgs.length === 0) {
        iziToast.show({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      createGallery(imgs);
      showLoadMoreButton();
      currentPage++;
    } catch (error) {
      iziToast.show({
        message: `Error: ${error}`,
        color: 'red',
        position: 'topRight',
      });
    } finally {
      hideLoader();
      form.reset();
    }
  }, 200);

  //delete
  result;
  // .then(response => {
  //   const imgs = response.hits;
  //   if (imgs.length === 0) {
  //     iziToast.show({
  //       position: 'topRight',
  //       message:
  //         'Sorry, there are no images matching your search query. Please try again!',
  //     });
  //     return;
  //   }
  //   createGallery(imgs);
  //   setTimeout(async () => {
  //     scroll();
  //   }, 200);
  //   showLoadMoreButton();
  // })
  // .catch(error => {
  //   iziToast.show({
  //     position: 'topRight',
  //     message: error,
  //   });
  // })
  // .finally(data => {
  //   hideLoader();
  // });
}

function scroll() {
  const { height } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
