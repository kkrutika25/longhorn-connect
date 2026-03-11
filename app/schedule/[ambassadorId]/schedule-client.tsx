"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarSlotPicker } from "@/components/schedule/calendar-slot-picker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MeetingDuration, MeetingType, TimeSlot } from "@/lib/types";
import { formatDateTime, formatMeetingType, formatTimeRange } from "@/lib/utils";

export function ScheduleClient({
  ambassadorId,
  ambassadorName,
  defaultMeetingLocation,
  initialSlots
}: {
  ambassadorId: string;
  ambassadorName: string;
  defaultMeetingLocation?: string;
  initialSlots: TimeSlot[];
}) {
  const [slots, setSlots] = useState(initialSlots);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [topic, setTopic] = useState("Campus life and housing");
  const [meetingType, setMeetingType] = useState<MeetingType>("virtual");
  const [durationMinutes, setDurationMinutes] = useState<MeetingDuration>(30);
  const [confirmation, setConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function refreshAvailability() {
    const result = await fetch(`/api/ambassadors/${ambassadorId}/availability`, {
      method: "GET",
      cache: "no-store"
    }).then((response) => response.json());

    if (result.slots) {
      setSlots(result.slots as TimeSlot[]);
    }
  }

  useEffect(() => {
    void refreshAvailability();
  }, [ambassadorId]);

  const selectableSlotIds = useMemo(() => {
    return slots.flatMap((slot, index) => {
      if (slot.status !== "available") {
        return [];
      }

      if (durationMinutes === 30) {
        return [slot.id];
      }

      const nextSlot = slots[index + 1];
      const isContinuous =
        !!nextSlot &&
        nextSlot.status === "available" &&
        slot.start.slice(0, 10) === nextSlot.start.slice(0, 10) &&
        new Date(slot.end).getTime() === new Date(nextSlot.start).getTime();

      return isContinuous ? [slot.id] : [];
    });
  }, [durationMinutes, slots]);

  useEffect(() => {
    if (selectableSlotIds.includes(selectedSlot)) {
      return;
    }

    setSelectedSlot(selectableSlotIds[0] ?? "");
  }, [selectableSlotIds, selectedSlot]);

  const currentSlot = useMemo(() => slots.find((slot) => slot.id === selectedSlot), [selectedSlot, slots]);

  const currentEndTime = useMemo(() => {
    if (!currentSlot) {
      return "";
    }

    if (durationMinutes === 30) {
      return currentSlot.end;
    }

    const startIndex = slots.findIndex((slot) => slot.id === currentSlot.id);
    return slots[startIndex + 1]?.end ?? currentSlot.end;
  }, [currentSlot, durationMinutes, slots]);

  async function book() {
    if (!currentSlot) {
      return;
    }

    setIsSubmitting(true);
    const result = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: "student-maya",
        ambassadorId,
        startTime: currentSlot.start,
        durationMinutes,
        meetingType,
        topic
      })
    }).then((response) => response.json());

    setIsSubmitting(false);

    if (!result.ok) {
      setConfirmation(result.message ?? "Unable to submit request.");
      return;
    }

    setConfirmation(result.message);
    await refreshAvailability();
  }

  return (
    <div className="grid gap-6">
      <Card>
        <h2 className="text-xl font-semibold text-slate-900">Weekly availability</h2>
        <p className="mt-2 text-sm text-slate-500">
          Select an available start time. Pending requests are yellow and confirmed bookings are grey.
        </p>
        <div className="mt-5">
          <CalendarSlotPicker
            selectedSlot={selectedSlot}
            slots={slots}
            selectableSlotIds={selectableSlotIds}
            onSelect={setSelectedSlot}
          />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-slate-900">Meeting request</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Meeting topic</label>
            <Input value={topic} onChange={(event) => setTopic(event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Duration</label>
            <Select
              value={durationMinutes.toString()}
              onChange={(event) => setDurationMinutes(Number(event.target.value) as MeetingDuration)}
            >
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Meeting type</label>
            <Select value={meetingType} onChange={(event) => setMeetingType(event.target.value as MeetingType)}>
              <option value="virtual">Virtual</option>
              <option value="in_person">In-person</option>
              <option value="campus_tour">Campus Tour</option>
            </Select>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <p className="text-sm font-semibold text-slate-900">Selected session</p>
            {currentSlot ? (
              <>
                <p className="mt-2 text-sm text-slate-600">{formatDateTime(currentSlot.start)}</p>
                <p className="mt-1 text-sm text-slate-600">{formatTimeRange(currentSlot.start, currentEndTime)}</p>
              </>
            ) : (
              <p className="mt-2 text-sm text-slate-500">Choose an available time slot.</p>
            )}
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-4 md:col-span-2">
            <p className="text-sm font-semibold text-slate-900">Session details</p>
            <p className="mt-2 text-sm text-slate-600">
              {meetingType === "virtual"
                ? `Google Meet link will be generated for ${ambassadorName} after confirmation.`
                : meetingType === "campus_tour"
                  ? `Campus tour meet-up point: ${defaultMeetingLocation ?? "Set by ambassador after request."}`
                  : `Suggested campus location: ${defaultMeetingLocation ?? "Location provided by ambassador."}`}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Students can only request green slots. A 60-minute request requires two adjacent green slots for any {formatMeetingType(meetingType).toLowerCase()} request.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button onClick={book} disabled={!currentSlot || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Request Meeting"}
          </Button>
          {confirmation && <p className="text-sm text-emerald-700">{confirmation}</p>}
        </div>
      </Card>
    </div>
  );
}
