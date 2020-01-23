import React from 'react';
import compostTypesData from '../../../helpers/data/compostTypesData';
import foodWastesData from '../../../helpers/data/foodWastesData';
import compostsData from '../../../helpers/data/compostsData';

import './SingleCompost.scss';

class SingleCompost extends React.Component {
  state = {
    compostType: [],
    foodWaste: [],
    compostTypesWithFoodWasteNames: [],
    compost: {},
  }

  componentDidMount() {
    const { compostId } = this.props.match.params;
    this.getSingleCompostTypeWithFoodWasteNames(compostId);
    this.getSingleCompostData(compostId);
  }

  getSingleCompostTypeWithFoodWasteNames = (compostId) => {
    compostTypesData.getSingleCompostTypeByCompostId(compostId)
      .then((response) => {
        const newCompostType = Object.keys(response.data).map((i) => response.data[i]);
        this.setState({ compostType: newCompostType });
        foodWastesData.getAllFoodWastes()
          .then((result) => {
            this.setState({ foodWaste: result });
            this.state.foodWaste.forEach((foodWaste) => {
              this.state.compostType.forEach((ct) => {
                if (ct.foodWasteId === foodWaste.id) {
                  const newCompostTypesWithFoodWasteNames = this.state.compostTypesWithFoodWasteNames;
                  newCompostTypesWithFoodWasteNames.push(foodWaste.type);
                  this.setState({ compostTypesWithFoodWasteNames: newCompostTypesWithFoodWasteNames });
                }
              });
            });
          });
      })
      .catch((errFromSingleCompost) => console.error(errFromSingleCompost));
  }

  getSingleCompostData = (compostId) => {
    compostsData.getSingleCompost(compostId)
      .then((response) => {
        this.setState({ compost: response.data });
      })
      .catch((errFromSingleCompostData) => console.error(errFromSingleCompostData));
  }

  render() {
    const { compostTypesWithFoodWasteNames, compost } = this.state;

    return (
      <div className="SingleCompost">
        <h2>{compost.name}</h2>
        <div className="card singleCompostInfo">
          <div className="card-body">
            <div className="card-title">
              <h6 className="card-text">Food Waste:</h6>
              {
                compostTypesWithFoodWasteNames.map((compostTypesWithFoodWasteName) => <p className="card-text" key={compostTypesWithFoodWasteName}>
                {`${compostTypesWithFoodWasteName}`}</p>)
              }
            </div>
            <h6 className="card-text">Amount of Compost (lb):</h6>
            <p className="card-text"> {compost.amountOfCompost}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleCompost;
