

import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import Nav_Sibiu_Valcea from "../components/global/nav-sibiu-valcea";
import { SiteInfoType } from "@/types";
import { getGeneralInfo } from "@/sanity/sanity.query";


export default async function MainLayout({children}: {children: React.ReactNode}) {

  const generalInfo: SiteInfoType = await getGeneralInfo();

  return (
            <>
              <Nav_Sibiu_Valcea />
              <Navbar generalInfo = {generalInfo} /> 
                <div className="float-left w-full" > {children} </div> 
              <Footer /> 
            </>

  );
}
