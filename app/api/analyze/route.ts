export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/claude";
import { analyzeresumePrompt } from "@/lib/prompts";
import { extractTextFromPDF } from "@/lib/pdf-parser";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required" },
        { status: 400 }
      );
    }

    const resumeText = await extractTextFromPDF(file);

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: analyzeresumePrompt(resumeText, jobDescription),
        },
      ],
    });

    const tailoredCV = (message.content[0] as { text: string }).text;

    return NextResponse.json({ tailoredCV, resumeText });

  } catch (error: any) {
  console.error("API ERROR:", error);

  return NextResponse.json(
    { error: error.message || "Something went wrong" },
    { status: 500 }
  );
}
}