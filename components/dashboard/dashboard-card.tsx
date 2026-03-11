import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function DashboardCard({
  title,
  action,
  children
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </Card>
  );
}
