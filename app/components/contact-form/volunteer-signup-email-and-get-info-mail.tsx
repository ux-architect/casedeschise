'use client'

import { useState } from 'react'
import { signupSubmit } from '@/app/actions/signupSubmit'
import Image from "next/image";
import { SiteInfoType } from '@/types';
import { useGlobalInfo } from '@/app/context/global-info-context';
import './contact-form.scss';

export function ContactForm() {
  
  const generalInfo: SiteInfoType = useGlobalInfo();

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleSubmit = async (formData: FormData) => {
    setStatus('loading')
    const result = await signupSubmit(formData)

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div id="devino-gazda" className={`nsc--volunteer-signup-email-and-get-info-mail clearfix float-left w-100`}>
      <section className={` contact-section position-relative float-left`}>

        
        <form action={handleSubmit} className={` contact-form clearfix`}>

          <div className='form-group name'>
            <input className={'diff-sibiu-valcea'} name="name" placeholder='Nume și prenume' />
            {errors.name && <p className="text-red-500">{errors.name.join(', ')}</p>}
          </div>
          
          <div id="submit" className='w-100'>
              <button type="submit" disabled={status === 'loading'} className={`btn btn-primary btn-invert ${'diff-sibiu-valcea'}`}>Trimite</button>
              {status === 'success' && <div className="success">Mesaj trimis cu succes!</div>}
          </div>
          
        </form>

      </section>
    </div>
  )
}