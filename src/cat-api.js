import axios from "axios";

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] = 
  'live_OT3X6mHAhHiNxaNX8Lm1zVz2Jjr333poKmhBJj1a5j7CfvglWuaQMz7zMzsGsfNk';

  return axios.get('https://api.thecatapi.com/v1/breeds')
  .then(response => response.data)
}
