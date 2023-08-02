// Function to initiate the authorization process
export const authorizeUser = async () => {
  const clientId = "cea0b5c6c2554ba8b8e14a507f5cd041";
  const redirectUri = "http://localhost:3000";

  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-read-playback-state user-modify-playback-state playlist-modify-public playlist-modify-private"; // Add required scopes here

  localStorage.setItem("code_verifier", codeVerifier);

  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  window.location = `https://accounts.spotify.com/authorize?${queryParams}`;
};

// Function to generate random string for PKCE
const generateRandomString = (length) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Function to generate code challenge
const generateCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
};

// Helper function to encode data in base64
const base64encode = (string) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};
