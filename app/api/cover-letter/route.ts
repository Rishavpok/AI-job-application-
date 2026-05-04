import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/claude";
import { coverLetterPrompt } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { resumeText, jobDescription } = body;

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume text and job description are required" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: coverLetterPrompt(resumeText, jobDescription),
        },
      ],
    });

    const coverLetter = (message.content[0] as { text: string }).text;

    return NextResponse.json({ coverLetter });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}