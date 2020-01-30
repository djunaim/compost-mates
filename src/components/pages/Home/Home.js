import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import './Home.scss';
import foodWastesData from '../../../helpers/data/foodWastesData';

class Home extends React.Component {
  state = {
    foodWastes: [],
  }

  componentDidMount() {
    this.getFoodWastesData();
  }

  getFoodWastesData = () => {
    foodWastesData.getAllFoodWastes()
      .then((result) => {
        this.setState({ foodWastes: result });
      })
      .catch((errFromFoodWaste) => console.error(errFromFoodWaste));
  }

  render() {
    const { foodWastes } = this.state;
    return (
      <div className="Home">
        <div className="parallax1"></div>
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
        <div className="parallax"></div>
        <div className="toCompost">
          <h3>Compostable</h3>
          <img className="compostImage" src="https://images.unsplash.com/photo-1485277068030-a29993c5d5f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2104&q=80" alt="dirt"/>
          <div className="overlayCompost d-flex flex-wrap">
            {
              foodWastes.map((foodWaste) => <p className="col-md-4" key={foodWaste.id}>{foodWaste.type}</p>)
            }
          </div>
        </div>
        <div className="parallax"></div>
        <div className="notCompost">
          <h3>Non-Compostable</h3>
          <img className="trashImage" src="https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80" alt="trash logo" />
          <div className="overlayNotcompost d-flex flex-wrap">
            <p className="col-md-4">Plastic</p>
            <p className="col-md-4">Expanded Foam</p>
            <p className="col-md-4">Metal</p>
            <p className="col-md-4">Aluminum Foil</p>
            <p className="col-md-4">Animal or Human Waste</p>
            <p className="col-md-4">Dryer Sheets</p>
          </div>
        </div>
        <div className="parallax"></div>
      </div>
    );
  }
}

export default Home;
