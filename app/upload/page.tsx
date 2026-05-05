"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function UploadPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter(); // add this at top with other hooks


  function handleJobDescriptionChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setJobDescription(e.target.value);
  }

  function handleSubmit() {
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file?.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    if (file) {
      setResumeFile(file);
    }
  }


async function handleFormSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!resumeFile) {
    alert("Please upload your resume.");
    return;
  }

  if (!jobDescription.trim()) {
    alert("Please enter the job description.");
    return;
  }

  setIsLoading(true);

  try {
    // Step 1 — call /api/analyze with FormData
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    const analyzeRes = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });
    const analyzeData = await analyzeRes.json();

    console.log(analyzeData)

    // Step 2 — call /api/cover-letter with JSON
    const coverLetterRes = await fetch("/api/cover-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeText: analyzeData.tailoredCV,
        jobDescription: jobDescription,
      }),
    });
    const coverLetterData = await coverLetterRes.json();

    // Step 3 — save everything to localStorage
    localStorage.setItem("tailoredCV", analyzeData.tailoredCV);
    localStorage.setItem("resumeText", analyzeData.resumeText);
    localStorage.setItem("jobDescription", jobDescription);
    localStorage.setItem("coverLetter", coverLetterData.coverLetter);
    localStorage.setItem("stats", JSON.stringify(analyzeData.stats));


    // Step 4 — navigate to results
    router.push("/results");

  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
}
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* ── Navbar with step indicator ── */}
      <nav className="flex items-center justify-between px-10 py-4 border-b border-gray-100">
         <Link href="/">Job<span className="italic text-emerald-600">Craft</span> AI</Link>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-medium text-[10px]">
              1
            </span>
            Upload
          </span>
          <span className="w-6 h-px bg-gray-200" />
          <span className="flex items-center gap-1.5 text-gray-300">
            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-medium text-[10px]">
              2
            </span>
            Results
          </span>
          <span className="w-6 h-px bg-gray-200" />
          <span className="flex items-center gap-1.5 text-gray-300">
            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-medium text-[10px]">
              3
            </span>
            Interview
          </span>
        </div>
      </nav>

      {/* ── Page header ── */}
      <div className="max-w-2xl mx-auto px-6 pt-14 pb-8">
        <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-3">
          Step 1 of 3
        </p>
        <h1 className="font-serif text-4xl tracking-tight text-gray-900 mb-2">
          Upload your details
        </h1>
        <p className="text-sm text-gray-400 font-light">
          Add your resume and the job you are applying for — we will handle the
          rest.
        </p>
      </div>

      {/* ── Form layout ── */}
      <div className="max-w-2xl mx-auto px-6 pb-20 space-y-6">
        {/* Resume dropzone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your resume
            <span className="ml-1.5 text-xs font-normal text-gray-400">
              PDF only
            </span>
          </label>
          <div
            onClick={handleSubmit}
            className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center cursor-pointer hover:border-emerald-300 hover:bg-gray-50 transition-all"
          >
            {resumeFile ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {resumeFile.name}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setResumeFile(null);
                  }}
                  className="text-xs text-emerald-600 underline underline-offset-2"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gray-400"
                  >
                    <path
                      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2v6h6M12 12v6M9 15l3-3 3 3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Drop your resume here
                </p>
                <p className="text-xs text-gray-400">
                  or{" "}
                  <span className="text-emerald-600 underline underline-offset-2">
                    browse files
                  </span>{" "}
                  · PDF up to 5MB
                </p>
              </>
            )}

            <input
              type="file"
              accept="application/pdf"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Job description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job description
            <span className="ml-1.5 text-xs font-normal text-gray-400">
              Paste the full JD from the job posting
            </span>
          </label>
          <textarea
            onChange={handleJobDescriptionChange}
            value={jobDescription}
            placeholder="Paste the job description here..."
            rows={10}
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 transition-colors leading-relaxed"
          />
        </div>

        <hr className="border-gray-100" />

        {/* Info strip */}
        <div className="bg-gray-50 rounded-xl px-5 py-4 flex items-start gap-4">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="text-emerald-600"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-0.5">
              What happens next?
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Claude AI will read your resume and the job description, then
              generate a tailored CV, cover letter, and predicted interview
              questions — all within seconds.
            </p>
          </div>
        </div>

        {/* Submit button */}
        <button onClick={handleFormSubmit} disabled={isLoading} className="w-full py-3.5 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99] transition-all">
           {isLoading ? (
            <span className="w-6 h-6 border-[2px] border-white border-b-transparent rounded-full inline-block box-border animate-spin"></span>
           ) : "Analyze my application →"}
        </button>

        <p className="text-center text-xs text-gray-300">
          Your data is processed securely and never stored.
        </p>
      </div>
    </main>
  );
}
