'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInfoEmail_toApplicant(formData: FormData) {
  const email = formData.get('email')?.toString().trim() || ''
  const options = formData.getAll('options').map((v) => v.toString())

  const errors: Record<string, string[]> = {}

  if (!email) errors.email = ['Email is required']

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM!,
      to: process.env.RESEND_EMAIL_TO!,
      subject: `New Contact from ${email}`,
      html: `
        <h3>Contact Info</h3>
        <p><strong>Name:</strong> ${email}</p>

        <p><strong>Options selected:</strong> ${options.join(', ')}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Email send failed' }
  }
}