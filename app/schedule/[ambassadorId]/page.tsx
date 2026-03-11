import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/page-shell";
import { Card } from "@/components/ui/card";
import { getAmbassadorAvailability, getAmbassadorById } from "@/lib/data/mock";
import { ScheduleClient } from "@/app/schedule/[ambassadorId]/schedule-client";

export default async function SchedulePage({
  params
}: {
  params: Promise<{ ambassadorId: string }>;
}) {
  const { ambassadorId } = await params;
  const ambassador = getAmbassadorById(ambassadorId);
  if (!ambassador) {
    notFound();
  }

  const initialSlots = getAmbassadorAvailability(ambassador.id);

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <Card className="h-fit">
            <div className="flex items-center gap-4">
              <Image
                src={ambassador.avatarUrl}
                alt={ambassador.name}
                width={88}
                height={88}
                className="rounded-[28px] border border-slate-200 bg-slate-100"
                unoptimized
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-burnt-700">Schedule meeting</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-950">{ambassador.name}</h1>
                <p className="mt-2 text-sm text-slate-600">
                  {ambassador.program} · {ambassador.major} · {ambassador.year}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600">{ambassador.bio}</p>
            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Default in-person location</p>
              <p className="mt-2">{ambassador.defaultMeetingLocation ?? "Set by ambassador after request."}</p>
            </div>
          </Card>
          <ScheduleClient
            ambassadorId={ambassador.id}
            ambassadorName={ambassador.name}
            defaultMeetingLocation={ambassador.defaultMeetingLocation}
            initialSlots={initialSlots}
          />
        </div>
      </section>
    </PageShell>
  );
}
