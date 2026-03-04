
export default function ScanLayout({children,}: {children: React.ReactNode;}) {
  return (
    <div style={{ minHeight: "100vh", background: "black", color: "white"
    }}>
      {children}
    </div>
  );
}