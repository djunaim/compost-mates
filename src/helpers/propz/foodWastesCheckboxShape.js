import PropTypes from 'prop-types';

const foodWastesCheckboxShape = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
});

export default { foodWastesCheckboxShape };
