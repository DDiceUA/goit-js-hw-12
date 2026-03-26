import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {});

function itemTemplate(image) {
  return `<li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}">
      </a>
      <ul class="stats">
        <li class="stats-item"><p class="stat-title">likes</p><p class="stat-value">${image.likes}</p></li>
        <li class="stats-item"><p class="stat-title">views</p><p class="stat-value">${image.views}</p></li>
        <li class="stats-item"><p class="stat-title">comments</p><p class="stat-value">${image.comments}</p></li>
        <li class="stats-item"><p class="stat-title">downloads</p><p class="stat-value">${image.downloads}</p></li>   
      </ul>
    </li>`;
}

//Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
export function createGallery(images) {
  console.log('createGallery started');
  const result = images.map(itemTemplate).join('');
  gallery.insertAdjacentHTML('beforeend', result);
  lightbox.refresh();
}

//Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
export function clearGallery() {
  gallery.innerHTML = '';
}

//Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
export function showLoader() {
  loader.style.display = 'block';
}

//Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
export function hideLoader() {
  loader.style.display = 'none';
}
