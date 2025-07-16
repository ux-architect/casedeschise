

import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import Nav_Sibiu_Valcea from "../components/global/nav-sibiu-valcea";

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
            <>
              <Nav_Sibiu_Valcea />
              <Navbar />
              <div className="overflow-y-auto float-left w-full" style={{height: 'calc(100vh - 100px)'}}>
                {children}    
              </div> 
              <Footer /> 
            </>

  );
}
