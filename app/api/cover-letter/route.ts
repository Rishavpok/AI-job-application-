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

    // const message = await client.messages.create({
    //   model: "claude-sonnet-4-20250514",
    //   max_tokens: 1000,
    //   messages: [
    //     {
    //       role: "user",
    //       content: coverLetterPrompt(resumeText, jobDescription),
    //     },
    //   ],
    // });

    // const coverLetter = (message.content[0] as { text: string }).text;

    return NextResponse.json({
      coverLetter: `Dear Hiring Manager,

I am excited to apply for the Frontend Developer position at your company. With 3+ years of hands-on experience building production-grade web applications using React, Next.js, and Angular, I am confident I can contribute meaningfully to your team from day one.

In my current role at Acme Tech, I have led the development of reusable component libraries, improved application performance by 40%, and worked closely with designers and backend engineers to ship high-quality features on time. I thrive in collaborative environments and have a strong eye for detail when it comes to UI implementation.

What excites me most about this opportunity is the chance to work on products that directly impact users at scale. I am eager to bring my frontend expertise, my passion for clean code, and my experience with modern tooling to your engineering team.

Thank you for considering my application. I would love the opportunity to discuss how my background aligns with your needs.

Warm regards,
Rishav Pokharel`,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}