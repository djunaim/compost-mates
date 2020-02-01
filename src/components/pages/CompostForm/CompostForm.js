import React from 'react';
import PropTypes from 'prop-types';
import foodWastesData from '../../../helpers/data/foodWastesData';
import authData from '../../../helpers/data/authData';
import compostsData from '../../../helpers/data/compostsData';
import compostShape from '../../../helpers/propz/compostShape';
import Checkboxes from '../../shared/Checkboxes/Checkboxes';
import compostTypesData from '../../../helpers/data/compostTypesData';

import './CompostForm.scss';

class CompostForm extends React.Component {
  state = {
    compostName: '',
    compostAmount: '',
    compostImageURL: '',
    foodWastesCheckboxes: [],
    composts: [],
  }

  static propTypes = {
    compost: PropTypes.arrayOf(compostShape.compostShape),
  }

  componentDidMount() {
    this.getfoodWastesData();
    this.getCompostsData();
  }

  getfoodWastesData = () => {
    foodWastesData.getAllFoodWastes()
      .then((result) => {
        const foodWastesArr = result;
        const foodWastes = [];
        Object.keys(foodWastesArr).forEach((fbId) => {
          foodWastesArr[fbId].isChecked = false;
          foodWastes.push(foodWastesArr[fbId]);
        });
        this.setState({ foodWastesCheckboxes: foodWastes });
      })
      .catch((errFromFoodWaste) => console.error(errFromFoodWaste));
  }

  getCompostsData = () => {
    const uid = authData.getUid();
    compostsData.getCompostsByUid(uid)
      .then((composts) => {
        this.setState({ composts });
      })
      .catch((errFromCompostsData) => console.error(errFromCompostsData));
  }

  handleCheckEvent = (e) => {
    const { foodWastesCheckboxes } = this.state;
    const newFoodWastesCheckboxes = [...foodWastesCheckboxes];
    const foodWasteIndex = foodWastesCheckboxes.findIndex((x) => x.id === e.target.id);
    newFoodWastesCheckboxes[foodWasteIndex].isChecked = e.target.checked;
    this.setState({ foodWastesCheckboxes });
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ compostName: e.target.value });
  }

  amountChange = (e) => {
    e.preventDefault();
    this.setState({ compostAmount: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ compostImageURL: e.target.value });
  }

  saveCompostEvent = (e) => {
    e.preventDefault();
    const { foodWastesCheckboxes } = this.state;
    const newCompost = {
      imgURL: this.state.compostImageURL,
      amountOfCompost: this.state.compostAmount,
      name: this.state.compostName,
      uid: authData.getUid(),
    };
    compostsData.addCompost(newCompost)
      .then((response) => {
        const compostId = response.data.name;
        const selectedFoods = foodWastesCheckboxes.filter((x) => x.isChecked);
        selectedFoods.forEach((selectedFood) => {
          const newCompostType = {
            foodWasteId: selectedFood.id,
            compostId,
          };
          compostTypesData.addCompostType(newCompostType)
            .then(() => this.props.history.push('/compost'));
        });
      })
      .catch((errFromSaveCompostEvent) => console.error(errFromSaveCompostEvent));
  }

  render() {
    const {
      compostAmount,
      compostName,
      foodWastesCheckboxes,
      compostImageURL,
    } = this.state;
    return (
      <form className="CompostForm">
        <div className="container compostForm">
          <div className="form-group">
            <label htmlFor="compost-image-url">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="compost-image-url"
              placeholder="Enter image url"
              value={compostImageURL}
              onChange={this.imageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="compost-name"><strong>Name</strong></label>
            <input
              input="text"
              className="form-control"
              id="compost-name"
              placeholder="Name compost"
              value={compostName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="compost-amount"><strong>Amount of Compost (lb)</strong></label>
            <input
              input="text"
              className="form-control"
              id="compost-amount"
              placeholder="Enter amount"
              value={compostAmount}
              onChange={this.amountChange}
            />
          </div>
          <div className="form-check" >
            <label htmlFor="foodWaste"><strong>Food Waste Types</strong></label>
            {
              foodWastesCheckboxes.map((foodWastesCheckbox) => <Checkboxes key={foodWastesCheckbox.id} foodWastesCheckbox={foodWastesCheckbox} handleCheckEvent={this.handleCheckEvent} />)
            }
          </div>
          <button className="btn btn-outline-dark saveButton" onClick={this.saveCompostEvent}>Save Compost</button>
        </div>
      </form>
    );
  }
}

export default CompostForm;
