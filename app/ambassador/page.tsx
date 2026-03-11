import { AmbassadorDashboardClient } from "@/app/ambassador/ambassador-dashboard-client";
import { PageShell } from "@/components/shared/page-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { ambassadorUser, getAmbassadorDashboardData } from "@/lib/data/mock";

export default function AmbassadorDashboardPage() {
  const dashboard = getAmbassadorDashboardData(ambassadorUser.id);

  if (!dashboard.ambassador) {
    return null;
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeading
          eyebrow="Ambassador Dashboard"
          title="Review mentorship requests, manage availability, and prepare for upcoming sessions."
          description={`${dashboard.ambassador.name} can confirm or decline requests while monitoring open, pending, and booked calendar blocks.`}
        />
        <div className="mt-10">
          <AmbassadorDashboardClient
            ambassador={dashboard.ambassador}
            initialPendingRequests={dashboard.pendingRequests}
            initialUpcomingConfirmed={dashboard.upcomingConfirmed}
            availability={dashboard.availability}
            stats={dashboard.stats}
          />
        </div>
      </section>
    </PageShell>
  );
}
