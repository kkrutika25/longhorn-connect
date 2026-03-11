import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-float", className)}>
      {children}
    </div>
  );
}
