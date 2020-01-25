import React from 'react';
import Compost from '../../shared/Compost/Compost';
import authData from '../../../helpers/data/authData';
import compostsData from '../../../helpers/data/compostsData';
import compostTypesData from '../../../helpers/data/compostTypesData';

class MyCompost extends React.Component {
  state = {
    composts: [],
  }

  getCompostsData = () => {
    const uid = authData.getUid();
    compostsData.getCompostsByUid(uid)
      .then((composts) => {
        this.setState({ composts });
      })
      .catch((errFromCompostsData) => console.error(errFromCompostsData));
  }

  deleteCompost = (compostId) => {
    compostsData.deleteCompost(compostId)
      .then(() => {
        this.getCompostsData();
        compostTypesData.getSingleCompostTypeByCompostId(compostId).then((compostTypes) => {
          const compostTypesObj = compostTypes.data;
          Object.keys(compostTypesObj).forEach((fbId) => {
            compostTypesData.deleteCompostTypes(fbId);
          });
        });
      })
      .catch((errFromDeleteCompost) => console.error(errFromDeleteCompost));
  }

  componentDidMount() {
    this.getCompostsData();
  }

  render() {
    const { composts } = this.state;

    return (
      <div className="MyCompost">
        <h1>My Compost</h1>
        <div className="d-flex flex-wrap">
          {composts.map((compost) => <Compost key={compost.id} compost={compost} deleteCompost={this.deleteCompost} />)}
        </div>
      </div>
    );
  }
}

export default MyCompost;
