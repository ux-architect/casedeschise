'use client'
import Link from "next/link"
import { useRef, useEffect, useState, ReactNode } from "react"
import Image from "next/image";
import { usePathname } from "next/navigation"
import { SiteInfoType } from "@/types"
import Nav_Sibiu_Valcea from "../global/nav-sibiu-valcea";
import SocialMediaSection from "../components-ui/social-media-section";



// Minimal, reusable Dropdown component
const Dropdown = ({ label, children, className }: { label: ReactNode, children: ReactNode, className?: string; }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { 
    const h = (e: MouseEvent | TouchEvent) => { ref.current  && setOpen(false)}
    open && document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [open])

  const cssClass_open: string  = open? "open" : "";
  return (
    <div ref={ref} className={`dropdown-container ${className} ${cssClass_open}`} >
      <a className="link diff-sibiu-valcea" aria-haspopup="true" aria-expanded={open} type="button" onClick={() => {  setOpen(v => { return !v})}}>{label}</a>
      <div className={`dropdown-menu ${cssClass_open}`} role="menu">{children}</div>
    </div>
  )
}

export default function Navbar ({ generalInfo}: { generalInfo:SiteInfoType }){

  const pathname = usePathname()
  const isSibiu = pathname.split('/').includes('sibiu');
  const city = isSibiu ? "sibiu" : "valcea";

  const [navOpen, setNavOpen] = useState(false)
  const [noHighlight, setNoHighlight] = useState(false);


// prevent scrolling when nav is open
useEffect(() => {
  if (navOpen) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.classList.add('mobile-nav-open');
  } else {
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);

    html.style.scrollBehavior = prevScrollBehavior;
    document.body.classList.remove('mobile-nav-open');
  }
}, [navOpen]);


  useEffect(() => {
      const checkNoHighlight = () => {
        const hasNoHighlightElement = document.querySelector('[data-no-highlight-on-nav]') !== null;
        setNoHighlight(hasNoHighlightElement);
      };

      checkNoHighlight(); // Initial check on mount
      const observer = new MutationObserver(checkNoHighlight);
      observer.observe(document.body, {childList: true,subtree: true, });

    return () => observer.disconnect();
  }, []);

  // sticky mobile menu
  useEffect(() => {
    const addStickyClassToNav = () => {
      
      const navMobile = document.getElementById("nav-mobile");
      if (!navMobile || window.innerWidth >= 768) return;
      const scrollElem = document.scrollingElement || document.documentElement;
      if (scrollElem.scrollTop > window.innerHeight) {navMobile.classList.add("scrolled-past-100vh");} 
      else {navMobile.classList.remove("scrolled-past-100vh");}
    };

    requestAnimationFrame(() => { setTimeout(addStickyClassToNav, 100);});

    window.addEventListener("scroll", addStickyClassToNav);
    return () => window.removeEventListener("scroll", addStickyClassToNav);
  });

  var cssClass_navIsActive = navOpen ? "open" : '';
  var cssClass_menuIsActive = navOpen ? "active-menu" : '';
  var cssClass_noHighlight = noHighlight ? "no-highlight-on-nav": "";

  const linkPrefix = "/" + generalInfo?.currentYear + "/" + city ;

  return (

      <>
        <div id="nav-mobile" className={`nav-mobile`} >
          <div className={`main-nav-toggle ${cssClass_menuIsActive} diff-sibiu-valcea`} onClick={e => { e.preventDefault(); setNavOpen(navOpen => !navOpen); } }><i className="diff-sibiu-valcea diff-background">Menu</i></div>
        </div>

        <nav id="custom-responsive-nav" className={`${cssClass_navIsActive} ${cssClass_noHighlight} hide-while-still-loading clearfix float-left`}>
          {/* <Nav_Sibiu_Valcea generalInfo = {generalInfo} className="position-absolute"/> */}
          <div className="flex-container">
  
            <Link href={`${linkPrefix}#despre`} className="link diff-sibiu-valcea hide-on-mobile" onClick={() => setNavOpen(false)}>Despre</Link>
            <Link href={`/about/${city}`} className="link diff-sibiu-valcea hide-on-desktop" onClick={() => setNavOpen(false)}>Despre</Link>

            <Dropdown label="Program" className="smaller">
              <Link href={`${linkPrefix}#obiective`} className="dropdown-link diff-sibiu-valcea" onClick={() => { setNavOpen(false)}}><span className="line">[</span>Cladiri<span className="line">]</span></Link>
              <Link href={`${linkPrefix}#tururi`} className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}><span className="line">[</span>Tururi<span className="line">]</span></Link>
              <Link href={`${linkPrefix}#evenimente`} className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}><span className="line">[</span>Evenimente<span className="line">]</span></Link>
            </Dropdown>

            <Dropdown label="Comunitate" className="smaller">
              <Link href={`${linkPrefix}#echipa`} className="dropdown-link diff-sibiu-valcea smaller hide-on-mobile" onClick={() => setNavOpen(false)}><span className="line">[</span>Echipa<span className="line">]</span></Link>
              <Link href={`/team/${city}`} className="dropdown-link diff-sibiu-valcea hide-on-desktop" onClick={() => setNavOpen(false)}>Echipa</Link>
              
              <Link href={`${linkPrefix}#voluntari`} className="dropdown-link diff-sibiu-valcea smaller" onClick={() => setNavOpen(false)}><span className="line">[</span>Voluntari<span className="line">]</span></Link>
              <Link href={`${linkPrefix}#parteneri`} className="dropdown-link diff-sibiu-valcea smaller" onClick={() => setNavOpen(false)}><span className="line">[</span>Parteneri<span className="line">]</span></Link>
              <Link href={`${linkPrefix}#devino-gazda`} className="dropdown-link diff-sibiu-valcea smaller hide-on-mobile" onClick={() => setNavOpen(false)}><span className="line">[</span>Devino gazdă<span className="line">]</span></Link>
              {/* <Link href={`${linkPrefix}/map`} className="dropdown-link diff-sibiu-valcea smaller" onClick={() => setNavOpen(false)}><span className="line">[</span>Harta <span className="line">]</span></Link> */}
            </Dropdown>

            <Link href={`${linkPrefix}/map`} className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Hartă</Link>
            <Link href={`/arhiva`} className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Arhivă</Link>
            <Link href={`${linkPrefix}#contact`} className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Contact</Link>
            <Link href={`/faq/${city}`} className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>FAQ</Link>

          </div>
          
        </nav>

        <SocialMediaSection city={city} generalInfo={generalInfo}></SocialMediaSection>
      </>
        
  );
};

