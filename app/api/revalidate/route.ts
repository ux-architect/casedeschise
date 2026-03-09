import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type WebhookBody = {
  _type?: string;
  slug?: { current?: string };
  tags?: string[];
  paths?: string[];
};

const typeToTag: Record<string, string[]> = {
  "faq": ["faqList"],
  "general-info": ["generalInfo"],
};

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: WebhookBody;
  try {
    body = (await req.json()) as WebhookBody;
  } catch {
    body = {};
  }

  const requestedTags = Array.isArray(body.tags) ? body.tags : [];
  const requestedPaths = Array.isArray(body.paths) ? body.paths : [];
  const inferredTags = body._type ? typeToTag[body._type] ?? [] : [];
  const tags = [...new Set([...requestedTags, ...inferredTags])];
  const paths = [...new Set(requestedPaths)];

  try {
    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      now: new Date().toISOString(),
      tags,
      paths,
      slug: body.slug?.current ?? null,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Revalidation error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export const GET = async () =>
  NextResponse.json({ message: "Use POST only" }, { status: 405 });