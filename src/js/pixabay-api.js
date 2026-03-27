import axios from 'axios';

const PIXABAY_API_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '55159372-d264c9d22d658374374c360aa';
const itemsPerPage = 15;

export let totalPages = 0;

export async function getImagesByQuery(query, currentPage) {
  const result = await axios.get(PIXABAY_API_URL, {
    params: {
      key: PIXABAY_API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: itemsPerPage,
    },
  });
  const totalHits = result.data.totalHits;
  totalPages = Math.ceil(totalHits / itemsPerPage);
  return result.data;
}
