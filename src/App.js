import React, { useState } from "react";
import "./App.css";
import Tracklist from "./containers/Tracklist";
import SearchBar from "./containers/SearchBar";
import SearchResults from "./containers/SearchResults";
import MenuBar from "./containers/MenuBar";
import SpotifyLogInButton from "./components/SpotifyLogInButton";
import useRefreshToken from "./modules/useRefreshToken";
import { AudioPlayerProvider } from "./context/AudioContext";

function App() {
  const [fetchedList, setFetchedList] = useState([]); // fetched list of track from searchButton action
  const [customList, setCustomList] = useState([]); //create list of track
  const [logIn, setlogIn] = useState(false);

  useRefreshToken(logIn);
  window.history.pushState(null, "", window.location.origin);

  return (
    <div className="App">
      {!logIn ? (
        <SpotifyLogInButton setlogIn={setlogIn} />
      ) : (
        <>
          <MenuBar setlogIn={setlogIn} />
          <SearchBar setFetchedList={setFetchedList} />
          <AudioPlayerProvider>
            <div className="trackField">
              <SearchResults
                setCustomList={setCustomList}
                fetchedList={fetchedList}
                setFetchedList={setFetchedList}
              />

              <Tracklist
                customList={customList}
                setCustomList={setCustomList}
                setFetchedList={setFetchedList}
              />
            </div>
          </AudioPlayerProvider>
        </>
      )}
    </div>
  );
}

export default App;
