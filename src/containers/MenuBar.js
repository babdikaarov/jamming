import React from "react";
import styles from "../styles/MenuBar.module.css";
import SpotifyLogOutButton from "../components/SpotifyLogOutButton";
import SpotifyLogInButton from "../components/SpotifyLogInButton";

export default function MenuBar({ setlogIn }) {
  return (
    <div className={styles.div}>
      <SpotifyLogInButton setlogIn={setlogIn} />
      <SpotifyLogOutButton setlogIn={setlogIn} />
    </div>
  );
}
