"use client";

import { LoadScriptNext } from "@react-google-maps/api";
import { ReactNode } from "react";

export default function ProvideJS_GoogleMaps({ children }: { children: ReactNode }) {
  return (
    <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} loadingElement={<></>}>
      <div className="clearfix">{children}</div>
    </LoadScriptNext>
  );
}