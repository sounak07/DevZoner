import React from "react";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import Landing from "./components/Layouts/Landing";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
