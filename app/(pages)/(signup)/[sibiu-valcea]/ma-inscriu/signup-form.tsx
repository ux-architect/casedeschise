'use client'

import { useState } from 'react'
import { signupSubmit } from '@/app/actions/signupSubmit'
import { SignupFormType } from '@/types';
import { PortableText } from '@portabletext/react';
import FormSection from './form-section';
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

  const hasTermsCheckbox = Boolean(formSetup.terms_checkbox_label?.trim())
  const hasTermsContent = hasTermsCheckbox || Boolean(formSetup.terms_conditions?.length)

  const validateFormData = (formData: FormData) => {
    let name = formData.get('name')?.toString().trim() || '';
    let phone = formData.get('phone')?.toString().trim() || '';
    let email = formData.get('email')?.toString().trim() || '';
    const termsAccepted = formData.get('termsAccepted') === 'yes';

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
    if (hasTermsCheckbox && !termsAccepted) nextErrors.termsAccepted = ['Trebuie sa acceptati termenii si conditiile']

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
    <div className={`nsc--signup-form layout-container clearfix`}>
      
      {/* <h2>{formSetup.title}</h2> */}

      <form action={handleSubmit} className={` contact-form clearfix`}>
        <section className={`top-section position-relative float-left`} >

          {hasTermsContent && (
            <label className="terms-section diff-sibiu-valcea diff-background fl mt-30 clearfix display-block cursor-pointer" htmlFor="termsAccepted">
              {formSetup.terms_conditions && formSetup.terms_conditions.length > 0 && (
                <div className="terms-and-conditions">
                  <PortableText value={formSetup.terms_conditions} />
                </div>
              )}
              {hasTermsCheckbox && (
                <label className="terms-checkbox" >
                  <input id="termsAccepted" type="checkbox" name="termsAccepted" value="yes" required />
                  <span>{formSetup.terms_checkbox_label}</span>
                </label>
              )}
            </label>
          )}


          <div className={` inputs-section clearfix`}>
              <div className='form-group name'>
                <input className={''} name="name" placeholder='Nume și prenume' defaultValue="Vasile Amariei"/>
                {errors.name && <p className="input-validation">{errors.name.join(', ')}</p>}
              </div>

              <div className='form-group phone'>
                <input className={''} name="phone" placeholder='Telefon' defaultValue="0741234567"/>
                {errors.phone && <p className="input-validation">{errors.phone.join(', ')}</p>}
              </div>

              <div className='form-group email'>
                <input className={''} name="email" placeholder='Email' defaultValue="ux.studio.sibiu@gmail.com"/>
                {errors.email && <p className="input-validation">{errors.email.join(', ')}</p>}
              </div>
          </div>

        </section>

        <FormSection sectionClassName="s1-section" title={formSetup.s1_title} subtitle={formSetup.s1_subtitle} projects={formSetup.s1_projects} optionalItems={formSetup.s1_optionalItems} />
        <FormSection sectionClassName="s2-section" title={formSetup.s2_title} subtitle={formSetup.s2_subtitle} projects={formSetup.s2_projects} optionalItems={formSetup.s2_optionalItems} />
        <FormSection sectionClassName="s3-section" title={formSetup.s3_title} subtitle={formSetup.s3_subtitle} projects={formSetup.s3_projects} optionalItems={formSetup.s3_optionalItems} />

        <div id="submit" className='w-100'>
            {errors.termsAccepted && <p className="input-validation">{errors.termsAccepted.join(', ')}</p>}
              <button type="submit" disabled={status === 'loading'} className={`btn btn-primary btn-invert ${'diff-sibiu-valcea'}`}>Trimite</button>
              {status === 'success' && <div className="success">Mesaj trimis cu succes!</div>}
            {errors.options && <p className="input-validation">{errors.options.join(', ')}</p>}

        </div>

      </form>
    </div>
  )
}
