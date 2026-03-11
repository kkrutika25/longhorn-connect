"use client";

import Image from "next/image";
import { useState } from "react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ambassador, Meeting, TimeSlot } from "@/lib/types";
import { formatDateTime, formatMeetingType, formatTimeRange } from "@/lib/utils";

export function AmbassadorDashboardClient({
  ambassador,
  initialPendingRequests,
  initialUpcomingConfirmed,
  availability,
  stats
}: {
  ambassador: Ambassador;
  initialPendingRequests: Meeting[];
  initialUpcomingConfirmed: Meeting[];
  availability: TimeSlot[];
  stats: {
    openSlots: number;
    pendingSlots: number;
    bookedSlots: number;
  };
}) {
  const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
  const [upcomingConfirmed, setUpcomingConfirmed] = useState(initialUpcomingConfirmed);

  async function updateRequest(meetingId: string, action: "confirm" | "decline") {
    const result = await fetch(`/api/meetings/${meetingId}/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action })
    }).then((response) => response.json());

    if (!result.ok || !result.meeting) {
      return;
    }

    setPendingRequests((current) => current.filter((meeting) => meeting.id !== meetingId));
    if (action === "confirm") {
      setUpcomingConfirmed((current) =>
        [...current, result.meeting as Meeting].sort(
          (left, right) => +new Date(left.startTime) - +new Date(right.startTime)
        )
      );
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
      <div className="grid gap-6">
        <DashboardCard title="Pending meeting requests">
          <div className="grid gap-3">
            {pendingRequests.length ? (
              pendingRequests.map((meeting) => (
                <Card key={meeting.id} className="rounded-[24px] p-4 shadow-none">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{meeting.topic}</p>
                      <p className="mt-1 text-sm text-slate-500">{formatDateTime(meeting.startTime)}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {meeting.meetingType === "virtual"
                          ? "Virtual session"
                          : meeting.location ?? formatMeetingType(meeting.meetingType)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="secondary" onClick={() => updateRequest(meeting.id, "confirm")}>
                        Confirm
                      </Button>
                      <Button variant="ghost" onClick={() => updateRequest(meeting.id, "decline")}>
                        Decline
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                No pending requests right now.
              </div>
            )}
          </div>
        </DashboardCard>

        <DashboardCard title="Upcoming confirmed meetings">
          <div className="grid gap-3">
            {upcomingConfirmed.map((meeting) => (
              <Card key={meeting.id} className="rounded-[24px] p-4 shadow-none">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{meeting.topic}</p>
                    <p className="mt-1 text-sm text-slate-500">{formatDateTime(meeting.startTime)}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {meeting.meetingType === "virtual"
                        ? meeting.meetingLink
                        : meeting.location ?? formatMeetingType(meeting.meetingType)}
                    </p>
                  </div>
                  <Badge>{meeting.status}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-6">
        <DashboardCard title="Availability summary">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[24px] border border-burnt-200 bg-burnt-50 px-4 py-4">
              <p className="text-sm text-burnt-700">Open slots</p>
              <p className="mt-2 text-2xl font-semibold text-burnt-950">{stats.openSlots}</p>
            </div>
            <div className="rounded-[24px] border border-burnt-300 bg-[#f6dfcf] px-4 py-4">
              <p className="text-sm text-burnt-700">Pending</p>
              <p className="mt-2 text-2xl font-semibold text-burnt-950">{stats.pendingSlots}</p>
            </div>
            <div className="rounded-[24px] border border-burnt-400 bg-[#edc3a8] px-4 py-4">
              <p className="text-sm text-burnt-800">Booked</p>
              <p className="mt-2 text-2xl font-semibold text-burnt-950">{stats.bookedSlots}</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Weekly calendar">
          <div className="grid gap-3">
            {availability.map((slot) => (
              <div key={slot.id} className="rounded-[24px] border border-slate-200 bg-white px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{formatDateTime(slot.start)}</p>
                    <p className="mt-1 text-sm text-slate-500">{formatTimeRange(slot.start, slot.end)}</p>
                  </div>
                  <Badge>{slot.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Ambassador profile">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
            <div className="flex items-start gap-4">
              <Image
                src={ambassador.avatarUrl}
                alt={ambassador.name}
                width={72}
                height={72}
                className="rounded-[24px] border border-slate-200 bg-white object-cover"
                unoptimized
              />
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{ambassador.name}</p>
                <p className="mt-2">{ambassador.program}</p>
                <p className="mt-1">{ambassador.major}</p>
              </div>
            </div>
            <p className="mt-4">{ambassador.careerBackground}</p>
            <p className="mt-2">Default meeting spot: {ambassador.defaultMeetingLocation}</p>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
