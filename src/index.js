import { fetchBreeds, fetchBreedCatId} from './cat-api';
import './css/styles.css';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';


const breedSelect = document.querySelector('.breed-select');
const infoCat = document.querySelector('.cat-info');
const loaderPage = document.querySelector('.loader');

// початок запиту
document.querySelector('.loader').classList.remove('loading');


// обробка помилок

async function fetchData() {
  try {
    loaderPage.classList.remove('hidden');
    const breedsData = await fetchBreeds();
    renderSelect(breedsData);
    new SlimSelect({
      select: '#single',
      settings: {
        closeOnSelect: true,
        hideSelected: true,
        openPosition: 'auto',
        contentPosition: 'absolute',
      }
      
    });
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}
fetchData();

document.querySelector('.error').style.display = 'none';

// функція, яка вишукує і додає назви пород котів (при цьому анімація завантаження зникає) 

function renderSelect(breeds) {
  const option = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');

  breedSelect.insertAdjacentHTML('beforeend', option);
  loaderPage.classList.add('hidden');
}


// якщо такої назви нема, то буде вискакувати помилка
// після нового пошуку помилка зникає

breedSelect.addEventListener('change', async event => {
  document.querySelector('.loader').classList.add('loading');
  try {
    const catData = await fetchBreedCatId(event.target.value);
    renderCat(catData[0]);
  } catch (errorCat) {
    document.querySelector('.loader').classList.remove('loading');
    Notiflix.Notify.failure('Sorry, something went wrong. Please choose another cat breed.');
    infoCat.innerHTML = '';
  }
})

document.querySelector('.errorCat').style.display = 'none';


// функція, яка при виборі іншої породи буде очищати старі дані, а нові вставляти (після завантаження 
// анімація має зникнути)

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament, origin } = catData.breeds[0];
  infoCat.innerHTML = ''; // Очистити попередні дані
  infoCat.innerHTML += `
    <img src="${url}" alt="${name}" height="460" weight="380"/>
    <h2>${name}</h2>
    <p>${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
    <p>${origin}</p>
  `;
 
document.querySelector('.loader').classList.remove('loading');
}