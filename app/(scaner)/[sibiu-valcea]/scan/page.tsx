import { getSignupForm } from '@/sanity/sanity.query'
import ScannerClient from './scanner-client'
import { validateSignup } from '@/app/actions/validateSignup'
import type { SignupFormProjectType } from '@/types'
import './page.scss';

export default async function ScanPage({ params}: {params: Promise<{ "sibiu-valcea": string }>;}) {
  
  const { ["sibiu-valcea"]: city } = await params;
  const formSetup = await getSignupForm("signup-form-" + city)
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
  <main className={`nsc--page-scan diff-sibiu-valcea diff-background`}>
    <div className='layout-container'>
      <ScannerClient validateSignup={validateSignup} objectives={objectives} />
    </div>
  </main>
  )
}