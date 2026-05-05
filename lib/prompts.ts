export const analyzeresumePrompt = (
  resumeText: string,
  jobDescription: string
) => `
You are an expert resume writer and career coach.

I will provide:
1. A candidate's resume  
2. A job description  

Your task is to deeply tailor the resume to align with the job description.

### Instructions:
- Rewrite the professional summary to strongly match the role
- Optimize the resume for ATS (Applicant Tracking Systems)
- Highlight and prioritize relevant skills, technologies, and experience
- Naturally incorporate important keywords from the job description
- Identify missing or weak areas (skill gaps)
- Keep the tone professional, concise, and impactful
- Do NOT fabricate experience, but you may reframe existing experience strategically

### Output Requirements:
- Return the response in STRICT JSON format only
- Do NOT include explanations, notes, or extra text outside JSON
- Ensure the JSON is valid and properly formatted

### JSON Structure:
{
  "tailoredCV": "Fully rewritten and optimized resume text here",
  "stats": {
    "skills_matched": 0,
    "gaps_found": ["gap1", "gap2"],
    "keywords_added": 0
  }
}

### Additional Rules:
- "skills_matched" must be a number
- "keywords_added" must be a number
- "gaps_found" must be an array of missing or weak skills based on the job description
- Ensure the resume remains realistic and aligned with the candidate’s background

Now process the following:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;

export const coverLetterPrompt = (
  resumeText: string,
  jobDescription: string
) => `
You are an expert cover letter writer.

Using the resume and job description below, write a concise, 
personalized cover letter (3 short paragraphs max).

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

- Sound human, not robotic
- Reference specific requirements from the JD
- End with a confident closing line

Return only the cover letter text. No explanations.
`;

export const interviewPrepPrompt = (jobDescription: string) => `
You are an expert interview coach.

Based on the job description below, generate 8 likely interview questions.
Mix technical and behavioral questions relevant to the role.

JOB DESCRIPTION:
${jobDescription}

Format your response as a numbered list.
Return only the questions. No explanations.
`;
