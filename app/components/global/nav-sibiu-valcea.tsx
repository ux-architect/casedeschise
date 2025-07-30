
import Link from "next/link";
import styles from './nav-sibiu-valcea.module.scss';

export default function Nav_Sibiu_Valcea() {
  return (
    <header className={`${styles['nav-sibiu-valcea']} float-left w-100`}>
      <Link href="/sibiu"  className="w-1/2 h-10 float-left"  style={{ background: '#cefb08'}}>SIBIU</Link>
      <Link href="/valcea" className="w-1/2 h-10 float-left" style={{ background: '#ff0db9'}}>VÂLCEA</Link>
    </header>
  );
}