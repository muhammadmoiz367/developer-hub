import React, { Fragment, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import 'antd/dist/antd.css';
import './App.css';

import Landing from './components/landing';
import NavBar from './components/navbar';
import ALert from './components/alert'
import Login from './pages/login';
import SignUp from './pages/signup';
import store from './redux/store'
import setAuthToken from './utils/setAuthToken'; 
import { loadAuthUser } from './redux/actions/auth';
import Dashboard from './pages/dashboard';
import PrivateRoute from './utils/privateRoute'
import CreateProfile from './components/createProfile';
import EditProfile from './components/editProfile';
import AddExperience from './components/addExperience';
import AddEducation from './components/addEducation';
import Profiles from './pages/profiles';
import ProfilePage from './pages/profilePage';
import Posts from './pages/posts';
import PostPage from './pages/postPage';

if(localStorage.token){
  setAuthToken(localStorage.getItem('token'))
}

const App=()=>{
  useEffect(() => {
    store.dispatch(loadAuthUser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <ALert />
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/profile/:id" component={ProfilePage} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={PostPage} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
