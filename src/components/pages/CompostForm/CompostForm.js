import React from 'react';
import PropTypes from 'prop-types';
import foodWastesData from '../../../helpers/data/foodWastesData';
import authData from '../../../helpers/data/authData';
import compostsData from '../../../helpers/data/compostsData';
import compostShape from '../../../helpers/propz/compostShape';
import Checkboxes from '../../shared/Checkboxes/Checkboxes';

class CompostForm extends React.Component {
  state = {
    compostName: '',
    compostAmount: '',
    foodWastesCheckboxes: [
      { id: 'foodWaste1', type: 'fruit', isChecked: false },
      { id: 'foodWaste2', type: 'vegetables', isChecked: false },
      { id: 'foodWaste3', type: 'spices', isChecked: false },
      { id: 'foodWaste4', type: 'herbs', isChecked: false },
      { id: 'foodWaste5', type: 'coffee grounds', isChecked: false },
      { id: 'foodWaste6', type: 'coffee filter', isChecked: false },
      { id: 'foodWaste7', type: 'tea bags', isChecked: false },
      { id: 'foodWaste8', type: 'dairy product', isChecked: false },
      { id: 'foodWaste9', type: 'egg shells', isChecked: false },
      { id: 'foodWaste10', type: 'meat', isChecked: false },
      { id: 'foodWaste11', type: 'shellfish', isChecked: false },
      { id: 'foodWaste12', type: 'fish', isChecked: false },
      { id: 'foodWaste13', type: 'bones', isChecked: false },
      { id: 'foodWaste14', type: 'shells', isChecked: false },
      { id: 'foodWaste15', type: 'pasta', isChecked: false },
      { id: 'foodWaste16', type: 'breads', isChecked: false },
      { id: 'foodWaste17', type: 'cereals', isChecked: false },
      { id: 'foodWaste18', type: 'baked goods', isChecked: false },
      { id: 'foodWaste19', type: 'snack foods', isChecked: false },
      { id: 'foodWaste20', type: 'candy', isChecked: false },
      { id: 'foodWaste21', type: 'leftovers', isChecked: false },
    ],
    foodWasteSelection: '',
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
        this.setState({ foodWastes: result });
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
    e.preventDefault();
    const { foodWastesCheckboxes } = this.state;
    foodWastesCheckboxes.forEach((foodWastesCheckbox) => {
      if (foodWastesCheckbox.id === e.target.value) {
        console.log(e.target.value);
        // this.setState({ foodWasteSelection: e.target.value });
      }
    });
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ compostName: e.target.value });
  }

  amountChange = (e) => {
    e.preventDefault();
    this.setState({ compostAmount: e.target.value });
  }

  // make object of compost in post, grab id in then(), find things that are checked, create new compost types object, and then post on compostTypes
  saveCompostEvent = (e) => {
    e.preventDefault();
    const { userId } = this.state.composts[0];
    const newCompost = {
      userId,
      amountOfCompost: this.state.compostAmount,
      name: this.state.compostName,
      uid: authData.getUid(),
    };
    compostsData.addCompost(newCompost)
      .then((response) => {
        const compostId = response.data.name;
        console.log('compost id', compostId);
      })
      .catch((errFromSaveCompostEvent) => console.error(errFromSaveCompostEvent));
  }

  render() {
    const {
      compostAmount,
      compostName,
      foodWastesCheckboxes,
      foodWasteSelection,
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
        <div className="form-check" id="foodWaste" >
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
