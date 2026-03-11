import Image from "next/image";
import Link from "next/link";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { PageShell } from "@/components/shared/page-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAmbassadorById, getDashboardData } from "@/lib/data/mock";
import { formatDateTime, formatMeetingType } from "@/lib/utils";

export default function DashboardPage() {
  const dashboard = getDashboardData();

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeading
          eyebrow="Student Dashboard"
          title="Track your upcoming sessions, chats, and saved ambassadors."
          description="The dashboard consolidates the follow-up flow for a returning student."
        />
        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <DashboardCard title="Upcoming meetings" action={<Button href="/messages" variant="ghost">Open messages</Button>}>
            <div className="grid gap-3">
              {dashboard.upcomingMeetings.map((meeting) => {
                const ambassador = getAmbassadorById(meeting.ambassadorId);
                return (
                  <Card key={meeting.id} className="rounded-[24px] p-4 shadow-none">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{meeting.topic}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {ambassador?.name} · {formatMeetingType(meeting.meetingType)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">{formatDateTime(meeting.startTime)}</p>
                        <div className="mt-2">
                          <Badge>{meeting.status}</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </DashboardCard>

          <DashboardCard title="Recent chats">
            <div className="grid gap-3">
              {dashboard.recentChats.map((conversation) => (
                <Link key={conversation.id} href="/messages" className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 transition hover:border-burnt-200">
                  <p className="font-semibold text-slate-900">{conversation.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{conversation.preview}</p>
                </Link>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Saved ambassadors">
            <div className="grid gap-3 sm:grid-cols-2">
              {dashboard.saved.map((ambassador) => (
                <Link key={ambassador.id} href={`/ambassadors/${ambassador.id}`} className="rounded-[24px] border border-slate-200 bg-white p-4 transition hover:border-burnt-200">
                  <p className="font-semibold text-slate-900">{ambassador.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{ambassador.major}</p>
                </Link>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Recommended ambassadors"
            action={
              <Button href="/ambassador" variant="ghost">
                Ambassador Dashboard
              </Button>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {dashboard.recommended.map((ambassador) => (
                <Link
                  key={ambassador.id}
                  href={`/schedule/${ambassador.id}`}
                  className="rounded-[24px] border border-slate-200 bg-white p-4 transition hover:border-burnt-200"
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={ambassador.avatarUrl}
                      alt={ambassador.name}
                      width={56}
                      height={56}
                      className="rounded-2xl border border-slate-200 bg-slate-100"
                      unoptimized
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900">{ambassador.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{ambassador.major}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {ambassador.expertiseTags.slice(0, 3).map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </DashboardCard>
        </div>
      </section>
    </PageShell>
  );
}
