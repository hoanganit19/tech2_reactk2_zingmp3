import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RouteCore from "../../Services/Routes/RouteCore";

function Main(props) {
  return (
    <div id="app">
      <Header />
      <RouteCore />
      <Footer />
    </div>
  );
}

Main.propTypes = {};

export default Main;
