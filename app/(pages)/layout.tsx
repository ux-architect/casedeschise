

import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import Nav_Sibiu_Valcea from "../components/global/nav-sibiu-valcea";
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";
import ProvideJS_GoogleMaps from "../components/google-maps/google-map-provider";


export default async function MainLayout({children}: {children: React.ReactNode}) {

  const generalInfo: SiteInfoType = await getGeneralInfo();

  return (
            <>
              <Nav_Sibiu_Valcea />
              <Navbar generalInfo = {generalInfo} /> 

                  <ProvideJS_GoogleMaps>
                    <div className="float-left w-full" > {children} </div>
                  </ProvideJS_GoogleMaps> 

              <Footer /> 
            </>

  );
}
