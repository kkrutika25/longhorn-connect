"use client";

import { useMemo, useState } from "react";
import { ChatBubble } from "@/components/chat/chat-bubble";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getConversationMessages, getConversationsWithMeta } from "@/lib/data/mock";

const initialConversations = getConversationsWithMeta();

export function MessagesClient() {
  const [selectedId, setSelectedId] = useState(initialConversations[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, ReturnType<typeof getConversationMessages>>>({});

  const conversation = initialConversations.find((item) => item.id === selectedId);
  const messages = useMemo(() => {
    return localMessages[selectedId] ?? getConversationMessages(selectedId);
  }, [localMessages, selectedId]);

  function send() {
    if (!draft.trim() || !selectedId) {
      return;
    }
    setLocalMessages((current) => ({
      ...current,
      [selectedId]: [
        ...(current[selectedId] ?? getConversationMessages(selectedId)),
        {
          id: `local-${Date.now()}`,
          conversationId: selectedId,
          senderId: "student-maya",
          senderType: "student",
          content: draft.trim(),
          createdAt: new Date().toISOString()
        }
      ]
    }));
    setDraft("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      <Card className="min-w-0 p-3">
        <div className="grid gap-2">
          {initialConversations.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`min-w-0 overflow-hidden rounded-[24px] p-4 text-left transition ${
                item.id === selectedId ? "bg-burnt-50" : "hover:bg-slate-50"
              }`}
            >
              <p className="truncate font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 block max-w-full truncate text-sm text-slate-500">{item.preview}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card className="flex min-h-[640px] flex-col">
        {conversation ? (
          <>
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-semibold text-slate-900">{conversation.title}</h2>
              <p className="text-sm text-slate-500">Continue your ambassador conversation or AI follow-up.</p>
            </div>
            <div className="flex-1 space-y-4 overflow-auto py-6">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
            </div>
            <div className="border-t border-slate-200 pt-4">
              <div className="flex flex-col gap-3 md:flex-row">
                <Input
                  placeholder="Send a message"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                />
                <Button onClick={send}>Send</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="grid h-full place-items-center text-center text-slate-500">
            <div>
              <p className="text-lg font-semibold text-slate-800">No conversation selected</p>
              <p className="mt-2 text-sm">Choose a conversation to view the thread.</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
