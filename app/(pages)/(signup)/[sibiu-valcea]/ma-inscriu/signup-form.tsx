'use client'

import { FormEvent, useState } from 'react'
import { signupSubmit } from '@/app/actions/signupSubmit'
import { SignupFormType } from '@/types';
import { PortableText } from '@portabletext/react';
import FormSection from './form-section';
import './signup-form.scss';
import './signup-form.inputs.scss';


export default function SignupForm({ formSetup, city }: { formSetup: SignupFormType, city: string }) {

  const [status, setStatus] = useState<'' | 'disabled' | 'loading' | 'success' | 'validation-errors' | 'error'>('disabled')
  const [clientValidationErrors, setClientValidationErrors] = useState<Record<string, string[]>>({})
  const [submittedEmail, setSubmittedEmail] = useState('')

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
    try { selectedProjects = JSON.parse(selectedProjectsRaw)}
    catch { selectedProjects = []}

    const validationErrors: Record<string, string[]> = {}

    if (!name) validationErrors.name = ['Numele este obligatoriu']
    if (!phone) validationErrors.phone = ['Telefonul este obligatoriu']
    if(options.length === 0) validationErrors.options = ['Selectati cel puțin un proiect de interes']
    if (selectedProjects.length === 0) validationErrors.options = ['Selectati cel puțin un proiect de interes']
    if (!email) {
      validationErrors.email = ['Emailul este obligatoriu']
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) { validationErrors.email = ['Email invalid']}
    }
    if (hasTermsCheckbox && !termsAccepted) validationErrors.termsAccepted = ['Trebuie sa acceptati termenii si conditiile']

    
    if (Object.keys(validationErrors).length > 0) {
      validationErrors.validationSummary = Object.values(validationErrors).flat()
    }

    return validationErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)

      const emailValue = formData.get('email')?.toString().trim() || ''

      const selectedCodes = formData.getAll('options').map((value) => value.toString().trim()).filter(Boolean)

      const selectedProjects = allProjects
        .filter((project) => project.code && selectedCodes.includes(project.code))
        .map((project) => ({code: project.code || '', name: project.name || '', info: project.info || ''}))

      formData.set('selectedProjects', JSON.stringify(selectedProjects))
      formData.set('city', city)
      
      const nextClientValidationErrors = validateFormData(formData)

      if (Object.keys(nextClientValidationErrors).length > 0) { setStatus('validation-errors'); setClientValidationErrors(nextClientValidationErrors); return }

      setStatus('loading'); setClientValidationErrors({});
      const result = await signupSubmit(formData)

      if (result.success) { setSubmittedEmail(emailValue); setStatus('success') }
      else { setStatus('error')}
  }

  const cssClass_sectionDisabled = (status === 'disabled') ? 'section-disabled' : '';
  let useDefaultContactValues = process.env.NODE_ENV === 'development' ? true : false;
  // useDefaultContactValues = false;

  if (status === 'success') {
    return (
      <div className="nsc--signup-form nsc--signup-form-success layout-container clearfix">
        <div className="success-screen">
            <p className="success-message">Înscriere confirmată! <br/>  Vei primi un email cu cod QR pe adresa "{submittedEmail}".</p>
            <a className="btn btn-black btn-large margin-0-auto" href={`/${city.toLowerCase()}`}>OK</a>
        </div>
         <style>{`#custom-responsive-nav, .cover{display:none;}`}</style>
      </div>
    )
  }

  return (
    <div className={`nsc--signup-form layout-container clearfix`}>
      
      {/* <h2>{formSetup.title}</h2> */}

      <form onSubmit={handleSubmit} className={` contact-form clearfix`}>
        <section className={`top-section position-relative float-left`} >

          {hasTermsContent && (
            <div className="terms-section diff-sibiu-valcea diff-background fl mt-30 clearfix display-block">
              {formSetup.terms_conditions && formSetup.terms_conditions.length > 0 && (
                <div className="terms-and-conditions">
                  <PortableText value={formSetup.terms_conditions} />
                </div>
              )}
              {hasTermsCheckbox && (
                <div className="terms-checkbox" >
                  <input id="termsAccepted" type="checkbox" name="termsAccepted" value="yes" className={clientValidationErrors.termsAccepted ? 'input-validation-error' : ''} required onChange={(e) => setStatus(e.target.checked ? '' : 'disabled')} />
                  <span>
                    <span className="font-weight-bold">{formSetup.terms_checkbox_label}</span>
                    <span> ( * obligatoriu pentru a continua inscrierea )</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </section>

        
        <section className={`inputs-section float-left clearfix ${cssClass_sectionDisabled}`}>
            <div className='form-group name'>
              <input className={clientValidationErrors.name ? 'input-validation-error' : ''} name="name" placeholder='* Nume și prenume' {...(useDefaultContactValues ? { defaultValue: "Vasile Amariei" } : {})}/>
              {clientValidationErrors.name && <p className="input-validation">{clientValidationErrors.name.join(', ')}</p>}
            </div>

            <div className='form-group phone'>
              <input type="tel" className={clientValidationErrors.phone ? 'input-validation-error' : ''} name="phone" placeholder='* Telefon' {...(useDefaultContactValues ? { defaultValue: "0741234567" } : {})}/>
              {clientValidationErrors.phone && <p className="input-validation">{clientValidationErrors.phone.join(', ')}</p>}
            </div>

            <div className='form-group email'>
              <input type="email" className={clientValidationErrors.email ? 'input-validation-error' : ''} name="email" placeholder='* Email' {...(useDefaultContactValues ? { defaultValue: "ux.studio.sibiu@gmail.com" } : {})}/>
              {clientValidationErrors.email && <p className="input-validation">{clientValidationErrors.email.join(', ')}</p>}
            </div>
        </section>

        <FormSection className={`s1-section ${cssClass_sectionDisabled}`} title={formSetup.s1_title} subtitle={formSetup.s1_subtitle} projects={formSetup.s1_projects} optionalItems={formSetup.s1_optionalItems} />
        <FormSection className={`s2-section ${cssClass_sectionDisabled}`} title={formSetup.s2_title} subtitle={formSetup.s2_subtitle} projects={formSetup.s2_projects} optionalItems={formSetup.s2_optionalItems} />
        <FormSection className={`s3-section ${cssClass_sectionDisabled}`} title={formSetup.s3_title} subtitle={formSetup.s3_subtitle} projects={formSetup.s3_projects} optionalItems={formSetup.s3_optionalItems} />

        {clientValidationErrors.validationSummary &&
        <section className="validation-summary float-left w-100">
          {clientValidationErrors.validationSummary.map((error, idx) => (
            <span key={idx} className="w-100 float-left input-validation">{error}</span>
          ))}
        </section>}

        <section id="submit" className={`w-100 ${cssClass_sectionDisabled}`}>
              <button type="submit" disabled={status === 'loading'} className={`btn btn-primary btn-invert ${'diff-sibiu-valcea'}`}>Trimite</button>
        </section>

      </form>
    </div>
  )
}
