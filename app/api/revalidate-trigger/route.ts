import { NextRequest, NextResponse } from "next/server";
import { triggerRevalidate } from "../../actions/triggerRevalidate";

function parseCsv(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const payload = {
    _type: searchParams.get("_type") ?? undefined,
    slug: searchParams.get("slug") ? { current: searchParams.get("slug") ?? undefined } : undefined,
    tags: [
      ...parseCsv(searchParams.get("tag")),
      ...parseCsv(searchParams.get("tags")),
    ],
    paths: [
      ...parseCsv(searchParams.get("path")),
      ...parseCsv(searchParams.get("paths")),
    ],
  };

  const result = await triggerRevalidate(payload);
  return NextResponse.json(result, { status: result.status });
}

// http://localhost:3000/api/revalidate-trigger?tag=projects
// http://localhost:3000/api/revalidate-trigger?tags=projects,faqList
// http://localhost:3000/api/revalidate-trigger?path=/sibiu/proiecte
// http://localhost:3000/api/revalidate-trigger?_type=faq
// http://localhost:3000/api/revalidate-trigger?slug=my-slug&tag=projects
