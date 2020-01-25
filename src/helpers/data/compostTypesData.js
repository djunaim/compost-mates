import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllCompostTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/compostTypes.json`)
    .then((result) => {
      const demCompostTypes = result.data;
      const compostTypes = [];
      Object.keys(demCompostTypes).forEach((fbId) => {
        demCompostTypes[fbId].id = fbId;
        compostTypes.push(demCompostTypes[fbId]);
      });
      resolve(compostTypes);
    })
    .catch((error) => reject(error));
});

const getSingleCompostTypeByCompostId = (compostId) => axios.get(`${baseUrl}/compostTypes.json?orderBy="compostId"&equalTo="${compostId}"`);

const addCompostType = (compostTypeInfo) => axios.post(`${baseUrl}/compostTypes.json`, compostTypeInfo);

const deleteCompostTypes = (compostTypeId) => axios.delete(`${baseUrl}/compostTypes/${compostTypeId}.json`);

export default {
  getAllCompostTypes,
  getSingleCompostTypeByCompostId,
  addCompostType,
  deleteCompostTypes,
};
