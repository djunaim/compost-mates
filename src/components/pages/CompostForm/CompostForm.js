import React from 'react';
import PropTypes from 'prop-types';
import foodWastesData from '../../../helpers/data/foodWastesData';
import authData from '../../../helpers/data/authData';
import compostsData from '../../../helpers/data/compostsData';
import compostShape from '../../../helpers/propz/compostShape';
import Checkboxes from '../../shared/Checkboxes/Checkboxes';
import compostTypesData from '../../../helpers/data/compostTypesData';

class CompostForm extends React.Component {
  state = {
    compostName: '',
    compostAmount: '',
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

  saveCompostEvent = (e) => {
    e.preventDefault();
    const { userId } = this.state.composts[0];
    const { foodWastesCheckboxes } = this.state;
    const newCompost = {
      userId,
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
    } = this.state;
    return (
      <form className="CompostForm">
        <div className="form-group">
          <label htmlFor="compost-name"> Name</label>
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
          <label htmlFor="compost-amount"> Amount of Compost</label>
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
          <label htmlFor="foodWaste">Food Waste Types</label>
          {
            foodWastesCheckboxes.map((foodWastesCheckbox) => <Checkboxes key={foodWastesCheckbox.id} foodWastesCheckbox={foodWastesCheckbox} handleCheckEvent={this.handleCheckEvent} />)
          }
        </div>
        <button className="btn btn-success" onClick={this.saveCompostEvent}>Save Compost</button>
      </form>
    );
  }
}

export default CompostForm;
