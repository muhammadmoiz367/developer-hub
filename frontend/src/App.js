import React, { Fragment } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

import Landing from './components/landing';
import NavBar from './components/navbar';
import Login from './pages/login';
import SignUp from './pages/signup';

const App=()=>{
  return (
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </Fragment>
      </Router>
  );
}

export default App;
