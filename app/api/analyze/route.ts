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
        { status: 400 },
      );
    }

    // const resumeText = await extractTextFromPDF(file);

    // const message = await client.messages.create({
    //   model: "claude-sonnet-4-20250514",
    //   max_tokens: 1000,
    //   messages: [
    //     {
    //       role: "user",
    //       content: analyzeresumePrompt(resumeText, jobDescription),
    //     },
    //   ],
    // });

    // const tailoredCV = (message.content[0] as { text: string }).text;

    return NextResponse.json({
      tailoredCV: `Rishav Pokharel
Frontend Developer | Kathmandu, Nepal
rishav.pokharel@email.com | github.com/rishavpokharel | linkedin.com/in/rishavpokharel

SUMMARY
Mid-level Frontend Developer with 3+ years of experience building scalable web applications using React, Next.js, and Angular. Passionate about delivering pixel-perfect UIs and seamless user experiences in fast-paced product teams.

SKILLS
React, Next.js, Angular, TypeScript, Tailwind CSS, JavaScript (ES6+), REST APIs, Git, Figma, Responsive Design

EXPERIENCE
Frontend Developer — Acme Tech, Kathmandu
2022 – Present
- Built and maintained 10+ reusable React components used across 3 products
- Reduced page load time by 40% through lazy loading and code splitting
- Collaborated with design team to implement pixel-perfect UI from Figma
- Integrated REST APIs and handled complex state management using Redux

Junior Frontend Developer — StartupXYZ, Kathmandu
2021 – 2022
- Developed responsive landing pages using HTML, CSS, and JavaScript
- Migrated legacy jQuery codebase to modern React architecture
- Worked in Agile team with 2-week sprints and daily standups

EDUCATION
Bachelor of Computer Science
Tribhuvan University, Kathmandu — 2021`,

      resumeText: `Rishav Pokharel Frontend Developer Kathmandu Nepal rishav.pokharel@email.com
3+ years experience in React Next.js Angular TypeScript Tailwind CSS
Worked at Acme Tech and StartupXYZ building web applications and components`,
    });
  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
