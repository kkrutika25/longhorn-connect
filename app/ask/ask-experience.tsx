"use client";

import { useState } from "react";
import { AmbassadorCard } from "@/components/ambassadors/ambassador-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AskResponse } from "@/lib/types";

const categories = ["Curriculum", "Admissions", "Program Format", "Tuition", "Careers"];
const prompts = [
  "What is the main focus of the Master of Science in Information and Technology Management curriculum?",
  "How long does it take to complete the Texas McCombs MSITM program?",
  "Is the Texas McCombs MSITM program STEM-designated?",
  "What materials are required to apply to the Texas McCombs MSITM program?",
  "What kinds of careers do Texas McCombs MSITM graduates pursue, and what are their average starting salaries?"
];

const fallback: AskResponse = {
  answer: "Ask an MSITM question to see a grounded answer from the uploaded FAQ and ambassador suggestions.",
  citations: [],
  suggestedAmbassadors: []
};

export function AskExperience() {
  const [question, setQuestion] = useState(prompts[0]);
  const [response, setResponse] = useState<AskResponse>(fallback);
  const [loading, setLoading] = useState(false);

  async function submit(prompt: string) {
    setLoading(true);
    const result = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: prompt })
    }).then((res) => res.json());
    setResponse(result);
    setLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
        <Card className="h-fit">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-burnt-700">Categories</p>
          <div className="mt-5 grid gap-3">
            {categories.map((category) => (
              <button key={category} className="rounded-2xl bg-slate-100 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-burnt-50">
              {category}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid gap-6">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setQuestion(prompt);
                  void submit(prompt);
                }}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-burnt-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-burnt-700">Result</p>
          <div className="mt-4 rounded-[24px] bg-slate-100 p-4 text-sm text-slate-700">{question}</div>
          <div className="mt-4 rounded-[28px] border border-burnt-100 bg-burnt-50 p-5 text-sm leading-7 text-slate-700">
            {loading ? "Searching the MSITM FAQ..." : response.answer}
          </div>
        </Card>

        <Card>
          <label className="text-sm font-semibold text-slate-700" htmlFor="ask-input">
            Ask another question
          </label>
          <div className="mt-3 flex flex-col gap-4 md:flex-row">
            <Textarea id="ask-input" rows={4} value={question} onChange={(event) => setQuestion(event.target.value)} />
            <Button className="md:self-end" onClick={() => void submit(question)}>
              Submit
            </Button>
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Suggested ambassadors</h2>
          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            {response.suggestedAmbassadors.map((ambassador) => (
              <AmbassadorCard key={ambassador.id} ambassador={ambassador} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
