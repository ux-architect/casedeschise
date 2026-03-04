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

export async function signupSubmit(formData: FormData) {
  const name = formData.get('name')?.toString().trim() || ''
  const address = formData.get('address')?.toString().trim() || ''
  const details = formData.get('details')?.toString().trim() || ''
  const options = formData.getAll('options').map((v) => v.toString())

  const errors: Record<string, string[]> = {}

  if (!name) errors.name = ['Name is required']
  if (!address) errors.address = ['Address is required']

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  try {

    const uniqueId = crypto.randomUUID()

    const qrPayload = JSON.stringify({ id: uniqueId, obiectiv: 'casa-cu-masina',})
    const qrCodeDataUrl = await generateQR(qrPayload)
    const qrCodeBase64 = qrCodeDataUrl.split(',')[1]

    if (!qrCodeBase64) {
      throw new Error('Failed to parse QR code data URL')
    }

  //Save to Sanity
  const reservation = await sanity.create({
    _id: uniqueId,
    _type: "signups-sibiu",
    id: uniqueId,
    //obiective: "", // casa-cu-masina || casa-ablastra || casa-cu-atelier || casa-mixta
    objectives: [
    { _key: "casa-cu-masina", status: 1 },
    { _key: "casa-ablastra", status: 1 },
    { _key: "casa-cu-atelier", status: 1 },],
    name,
    email: address,
    phone: formData.get('phone')?.toString().trim() || '',
    details: new Date().toISOString(),
    metadata: { year: '2026', index: formData.get('index')?.toString().trim() || '',},
  });

    const { error } = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM!,
      to: process.env.RESEND_EMAIL_TO!,
      subject: `Formula inscriere ${name}`,
      html: `
        <h3>Contact Info</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Details:</strong><br/>${details}</p>
        <p><strong>Options selected:</strong> ${options.join(', ')}</p>
        <hr/>
        <p><strong>QR Code:</strong></p>
        <img src="cid:qr-code-contact" alt="QR code contact" width="300" height="300" />
      `,
      attachments: [
        {
          filename: 'qr-code-contact.png',
          content: qrCodeBase64,
          contentType: 'image/png',
          contentId: 'qr-code-contact',
        },
      ],
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