"use client";

import React, { useMemo, useState, useRef, useContext } from "react";
import { GoogleMap, OverlayViewF } from "@react-google-maps/api";
import Image from "next/image";
import styles from "./google-map.module.scss";
import Link from "next/link";
import { GlobalInfoContext } from "@/app/context/global-info-context";
import { SiteInfoType } from "@/types";
import { usePathname } from "next/navigation";

type MarkerType = {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  icon: string;
  image: string;
  slug:string;
};


const OverlayMarker: React.FC<{
  marker: MarkerType;
  city: string;
  onClick?: () => void;
  fadeIn: boolean;
  zoom: number;
}> = ({ marker, city, onClick, fadeIn, zoom }) => {

  const position = useMemo(
    () => ({ lat: marker.position.lat, lng: marker.position.lng }),
    [marker.position.lat, marker.position.lng]
  );

  const generalInfo = useContext(GlobalInfoContext);
  const linkPrefix = "/" + generalInfo?.currentYear + "/" + city ;

  return (
     <OverlayViewF position={position} mapPaneName="overlayMouseTarget">
    <div className={`marker-container ${fadeIn ? "fadeIn" : ""}`} onClick={onClick}>
      {(() => {
        switch (true) {
          case zoom >= 16:
            return (
              <Link href={`${linkPrefix}/${marker.slug}`} scroll={true} className="title-link" rel="noreferrer noopener">
                 {marker.image && (<div className="markerImage"><Image src={marker.image} className="object-cover" loading="lazy" fill sizes="(max-width: 768px) 25vw, 15vw" alt={marker.title}/></div>)}
                <div className="marker-text diff-sibiu-valcea diff-background">{marker.title}</div><div className={'marker-arrow '} />
                </Link>
            );
          case zoom <= 16:
            return (
              <Link href={`${linkPrefix}/${marker.slug}`} scroll={true} className="title-link" rel="noreferrer noopener">
               <div className="marker-text diff-sibiu-valcea diff-background">{marker.title}</div><div className={'marker-arrow '} />
              </Link>
            );
          // case zoom >= 14 && zoom <= 16:
          //   return <div className="pin-1"></div> 
          default:
            return null;
        }
      })()}
    </div>
  </OverlayViewF>
  );
};

const GoogleMapComponent: React.FC<{ markers?: MarkerType[] }> = ({markers = [], }) => {
  
  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city = isSibiu ? "sibiu" : "valcea";

  const valceaCenter = { lat: 45.0996, lng: 24.3692 };
  const sibiuCenter = { lat: 45.7966, lng: 24.1513 };
  const defaultCenter = isSibiu ? sibiuCenter : valceaCenter;

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
        mapContainerStyle={{width: "100%",height: "100%",}}
        center={center}
        zoom={zoom}
        options={{
          // gray-scale style
          styles: [{ featureType: "all",elementType: "all",stylers: [{ saturation: -100 }, { gamma: 0.5 }],},],
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
            city={city}
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
