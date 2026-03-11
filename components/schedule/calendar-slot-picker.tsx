"use client";

import { TimeSlot } from "@/lib/types";
import { cn, formatDayLabel, formatTimeRange } from "@/lib/utils";

type Props = {
  selectedSlot: string;
  slots: TimeSlot[];
  selectableSlotIds: string[];
  onSelect: (id: string) => void;
};

const slotStyles = {
  available: "border-burnt-200 bg-burnt-50 text-burnt-950 hover:border-burnt-300",
  pending: "border-burnt-300 bg-[#f6dfcf] text-burnt-950",
  booked: "border-slate-200 bg-slate-100 text-slate-500"
} as const;

export function CalendarSlotPicker({ selectedSlot, slots, selectableSlotIds, onSelect }: Props) {
  const grouped = Object.values(
    slots.reduce<Record<string, { day: string; items: TimeSlot[] }>>((accumulator, slot) => {
      const day = slot.start.slice(0, 10);
      const current = accumulator[day] ?? { day, items: [] };
      current.items.push(slot);
      accumulator[day] = current;
      return accumulator;
    }, {})
  );

  return (
    <div className="grid gap-5">
      {grouped.map((group) => (
        <div key={group.day}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            {formatDayLabel(group.items[0].start)}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((slot) => {
              const selectable = selectableSlotIds.includes(slot.id);
              const selected = selectedSlot === slot.id;

              return (
                <button
                  type="button"
                  key={slot.id}
                  onClick={() => selectable && onSelect(slot.id)}
                  disabled={!selectable}
                  className={cn(
                    "rounded-[24px] border px-4 py-4 text-left transition",
                    slotStyles[slot.status],
                    selected && "border-burnt-500 bg-burnt-50 text-slate-950",
                    !selectable && "cursor-not-allowed opacity-80"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{formatTimeRange(slot.start, slot.end)}</p>
                      <p className="mt-1 text-sm capitalize">{slot.status}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
