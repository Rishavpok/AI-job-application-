export const analyzeresumePrompt = (
  resumeText: string,
  jobDescription: string
) => `
You are an expert resume writer and career coach.

I will give you a candidate's resume and a job description.
Your job is to rewrite the resume to better match the job.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Your task:
- Rewrite the summary section to match the role
- Highlight skills and experiences relevant to the JD
- Add missing keywords from the JD naturally
- Keep the tone professional

Return only the rewritten resume text. No explanations.
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