import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Textarea(props: ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-burnt-300 focus:ring-2 focus:ring-burnt-100",
        props.className
      )}
    />
  );
}
