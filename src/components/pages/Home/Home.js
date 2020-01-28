import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        {/* <div className="parallax"></div> */}
        <div className="carousel">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://raw.githubusercontent.com/djunaim/compost-mates/master/src/components/pages/Home/assets/horizontal-black.png"
                alt="horizontal compost mates logo"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1508500351687-8c9e0a4e35f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                alt="single leaf"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1545165311-508ed0c91361?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
                alt="vegetable"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        {/* <div className="parallax"></div> */}
        <div className="toCompost">To Compost</div>
        <div className="parallax"></div>
        <div className="notCompost">Not Compost</div>
        <div className="parallax"></div>
      </div>
    );
  }
}

export default Home;
