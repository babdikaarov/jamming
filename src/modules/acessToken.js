import { authorizeUser } from "./authorization";
const clientId = "cea0b5c6c2554ba8b8e14a507f5cd041";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

export async function accessToken(code) {
  try {
    const codeVerifier = localStorage.getItem("code_verifier");
    const redirectUri = "http://localhost:3000";
    if (!codeVerifier && !code) throw new Error("no codeVerifier or code");
    const bodyAccessToken = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    });
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyAccessToken,
    });

    if (response.ok) {
      // throw new Error (response.status);
      const data = await response.json();
      const { access_token, expires_in, refresh_token } = await data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
      localStorage.setItem("refresh_token", refresh_token);
      console.log("Token issued");
    }
  } catch (error) {
    if (error.error_description === "Authorization code expired") {
      authorizeUser().then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get("code");
        accessToken(authorizationCode);
      });
    } else if (error.error_description === "Invalid authorization code") {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
      accessToken(authorizationCode);
    } else if (error.message === "The access token expired") {
      refreshAccessToken();
    }
    throw new Error(error);
  }
}

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  const bodyRefreshToken = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  try {
    if (!refreshToken) {
      return;
    }
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyRefreshToken,
    });

    if (response.ok) {
      const data = await response.json();
      const { access_token, expires_in, refresh_token } = data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
      localStorage.setItem("refresh_token", refresh_token);
      console.log("Token refresh");
    }
  } catch (error) {
    throw new Error(error);
  }
};
