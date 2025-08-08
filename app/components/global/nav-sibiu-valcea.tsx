
import Link from "next/link";
import styles from './nav-sibiu-valcea.module.scss';
import { SiteInfoType } from "@/types";

export default function Nav_Sibiu_Valcea({ generalInfo, className}: { generalInfo:SiteInfoType, className?:string }) {

  return (
    <header className={`${styles['nav-sibiu-valcea']} ${className} float-left w-100`}>
      <Link href={`/${generalInfo.currentYear}/sibiu`}  className="w-1/2 h-10 float-left"  style={{ background: '#cefb08'}}><span className="hide-while-still-loading">SIBIU</span></Link>
      <Link href={`/${generalInfo.currentYear}/valcea`} className="w-1/2 h-10 float-left" style={{ background: '#ff0db9'}}><span className="hide-while-still-loading">VÂLCEA</span></Link>
    </header>
  );
}