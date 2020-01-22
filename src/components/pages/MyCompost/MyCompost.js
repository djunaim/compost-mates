import React from 'react';
import Compost from '../../shared/Compost/Compost';
import authData from '../../../helpers/data/authData';
import compostsData from '../../../helpers/data/compostsData';

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

  componentDidMount() {
    this.getCompostsData();
  }

  render() {
    const { composts } = this.state;

    return (
      <div className="MyCompost">
        <h1>My Compost</h1>
        <div className="d-flex flex-wrap">
          {composts.map((compost) => <Compost key={compost.id} compost={compost} />)}
        </div>
      </div>
    );
  }
}

export default MyCompost;
