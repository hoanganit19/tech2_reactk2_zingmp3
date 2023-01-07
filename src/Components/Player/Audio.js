import React, { forwardRef, useImperativeHandle, useRef } from "react";

const Audio = ({ onLoadedData, onTimeUpdate }, ref) => {
  const audioRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      play: () => {
        audioRef.current.play();
      },
      pause: () => {
        audioRef.current.pause();
      },
      getDuration: () => {
        return audioRef.current.duration;
      },
      getPauseStatus: () => {
        return audioRef.current.paused;
      },
      getCurrentTime: () => {
        return audioRef.current.currentTime;
      },
      setCurrentTime: (currentTime) => {
        audioRef.current.currentTime = currentTime;
      },
    };
  });

  return (
    <div className="audio">
      <audio
        src="/mp3/yeu-voi-vang-remix.mp3"
        ref={audioRef}
        onLoadedData={onLoadedData}
        onTimeUpdate={onTimeUpdate}
      />
    </div>
  );
};

export default forwardRef(Audio);
