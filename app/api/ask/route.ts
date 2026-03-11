import { NextResponse } from "next/server";
import { askCampusQuestion } from "@/lib/data/mock";

export async function POST(request: Request) {
  const { question } = (await request.json()) as { question?: string };
  const safeQuestion = question?.trim() || "Tell me about campus life at UT Austin.";
  // Replace the mock retrieval call with OpenAI + vector retrieval when the knowledge base is externalized.
  return NextResponse.json(askCampusQuestion(safeQuestion));
}
