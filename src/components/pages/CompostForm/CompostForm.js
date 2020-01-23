import React from 'react';
import foodWastesData from '../../../helpers/data/foodWastesData';

class CompostForm extends React.Component {
  state = {
    compostName: '',
    compostAmount: '',
    foodWastes: [],
    foodWasteSelection: '',
  }

  componentDidMount() {
    this.getfoodWastesData();
  }

  getfoodWastesData = () => {
    foodWastesData.getAllFoodWastes()
      .then((result) => {
        this.setState({ foodWastes: result });
      })
      .catch((errFromFoodWaste) => console.error(errFromFoodWaste));
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
        <div className="form-check"
            id="employeeName"
            value={ foodWasteSelection }
            onChange={() => {}}>
            {
              foodWastes.map((foodWaste) => (
                <input className="form-check-input" type="checkbox" key={foodWaste.id} id={foodWaste.id} />
              ))
            }
            {
              foodWastes.map((foodWaste) => (
                <label className="form-check-label" key={foodWaste.id} htmlFor={foodWaste.id}>
                  {foodWaste.type}
                </label>
              ))
            }
        </div>
      </form>
    );
  }
}

export default CompostForm;
