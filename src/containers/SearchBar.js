import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import icons from "../assets/icons/search/search";
import { searchSpotify } from "../modules/spotifySearch";

export default function SearchBar({ setFetchedList }) {
  const [query, setQuery] = useState("");
  const [currentIcon, setCurrentIcon] = useState(icons.icon1);

  function handleClick(e) {
    if (query) {
      searchSpotify(query)
        .then((fetchedList) => {
          setFetchedList(fetchedList);
          setQuery("");
        })
        .catch((error) => console.error(error));
    }
  }
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
    <div className={styles.searchBar}>
      <label className={styles.inputField}>
        <input
          type="text"
          placeholder="Search . . ."
          value={query}
          className={styles.inputField}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <button
        className={styles.addButton}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseEnter}
        onClick={handleClick}
      >
        <img className={styles.img} src={currentIcon} alt="icon" />
      </button>
    </div>
  );
}
