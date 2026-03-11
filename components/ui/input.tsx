import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input(props: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-burnt-300 focus:ring-2 focus:ring-burnt-100",
        props.className
      )}
    />
  );
}
