import { SiteInfoType } from "@/types";
import "./globals.css";
import { Inter } from "next/font/google";
import { getGeneralInfo } from "@/sanity/sanity.query";
import { GlobalInfoProvider } from "./context/global-info-provider";


const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({children}: {children: React.ReactNode}) {

  const generalInfo: SiteInfoType = await getGeneralInfo();
  
  return (
    <html lang="ro">
      <link rel="icon" href="/favicon.jpg" />
    <head>

    </head>

      <body className={`${inter.className}`}>

        <GlobalInfoProvider value={generalInfo}> {/*  adds acces to generalInfo data on all child csr components */}
          {children}
        </GlobalInfoProvider>
        
      </body>
    </html>
  );
}
