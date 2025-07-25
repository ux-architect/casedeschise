"use client";

import { LoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";

export default function ProvideJS_GoogleMaps({ children }: { children: ReactNode }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      {children}
    </LoadScript>
  );
}