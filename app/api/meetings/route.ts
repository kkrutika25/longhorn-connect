import { NextResponse } from "next/server";
import { addMeetingRequest, getMeetingsForAmbassador, getStudentMeetings } from "@/lib/data/mock";
import { MeetingDuration, MeetingType } from "@/lib/types";
import { formatMeetingType } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");
  const ambassadorId = searchParams.get("ambassadorId");

  if (ambassadorId) {
    return NextResponse.json({ ok: true, meetings: getMeetingsForAmbassador(ambassadorId) });
  }

  return NextResponse.json({ ok: true, meetings: getStudentMeetings(studentId ?? undefined) });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    studentId?: string;
    ambassadorId?: string;
    startTime?: string;
    durationMinutes?: number;
    meetingType?: string;
    topic?: string;
  };

  if (!body.ambassadorId || !body.startTime) {
    return NextResponse.json({ ok: false, message: "Ambassador and start time are required." }, { status: 400 });
  }

  try {
    const meeting = addMeetingRequest({
      studentId: body.studentId,
      ambassadorId: body.ambassadorId,
      startTime: body.startTime,
      durationMinutes: body.durationMinutes === 60 ? (60 as MeetingDuration) : (30 as MeetingDuration),
      meetingType:
        body.meetingType === "in_person"
          ? ("in_person" as MeetingType)
          : body.meetingType === "campus_tour"
            ? ("campus_tour" as MeetingType)
            : ("virtual" as MeetingType),
      topic: body.topic
    });

    return NextResponse.json({
      ok: true,
      meeting,
      message: `Request sent. ${meeting.durationMinutes}-minute ${formatMeetingType(
        meeting.meetingType
      ).toLowerCase()} is pending ambassador confirmation.`
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Unable to create meeting request." },
      { status: 400 }
    );
  }
}
