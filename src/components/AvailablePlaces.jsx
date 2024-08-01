import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const BASE_API_URL = "http://localhost:3000/";
  const url = new URL("places", BASE_API_URL);
  // console.log(url.toString());
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      const response = await fetch(url);
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false); // not fetching the data anymore
    }
    fetchPlaces();
  }, []);

  console.log(availablePlaces);
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
