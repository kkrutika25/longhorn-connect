import { NextResponse } from "next/server";
import { getAmbassadorAvailability, getAmbassadorById } from "@/lib/data/mock";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ambassador = getAmbassadorById(id);

  if (!ambassador) {
    return NextResponse.json({ ok: false, message: "Ambassador not found." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    ambassador: {
      id: ambassador.id,
      name: ambassador.name
    },
    slots: getAmbassadorAvailability(id)
  });
}
