import React from 'react';
import PropTypes from 'prop-types';

import './Footer.scss';

class Footer extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  render() {
    return (
      <div className="Footer">
        <footer className="page-footer">
          <div>
            <span>&copy; 2020 creativeCompost.</span>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
