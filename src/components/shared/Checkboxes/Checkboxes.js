import React from 'react';
import PropTypes from 'prop-types';
import foodWastesCheckboxShape from '../../../helpers/propz/foodWastesCheckboxShape';

class Checkboxes extends React.Component {
  static propTypes = {
    foodWastesCheckbox: PropTypes.arrayOf(foodWastesCheckboxShape.foodWastesCheckboxShape),
    handleCheckEvent: PropTypes.func,
  }

  render() {
    const { foodWastesCheckbox, handleCheckEvent } = this.props;
    return (
      <div>
        <input
        name="foodWaste"
        key={foodWastesCheckbox.id}
        onChange={handleCheckEvent}
        type="checkbox"
        checked={foodWastesCheckbox.isChecked}
        value={foodWastesCheckbox.id}
        /> {foodWastesCheckbox.type}
     </div>
    );
  }
}

export default Checkboxes;
