import React, { createContext, useState } from "react";

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [urlCompare, setUrlCompare] = useState(null);

  const playAudio = (url) => {
    if (url) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      const newAudio = new Audio(url);
      newAudio.play();
      newAudio.addEventListener("ended", () => setIsPlaying(false));
      setUrlCompare(url);
      setAudio(newAudio);
      setIsPlaying(true);
    } else {
      alert("Sorry Sporify does not provide preview for this track(");
    }
  };

  const pausePlayAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.onended(() => setIsPlaying(false));

      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
      setIsPlaying(false);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{ urlCompare, isPlaying, playAudio, pausePlayAudio, stopAudio }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

// import React, { createContext, useState, useRef } from 'react';

// export const AudioContext = createContext();

// export const AudioProvider = ({ children }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   function audioToPlay(url) {
//     // Pause the previous audio if it's playing
//     if (audioRef.current) {
//       audioRef.current.pause();
//     }

//     // Create a new Audio object if it doesn't exist
//     if (!audioRef.current) {
//       audioRef.current = new Audio(url);
//       audioRef.current.onended = () => setIsPlaying(false);
//     }

//     // Play the audio
//     audioRef.current.play();
//     setIsPlaying(true);
//   }

//   function playPause() {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   }

//   const contextData = {
//     audioToPlay,
//     playPause,
//   };

//   return (
//     <AudioContext.Provider value={contextData}>
//       {children}
//     </AudioContext.Provider>
//   );
// };

// // // // // AudioContext.js
// // import React, { createContext, useState, useContext } from 'react';

// // export const AudioContext = createContext();

// // export const AudioProvider = ({ children }) => {
// //     const [currentAudio, setCurrentAudio] = useState(null);
// //     const [isPlaying, setIsPlaying] = useState(false);

// //     function audioToPlay(url) {
// //         // Pause the previous audio if it's playing
// //         if (currentAudio) {
// //             currentAudio.pause();
// //         }

// //         // Create a new Audio object with the provided URL
// //         const audio = new Audio(url);

// //         audio.onended = () => setIsPlaying(false);

// //         // Update the currentAudio state with the new Audio object
// //         setCurrentAudio(audio);

// //         // Play the audio
// //         audio.play();
// //         setIsPlaying(true);
// //     }

// //     function playPause() {
// //         if (isPlaying) {
// //             currentAudio.pause();
// //         } else {
// //             currentAudio.play();
// //         }
// //         setIsPlaying(!isPlaying)
// //     }
// //     const contextData = {
// //         audioToPlay,
// //         playPause
// //     };

// //     return (
// //         <AudioContext.Provider value={contextData}>
// //             {children}
// //         </AudioContext.Provider>
// //     );
// // };
