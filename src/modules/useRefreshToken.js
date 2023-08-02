import { useState, useEffect } from "react";
import { refreshAccessToken } from "./acessToken";

export default function useRefreshToken(logIn) {
  let expires_in = localStorage.getItem("expires_in") - 60;
  if (expires_in < 0) {
    expires_in = 3400;
  }
  // implement if logIn passed parametr true then execute reset of the logic

  const [count, setCount] = useState(expires_in);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (logIn) {
      // Start the timer when the component mounts

      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      // Cleanup: Clear the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // When the count reaches 1, set isExpired to true
    // console.log(count)
    localStorage.setItem("expired_time", count);
    if (count === 1) {
      setIsExpired(true);
    }
  }, [count]);

  useEffect(() => {
    if (isExpired && logIn) {
      refreshAccessToken().catch((error) => console.error(error));
      //   console.log("refresh");
    }

    return () => {
      setCount(expires_in);
      setIsExpired(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpired, logIn]);
}
