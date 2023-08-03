import React from "react";
import styles from "../styles/Welcome.module.css";
import ReferenceIcon from "../assets/icons/reference/ReferenceIcon";

export default function Welcome() {
  const figmaURL =
    "https://www.figma.com/file/mYHCNnNeeOzW2Qzr0tZYM8/Jamming?type=design&node-id=0%3A1&mode=design&t=FEr4OVTFRFkVKwlK-1";

  const redirectToURL = (url) => () => {
    window.location.href = url;
  };
  function redirectToDefaultMail() {
    const mailToLink = `mailto:${"babdikaarov@gmail.com"}`;
    window.location.href = mailToLink;
  }

  return (
    <div className={styles.div}>
      <div className={styles.text}>
        <h1>Hi there, I'm Beksultan!</h1>
        <p>Thanks for visiting my portfolio, where I showcase my skills:</p>
        <ul>
          <li>HTML/CSS</li>
          <li>JavaScript</li>
          <li>API integration</li>
          <li>React</li>
          <li>Figma</li>
        </ul>
        <p>What my portfolio can do:</p>
        <ul>
          <li>Connect and explore Spotify</li>
          <li>Search for awesome tracks</li>
          <li>
            Customize your region search{" "}
            <span style={{ fontStyle: "italic" }}>
              currenly Kyrgyzstan region is a default region to serach
            </span>
            <a href={figmaURL}> (this feature is in development)</a>
          </li>
          <li>Create custom playlists</li>
          <li>
            Update existing playlists
            <a href={figmaURL}> (this feature is in development)</a>
          </li>
        </ul>
        <p>My website uses secure authorization PKCE to access Spotify API.</p>
      </div>
      <div
        className={styles.footer}
        redirectToURL={redirectToURL}
        redirectToDefaultMail={redirectToDefaultMail}
      >
        <ReferenceIcon />
      </div>
    </div>
  );
}
