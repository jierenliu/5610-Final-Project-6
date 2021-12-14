import React, { useEffect, useRef, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import LoadingBox from "../components/LoadingBox";
import Axios from "axios";
import { USER_ADDRESS_MAP_CONFIRM } from "../constants/userConstants";
import { useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";

const libs = ["places"];
const defaultLocation = { lat: 45.516, lng: -73.56 };

const MapScreen = (props) => {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await Axios("/api/config/google");
      setGoogleApiKey(data);
      getUserCurrentLocation();
    };
    fetch();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };
  let fullName = "";
  let city = "";
  let postalCode = "";
  let country = "";
  const lat = "";
  const lng = "";
  const dispatch = useDispatch();
  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      // dispatch select action
      let myAddress = places[0].formatted_address.split(", ");
      console.log(myAddress);
      city = myAddress[1];
      postalCode = myAddress[2].substring(
        myAddress[2].length - 5,
        myAddress[2].length
      );
      country = myAddress[3];
      dispatch(
        saveShippingAddress({
          fullName,
          address: myAddress[0],
          city,
          postalCode,
          country,
          lat,
          lng,
        })
      );
      alert("location selected successfully.");
      props.history.push("/shipping");
    } else {
      alert("Please enter your address");
    }
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation os not supported by this browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };
  console.log(libs);
  console.log(googleApiKey);
  return googleApiKey ? (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="smaple-map"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input type="text" placeholder="Enter your address"></input>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox></LoadingBox>
  );
};

export default MapScreen;
