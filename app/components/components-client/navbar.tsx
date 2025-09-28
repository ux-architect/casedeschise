'use client'
import Link from "next/link"
import { useRef, useEffect, useState, ReactNode } from "react"
import { usePathname } from "next/navigation"
import { SiteInfoType } from "@/types"

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

  const linkPrefix =  "/" + city ;

  return (

      <>
        <div id="nav-mobile" className={`nav-mobile`} >
          <div className={`main-nav-toggle ${cssClass_menuIsActive} diff-sibiu-valcea`} onClick={e => { e.preventDefault(); setNavOpen(navOpen => !navOpen); } }><i className="diff-sibiu-valcea diff-background">Menu</i></div>
        </div>

        <nav id="custom-responsive-nav" className={`${cssClass_navIsActive} ${cssClass_noHighlight} hide-while-still-loading clearfix float-left`}>

          <div className="flex-container">
  
            <Link href={`${linkPrefix}#despre`} className="link diff-sibiu-valcea hide-on-mobile" data-umami-click={`despre (nav)(${city})`} onClick={() => setNavOpen(false)}>Despre</Link>
            <Link href={`${linkPrefix}/about`} className="link diff-sibiu-valcea hide-on-desktop" data-umami-click={`despre (nav-mobile)(${city})`} onClick={() => setNavOpen(false)}>Despre</Link>

            <Dropdown label="Program" className="smaller">
              <Link href={`${linkPrefix}#obiective`} className="dropdown-link diff-sibiu-valcea" data-umami-click={`obiective (nav)(${city})`} onClick={() => { setNavOpen(false)}}><span className="line">[</span>Obiective<span className="line">]</span></Link>
              <Link href={`${linkPrefix}#tururi`} className="dropdown-link diff-sibiu-valcea" data-umami-click={`tururi (nav)(${city})`} onClick={() => setNavOpen(false)}><span className="line">[</span>Tururi Ghidate<span className="line">]</span></Link>
              <Link href={`${linkPrefix}#evenimente`} className="dropdown-link diff-sibiu-valcea" data-umami-click={`evenimente (nav)(${city})`} onClick={() => setNavOpen(false)}><span className="line">[</span>Evenimente<span className="line">]</span></Link>
              <Link href={`${linkPrefix}#activitati-copii`} className="dropdown-link diff-sibiu-valcea" data-umami-click={`activitati-copii (nav)(${city})`} onClick={() => setNavOpen(false)} style={{ minWidth: "210px" }}><span className="line">[</span>Activități copii<span className="line">]</span></Link>
            </Dropdown>

            <Dropdown label="Comunitate" className="smaller">
              {/* Echipa */}
              <Link href={`${linkPrefix}#echipa`} className="dropdown-link diff-sibiu-valcea smaller hide-on-mobile" data-umami-click={`echipa (nav)(${city})`} onClick={() => setNavOpen(false)}><span className="line">[</span>Echipa<span className="line">]</span></Link>
              <Link href={`${linkPrefix}/team`} className="dropdown-link diff-sibiu-valcea hide-on-desktop" data-umami-click={`echipa (nav-mobile)(${city})`} onClick={() => setNavOpen(false)}>Echipa</Link>
              {/* Parteneri */}
              <Link href={`${linkPrefix}#initiator`} className="dropdown-link diff-sibiu-valcea smaller" data-umami-click={`parteneri (nav)(${city})`} onClick={() => setNavOpen(false)}><span className="line">[</span>Parteneri<span className="line">]</span></Link>
            </Dropdown>

            {/* <Link href={`${linkPrefix}/map`} className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Hartă</Link> */}
            {/* <Link href={`/arhiva`} className="link diff-sibiu-valcea" onClick={() => setNavOpen(false)}>Arhivă</Link> */}
            <Link href={`${linkPrefix}#contact`} className="link diff-sibiu-valcea" data-umami-click={`contact (nav)(${city})`}  onClick={() => setNavOpen(false)}>Contact</Link>
            <Link href={`${linkPrefix}/faq`} className="link diff-sibiu-valcea" data-umami-click={`faq (nav)(${city})`}  onClick={() => setNavOpen(false)}>FAQ</Link>

          </div>
          
        </nav>

      </>
        
  );
};

