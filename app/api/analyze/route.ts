export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { analyzeresumePrompt } from "@/lib/prompts";
import { extractTextFromPDF } from "@/lib/pdf-parser";
import { AIService } from "@/lib/aiservice";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required" },
        { status: 400 },
      );
    }

    const resumeText = await extractTextFromPDF(file);

    const service = new AIService('gemini')

     const response = await service.analyze(
      analyzeresumePrompt(resumeText, jobDescription)
    )
    return NextResponse.json(JSON.parse(response));
  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
