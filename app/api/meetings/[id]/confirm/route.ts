import { NextResponse } from "next/server";
import { respondToMeetingRequest } from "@/lib/data/mock";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { action } = (await request.json()) as { action?: "confirm" | "decline" };

  if (action !== "confirm" && action !== "decline") {
    return NextResponse.json({ ok: false, message: "Action must be confirm or decline." }, { status: 400 });
  }

  try {
    const meeting = respondToMeetingRequest(id, action);
    return NextResponse.json({
      ok: true,
      meeting,
      message: `Meeting request ${action === "confirm" ? "confirmed" : "declined"}.`
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Unable to update meeting request." },
      { status: 400 }
    );
  }
}
