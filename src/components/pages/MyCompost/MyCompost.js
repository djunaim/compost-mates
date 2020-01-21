import React from 'react';
import { Link } from 'react-router-dom';

class MyCompost extends React.Component {
  render() {
    const compostId = '12345';
    return (
      <div className="MyCompost">
        <h1>My Compost</h1>
        <Link to={`/compost/${compostId}/singlecompost`} className="btn btn-primary">Single</Link>
        <Link className="btn btn-secondary" to={`/compost/${compostId}/edit`}>Edit</Link>
      </div>
    );
  }
}

export default MyCompost;
