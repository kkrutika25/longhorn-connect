import { NextResponse } from "next/server";
import { addMeetingRequest, ambassadors, getAmbassadorById, getAmbassadorAvailability, studentUser } from "@/lib/data/mock";
import { MeetingDuration, MeetingType } from "@/lib/types";

export async function POST(request: Request) {
  const { ambassadorName, slotId, topic, meetingType } = (await request.json()) as {
    ambassadorName?: string;
    slotId?: string;
    topic?: string;
    meetingType?: string;
  };

  const ambassador = ambassadorName
    ? ambassadors.find((item) => item.name.toLowerCase() === ambassadorName.toLowerCase())
    : undefined;
  const resolvedAmbassador = ambassador ?? getAmbassadorById("amb-aaliyah");
  const fallbackSlot = resolvedAmbassador ? getAmbassadorAvailability(resolvedAmbassador.id)[0] : undefined;
  const selectedSlot =
    resolvedAmbassador && slotId
      ? getAmbassadorAvailability(resolvedAmbassador.id).find((slot) => slot.id === slotId)
      : fallbackSlot;

  if (!resolvedAmbassador || !selectedSlot) {
    return NextResponse.json({ ok: false, message: "Ambassador or slot not found." }, { status: 404 });
  }

  try {
    const meeting = addMeetingRequest({
      studentId: studentUser.id,
      ambassadorId: resolvedAmbassador.id,
      startTime: selectedSlot.start,
      durationMinutes: 30 as MeetingDuration,
      meetingType: (
        meetingType === "in_person" ? "in_person" : meetingType === "campus_tour" ? "campus_tour" : "virtual"
      ) as MeetingType,
      topic
    });

    return NextResponse.json({
      ok: true,
      meeting,
      message: `Request sent to ${resolvedAmbassador.name}. The session is marked pending until the ambassador responds.`
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Unable to create booking." },
      { status: 400 }
    );
  }
}
