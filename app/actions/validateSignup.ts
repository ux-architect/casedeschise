
'use server'

import sanity from '../../sanity/sanity.client';

export async function validateSignup(data: { signupId: string, objectiveKey: string}) {

  if (!data.signupId || !data.objectiveKey) { return false;}

  await sanity.patch(data.signupId).set({ [`objectives[_key=="${data.objectiveKey}"].status`]: 2 }) .commit();

  return true;
}