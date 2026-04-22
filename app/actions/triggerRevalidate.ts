'use server'

//http://localhost:3000/api/revalidate-trigger?tag=projects-sibiu

type RevalidatePayload = {
  _type?: string
  slug?: { current?: string }
  tags?: string[]
  paths?: string[]
}

type TriggerRevalidateResult = {
  success: boolean
  status: number
  data?: unknown
  error?: string
}

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.SITE_URL) return process.env.SITE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  return 'http://localhost:3000'
}

export async function triggerRevalidate(payload: RevalidatePayload): Promise<TriggerRevalidateResult> {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {return { success: false, status: 500, error: 'Missing SANITY_REVALIDATE_SECRET' }}

  const endpoint = `${getBaseUrl()}/api/revalidate?secret=${encodeURIComponent(secret)}`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(payload),
    })

    const text = await response.text()
    let data: unknown = text

    try {
      data = JSON.parse(text)
    } catch {
      // Keep raw response text if it is not JSON.
    }

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        data,
        error: `Revalidate request failed (${response.status})`,
      }
    }

    return { success: true, status: response.status, data }
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
