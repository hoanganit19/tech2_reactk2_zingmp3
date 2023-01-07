import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import IonIcon from "@reacticons/ionicons";
import useTime from "../../Services/Hooks/useTime";
import { playerActions } from "./playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { playerSelector } from "./playerSlice";
import clsx from "clsx";
import Audio from "./Audio";

let isMouseDown = false;
let initialClientX = 0;
let initialRate = 0;
let currentTime = 0;

const { doPlay, doActiveElement } = playerActions;

function Player(props) {
  const progressRef = useRef();

  const audioRef = useRef();

  const [duration, setDuration] = useState(0);

  const { getMins } = useTime();

  const dispatch = useDispatch();

  const player = useSelector(playerSelector);

  const { playStatus, elementActive } = useSelector(playerSelector);

  useEffect(() => {
    if (duration > 0) {
      document.addEventListener("mouseup", handleMouseUp);

      document.addEventListener("mousemove", (e) => {
        if (isMouseDown) {
          document.body.style.userSelect = "none"; //vô hiệu hóa chọn văn bản

          handleProgressDrag(e);
        }
      });
    }

    //console.log("effect");
  }, [duration]);

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.code === "Space" && elementActive === "player") {
        handlePlay();
      }
    });
  }, [elementActive]);

  const handleProgressTimer = (e) => {
    //Chỉ cho phép bấm chuột trái
    if (e.nativeEvent.which == 1) {
      const rate = getProgressRate(e.nativeEvent.offsetX);
      progressRef.current.children[0].style.width = `${rate}%`;

      handleMouseDown();

      //console.log(e.nativeEvent.offsetX);
      initialClientX = e.clientX;

      initialRate = rate;

      currentTime = getCurrentTime(rate);

      progressRef.current.previousElementSibling.children[0].innerText =
        getMins(currentTime);
    }
  };

  //vô hiệu hóa khi bấm chuột phải vào timer
  const handleRightMenu = (e) => {
    e.preventDefault();
  };

  const handleProgressDrag = (e) => {
    const clientX = e.clientX; //Vị trí con trỏ chuột đang kéo so với góc bên trái của trang web

    const spaceRate = clientX - initialClientX; //Khoảng cách kéo thêm (px)

    const rateNew = getProgressRate(spaceRate); //Tỷ lệ phần trăm kéo thêm

    let rate = initialRate + rateNew;

    if (rate < 0) {
      rate = 0;
    }

    if (rate > 100) {
      rate = 100;
    }

    progressRef.current.children[0].style.width = `${rate}%`;
    currentTime = getCurrentTime(rate);

    progressRef.current.previousElementSibling.children[0].innerText =
      getMins(currentTime);
  };

  const getProgressRate = (positionX) => {
    const rate = (positionX / progressRef.current.clientWidth) * 100;
    return rate;
  };

  const handleMouseDown = () => {
    isMouseDown = true;
  };

  const handleMouseUp = () => {
    if (isMouseDown) {
      isMouseDown = false;

      document.body.style.userSelect = "text";

      audioRef.current.setCurrentTime(currentTime);
    }
  };

  const handleLoadAudio = () => {
    const duration = audioRef.current.getDuration();
    setDuration(duration);
  };

  const getCurrentTime = (rate) => {
    const currentTime = (rate * duration) / 100;
    return currentTime;
  };

  const handlePlay = () => {
    if (audioRef.current.getPauseStatus()) {
      audioRef.current.play();
      dispatch(doPlay("play"));
    } else {
      audioRef.current.pause();
      dispatch(doPlay("pause"));
    }
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.getCurrentTime();
    progressRef.current.previousElementSibling.children[0].innerText =
      getMins(currentTime);

    const rate = (currentTime / duration) * 100;

    if (!isMouseDown) {
      progressRef.current.children[0].style.width = `${rate}%`;
    }
  };

  const handleClickPlayerArea = (e) => {
    e.stopPropagation();
    dispatch(doActiveElement("player"));
  };

  return (
    <div className="zing-controls" onClick={handleClickPlayerArea}>
      <Audio
        onLoadedData={handleLoadAudio}
        onTimeUpdate={handleTimeUpdate}
        ref={audioRef}
      />

      <div className="l-4 m-3 c-9">
        <div className=" zing-control-left zing-control-left-action">
          <div className="control-left-img " style={{ marginLeft: 0 }}>
            <img
              src="https://vtv1.mediacdn.vn/thumb_w/640/2022/9/21/poster-karik-only-c-16637279213761078057270.jpeg"
              alt=""
            />
          </div>
          <div className="control-left-title">
            <h1 className="color-title">CÓ CHƠI CÓ CHỊU</h1>
            <small className="color-small">KARIK x ONLY C</small>
          </div>
          <div className="icon-favorite color-small " data-index="${index}">
            <div className="no-favorite zingchart-icon icon-tym action-hover">
              <ion-icon>
                <IonIcon
                  name="heart-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="heart outline"
                />
              </ion-icon>
            </div>
            <div className="yes-favorite zingchart-icon icon-tym action-hover">
              <ion-icon>
                <IonIcon
                  name="heart"
                  role="img"
                  className="md hydrated"
                  aria-label="heart"
                />
              </ion-icon>
            </div>
          </div>
          <div className="control-left-icon m-0">
            <div className="item icon action-hover  color-title m-0 ">
              <ion-icon>
                <IonIcon
                  name="ellipsis-horizontal-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="ellipsis horizontal outline"
                />
              </ion-icon>
            </div>
          </div>
        </div>
      </div>
      <div className="l-4 m-6 c-3">
        <div className="zing-control-main">
          <div className="controls">
            <div className="repeat control-icon action-hover color-title action-controls">
              <i className="fa-solid fa-repeat" />
            </div>
            <div className="icon-control-left control-icon action-hover  color-title c-0">
              <i className="fa-solid fa-backward-step" />
            </div>
            <div className="play c-0">
              <div
                className="play-music control-icon action-hover color-title"
                onClick={handlePlay}
              >
                <ion-icon>
                  <IonIcon
                    name={clsx(
                      playStatus === "play"
                        ? "pause-circle-outline"
                        : "play-outline"
                    )}
                    role="img"
                    className="md hydrated"
                    aria-label="play outline"
                  />
                </ion-icon>
              </div>
              {/* <div className="pause-music control-icon action-hover  color-title ">
                <ion-icon>
                  <IonIcon
                    name="pause-circle-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="pause circle outline"
                  />
                </ion-icon>
              </div> */}
            </div>
            <div className="icon-control-right control-icon action-hover color-title ">
              <i className="fa-solid fa-forward-step" />
            </div>
            <div className="icon-shuffle control-icon action-hover color-title c-0 action-controls">
              <i className="fa-solid fa-shuffle" />
            </div>
          </div>
          <div className="control-handle-time c-0">
            <div className="time-begin color-title">
              <span className="minute">00:00</span>
            </div>
            <div
              className="progress"
              onMouseDown={handleProgressTimer}
              onContextMenu={handleRightMenu}
              ref={progressRef}
            >
              <div className="progressCurrent" style={{ width: "0%" }} />
            </div>
            <div className="time-end color-title">{getMins(duration)}</div>
          </div>
        </div>
      </div>
      <div className="l-4 m-3 c-0 ">
        <div className="zing-control-right">
          <div className="media control-icon action-hover  color-title m-0 ">
            <i className="fa-solid fa-photo-film" />
          </div>
          <div className="micro control-icon action-hover  color-title m-0">
            <i className="fa-solid fa-microphone" />
          </div>
          <div className="volume ">
            <div className="volume-play control-icon action-hover  color-title">
              <i className="fa-solid fa-volume-low" />
            </div>
            <div className="volume-pause control-icon action-hover  color-title hide">
              <i className="fa-solid fa-volume-xmark" />
            </div>
            <div className="volume-control color-title">
              <div className="volume-control-play" />
            </div>
          </div>
          <div className="list-song control-icon action-hover color-title ">
            <i className="fa-solid fa-list-ul" />
          </div>
        </div>
      </div>
    </div>
  );
}

Player.propTypes = {};

export default Player;
