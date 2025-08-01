

import dynamic from "next/dynamic";
import type { NextPage } from "next";
import GoogleMapComponent from "@/app/components/google-maps/google-map";



const Home: NextPage = () => (
  <div>
    <h1>Google Maps Example</h1>
    <GoogleMapComponent />
  </div>
);

export default Home;