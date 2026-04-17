'use server'

import { Resend } from 'resend'
import QRCode from 'qrcode'
import sanity from '../../sanity/sanity.client';

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

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

type SelectedProject = { name: string; code: string; info: string; address: string }

export async function signupSubmit(formData: FormData) {
  const city = formData.get('city')?.toString().trim() || ''
  const name = formData.get('name')?.toString().trim() || ''
  const phone = formData.get('phone')?.toString().trim() || ''
  const email = formData.get('email')?.toString().trim() || ''
  const optionalItems = formData.getAll('optionalItems').map((value) => value.toString().trim()).filter(Boolean)

  const optionalTransportRequested = optionalItems.length > 0;
  const url_tourInfo = `https://casedeschise.ro/${city.toLowerCase()}#tururi`;

  const selectedProjectsRaw = formData.get('selectedProjects')?.toString() || '[]'

  const selectedProjects: SelectedProject[] = (() => {
    try {
      const parsed = JSON.parse(selectedProjectsRaw)
      return Array.isArray(parsed)
        ? parsed.filter(
            (item): item is SelectedProject =>
              !!item && typeof item === 'object' && typeof (item as any).name === 'string' && typeof (item as any).code === 'string' && typeof (item as any).info === 'string' && typeof (item as any).address === 'string'
          )
        : []
    } catch {return []}
  })()

  const selectedProjectsString= selectedProjects.map((project) => project.code).join(';')
  const optionalItemsString = optionalItems.join('; ')
  
  // email will not be send
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


    // build email
    const result = await sanity.fetch<{ email_template?: string }>(`*[_type == $type][0]{ email_template }`, { type: `signup-form-${city}` });

    const template = result?.email_template;
    const emailTitle = template?.split('__________')[0]?.trim() || "";
    const bodyRaw = template?.split('__________')[1] || '';
    const paragraf_transport = bodyRaw.match(/-----------\n([\s\S]*?)\n-----------/)?.[1]?.trim()|| "";
    const emailBody = bodyRaw.replace(/\n?-----------\n[\s\S]*?\n-----------\n?/, '')
    const lista_obiective = `<ul style="margin:0; padding-left: 20px;">${selectedProjects.map((p) => `<li><strong>${escapeHtml(p.name)}</strong> - ${escapeHtml(p.info)}  (${escapeHtml(p.address)})</li>`).join('')}</ul>`;


    // Process body: replace placeholders, convert markdown bold to HTML, then convert lines to <p> tags
    const bodyHtml =  emailBody
      .replace(/##nume_inscris##/g, escapeHtml(name))
      .replace(/##paragraf_transport##/g, optionalTransportRequested ? paragraf_transport : '')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/##lista_obiective##/g, lista_obiective)
      .replace(/\n/g, '<br>');


    const finalHtml = `<img style="margin-bottom:0px;" src="cid:qr-code-contact" alt="QR code contact" width="300" height="300" /> <br> ${bodyHtml}`;

    const { error } = await resend.emails.send({
      from: 'OAR Sibiu-Valcea <contact@oarsbvl.ro>',
      to: email,
      subject : emailTitle,
      html: finalHtml,
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