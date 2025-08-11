

import dynamic from "next/dynamic";
import type { NextPage } from "next";
import GoogleMapComponent from "@/app/components/google-maps/google-map";
import ProvideJS_GoogleMaps from "@/app/components/google-maps/google-map-provider";


type CityKey = 'sibiu' | 'valcea';

export default async function CoverSection({ page = 'sibiu' }: { page: CityKey; }) {
  
  <div>
    <ProvideJS_GoogleMaps> 
      <GoogleMapComponent markers={[]} />
    </ProvideJS_GoogleMaps> 
  </div>
}

