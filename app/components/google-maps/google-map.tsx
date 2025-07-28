"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = { //45.76201544895739, //24.159502617071407
  lat: 45.762,   // Example: New York City
  lng: 24.159,
};

const grayscaleStyle = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      { saturation: -100 },
      { gamma: 0.5 }
    ]
  }
];

const GoogleMapComponent: React.FC = () => (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={{
          // mapTypeId: "satellite",
          
          styles: grayscaleStyle,
          disableDefaultUI: true,
          // mapTypeControl: true,
          fullscreenControl: true,

        }}
    >
      <Marker position={center} />
    </GoogleMap>
);

export default GoogleMapComponent;