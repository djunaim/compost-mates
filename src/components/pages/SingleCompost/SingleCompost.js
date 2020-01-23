import React from 'react';
import compostTypesData from '../../../helpers/data/compostTypesData';
import foodWastesData from '../../../helpers/data/foodWastesData';


class SingleCompost extends React.Component {
  state = {
    compostType: [],
    foodWaste: [],
    compostTypesWithFoodWasteNames: [],
  }

  componentDidMount() {
    const { compostId } = this.props.match.params;
    compostTypesData.getSingleCompostTypeByCompostId(compostId)
      .then((response) => {
        const newCompostType = Object.keys(response.data).map((i) => response.data[i]);
        this.setState({ compostType: newCompostType });
        console.log(newCompostType);
        foodWastesData.getAllFoodWastes()
          .then((result) => {
            console.log(result);
            this.setState({ foodWaste: result });
            this.state.foodWaste.forEach((foodWaste) => {
              this.state.compostType.forEach((ct) => {
                if (ct.foodWasteId === foodWaste.id) {
                  const newCompostTypesWithFoodWasteNames = this.state.compostTypesWithFoodWasteNames;
                  newCompostTypesWithFoodWasteNames.push(foodWaste.type);
                  this.setState({ compostTypesWithFoodWasteNames: newCompostTypesWithFoodWasteNames });
                }
              });
              // if (foodWaste.id === this.state.compostType.forEach()) {
              //   compostTypesWithFoodWasteNames.foodType = foodWaste.type;
              //   console.log(compostTypesWithFoodWasteNames.foodType);
              //   compostTypesWithFoodWasteNames.push(compostTypesWithFoodWasteNames.foodType);
              // }
            });
          });
      })
      .catch((errFromSingleCompost) => console.error(errFromSingleCompost));
  }
  // get all food wastes. Make an array for all the different compost types. Do a find to compare the 2 arrays to each other. Do object.keys to make an array of compost types. Then map over it and print

  render() {
    const { compostType, compostTypesWithFoodWasteNames } = this.state;

    // const findFoodWasteNames = () => {
    //   const getFoodWasteNames = compostType.find((x) => x.foodWasteId === foodWaste.id);
    //   return console.log(`${getFoodWasteNames.type}`);
    // };

    return (
      <div className="SingleCompost">
         <h1>Single Compost</h1>
         { compostTypesWithFoodWasteNames.map((compostTypesWithFoodWasteName) => <p>{compostTypesWithFoodWasteName}</p>)}
        <h4>{compostType.compostId}</h4>
      </div>
    );
  }
}

export default SingleCompost;
