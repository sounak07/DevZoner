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
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/createprofile" component={CreateProfile} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { checkAuthState }
)(App);
