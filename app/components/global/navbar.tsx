'use client'
import Link from "next/link"
import Image from "next/image";
import styles from './navbar.module.scss'
import { useRef, useEffect, useState, ReactNode } from "react"
import { usePathname } from "next/navigation"
import { SiteInfoType } from "@/types"
import { urlFor } from "@/sanity/sanity.client"

// Minimal, reusable Dropdown component
const Dropdown = ({ label, children }: { label: ReactNode, children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    open && document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])
  return (
    <div ref={ref} className="dropdown-container">
      <button className="link" aria-haspopup="true" aria-expanded={open} type="button" onClick={() => setOpen(v => !v)}>{label}</button>
      {open && <div className="dropdown-menu" role="menu">{children}</div>}
    </div>
  )
}

export default function Navbar ({ generalInfo, page = 'sibiu' }: { generalInfo:SiteInfoType, page?: string; }){

  const pathname = usePathname()
  const isSibiu = pathname === '/sibiu' || pathname.startsWith('/sibiu/')
  const isValcea = pathname === '/valcea' || pathname.startsWith('/valcea/')
  const cssClass_city = isSibiu ? "sibiu" : isValcea ? "valcea" : "";

  let url_cover_sibiu = generalInfo.coverMain?.[0]?.image ? urlFor(generalInfo.coverMain?.[0]?.image).width(960).height(1080).auto('format').quality(99): null;
  let url_cover_valcea = generalInfo.coverMain?.[1]?.image ? urlFor(generalInfo.coverMain?.[1]?.image).width(960).height(1080).auto('format').quality(99) : null;
  const url_cover = isSibiu ? url_cover_sibiu : isValcea ? url_cover_valcea : null;

  const [navOpen, setNavOpen] = useState(false)
 
  var cssClass_navIsActive = navOpen ? "open" : '';
  var cssClass_menuIsActive = navOpen ? "active-menu" : '';

  

  
  return (

    <>
      <div className={`${styles['hamburger']}`}>
        <a className={`main-nav-toggle ${cssClass_menuIsActive} ${cssClass_city} `} href="#main-nav" onClick={e => { e.preventDefault(); setNavOpen(navOpen => !navOpen); }}><i>Menu</i></a>
      </div>

      <nav className={`${styles['nav']} ${cssClass_city} ${cssClass_navIsActive}`}>

        <Image src={`${url_cover}`} className="object-cover mobile-menu-background" fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="sibiu-cover"/>
          
          <Link href="/" className="link">Despre</Link>

          <Dropdown label="Program ▼">
            <Link href="/services/design" className="dropdown-link">Cladiri</Link>
            <Link href="/services/development" className="dropdown-link">Tururi</Link>
            <Link href="/services/seo" className="dropdown-link">Evenimente</Link>
          </Dropdown>

          <Dropdown label="Comunitate ▼">
            <Link href="/services/design" className="dropdown-link">Echipa</Link>
            <Link href="/services/development" className="dropdown-link">Voluntari</Link>
            <Link href="/services/seo" className="dropdown-link">Parteneri</Link>
            <Link href="/services/seo" className="dropdown-link">Sustinatori</Link>
            <Link href="/services/seo" className="dropdown-link">Devino gazda</Link>
            <Link href="/map" className="dropdown-link">Harta</Link>
          </Dropdown>

          <Link href="/about" className="link">Arhiva</Link>
          <Link href="/contact" className="link">Contact</Link>
          <Link href="/contact" className="link">FAQ</Link>
        </nav>
      </>
  );
};

