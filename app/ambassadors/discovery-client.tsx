"use client";

import { useMemo, useState } from "react";
import { AmbassadorCard } from "@/components/ambassadors/ambassador-card";
import { FilterPanel } from "@/components/ambassadors/filter-panel";
import { ambassadors as initialAmbassadors } from "@/lib/data/mock";

export function DiscoveryClient() {
  const [query, setQuery] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");

  const results = useMemo(() => {
    return initialAmbassadors.filter((ambassador) => {
      const searchableText = [
        ambassador.name,
        ambassador.bio,
        ambassador.program,
        ambassador.major,
        ambassador.careerBackground,
        ...ambassador.expertiseTags,
        ...ambassador.clubs,
        ...ambassador.interests
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !query || searchableText.includes(query.toLowerCase());
      const matchesMajor = !major || searchableText.includes(major.toLowerCase());
      const matchesInterest =
        !interest || searchableText.includes(interest.toLowerCase());
      return matchesQuery && matchesMajor && matchesInterest;
    });
  }, [interest, major, query]);

  return (
    <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
      <FilterPanel
        query={query}
        major={major}
        interest={interest}
        onQueryChange={setQuery}
        onMajorChange={setMajor}
        onInterestChange={setInterest}
      />
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">{results.length} ambassadors matched</p>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          {results.map((ambassador) => (
            <AmbassadorCard key={ambassador.id} ambassador={ambassador} />
          ))}
        </div>
      </div>
    </div>
  );
}
