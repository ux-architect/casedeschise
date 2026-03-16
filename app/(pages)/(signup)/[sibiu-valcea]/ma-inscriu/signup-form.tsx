'use client'

import { useState } from 'react'
import { signupSubmit } from '@/app/actions/signupSubmit'
import { SignupFormType } from '@/types';
import Image from "next/image";
import './signup-form.scss';
import './signup-form.inputs.scss';


export default function SignupForm({ formSetup, city }: { formSetup: SignupFormType, city: string }) {

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const allProjects = [
    ...(formSetup.s1_projects || []),
    ...(formSetup.s2_projects || []),
    ...(formSetup.s3_projects || []),
  ]

  const validateFormData = (formData: FormData) => {
    let name = formData.get('name')?.toString().trim() || '';
    let phone = formData.get('phone')?.toString().trim() || '';
    let email = formData.get('email')?.toString().trim() || '';

    const options = formData.getAll('options').map((value) => value.toString().trim()).filter(Boolean)
    const selectedProjectsRaw = formData.get('selectedProjects')?.toString() || '[]'

    let selectedProjects: Array<{ name: string; code: string; info: string }> = []
    try {
      selectedProjects = JSON.parse(selectedProjectsRaw)
    } catch {
      selectedProjects = []
    }

    const nextErrors: Record<string, string[]> = {}

    if (!name) nextErrors.name = ['Numele este obligatoriu']
    if (!phone) nextErrors.phone = ['Telefonul este obligatoriu']
    if(options.length === 0) nextErrors.options = ['Selectati cel puțin un proiect de interes']
    if (selectedProjects.length === 0) nextErrors.options = ['Selectati cel puțin un proiect de interes']
    if (!email) {
      nextErrors.email = ['Emailul este obligatoriu']
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) { nextErrors.email = ['Email invalid']}
    }

    return nextErrors
  }

  const handleSubmit = async (formData: FormData) => {

    const selectedCodes = formData.getAll('options').map((value) => value.toString().trim()).filter(Boolean)

    const selectedProjects = allProjects
      .filter((project) => project.code && selectedCodes.includes(project.code))
      .map((project) => ({code: project.code || '', name: project.name || '', info: project.info || ''}))

    formData.set('selectedProjects', JSON.stringify(selectedProjects))
    formData.set('city', city)
    
    const clientErrors = validateFormData(formData)
    
    if (Object.keys(clientErrors).length > 0) {
      setStatus('error')
      setErrors(clientErrors)
      return
    }

    setStatus('loading')
    const result = await signupSubmit(formData)

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className={`nsc--signup-form clearfix float-left w-100`}>
      
      <h2>{formSetup.title}</h2>

      <form action={handleSubmit} className={` contact-form clearfix`}>
        <section className={`inputs-section position-relative float-left`}>

          {/* <Image src={generalInfo?.contactFormImage?.image || "/public/should-not-happen.jpg"} className="object-cover overlay"  loading="lazy" alt={`contact form background`} fill /> */}
          

            <div className={` contact-form clearfix`}>

            <div className='form-group name'>
              <input className={'diff-sibiu-valcea'} name="name" placeholder='Nume și prenume' defaultValue="Vasile Amariei"/>
              {errors.name && <p className="input-validation">{errors.name.join(', ')}</p>}
            </div>

            <div className='form-group phone'>
              <input className={'diff-sibiu-valcea'} name="phone" placeholder='Telefon' defaultValue="0741234567"/>
              {errors.phone && <p className="input-validation">{errors.phone.join(', ')}</p>}
            </div>

            <div className='form-group email'>
              <input className={'diff-sibiu-valcea'} name="email" placeholder='Email' defaultValue="ux.studio.sibiu@gmail.com"/>
              {errors.email && <p className="input-validation">{errors.email.join(', ')}</p>}
            </div>
            
            <div id="submit" className='w-100'>
                <button type="submit" disabled={status === 'loading'} className={`btn btn-primary btn-invert ${'diff-sibiu-valcea'}`}>Trimite</button>
                {status === 'success' && <div className="success">Mesaj trimis cu succes!</div>}
              {errors.options && <p className="input-validation">{errors.options.join(', ')}</p>}
            </div>
          </div>

        </section>



        {formSetup.s1_projects && formSetup.s1_projects.length > 0 && (
          <section className={`s1-section project-section position-relative float-left`}>
            <h6 className="diff-sibiu-valcea">{formSetup.s1_title}</h6>

            {formSetup.s1_projects.map((project, idx) => (
              <div key={idx} className="project float-left">
                <div className="project-name">{project.name}</div>
                <label className="project-image cursor-pointer">
                  <Image src={project.image || "/public/should-not-happen.jpg"} className="object-cover pointer-events-none" fill sizes="(max-width: 768px) 50vw, 25vw" alt={project.name || ''}/>  
                  <input className={'diff-sibiu-valcea'} type="checkbox" name="options" value={project.code} />
                </label>
                <div className="project-info">{project.info}</div>
              </div>
            ))}

          </section>
        )}

        {formSetup.s2_projects && formSetup.s2_projects.length > 0 && (
          <section className={`s2-section project-section position-relative float-left`}>
            <h6 className="diff-sibiu-valcea">{formSetup.s2_title}</h6>
            {formSetup.s2_projects.map((project, idx) => (
              <div key={idx} className="project float-left">
                <div className="project-name">{project.name}</div>
                <label className="project-image cursor-pointer">
                  <Image src={project.image || "/public/should-not-happen.jpg"} className="object-cover pointer-events-none" fill sizes="(max-width: 768px) 50vw, 25vw" alt={project.name || ''}/>  
                  <input className={'diff-sibiu-valcea'} type="checkbox" name="options" value={project.code} />
                </label>
                <div className="project-info">{project.info}</div>
              </div>
            ))}
          </section>
        )}

        {formSetup.s3_projects && formSetup.s3_projects.length > 0 && (
          <section className={`s3-section project-section position-relative float-left`}>
            <h6 className="diff-sibiu-valcea">{formSetup.s3_title}</h6>
            {formSetup.s3_projects.map((project, idx) => (
              <div key={idx} className="project float-left">
                <div className="project-name">{project.name}</div>
                <label className="project-image cursor-pointer">
                  <Image src={project.image || "/public/should-not-happen.jpg"} className="object-cover pointer-events-none" fill sizes="(max-width: 768px) 50vw, 25vw" alt={project.name || ''}/>  
                  <input className={'diff-sibiu-valcea'} type="checkbox" name="options" value={project.code} />
                </label>
                <div className="project-info">{project.info}</div>
              </div>
            ))}
          </section>
        )}
      </form>
    </div>
  )
}
