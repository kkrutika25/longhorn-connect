import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ambassador } from "@/lib/types";

export function AmbassadorCard({ ambassador }: { ambassador: Ambassador }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start gap-4">
        <Image
          src={ambassador.avatarUrl}
          alt={ambassador.name}
          width={72}
          height={72}
          className="rounded-3xl border border-slate-200 bg-slate-100"
          unoptimized
        />
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-slate-900">{ambassador.name}</h3>
          <p className="text-sm text-slate-600">
            {ambassador.major} · {ambassador.year}
          </p>
          <p className="text-sm text-slate-500">{ambassador.residenceHall}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-600">{ambassador.bio}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {ambassador.expertiseTags.slice(0, 4).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button href={`/ambassadors/${ambassador.id}`} variant="secondary">
          View Profile
        </Button>
        <Button href={`/schedule/${ambassador.id}`}>Schedule</Button>
      </div>
    </Card>
  );
}
