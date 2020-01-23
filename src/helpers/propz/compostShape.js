import PropTypes from 'prop-types';

const compostShape = PropTypes.shape({
  id: PropTypes.string,
  userId: PropTypes.string.isRequired,
  amountOfCompost: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { compostShape };
