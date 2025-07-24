import "./globals.css";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ro">
      <link rel="icon" href="/favicon.jpg" />
    <head>

    </head>

      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
