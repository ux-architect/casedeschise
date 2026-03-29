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
  const optionalItems = formData.getAll('optionalItems').map((value) => value.toString().trim()).filter(Boolean)

  const selectedProjectsRaw = formData.get('selectedProjects')?.toString() || '[]'

  const selectedProjects: SelectedProject[] = (() => {
    try {
      const parsed = JSON.parse(selectedProjectsRaw)
      return Array.isArray(parsed)
        ? parsed.filter(
            (item): item is SelectedProject =>
              !!item && typeof item === 'object' && typeof (item as any).name === 'string' && typeof (item as any).code === 'string' && typeof (item as any).info === 'string'
          )
        : []
    } catch {return []}
  })()

  const selectedProjectsString= selectedProjects.map((project) => project.code).join(';')
  const optionalItemsString = optionalItems.join('; ')
  
  // email not send
  if(!city || !name || !email || !phone || selectedProjects.length === 0) {return { success: false, error: 'Email not send!' }}

  try {

    const uniqueId = crypto.randomUUID()

    // id, name, selected projects
    const qrPayload = JSON.stringify([ uniqueId, name, selectedProjectsString])
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
    optionalItems: optionalItemsString,
    details: new Date().toISOString(),
    metadata: { year: '2026', index: formData.get('index')?.toString().trim() || '',},
  });

    const { error } = await resend.emails.send({
      from: 'OAR Sibiu-Valcea <contact@oarsbvl.ro>',
      to: email,
      subject: `Înscriere Case Deschise ${new Date().getFullYear()}`,
      html: `
        <img src="cid:qr-code-contact" alt="QR code contact" width="300" height="300" />
        <p>Salut <strong> ${name} </strong> !</p>
        <p><strong>Te-ai înscris la următoarele obiective:</strong></p>
        <ul>
          ${selectedProjects.map((project) => `<li><strong>${project.name}</strong> - ${project.info}</li>`).join('')}
        </ul>
        <p>Accesul la vizite în cadrul evenimentului se face prin prezentarea codului QR</p>
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