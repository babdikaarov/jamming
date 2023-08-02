import { authorizeUser } from "./authorization";
import { refreshAccessToken } from "./acessToken";
export async function searchSpotify(query) {
  const accessToken = localStorage.getItem("access_token");
  const searchEndpoint = "https://api.spotify.com/v1/search";
  const types = ["album", "artist", "playlist", "track"];
  // const types = ['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook'];
  const country = "KG";
  const limit = 10;
  const offset = 0;

  const searchQuery = new URLSearchParams({
    q: query,
    type: types.join(","),
    market: country,
    limit: limit,
    offset: offset,
  });

  const searchUrl = `${searchEndpoint}?${searchQuery.toString()}`;
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    //   console.log(accessToken, 'spotifysearch')
    const response = await fetch(searchUrl, requestOptions);
    if (response.ok) {
      const data = await response.json();
      const rowList = data.tracks.items;
      console.log(rowList[0].preview_url);

      const sortedList = rowList.map((track) => {
        return {
          preview: track.preview_url,
          id: track.id,
          uri: track.uri,
          name: track.name,
          artist: track.album.artists[0].name,
          duration: (track.duration_ms / 60000)
            .toFixed(2)
            .toString()
            .split(".")
            .map(Number)
            .join(":"),
          isPlayable: track.is_playable,
          img: track.album.images[0].url,
        };
      });
      //   console.log(sortedList)
      return sortedList;
    }
  } catch (error) {
    if (error.error_description === "Authorization code expired") {
      authorizeUser().then(() => {
        refreshAccessToken();
      });
    }
    if (error.message === "The access token expired") {
      refreshAccessToken();
    }

    console.error("Error:", error.error_description);
    throw new Error("Failed to fetch data from the API");
  }
}
