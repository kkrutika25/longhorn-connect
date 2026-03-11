import { NextResponse } from "next/server";
import { getAnalytics } from "@/lib/data/mock";

export async function GET() {
  return NextResponse.json(getAnalytics());
}
