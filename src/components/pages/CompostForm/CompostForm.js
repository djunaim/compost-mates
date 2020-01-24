import React from 'react';
import PropTypes from 'prop-types';
import foodWastesData from '../../../helpers/data/foodWastesData';
import authData from '../../../helpers/data/authData';
import compostsData from '../../../helpers/data/compostsData';
import compostShape from '../../../helpers/propz/compostShape';

class CompostForm extends React.Component {
  state = {
    compostName: '',
    compostAmount: '',
    foodWastes: [],
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

  foodWasteChange = (e) => {
    e.preventDefault();
    this.setState({ foodWasteSelection: e.target.value });
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ compostName: e.target.value });
  }

  amountChange = (e) => {
    e.preventDefault();
    this.setState({ compostAmount: e.target.value });
  }

  // make object of compost in post, grab id in then(), find things that are checked and then do post on compostTypes
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
      foodWastes,
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
        {/* <div className="form-check"
            id="foodWaste"
            value={foodWasteSelection}
            onChange={this.foodWasteChange}>
            {
              foodWastes.map((foodWaste) => (
                <div key={foodWaste.id} className="checkbox">
                  <label htmlFor="foodWaste"><input className="form-check-input" type="checkbox" value={foodWaste.id} />{foodWaste.type}</label>
                </div>
              ))
            }
        </div> */}
        <button className="btn btn-success" onClick={this.saveCompostEvent}>Save Compost</button>
      </form>
    );
  }
}

export default CompostForm;
