import React from 'react';
import PropTypes from 'prop-types';
import foodWastesCheckboxShape from '../../../helpers/propz/foodWastesCheckboxShape';

class Checkboxes extends React.Component {
  static propTypes = {
    foodWastesCheckbox: PropTypes.arrayOf(foodWastesCheckboxShape.foodWastesCheckboxShape),
    handleCheckEvent: PropTypes.func,
  }

  useHandleCheckEvent = (e) => {
    e.preventDefault();
    const { foodWastesCheckbox, handleCheckEvent } = this.props;
    handleCheckEvent(foodWastesCheckbox);
  }

  render() {
    const { foodWastesCheckbox } = this.props;
    return (
      <div>
        <input key={foodWastesCheckbox.id} onChange={this.useHandleCheckEvent} type="checkbox" checked={foodWastesCheckbox.isChecked} value={foodWastesCheckbox.type} /> {foodWastesCheckbox.type}
     </div>
    );
  }
}

export default Checkboxes;
