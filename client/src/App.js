import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import Landing from "./components/Layouts/Landing";
import Register from "./components/authorise/signup";
import Login from "./components/authorise/login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
