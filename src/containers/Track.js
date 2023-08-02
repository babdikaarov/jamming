import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Track.module.css";
import { AudioPlayerContext } from "../context/AudioContext";
import playIcons from "../assets/icons/play/play";
import pauseIcons from "../assets/icons/pause/pause";

export default function Track({
  setFetchedList,
  handleType,
  icons,
  order,
  songToDisplay,
  setCustomList,
}) {
  const [currentIcon, setCurrentIcon] = useState(icons.icon1);
  const [controlIcon, setControlIcon] = useState(playIcons.icon1);
  const { urlCompare, isPlaying, playAudio, pausePlayAudio, stopAudio } =
    useContext(AudioPlayerContext);
  const isSamePreview = urlCompare === songToDisplay.preview;

  const handleAudio = () => {
    if (isPlaying && isSamePreview) {
      pausePlayAudio(); //current audio manipulation !pause
    } else {
      stopAudio(); // new audio manipulation !play new audio
      playAudio(songToDisplay.preview);
    }
  };

  const handleClick = () => {
    switch (handleType) {
      case "add":
        setCustomList((prev) => [songToDisplay, ...prev]);
        setFetchedList((prev) =>
          prev.filter((el) => el.uri !== songToDisplay.uri)
        );
        break;
      case "remove":
        setCustomList((prev) =>
          prev.filter((el) => el.uri !== songToDisplay.uri)
        );
        setFetchedList((prev) => [songToDisplay, ...prev]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setControlIcon(playIcons.icon1);
    }
  }, [isPlaying]);

  const handleMouseEnter = () => {
    if (isPlaying && isSamePreview) {
      setControlIcon(pauseIcons.icon2); //on hover of same track when played
    } else if (isPlaying) {
      setControlIcon(playIcons.icon1); //on hover of different track when played
    } else {
      setControlIcon(playIcons.icon2); //on hover of different track when not played
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying && isSamePreview) {
      setControlIcon(pauseIcons.icon1);
    } else if (isPlaying) {
      setControlIcon(playIcons.icon1);
    } else {
      setControlIcon(playIcons.icon1);
    }
  };

  const handleMouseDown = () => {
    if (isPlaying && isSamePreview) {
      setControlIcon(pauseIcons.icon3);
    } else if (isPlaying) {
      setControlIcon(playIcons.icon3);
    } else {
      setControlIcon(playIcons.icon3);
    }
  };

  const myButton = (
    <>
      <button
        className={styles.play}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseEnter}
        onClick={handleAudio}
      >
        <img className={styles.img} src={controlIcon} alt="icon" />
      </button>
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.orderPlay}>
        <p className={styles.order}> {order + 1} </p>
        {myButton}
      </div>
      <div className={styles.imgDiv}>
        <img
          src={songToDisplay.img}
          alt="track"
          style={{
            width: "5rem",
            height: "5rem",
          }}
        />
      </div>
      <div className={styles.trackDetails}>
        <h3> {songToDisplay.name} </h3> <h4> {songToDisplay.artist} </h4>
      </div>
      <p className={styles.minutes}> {songToDisplay.duration} </p>
      <button
        className={styles.button}
        onMouseEnter={() => setCurrentIcon(icons.icon2)}
        onMouseLeave={() => setCurrentIcon(icons.icon1)}
        onMouseDown={() => setCurrentIcon(icons.icon3)}
        onMouseUp={() => setCurrentIcon(icons.icon2)}
        onClick={handleClick}
      >
        <img className={styles.img} src={currentIcon} alt="icon" />
      </button>
    </div>
  );
}

// const handleAudio = () => {

//   if (isPlaying) {
//     if(urlCompare === songToDisplay.preview){
//       pausePlayAudio();//current audio manipulation !pause
//     } else {
//       stopAudio();  new audio manipulation !play new audio
//       playAudio(songToDisplay.preview);
//     }
//   } else {
//     if(urlCompare === songToDisplay.preview){
//       pausePlayAudio(); current audio manipulation !play
//     } else {
//       stopAudio();  new audio manipulation !play new audio
//       playAudio(songToDisplay.preview);
//     }
//   }
// };
