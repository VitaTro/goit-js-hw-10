import { fetchBreeds} from './cat-api';
import { fetchBreedCatId } from './cat-api'; 
import './css/styles.css';

const breedSelect = document.querySelector('.breed-select');
const infoCat = document.querySelector('.cat-info');
const loaderPage = document.querySelector('.loader');



try {
  loaderPage.classList.remove('hidden');
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}


function renderSelect(breeds) {
  const option = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', option);
  loaderPage.classList.add('hidden');
}

breedSelect.addEventListener('change', event => {
  loaderPage.classList.remove('hidden');
  fetchBreedCatId(event.target.value).then(data => renderCat(data[0]));
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament, origin } = catData.breeds[0];
  infoCat.insertAdjacentHTML(
    'beforeend',
    `
    <img src="${url}" alt="${name}" height="460" weight="380"/>
        <h2>${name}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
        <p>${origin}</p>
`
  );
  loaderPage.classList.add('hidden');
}