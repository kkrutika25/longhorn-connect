import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-burnt-50 px-3 py-1 text-xs font-semibold text-burnt-700">
      {children}
    </span>
  );
}
