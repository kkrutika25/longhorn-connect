import { PageShell } from "@/components/shared/page-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { DiscoveryClient } from "@/app/ambassadors/discovery-client";

export default function AmbassadorsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeading
          eyebrow="Ambassador Discovery"
          title="Search by major, interests, clubs, and lived experience."
          description="Responsive discovery flow with reusable ambassador cards, filters, and direct actions to message or schedule."
        />
        <div className="mt-10">
          <DiscoveryClient />
        </div>
      </section>
    </PageShell>
  );
}
