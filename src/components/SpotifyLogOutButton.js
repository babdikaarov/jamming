import React from 'react';
import styles from '../styles/SpotifyLogOutButton.module.css';



const SpotifyLogOutButton = ({ setlogIn }) => {

  const handleLogout = () => {
    setlogIn(false)
    // Clear code_verifier and access_token from localStorage
    localStorage.removeItem('code_verifier');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    deleteQueryParam('code')
    // Refresh the page to give feeling of log out to the user
    // window.location.reload();
  };

  const deleteQueryParam = (paramName) => {
    // Get the current URL query parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Check if the parameter exists
    if (urlParams.has(paramName)) {
      // Delete the parameter from the URL
      urlParams.delete(paramName);

      // Replace the current URL without the deleted parameter
      window.history.replaceState({}, '', '/');
    }
  };


  return (
    <div className={styles.div}>
      <button className={styles.button} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SpotifyLogOutButton;
