import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { content } = (await request.json()) as { content?: string };
  // Persist messages and add realtime fan-out here when auth and database layers are introduced.
  return NextResponse.json({
    ok: true,
    echoedContent: content ?? "",
    createdAt: new Date().toISOString()
  });
}
