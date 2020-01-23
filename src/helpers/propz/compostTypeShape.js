import PropTypes from 'prop-types';

const compostTypeShape = PropTypes.shape({
  id: PropTypes.string,
  foodWasteId: PropTypes.string.isRequired,
  compostId: PropTypes.string.isRequired,
});

export default { compostTypeShape };
