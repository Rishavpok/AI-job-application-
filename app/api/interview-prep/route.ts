import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/claude";
import { interviewPrepPrompt } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { jobDescription } = body;

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: interviewPrepPrompt(jobDescription),
        },
      ],
    });

    const questions = (message.content[0] as { text: string }).text;

    return NextResponse.json({ questions });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}