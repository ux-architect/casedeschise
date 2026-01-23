'use client'

import './expand-section.scss';

import { ReactNode, useEffect, useRef, useState } from 'react';


export default function ExpandSection ({children, className = "" }: { children: ReactNode, className?: string; }) {

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { 
    const h = (e: MouseEvent | TouchEvent) => { ref.current  && setOpen(false)}
    open && document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [open])

  const cssClass_open: string  = open? "open" : "";
  return (

    <div className={`nsc--expand-section`} >
      <div ref={ref} className={`faq-item ${className} ${cssClass_open}`} onClick={() => {  setOpen(v => { return !v})}}>
        {children}
      </div>
    </div>
  )

}