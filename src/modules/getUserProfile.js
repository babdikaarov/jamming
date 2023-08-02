const endpoint = "https://api.spotify.com/v1/me";

export async function getUserProfile() {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.id;
    }
  } catch (err) {
    console.log(err);
  }
}
