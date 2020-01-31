import PropTypes from 'prop-types';

const compostShape = PropTypes.shape({
  id: PropTypes.string,
  amountOfCompost: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { compostShape };
