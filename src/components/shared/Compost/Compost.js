import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import compostShape from '../../../helpers/propz/compostShape';

class Compost extends React.Component {
  static propTypes = {
    compost: compostShape.compostShape,
    deleteCompost: PropTypes.func,
  }

  deleteCompostEvent = (e) => {
    e.preventDefault(e);
    const { deleteCompost, compost } = this.props;
    deleteCompost(compost.id);
  }

  render() {
    const { compost } = this.props;
    return (
      <div className="Compost col-md-4">
        <div className="card border-dark mb-3">
          <div className="card-body">
          <button className="btn btn-danger" onClick={this.deleteCompostEvent}>x</button>
            <h4>{compost.name}</h4>
            <Link className="btn btn-primary" to={`/compost/${compost.id}`}>View</Link>
            <Link className="btn btn-secondary" to={`/compost/${compost.id}/edit`}>Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Compost;
