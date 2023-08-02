import React from "react";
import styles from "../styles/MenuBar.module.css";
import SpotifyLogOutButton from "../components/SpotifyLogOutButton";
export default function MenuBar({ setlogIn }) {
  return (
    <div className={styles.div}>
      <SpotifyLogOutButton setlogIn={setlogIn} />
    </div>
  );
}
