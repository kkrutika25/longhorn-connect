import Image from "next/image";
import { AmbassadorCard } from "@/components/ambassadors/ambassador-card";
import { PageShell } from "@/components/shared/page-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ambassadors } from "@/lib/data/mock";

const highlights = [
  "Ask campus-life questions with grounded AI responses",
  "Discover ambassadors by major, interests, and lived experience",
  "Chat directly and book mentorship meetings in a few taps"
];

const steps = [
  { title: "Ask anything", body: "Start with AI for fast answers about housing, clubs, academics, and student life." },
  { title: "Meet the right ambassador", body: "See relevant student mentors matched to your interests and goals." },
  { title: "Book a conversation", body: "Choose a time slot, decide on Zoom or in-person, and manage it from your dashboard." }
];

const testimonials = [
  {
    quote: "The AI gave me a fast answer, but the ambassador made it feel real and specific.",
    author: "Ananya Rao",
    role: "Prospective",
    avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    quote: "Having chat and scheduling in one flow made follow-up much easier.",
    author: "Ethan Walker",
    role: "Current",
    avatarUrl: "https://randomuser.me/api/portraits/men/54.jpg"
  }
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="bg-hero-glow">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.2fr,.8fr] lg:px-8 lg:py-24">
          <div>
            <Badge>Ask Anything About UT Austin</Badge>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              AI campus answers with real student mentorship when it matters.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              UT AmbassadorAI helps prospective and current students get grounded answers, discover ambassadors, and
              schedule mentorship sessions without bouncing between tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/ask">Ask a Question</Button>
              <Button href="/ambassadors" variant="secondary">
                Find an Ambassador
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item} className="rounded-[24px] border border-white/60 bg-white/70 p-4 text-sm leading-6 text-slate-600 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <Card className="self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burnt-700">Instant campus support</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-700">Start with a question</p>
                <div className="mt-3 flex flex-col gap-3">
                  <Input value="How do students find community during their first semester?" readOnly />
                  <div className="flex flex-wrap gap-3">
                    <Button href="/ask">Ask a Question</Button>
                    <Button href="/ambassadors" variant="secondary">
                      Find an Ambassador
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-[24px] bg-slate-100 p-4 text-sm text-slate-700">
                How is UT Austin dorm life for first-year students?
              </div>
              <div className="rounded-[24px] bg-burnt-50 p-4 text-sm leading-6 text-slate-700">
                Residence halls differ by pace, room style, and proximity. Many first-year students choose based on
                how social they want the experience to feel. Want a student perspective too? I can connect you with an
                ambassador who lived in Jester or Moore-Hill.
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Housing</Badge>
                <Badge>Campus Life</Badge>
                <Badge>First-Year Experience</Badge>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="A hybrid guidance flow built for the way students actually decide."
          description="Start with immediate AI help, then move into direct mentorship when nuance, reassurance, or lived experience matters."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className="relative overflow-hidden">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-burnt-700">0{index + 1}</span>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeading
          eyebrow="Ambassador Highlights"
          title="Meet students who can translate campus information into practical advice."
          description="Profiles combine academic context, clubs, residence experience, and topic expertise."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {ambassadors.slice(0, 3).map((ambassador) => (
            <AmbassadorCard key={ambassador.id} ambassador={ambassador} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeading
          eyebrow="Student Signal"
          title="Built to feel reassuring, direct, and useful from the first visit."
          description="The MVP emphasizes trust through grounded answers, visible student profiles, and clear next actions."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <Card key={item.quote}>
              <div className="flex items-center gap-4">
                <Image
                  src={item.avatarUrl}
                  alt={item.author}
                  width={56}
                  height={56}
                  className="rounded-2xl border border-slate-200 bg-slate-100 object-cover"
                  unoptimized
                />
                <p className="text-sm font-semibold text-burnt-700">
                  {item.author} <span className="text-slate-500">({item.role})</span>
                </p>
              </div>
              <p className="mt-5 text-lg leading-8 text-slate-700">“{item.quote}”</p>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
