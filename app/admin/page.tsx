import { PageShell } from "@/components/shared/page-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { adminUser, ambassadors, getAnalytics, knowledgeBaseEntries, meetings } from "@/lib/data/mock";
import { formatDateTime } from "@/lib/utils";

export default function AdminPage() {
  const analytics = getAnalytics();

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeading
          eyebrow="Admin Dashboard"
          title="Manage ambassadors, knowledge content, and simple usage metrics."
          description={`${adminUser.name} can review ambassador availability, content coverage, and booking demand from one operations surface.`}
        />
        <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr,.9fr]">
          <Card>
            <h2 className="text-xl font-semibold text-slate-900">Ambassador management</h2>
            <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200">
              <div className="grid grid-cols-[1.3fr,1fr,1fr] bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                <span>Name</span>
                <span>Major</span>
                <span>Status</span>
              </div>
              {ambassadors.map((ambassador) => (
                <div key={ambassador.id} className="grid grid-cols-[1.3fr,1fr,1fr] border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
                  <span>{ambassador.name}</span>
                  <span>{ambassador.major}</span>
                  <span>{ambassador.isActive ? "Active" : "Inactive"}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-6">
            <Card>
              <h2 className="text-xl font-semibold text-slate-900">Analytics</h2>
              <div className="mt-5 grid gap-3">
                {analytics.map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-slate-900">Knowledge base</h2>
              <div className="mt-5 grid gap-3">
                {knowledgeBaseEntries.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="rounded-[24px] border border-slate-200 bg-white p-4">
                    <p className="font-semibold text-slate-900">{entry.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{entry.category} · {entry.source}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-slate-900">Content editor</h2>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Draft title: New first-year housing guide
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Category: Housing
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-600">
                  Placeholder editor surface for add, edit, and remove flows. Wire this into Prisma-backed CRUD later.
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-slate-900">Booking overview</h2>
              <div className="mt-5 grid gap-3">
                {meetings.slice(0, 4).map((meeting) => {
                  const ambassador = ambassadors.find((item) => item.id === meeting.ambassadorId);
                  return (
                    <div key={meeting.id} className="rounded-[24px] border border-slate-200 bg-white p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">{meeting.topic}</p>
                          <p className="mt-1 text-sm text-slate-500">{ambassador?.name ?? "Unknown ambassador"}</p>
                          <p className="mt-1 text-sm text-slate-500">{formatDateTime(meeting.startTime)}</p>
                        </div>
                        <Badge>{meeting.status}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5">
                <Button href="/ambassador" variant="secondary">
                  Open ambassador dashboard
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
