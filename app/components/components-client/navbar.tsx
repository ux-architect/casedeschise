'use client'
import Link from "next/link"
import Image from "next/image";
import styles from './navbar.module.scss'
import { useRef, useEffect, useState, ReactNode } from "react"
import { usePathname } from "next/navigation"
import { SiteInfoType } from "@/types"
import { urlFor } from "@/sanity/sanity.client";


// Minimal, reusable Dropdown component
const Dropdown = ({ label, children }: { label: ReactNode, children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    open && document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])

  const cssClass_open: string  = open? "open" : "";
  return (
    <div ref={ref} className="dropdown-container">
      <a className="link diff-sibiu-valcea" aria-haspopup="true" aria-expanded={open} type="button" onClick={() => setOpen(v => !v)}>{label}</a>
      <div className={`dropdown-menu ${cssClass_open}`} role="menu">{children}</div>
    </div>
  )
}

export default function Navbar ({ generalInfo}: { generalInfo:SiteInfoType }){

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const cssClass_city = isSibiu ? "sibiu" : "valcea";

  let url_cover = generalInfo?.siteEntryCover[cssClass_city]?.url ? urlFor(generalInfo?.siteEntryCover?.[cssClass_city].url).width(960).height(1080).auto('format').quality(99): null;

  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {document.body.classList.toggle('mobile-nav-open', navOpen);}, [navOpen]);
 
  var cssClass_navIsActive = navOpen ? "open" : '';
  var cssClass_menuIsActive = navOpen ? "active-menu" : '';

  const linkPrefix = "/" + generalInfo?.currentYear + "/" + cssClass_city ;
  
  return (

      <>
        <div id="#nav-mobile" className={`nav-mobile`}>
          <a className={`main-nav-toggle ${cssClass_menuIsActive} diff-sibiu-valcea`} href="#main-nav" onClick={e => { e.preventDefault(); setNavOpen(navOpen => !navOpen); } }><i className="diff-sibiu-valcea diff-background">Menu</i></a>
        </div>
        <nav id="custom-responsive-nav" className={`${cssClass_navIsActive} hide-while-still-loading clearfix float-left`}>
        <div className="flex-container">
          {/* <Image src={`${url_cover}`} className="object-cover mobile-menu-background" fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="cover" /> */}

          <Link href={`${linkPrefix}#despre`} className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Despre</Link>

          <Dropdown label="Program">
            <Link href="#cladiri" className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Cladiri</Link>
            <Link href="#tururi" className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Tururi</Link>
            <Link href="#evenimente" className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Evenimente</Link>
          </Dropdown>

          <Dropdown label="Comunitate">
            <Link href="/services/design" className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Echipa</Link>
            <Link href="/services/development" className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Voluntari</Link>
            <Link href="/services/seo" className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Parteneri</Link>
            <Link href="/services/seo" className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Sustinatori</Link>
            <Link href="#devino-gazda" className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Devino gazda</Link>
            <Link href="/map" className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Harta</Link>
          </Dropdown>

          <Link href="#devino-gazda" className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Arhiva</Link>
          <Link href="/contact" className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Contact</Link>
          <Link href="/contact" className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>FAQ</Link>

        </div>
        </nav>
      </>
        
  );
};

