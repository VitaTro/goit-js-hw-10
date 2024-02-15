import axios from 'axios';

// використання бібліотеки Ахіоs для запитів HTTP, яка повертає інформацію про котів за їх породою

// функція отримує список пород котів за допомогою персонального ключа 

export const fetchBreeds = async () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_3WqxKBPPm7Nhb7bH6v5KJekaENAwu83GPEJU9IDPWyNtMxR4uV3pJr6uxDYogigc';

  const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
  return response.data;
};

// функція отримує зображення котів за їх породою

export const fetchBreedCatId = async breedId => {
  const response = await axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
  return response.data;
};

// ці дві функцїї мають піти на експорт