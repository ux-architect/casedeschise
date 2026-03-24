
import './layout.scss';

export default function ScanLayout({children,}: {children: React.ReactNode;}) {
  return (
    <div className="nsc-scan-layout position-relative">
      {children}
    </div>
  );
}