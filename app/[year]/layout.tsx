

import Navbar from "../components/components-client/navbar";
import Nav_Sibiu_Valcea from "../components/global/nav-sibiu-valcea";
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";
import ProvideJS_GoogleMaps from "../components/google-maps/google-map-provider";
import AddCityClassToBody from "../components/components-client/add-city-class-to-body";
import AddMobileClassToBody from "../components/components-client/add-mobile-class-to-body";
import { GlobalInfoProvider } from "../context/global-info-provider";



export default async function MainLayout({children}: {children: React.ReactNode}) {

  const generalInfo: SiteInfoType = await getGeneralInfo();

  return (
            <GlobalInfoProvider value={generalInfo}> {/*  adds acces to generalInfo data on all child csr components */}
              <AddCityClassToBody/>
              <AddMobileClassToBody/>

              <Nav_Sibiu_Valcea generalInfo = {generalInfo}/>
              <Navbar generalInfo = {generalInfo} /> 

                  {/* <ProvideJS_GoogleMaps> */}
                    <div className="float-left w-100" > {children} </div>
                  {/* </ProvideJS_GoogleMaps> */}
            </GlobalInfoProvider>

  );
}
