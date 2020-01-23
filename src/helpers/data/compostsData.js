import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCompostsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/composts.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allCompostsObj = result.data;
      const composts = [];
      if (allCompostsObj !== null) {
        Object.keys(allCompostsObj).forEach((fbId) => {
          const newCompost = allCompostsObj[fbId];
          newCompost.id = fbId;
          composts.push(newCompost);
        });
      }
      resolve(composts);
    })
    .catch((error) => reject(error));
});

const getSingleCompost = (compostId) => axios.get(`${baseUrl}/composts/${compostId}.json`);

const addCompost = (compostInfo) => axios.post(`${baseUrl}/composts.json`, compostInfo);

export default { getCompostsByUid, getSingleCompost, addCompost };
