"use client";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const majorOptions = [
  "MSITM",
  "MSBA",
  "MSF",
  "MSM"
] as const;

const interestOptions = [
  "Research",
  "Courses",
  "Faculty",
  "Austin",
  "Housing",
  "Career"
] as const;

type Props = {
  query: string;
  major: string;
  interest: string;
  onQueryChange: (value: string) => void;
  onMajorChange: (value: string) => void;
  onInterestChange: (value: string) => void;
};

export function FilterPanel({ query, major, interest, onQueryChange, onMajorChange, onInterestChange }: Props) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-float">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burnt-700">Filters</p>
      <div className="mt-4 grid gap-4">
        <Input placeholder="Search ambassadors" value={query} onChange={(event) => onQueryChange(event.target.value)} />
        <Select value={major} onChange={(event) => onMajorChange(event.target.value)}>
          <option value="">All majors</option>
          {majorOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Select value={interest} onChange={(event) => onInterestChange(event.target.value)}>
          <option value="">All interests</option>
          {interestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
