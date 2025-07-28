'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name')?.toString().trim() || ''
  const address = formData.get('address')?.toString().trim() || ''
  const details = formData.get('details')?.toString().trim() || ''
  const options = formData.getAll('options').map((v) => v.toString())

  const errors: Record<string, string[]> = {}

  if (!name) errors.name = ['Name is required']
  if (!address) errors.address = ['Address is required']
  if (!details) errors.details = ['Details are required']

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM!,
      to: process.env.RESEND_EMAIL_TO!,
      subject: `New Contact from ${name}`,
      html: `
        <h3>Contact Info</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Details:</strong><br/>${details}</p>
        <p><strong>Options selected:</strong> ${options.join(', ')}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Email send failed' }
  }
}