import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";
import RouteCore from "../../Services/Routes/RouteCore";
import Sidebar from "../Sidebar/Sidebar";
import Player from "../../Components/Player/Player";
import {
  playerActions,
  playerSelector,
} from "../../Components/Player/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const { doActiveElement } = playerActions;

function Main(props) {
  const dispatch = useDispatch();
  const { elementActive } = useSelector(playerSelector);

  const handleActiveElement = () => {
    if (elementActive === "player") {
      dispatch(doActiveElement("body"));
    }
  };

  return (
    <div id="app" onClick={handleActiveElement}>
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
