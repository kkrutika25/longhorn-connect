import { PageShell } from "@/components/shared/page-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { AskExperience } from "@/app/ask/ask-experience";

export default function AskPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeading
          eyebrow="AI Campus Q&A"
          title="Ask MSITM questions and get grounded answers from the program FAQ."
          description="Responses are backed by the uploaded MSITM FAQ content and paired with ambassador recommendations when a student perspective would help."
        />
        <div className="mt-10">
          <AskExperience />
        </div>
      </section>
    </PageShell>
  );
}
