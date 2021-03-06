import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import compostShape from '../../../helpers/propz/compostShape';

import './Compost.scss';

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
        <div className="card border-dark mb-3 compostCard">
          <div className="card-body">
            <h4 className="card-title"><strong>{compost.name}</strong></h4>
            <img src={compost.imgURL} className="card-img-top" alt="..."/>
            <div className="compostButtons">
              <Link className="btn btn-outline-dark" to={`/compost/${compost.id}`}>View</Link>
              <Link className="btn" to={`/compost/${compost.id}/edit`}><FontAwesomeIcon icon={faPen} /></Link>
              <button className="btn" onClick={this.deleteCompostEvent}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Compost;
