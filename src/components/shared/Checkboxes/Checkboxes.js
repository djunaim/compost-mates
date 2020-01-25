import React from 'react';
import PropTypes from 'prop-types';
import foodWastesCheckboxShape from '../../../helpers/propz/foodWastesCheckboxShape';

class Checkboxes extends React.Component {
  static propTypes = {
    foodWastesCheckbox: foodWastesCheckboxShape.foodWastesCheckboxShape,
    handleCheckEvent: PropTypes.func,
  }

  render() {
    const { foodWastesCheckbox, handleCheckEvent } = this.props;

    return (
      <div className="Checkboxes">
          <input className="form-check-input" type="checkbox" value={foodWastesCheckbox.id} id={foodWastesCheckbox.id} onChange={handleCheckEvent} checked={foodWastesCheckbox.isChecked}/>
          <label className="form-check-label" htmlFor="defaultCheck1">
          {foodWastesCheckbox.type}
          </label>
     </div>
    );
  }
}

export default Checkboxes;
