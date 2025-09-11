import Script from "next/script";
import AddCityClassToBody from "./components/components-client/add-city-class-to-body";
import AddMobileClassToBody from "./components/components-client/add-mobile-class-to-body";
import "./styles/globals.scss";
import localFont from 'next/font/local';

const poppins = localFont({
  src: [
    { path: './_fonts/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: './_fonts/Poppins-Bold.ttf', weight: '700', style: 'normal' }
  ],
  variable: '--font-poppins',
  display: 'swap',
});

const safiro = localFont({ src: [{ path: './_fonts/safiro-medium.otf', weight: '400', style: 'normal' },],variable: '--font-lora',display: 'swap',});

export default async function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="ro">

    <head><link rel="icon" href="/favicon.ico" />
    {process.env.NODE_ENV === 'production' && ( <Script async src="/scripts/umami-tracking.js" data-host-url="https://umami-app-ux-studio-sibiu.fly.dev/" data-website-id="4d2bd780-148b-40ef-9f49-e6c83c1f480f" strategy="afterInteractive"/>)}
    </head>

      <body className={`${poppins.variable} ${safiro.variable} clearfix city-is-sibiu still-loading`}>
          <AddCityClassToBody/>
          <AddMobileClassToBody/>
          {children}
      </body>
    </html>
  );
}


