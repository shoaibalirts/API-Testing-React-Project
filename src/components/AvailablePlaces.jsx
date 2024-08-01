import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import { sortPlacesByDistance } from "../loc.js";
import Error from "./Error.jsx";
export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  const BASE_API_URL = "http://localhost:3000/";
  const url = new URL("places", BASE_API_URL);
  // console.log(url.toString());
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const response = await fetch(url);
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch places.");
        }
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false); // not fetching the data anymore
        });
      } catch (error) {
        // define the code when the wrror is encountered
        setError({
          message:
            error.message || "Could not fetch places , please try again later",
        });
        setIsFetching(false); // not fetching the data anymore
      }
    }
    fetchPlaces();
  }, []);

  // console.log(availablePlaces);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
