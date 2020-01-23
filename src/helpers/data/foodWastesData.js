import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllFoodWastes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/foodWastes.json`)
    .then((result) => {
      const demFoodWastes = result.data;
      const foodWastes = [];
      Object.keys(demFoodWastes).forEach((fbId) => {
        demFoodWastes[fbId].id = fbId;
        foodWastes.push(demFoodWastes[fbId]);
      });
      resolve(foodWastes);
    })
    .catch((error) => reject(error));
});

export default { getAllFoodWastes };
