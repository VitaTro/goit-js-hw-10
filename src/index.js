import { fetchBreeds } from "./cat-api";


const breedSelect = document.querySelector('.breed-select');
const loaderData = document.querySelector('.loader');
const errorPage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

try {
    loaderData.classList.remove('hidden');
    fetchBreeds()
    .then(data => renderCat(data));

} catch (error) {
    console.log(error);
}

function renderRace (breeds) {
    const option = breeds
    .map(({ id, name}) => {
        return `<option value="${id}">${name}</option>`
    })
    .join('');
    breedSelect.insertAdjacentHTML('beforeend', option);
    loaderData.classList.add('hidden');
};
