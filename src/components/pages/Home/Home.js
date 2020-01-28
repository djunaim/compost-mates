import React from 'react';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="parallax"></div>
        <div><img url="" /></div>
        <div className="toCompost">To Compost</div>
        <div className="notCompost">Not Compost</div>
        <div className="parallax"></div>
      </div>
    );
  }
}

export default Home;
