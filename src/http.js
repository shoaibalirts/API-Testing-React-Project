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
