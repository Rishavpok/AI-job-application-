import { NextRequest, NextResponse } from "next/server";
import { coverLetterPrompt } from "@/lib/prompts";
import { AIService } from "@/lib/aiservice";

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

    const service = new AIService('gemini')


    const text = await service.analyze(
      coverLetterPrompt(resumeText, jobDescription)
    )


    return NextResponse.json({
      coverLetter: text
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}