
import Link from "next/link";
import './nav-sibiu-valcea.scss';

export default function Nav_Sibiu_Valcea({ className}: { className?:string }) {

  return (
    <header className={`nsc--nav-sibiu-valcea ${className} float-left w-100`}>
      <Link href={`/sibiu`}  className="w-1/2 h-10 float-left"  style={{ background: '#cefb08'}} data-umami-click={`nav-sibiu (nav-sibiu-valcea)`}><span className="xhide-while-still-loading">SIBIU</span></Link>
      <Link href={`/valcea`} className="w-1/2 h-10 float-left" style={{ background: '#ff0db9'}} data-umami-click={`nav-valcea (nav-sibiu-valcea)`}><span className="xhide-while-still-loading">VÂLCEA</span></Link>
    </header>
  );
}