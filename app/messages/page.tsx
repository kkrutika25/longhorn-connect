import { MessagesClient } from "@/app/messages/messages-client";
import { PageShell } from "@/components/shared/page-shell";
import { SectionHeading } from "@/components/shared/section-heading";

export default function MessagesPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeading
          eyebrow="Messaging"
          title="Keep AI, ambassador, and follow-up conversations in one place."
          description="The MVP uses mocked conversation data with visually distinct user, ambassador, and AI bubbles."
        />
        <div className="mt-10">
          <MessagesClient />
        </div>
      </section>
    </PageShell>
  );
}
