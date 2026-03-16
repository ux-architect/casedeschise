'use server'

import { Resend } from 'resend'
import QRCode from 'qrcode'
import sanity from '../../sanity/sanity.client';

export async function generateQR(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      width: 256,
      margin: 1,
    })
  } catch (err) {
    throw new Error('Failed to generate QR code')
  }
}

const resend = new Resend(process.env.RESEND_API_KEY)

type SelectedProject = {
  name: string
  code: string
  info: string
}

export async function signupSubmit(formData: FormData) {
  const city = formData.get('city')?.toString().trim() || ''

  const name = formData.get('name')?.toString().trim() || ''
  const phone = formData.get('phone')?.toString().trim() || ''
  const email = formData.get('email')?.toString().trim() || ''
  const options = formData.getAll('options').map((v) => v.toString())
  const selectedProjectsRaw = formData.get('selectedProjects')?.toString() || '[]'

  let selectedProjects: SelectedProject[] = []

  const parsed = JSON.parse(selectedProjectsRaw)
  if (Array.isArray(parsed)) {
    selectedProjects = parsed.filter((item): item is SelectedProject => {
      if (!item || typeof item !== 'object') return false
      const candidate = item as Record<string, unknown>

      return ( typeof candidate.name === 'string' && typeof candidate.code === 'string' && typeof candidate.info === 'string')
    })
  }
  
  // email not send
  if(!city || !name || !email || !phone || selectedProjects.length === 0) {return { success: false, error: 'Email not send!' }}

  try {

    const uniqueId = crypto.randomUUID()

    const qrPayload = JSON.stringify({ id: uniqueId, obiectiv: 'casa-cu-masina', nume: name})
    const qrCodeDataUrl = await generateQR(qrPayload)
    const qrCodeBase64 = qrCodeDataUrl.split(',')[1]

    if (!qrCodeBase64) { throw new Error('Failed to parse QR code data URL')}

  //Save to Sanity
  const reservation = await sanity.create({
    _id: uniqueId,
    _type: "signups-" + city,
    id: uniqueId,
    objectives: selectedProjects.map((project) => ({
      _key: project.code,
      status: 1,
    })),
    contact: { name, email, phone },
    details: new Date().toISOString(),
    metadata: { year: '2026', index: formData.get('index')?.toString().trim() || '',},
  });

    const { error } = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM!,
      to: email,
      subject: `Formular inscriere ${name}`,
      html: `
        <img src="cid:qr-code-contact" alt="QR code contact" width="300" height="300" />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Selected projects:</strong></p>
        <ul>
          ${selectedProjects.map((project) => `<li><strong>${project.name}</strong> (${project.code}) - ${project.info}</li>`).join('')}
        </ul>
        
      `,
      attachments: [ {filename: 'qr-code-contact.png', content: qrCodeBase64, contentType: 'image/png', contentId: 'qr-code-contact',},],
    })

    if (error) {
      console.error('Resend signupSubmit error:', error)
      return { success: false, error: error.message || 'Email send failed' }
    }

    return { success: true }
  } catch (error) {
    console.error('signupSubmit unexpected error:', error)
    return { success: false, error: 'Email send failed' }
  }
}