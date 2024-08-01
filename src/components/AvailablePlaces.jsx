import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import Error from "./Error.jsx";
export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  
  // console.log(url.toString());
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
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
