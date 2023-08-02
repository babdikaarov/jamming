import React, { useState, useEffect } from "react";
import styles from "../styles/Tracklist.module.css";
import Track from "./Track";
import removeIcon from "../assets/icons/remove/remove";
import icons from "../assets/icons/save/save";
import { saveToAccount } from "../modules/pushList";

export default function Tracklist({
  setCustomList,
  customList,
  setFetchedList,
}) {
  const [currentIcon, setCurrentIcon] = useState(icons.icon1);
  const [listName, setListName] = useState("My Playlist");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const postCustomList = async () => {
      saveToAccount(
        customList.map((el) => el.uri),
        listName
      );
    };
    if (buttonClicked) {
      if (!customList.length) {
        alert("Sorry! Empty list can not be saved");
      } else {
        postCustomList();
        alert(
          `Congrats! Your ${
            listName ? listName : "Custom Playlist from Jamming"
          } playlist save sccuess!!!`
        );
      }
    }

    return () => {
      setCustomList([]);
      setButtonClicked(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonClicked]);

  const handleChange = (e) => {
    setListName(e.target.value);
  };

  const handleMouseEnter = () => {
    setCurrentIcon(icons.icon2);
  };

  const handleMouseLeave = () => {
    setCurrentIcon(icons.icon1);
  };

  const handleMouseDown = () => {
    setCurrentIcon(icons.icon3);
  };

  return (
    <section className={styles.section}>
      <div className={styles.div}>
        <label className={styles.inputField}>
          <input
            className={styles.input}
            type="text"
            placeholder="My Playlist"
            onChange={handleChange}
          />
        </label>
        <button
          title="Save playlist to Spotify"
          className={styles.button}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseEnter}
          onClick={() => setButtonClicked(true)}
        >
          <img className={styles.img} src={currentIcon} alt="icon" />
        </button>
      </div>
      <div className={styles.Track}>
        {customList.map((track, i) => (
          <Track
            key={i}
            icons={removeIcon}
            order={i}
            songToDisplay={track}
            setCustomList={setCustomList}
            setFetchedList={setFetchedList}
            handleType="remove"
          />
        ))}
      </div>
    </section>
  );
}
