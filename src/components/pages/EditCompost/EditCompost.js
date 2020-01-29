import React from 'react';
import PropTypes from 'prop-types';
import compostShape from '../../../helpers/propz/compostShape';

import foodWastesData from '../../../helpers/data/foodWastesData';
import authData from '../../../helpers/data/authData';
import compostsData from '../../../helpers/data/compostsData';
import compostTypesData from '../../../helpers/data/compostTypesData';

import Checkboxes from '../../shared/Checkboxes/Checkboxes';

import './EditCompost.scss';

class EditCompost extends React.Component {
  state = {
    compostName: '',
    compostAmount: '',
    foodWastesCheckboxes: [],
    composts: [],
    compostTypesArr: [],
  }

  static propTypes = {
    compost: PropTypes.arrayOf(compostShape.compostShape),
  }

  componentDidMount() {
    this.getCompostsData();
    const { compostId } = this.props.match.params;
    if (compostId) {
      compostsData.getSingleCompost(compostId)
        .then((response) => {
          this.setState({ compostName: response.data.name, compostAmount: response.data.amountOfCompost });
          compostTypesData.getSingleCompostTypeByCompostId(compostId).then((result) => {
            // this.setState({ compostTypeIds: result.data });
            const compostTypeObj = result.data;
            const newCompostTypesArr = [];
            Object.keys(compostTypeObj).forEach((fbId) => {
              compostTypeObj[fbId].id = fbId;
              newCompostTypesArr.push(compostTypeObj[fbId]);
            });
            this.setState({ compostTypesArr: newCompostTypesArr });
            this.getfoodWastesData(result.data);
          });
        })
        .catch((errFromSingleEditCompost) => console.error(errFromSingleEditCompost));
    }
  }

  getfoodWastesData = (foodWastesObj) => {
    foodWastesData.getAllFoodWastes()
      .then((result) => {
        const foodWastesArr = result;
        const foodWastes = [];
        const newFoodWastes = [];
        Object.keys(foodWastesObj).forEach((fbId) => {
          // eslint-disable-next-line no-param-reassign
          foodWastesObj[fbId].id = fbId;
          newFoodWastes.push(foodWastesObj[fbId]);
        });
        this.setState({ foodWastesCheckboxes: foodWastesArr });
        Object.keys(this.state.foodWastesCheckboxes).forEach((fbId) => {
          const foodWasteIndex = newFoodWastes.findIndex((x) => x.foodWasteId === this.state.foodWastesCheckboxes[fbId].id);
          if (foodWasteIndex !== -1) {
            this.state.foodWastesCheckboxes[fbId].isChecked = true;
          } else {
            this.state.foodWastesCheckboxes[fbId].isChecked = false;
          }
          foodWastes.push(this.state.foodWastesCheckboxes[fbId]);
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

  updateCompostEvent = (e) => {
    e.preventDefault();
    const { userId } = this.state.composts[0];
    const { foodWastesCheckboxes, compostTypesArr } = this.state;
    const { compostId } = this.props.match.params;
    const updatedCompost = {
      userId,
      amountOfCompost: this.state.compostAmount,
      name: this.state.compostName,
      uid: authData.getUid(),
    };
    compostsData.updateCompost(compostId, updatedCompost)
      .then(() => {
        const selectedFoods = foodWastesCheckboxes.filter((x) => x.isChecked);
        const notSelectedFoods = foodWastesCheckboxes.filter((x) => !x.isChecked);
        selectedFoods.forEach((selectedFood) => {
          if (compostTypesArr.find((c) => c.foodWasteId === selectedFood.id) === undefined) {
            // have array compostTypesArr. compostTypesArr.find((c) => c.foodWasteId === selectedFood.id)
            const newCompostType = {
              foodWasteId: selectedFood.id,
              compostId,
            };
            compostTypesData.addCompostType(newCompostType);
          }
        });
        compostTypesArr.forEach((compostTypeArr) => {
          if (notSelectedFoods.find((notSelectedFood) => notSelectedFood.id === compostTypeArr.foodWasteId) !== undefined) {
            compostTypesData.deleteCompostTypes(compostTypeArr.id);
          }
        });
        this.props.history.push('/compost');
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
      <form className="EditCompost">
        <div className="container editCompostForm">
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
        <button className="btn btn-outline-dark updateButton" onClick={this.updateCompostEvent}>Update Compost</button>
        </div>
      </form>
    );
  }
}

export default EditCompost;
