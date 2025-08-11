"use client";

import React, { useMemo, useState, useRef } from "react";
import { GoogleMap, OverlayViewF } from "@react-google-maps/api";
import Image from "next/image";
import styles from "./google-map.module.scss";

type MarkerType = {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  icon: string;
  image: string;
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const grayscaleStyle = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [{ saturation: -100 }, { gamma: 0.5 }],
  },
];

const OverlayMarker: React.FC<{
  marker: MarkerType;
  onClick?: () => void;
  fadeIn: boolean;
  zoom: number;
}> = ({ marker, onClick, fadeIn, zoom }) => {
  const position = useMemo(
    () => ({ lat: marker.position.lat, lng: marker.position.lng }),
    [marker.position.lat, marker.position.lng]
  );

  // Show image only if zoom is 15 or higher
  const showImage = zoom >= 16;

  return (
    <OverlayViewF position={position} mapPaneName="overlayMouseTarget">
      <div
        className={`overlayContainer ${fadeIn ? "fadeIn" : ""}`}
        onClick={onClick}
      >
        {marker.image && showImage && (
          <div className="markerImage ">
            <Image src={`${marker.image}`} className={`object-fit`}  loading="lazy" fill sizes="(max-width: 768px) 25vw, 15vw" alt={marker.title}/>
          </div>
        )}
        <div className={'markerBox'}>{marker.title}</div>
        <div className={'markerArrow'} />
      </div>
    </OverlayViewF>
  );
};

const GoogleMapComponent: React.FC<{ markers?: MarkerType[] }> = ({
  markers = [], // default to empty array
}) => {
  // Default center, e.g., some city or {0, 0}
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco example

  const center = useMemo(() => {
    if (markers.length > 0) {
      return markers[0].position;
    }
    return defaultCenter;
  }, [markers]);

  const [fadeIn, setFadeIn] = useState(false);
  const [zoom, setZoom] = useState(14);

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance;
    setZoom(mapInstance.getZoom() || 14);
  };

  const handleZoomChanged = () => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom() || 14);
    }
  };

  const handleIdle = () => {
    setTimeout(() => {
      setFadeIn(true);
    }, 300);
  };

  return (
    <div className={styles["namespace-container"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={{
          styles: grayscaleStyle,
          disableDefaultUI: true,
          fullscreenControl: true,
          gestureHandling: "greedy",
          minZoom: 11,
          maxZoom: 18,
        }}
        onLoad={onLoad}
        onZoomChanged={handleZoomChanged}
        onIdle={handleIdle}
      >
        {markers.map((marker) => (
          <OverlayMarker
            key={marker.id}
            marker={marker}
            fadeIn={fadeIn}
            zoom={zoom}
            onClick={() => console.log(`Clicked: ${marker.title}`)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};


export default GoogleMapComponent;
