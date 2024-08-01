import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const BASE_API_URL = "http://localhost:3000/";
  const url = new URL("places", BASE_API_URL);
  // console.log(url.toString());
  useEffect(() => {
    async function fetchPlaces() {
      const response = await fetch(url);
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    }
    fetchPlaces();
  }, []);

  console.log(availablePlaces);
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
