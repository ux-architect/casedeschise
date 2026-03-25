import { getSignupForm } from '@/sanity/sanity.query'
import ScannerClient from './scanner-client'
import { validateSignup } from '@/app/actions/validateSignup'
import type { SignupFormProjectType } from '@/types'
import './page.scss';

export default async function ScanPage() {
  const formSetup = await getSignupForm("signup-form-" + "sibiu")
  const objectives = Array.from(
    new Map(
      [
        ...(formSetup.s1_projects || []),
        ...(formSetup.s2_projects || []),
        ...(formSetup.s3_projects || [])
      ]
        .filter((proj): proj is SignupFormProjectType => Boolean(proj?.code))
        .map((proj) => [proj.code!.trim(), proj])
    ).values()
  )

  return(
  <main className={`nsc--page-scan`}>
    <div className='layout-container'>
      <ScannerClient validateSignup={validateSignup} objectives={objectives} />
    </div>
  </main>
  )
}