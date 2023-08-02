import React, { useState } from "react";
import styles from "../styles/SearchResults.module.css";
import Track from "./Track";
import addIcons from "../assets/icons/add/add";
import icons from "../assets/icons/reset/reset";

export default function SearchResults({
  setCustomList,
  fetchedList,
  setFetchedList,
}) {
  const [currentIcon, setCurrentIcon] = useState(icons.icon1);

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
        <h2 className={styles.h2}>Search Result</h2>
        <button
          title="Clear current search result"
          className={styles.button}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseEnter}
          onClick={() => setFetchedList([])}
        >
          <img className={styles.img} src={currentIcon} alt="icon" />
        </button>
      </div>
      <div className={styles.Track}>
        {fetchedList.map((track, i) => (
          <Track
            key={i}
            icons={addIcons}
            order={i}
            songToDisplay={track}
            setCustomList={setCustomList}
            setFetchedList={setFetchedList}
            handleType="add"
          />
        ))}
      </div>
    </section>
  );
}
