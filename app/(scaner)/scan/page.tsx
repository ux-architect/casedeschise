import ScannerClient from './scanner-client'
import { validateSignup } from '@/app/actions/validateSignup'

type ScanPayload = { id: string, obiectiv: string}

export default function ScanPage() {

  async function onScanAction(decodedQr: string): Promise<boolean> {
  'use server'

  try {
    const data = JSON.parse(decodedQr.trim()) as Partial<ScanPayload>

    if (!data.id || !data.obiectiv) return false;

    const id = data.id.trim()
    const obiectiv = data.obiectiv.trim()
    const isGuid =/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)

    if (!isGuid) return false;
    await validateSignup({ signupId: id, objectiveKey: obiectiv })
    return true;  
  }  
  catch { return false;}
}

  return <ScannerClient onScanAction={onScanAction} />
}