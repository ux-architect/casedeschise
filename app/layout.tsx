import { SiteInfoType } from "@/types";
import "./styles/globals.scss";
import localFont from 'next/font/local';

import { getGeneralInfo } from "@/sanity/sanity.query";
import { GlobalInfoProvider } from "./context/global-info-provider";
import AddCityClassToBody from "./components/components-client/add-city-class-to-body";


const poppins = localFont({
  src: [
    { path: './_fonts/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    // { path: './_fonts/Poppins-Bold.ttf', weight: '700', style: 'normal' }
  ],
  variable: '--font-poppins',
  display: 'swap',
});

const safiro = localFont({ src: [{ path: './_fonts/safiro-medium.otf', weight: '400', style: 'normal' },],variable: '--font-lora',display: 'swap',});

export default async function RootLayout({children}: {children: React.ReactNode}) {

  const generalInfo: SiteInfoType = await getGeneralInfo();

  return (
    <html lang="ro">
      <link rel="icon" href="/favicon.jpg" />
    <head>

    </head>

      <body className={`${poppins.variable} ${safiro.variable}`}> <AddCityClassToBody/>
        
        <GlobalInfoProvider value={generalInfo}> {/*  adds acces to generalInfo data on all child csr components */}
          {children}
        </GlobalInfoProvider>
        
      </body>
    </html>
  );
}


