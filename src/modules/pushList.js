import { getUserProfile } from "./getUserProfile";

export async function createPlaylistInAccount(name) {
  const access_token = localStorage.getItem("access_token");

  const user_id = await getUserProfile();
  const endpoint = `https://api.spotify.com/v1/users/${user_id}/playlists`;

  const body = JSON.stringify({
    name: name,
    public: true,
    collaborative: false,
    description: "Playlist created from Jamming portfolio project BABDIKAAROV",
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (response.ok) {
      const data = await response.json();
      return data.id; // Return the playlist ID
    } else {
      throw new Error("Failed to create playlist.");
    }
  } catch (error) {
    console.error("Error creating playlist:", error.message);
    return null;
  }
}

export async function saveToAccount(customList, listName) {
  const access_token = localStorage.getItem("access_token");
  const playlist_id = await createPlaylistInAccount(listName);
  const endpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

  const body = JSON.stringify({
    uris: customList,
    position: 0,
  });

  try {
    if (!customList) {
      alert("empty playlist error");
      return;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (response.ok) {
      // const data = await response.json();
      console.log("creating and saving playlist success");
    }
  } catch (err) {
    console.error(err);
  }
}
