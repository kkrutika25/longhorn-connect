import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";
import { ambassadors, getAmbassadorAvailability, getAmbassadorById } from "@/lib/data/mock";
import { formatDateTime } from "@/lib/utils";

export function generateStaticParams() {
  return ambassadors.map((ambassador) => ({ id: ambassador.id }));
}

export default async function AmbassadorProfilePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ambassador = getAmbassadorById(id);
  if (!ambassador) {
    notFound();
  }

  const slots = getAmbassadorAvailability(ambassador.id)
    .filter((slot) => slot.status === "available")
    .slice(0, 3);

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr,.9fr]">
          <Card className="overflow-hidden">
            <div className="flex flex-col gap-6 md:flex-row">
              <Image
                src={ambassador.avatarUrl}
                alt={ambassador.name}
                width={160}
                height={160}
                className="rounded-[32px] border border-slate-200 bg-slate-100"
                unoptimized
              />
              <div className="flex-1">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burnt-700">Ambassador Profile</p>
                <h1 className="mt-3 text-4xl font-semibold text-slate-950">{ambassador.name}</h1>
                <p className="mt-2 text-lg text-slate-600">
                  {ambassador.program} · {ambassador.major} · {ambassador.year} · Class of {ambassador.graduationYear}
                </p>
                <p className="mt-5 text-sm leading-7 text-slate-600">{ambassador.bio}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
                  {ambassador.careerBackground && (
                    <span className="rounded-full bg-slate-100 px-4 py-2">{ambassador.careerBackground}</span>
                  )}
                  {ambassador.nationality && (
                    <span className="rounded-full bg-slate-100 px-4 py-2">Background: {ambassador.nationality}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Campus involvement</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {ambassador.clubs.map((club) => (
                    <li key={club}>• {club}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Expertise</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ambassador.expertiseTags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-6">
            <Card>
              <h2 className="text-xl font-semibold text-slate-900">Action panel</h2>
              <div className="mt-5 grid gap-3">
                <Button href="/messages">Message Ambassador</Button>
                <Button href={`/schedule/${ambassador.id}`} variant="secondary">
                  Schedule Meeting
                </Button>
                {ambassador.linkedinUrl && (
                  <Button href={ambassador.linkedinUrl} variant="ghost">
                    View LinkedIn
                  </Button>
                )}
              </div>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-slate-900">Next available slots</h2>
              <div className="mt-5 grid gap-3">
                {slots.map((slot) => (
                  <div key={slot.id} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-800">{slot.label}</p>
                    <p className="mt-1 text-sm text-slate-500">{formatDateTime(slot.start)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
