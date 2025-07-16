"use client";

import dynamic from "next/dynamic";
import type { NextPage } from "next";

const GoogleMapComponent = dynamic(
  () => import("../../components/google-map"),
  { ssr: false }
);

const Home: NextPage = () => (
  <div>
    <h1>Google Maps Example</h1>
    <GoogleMapComponent />
  </div>
);

export default Home;