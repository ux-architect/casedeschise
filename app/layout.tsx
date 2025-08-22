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

    <head><link rel="icon" href="/favicon.ico" /></head>

      <body className={`${poppins.variable} ${safiro.variable} clearfix city-is-sibiu still-loading`}>
          <AddMobileClassToBody/>
          {children}
      </body>
    </html>
  );
}


