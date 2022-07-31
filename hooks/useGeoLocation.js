import { useState } from "react";

const useGeoLocation = () => {
  const [crds, setCrds] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState();

  function success(pos) {
    setCrds(pos.coords);
    setErr(null);
    setLoading(false);
  }

  function error(err) {
    console.log(err);
    setErr("Could not retrieve your location!");
    setLoading(false);
  }

  const handleTrackLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setErr("Geolocation is not supported by your browser!");
      setLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { crds, err, handleTrackLocation, loading };
};

export default useGeoLocation;
