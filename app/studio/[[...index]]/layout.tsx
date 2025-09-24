
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <head></head>
      <body className={`bg-zinc-900 text-white`}>{children}</body>
    </html>
  );
}
