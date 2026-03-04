
'use server'

import sanity from '../../sanity/sanity.client';

export async function validateSignup(data: { signupId: string, objectiveKey: string}) {

  if (!data.signupId || !data.objectiveKey) { return { success: false, error: 'Invalid QR code data' }}

  const allowedObjectives = new Set([
    'casa-cu-masina',
    'casa-ablastra',
    'casa-cu-atelier',
  ]);

  if (!allowedObjectives.has(data.objectiveKey)) {
    return { success: false, error: 'Invalid objective key' }
  }

  await sanity
  .patch(data.signupId)
  .set({ [`objectives[_key=="${data.objectiveKey}"].status`]: 2 })
  .commit();

  return { success: true }
}