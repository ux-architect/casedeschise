import { getSignupForm } from '@/sanity/sanity.query'
import ScannerClient from './scanner-client'
import { validateSignup } from '@/app/actions/validateSignup'
import type { SignupFormProjectType } from '@/types'
import './page.scss';

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

export default function ScanPage() {
  return(
  <main className={`nsc--page-scan`}>
      <ScannerClient validateSignup={validateSignup} objectives={objectives} />
    </main>
  )
}