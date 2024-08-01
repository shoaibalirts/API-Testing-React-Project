export async function fetchAvailablePlaces() {
  const BASE_API_URL = "http://localhost:3000/";
  const url = new URL("places", BASE_API_URL);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places.");
  }
  return resData.places;
}

export async function updateUserPlaces(places) {
  const BASE_API_URL = "http://localhost:3000/";
  const url = new URL("user-places", BASE_API_URL);
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ places: places }), // it should be sent
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }
  return resData.message;
}
