import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import Landing from "./components/Layouts/Landing";
import Register from "./components/authorise/signup";
import { checkAuthState } from "./store/actions/authAction";
import Login from "./components/authorise/login";
import Dashboard from "./components/dashboard/dashboard";
import CreateProfile from "./components/createProfile/createProfile";
import EditProfile from "./components/editProfile/EditProfile";
import AddExperience from "./components/addCredentials/addExperience";
import AddEducation from "./components/addCredentials/addEducation";
import AllProfiles from "./components/allProfiles/allProfiles";
import Profile from "./components/profile/profile.js";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotifyBox from "./components/notifications/NotifyBox";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        {this.props.notify ? <NotifyBox /> : null}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/createprofile" component={CreateProfile} />
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/addexperience" component={AddExperience} />
          <Route path="/addeducation" component={AddEducation} />
          <Route path="/profiles" component={AllProfiles} />
          <Route path="/profile/:handle" component={Profile} />
          <Route path="/postfeed" component={Posts} />
          <Route path="/post/:id" component={Post} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    notify: state.auth.notify
  };
};

export default connect(
  mapStateToProps,
  { checkAuthState }
)(App);
