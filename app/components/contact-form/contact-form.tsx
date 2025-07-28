'use client'

import { useState } from 'react'
import { sendContactEmail } from '@/app/actions/sendContactEmail'
import Image from "next/image";
import { SiteInfoType } from '@/types';
import { useGlobalInfo } from '@/app/context/global-info-context';
import styles from './contact-form.module.scss';
import { usePathname } from 'next/navigation';

export function ContactForm() {
  
  const pathname = usePathname()
  const isSibiu = pathname === '/sibiu' || pathname.startsWith('/sibiu/')
  const isValcea = pathname === '/valcea' || pathname.startsWith('/valcea/')
  const cssClass_city = isSibiu ? "sibiu" : isValcea ? "valcea" : "";

  const generalInfo: SiteInfoType = useGlobalInfo();

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string[]>>({})


  
  const handleSubmit = async (formData: FormData) => {
    setStatus('loading')
    const result = await sendContactEmail(formData)

    if (result.success) {
      setStatus('success')
      setErrors({})
    } else {
      setStatus('error')
      setErrors(result.errors || {})
    }
  }

  return (
    <div className={`${styles['namespace-wrapper']}`}>
      <section className={` ${cssClass_city} contact-section position-relative`}>

        <Image src={generalInfo?.contactFormImage?.image || "/should-not-happen.jpg"} className="object-cover overlay" alt={`contact form background`} fill />
        <form action={handleSubmit} className={` ${cssClass_city} contact-form clearfix`}>

          <div className='form-group name'>
            <input className={cssClass_city} name="name" placeholder='Nume și prenume' />
            {errors.name && <p className="text-red-500">{errors.name.join(', ')}</p>}
          </div>

          <div className='form-group address'>
            <input className={cssClass_city} name="address" placeholder='Adresa' />
            {errors.address && <p className="text-red-500">{errors.address.join(', ')}</p>}
          </div>

          <fieldset className='form-group architectural-function'>

            {['locuire', 'Administrativ/birouri', 'servicii/turism', 'atelier/studio', 'mixt'].map((label) => (
              <label key={label} className="">
                <input className={cssClass_city} type="checkbox" name="options" value={label} />
                <span>{label}</span>
              </label>
            ))}

          </fieldset>

          <div className='form-group details'>
            <textarea className={cssClass_city} name="details" rows={4} placeholder='De ce ar merita vizitată aceasă clădire?' ></textarea>
            {errors.details && <p className="text-red-500">{errors.details.join(', ')}</p>}
          </div>

          
          <div id="submit" className='w-100'>
              <button type="submit" disabled={status === 'loading'} className={`btn btn-primary ${cssClass_city}`}>Trimite</button>
              {status === 'success' && <div className="success">Mesaj trimis cu succes!</div>}
          </div>
          
        </form>

      </section>
    </div>
  )
}