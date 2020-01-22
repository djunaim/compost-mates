import compostsData from './compostsData';
import compostTypesData from './compostTypesData';
import foodWastesData from './foodWastesData';
import authData from './authData';

const getCompostTypesWithFoodWasteNames = () => new Promise((resolve, reject) => {
  compostsData.getCompostsByUid(authData.getUid())
    .then((composts) => {
      compostTypesData.getAllCompostTypes()
        .then((compostTypes) => {
          foodWastesData.getAllFoodWastes()
            .then((foodWaste) => {
              const finalCompostType = [];
              composts.forEach((compost) => {
                const newCompost = { ...compost };
                const matchComposts = compostTypes.filter((x) => x.CompostId === newCompost.id);
                if (matchComposts) {
                  const matchFoodWaste = [];
                  matchComposts.forEach((match) => {
                    const foundFoodWaste = foodWaste.find((y) => y.id === match.foodWasteId);
                    matchFoodWaste.push(foundFoodWaste);
                    newCompost.foodWasteName = [];
                    matchFoodWaste.forEach((foodWasteMatch) => {
                      newCompost.foodWasteName.push(foodWasteMatch.type);
                    });
                  });
                }
                finalCompostType.push(newCompost);
              });
              resolve(finalCompostType);
            });
        });
    })
    .catch((error) => reject(error));
});

export default { getCompostTypesWithFoodWasteNames };
