import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";
import RouteCore from "../../Services/Routes/RouteCore";
import Sidebar from "../Sidebar/Sidebar";
import Player from "../../Components/Player/Player";

function Main(props) {
  return (
    <div id="app">
      <div className="background"></div>
      <div className="grid">
        <div className="zing">
          <Sidebar />
          <div className="zing-main">
            <Header />
            <div className="zing-body">
              <RouteCore />
            </div>
          </div>
        </div>
        <Player />
      </div>
    </div>
  );
}

Main.propTypes = {};

export default Main;
