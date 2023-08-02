import React, { useEffect, useState } from 'react';
import styles from '../styles/SpotifyLogInButton.module.css';
import { authorizeUser } from '../modules/authorization';
import { accessToken, refreshAccessToken } from '../modules/acessToken';
// import { startInterval, stopInterval } from '../modules/'

const SpotifyLogInButton = ({ setlogIn }) => {


  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get('code');

  useEffect(() => {
    if (authorizationCode) {
      accessToken(authorizationCode).catch(error => console.error(error))
      setlogIn(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <div className={styles.div}>
      <button className={styles.button} onClick={() => authorizeUser().catch(error => console.error(error))}>Log in</button>
    </div>
  );
};

export default SpotifyLogInButton;
