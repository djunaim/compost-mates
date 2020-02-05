import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/compost">My Compost</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/compost/new">Add Compost</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-outline-dark logoutButton" onClick={this.logMeOut}>Log Out</button>
            </li>
          </ul>
        );
      }

      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="nav-link btn btn-outline-success loginButton" onClick={this.loginClickEvent}>Log In</button>
          </li>
        </ul>
      );
    };

    return (
      <div className="MyNavbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand compostMatesBrand" to="/"><img src="https://raw.githubusercontent.com/djunaim/compost-mates/master/src/components/shared/MyNavbar/assets/square-black.png" alt="logo-square" /></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
              buildNavbar()
            }
          </div>
        </nav>
      </div>
    );
  }
}

export default MyNavbar;
