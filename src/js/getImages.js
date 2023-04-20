import axios from 'axios';

const limit = 40;

const getImages = async (searchVal, page) => {
  const params = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safeSearch: true,
    per_page: limit,
    page: page,
  });
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchVal}&${params}`
    );
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export { limit, getImages };
