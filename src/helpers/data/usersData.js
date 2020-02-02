import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((result) => {
      const demUsers = result.data;
      const users = [];
      Object.keys(demUsers).forEach((fbId) => {
        demUsers[fbId].id = fbId;
        users.push(demUsers[fbId]);
      });
      resolve(users);
    })
    .catch((error) => reject(error));
});

const getSingleUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const userObj = result.data;
      const user = [];
      if (userObj !== null) {
        Object.keys(userObj).forEach((fbId) => {
          const newUser = userObj[fbId];
          newUser.id = fbId;
          user.push(newUser);
        });
      }
      resolve(user);
    })
    .catch((error) => reject(error));
});

export default { getAllUsers, getSingleUserByUid };
