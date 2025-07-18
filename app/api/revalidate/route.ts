import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Parse the secret from the query string
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.MY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json()
  const slug = body?.slug?.current

  try {
    // On-demand revalidation in the `app` directory currently requires use of dynamic route segments and unstable_revalidate
    // This sample assumes you're using `unstable_revalidate` (Next.js v13+ feature, still experimental as of early 2024)

    // Revalidate homepage
    // Note: Unstable API, may need to adjust as Next.js releases new stable APIs
    const tags: string[] = [] // add tags if you use them for segment caching

    // You'd typically tag routes during fetches, and revalidate by tag.
    // But this API is evolving! For *now* you can still use path where supported:

    // Example for revalidating the homepage:
    // await unstable_revalidatePath('/')

    // Example for dynamic route:
    // if (slug) await unstable_revalidatePath(`/posts/${slug}`)

    // As of Next.js 13.4+, the recommended way is revalidateTag if you use cache tags.

    return NextResponse.json({
      revalidated: true,
      now: new Date().toISOString(),
      // Uncomment below as APIs stabilize:
      // tag: your_tag_or_path,
    })
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Revalidation error' },
      { status: 500 }
    )
  }
}

// If you want to allow GET (optional, *usually not needed*):
export const GET = async () =>
  NextResponse.json({ message: 'Use POST only' }, { status: 405 })