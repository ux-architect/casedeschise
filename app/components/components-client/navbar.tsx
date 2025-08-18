'use client'
import Link from "next/link"
import { useRef, useEffect, useState, ReactNode } from "react"
import Image from "next/image";
import { usePathname } from "next/navigation"
import { SiteInfoType } from "@/types"
import Nav_Sibiu_Valcea from "../global/nav-sibiu-valcea";



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

  // social-media
  var link_Facebook = generalInfo?.socialMedia.find(item => item.city === city && item.name === "facebook")?.link;
  var link_Instagram = generalInfo?.socialMedia.find(item => item.city === city && item.name === "instagram")?.link;
  
  return (

      <>
      

        <div id="nav-mobile" className={`nav-mobile`} >
          <div className={`main-nav-toggle ${cssClass_menuIsActive} diff-sibiu-valcea`} onClick={e => { e.preventDefault(); setNavOpen(navOpen => !navOpen); } }><i className="diff-sibiu-valcea diff-background">Menu</i></div>
        </div>
        <nav id="custom-responsive-nav" className={`${cssClass_navIsActive} ${cssClass_noHighlight} hide-while-still-loading clearfix float-left`}>
          {/* <Nav_Sibiu_Valcea generalInfo = {generalInfo} className="position-absolute"/> */}
          <div className="flex-container">
  
            <Link href={`${linkPrefix}#despre`} className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Despre</Link>

            <Dropdown label="Program" className="smaller">
              <Link href={`${linkPrefix}#obiective`} className="dropdown-link diff-sibiu-valcea" onClick={() => { setNavOpen(false)}}><span className="line">[</span>Cladiri<span className="line">]</span></Link>
              <Link href={`${linkPrefix}#tururi`} className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}><span className="line">[</span>Tururi<span className="line">]</span></Link>
              <Link href={`${linkPrefix}#evenimente`} className="dropdown-link diff-sibiu-valcea" onClick={() => setNavOpen(false)}><span className="line">[</span>Evenimente<span className="line">]</span></Link>
            </Dropdown>

            <Dropdown label="Comunitate" className="smaller">
              <Link href={`${linkPrefix}#echipa`} className="dropdown-link diff-sibiu-valcea smaller" onClick={() => setNavOpen(false)}><span className="line">[</span>Echipa<span className="line">]</span></Link>
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
          
          {link_Facebook ? (<Link className="social-icon" href={`${link_Facebook}`} target="_blank">
            <svg className="facebook diff-sibiu-valcea" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" fill="currentColor"></path>
            </svg>
          </Link>) : null}

          {link_Instagram ? (<Link className="social-icon" href={`${link_Instagram}`} target="_blank">
            <svg className="instagram diff-sibiu-valcea" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="currentColor"></path>
            </svg>
          </Link>) : null}

        </nav>
      </>
        
  );
};

