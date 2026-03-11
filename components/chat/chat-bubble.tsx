import { cn } from "@/lib/utils";
import { Message } from "@/lib/types";

export function ChatBubble({ message }: { message: Message }) {
  const isStudent = message.senderType === "student";
  const isAi = message.senderType === "ai";

  return (
    <div className={cn("flex", isStudent ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm",
          isStudent && "bg-burnt-500 text-white",
          isAi && "border border-burnt-100 bg-burnt-50 text-slate-700",
          !isStudent && !isAi && "bg-slate-100 text-slate-700"
        )}
      >
        <p>{message.content}</p>
        <p className={cn("mt-2 text-[11px]", isStudent ? "text-white/70" : "text-slate-400")}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}
