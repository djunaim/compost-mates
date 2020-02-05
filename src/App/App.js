import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import CompostForm from '../components/pages/CompostForm/CompostForm';
import EditCompost from '../components/pages/EditCompost/EditCompost';
import Home from '../components/pages/Home/Home';
import MyCompost from '../components/pages/MyCompost/MyCompost';
import Welcome from '../components/pages/Welcome/Welcome';
import SingleCompost from '../components/pages/SingleCompost/SingleCompost';

import './App.scss';
import Footer from '../components/shared/Footer/Footer';
import Profile from '../components/pages/Profile/Profile';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/welcome', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <MyNavbar path="/auth" authed={authed} />
          <Switch>
            <PrivateRoute path="/" exact component={Home} authed={authed} />
            <PublicRoute path="/welcome" exact component={Welcome} authed={authed} />
            <PrivateRoute path="/profile" exact component={Profile} authed={authed} />
            <PrivateRoute path="/compost" exact component={MyCompost} authed={authed} />
            <PrivateRoute path="/compost/new" exact component={CompostForm} authed={authed} />
            <PrivateRoute path="/compost/:compostId" exact component={SingleCompost} authed={authed} />
            <PrivateRoute path="/compost/:compostId/edit" exact component={EditCompost} authed={authed} />
          </Switch>
          <Footer authed={authed} />
        </Router>
      </div>
    );
  }
}

export default App;
