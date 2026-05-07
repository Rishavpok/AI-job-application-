"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [tailoredCV, setTailoredCV] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [gapsFound, setgapsfound] = useState([]);
  const [skillsMatch, setSkillsMatch] = useState([]);
  const [keywordAdded, setkeywordAdded] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [isCoverLetterLoading, setisCoverLetterLoading] = useState(false);

  const printArea = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
    if(tab === 1) {
      if(!coverLetter) {
      getCoverLetter()
      }
    }
  };

  async function getCoverLetter() {
    setisCoverLetterLoading(true)
    try {
      const coverLetterRes = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: tailoredCV,
          jobDescription: jobDescription,
        }),
      });
      const coverLetterData = await coverLetterRes.json();
      setCoverLetter(coverLetterData.coverLetter)
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setisCoverLetterLoading(true);
    }
  }

  async function handleInterview() {
    setIsLoading(true)
    try {
      const interviewQuestion = await fetch("/api/interview-prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: jobDescription,
        }),
      });

      const questions = await interviewQuestion.json()
      localStorage.setItem("questions",JSON.stringify(questions.questions))
      router.push("/interview");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function printContent() {
    const content = printArea?.current?.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow?.document.write(`
    <html>
      <head>
        <title>Print</title>
      </head>
      <body>
        <pre> ${content}</pre>
      </body>
    </html>
  `);

    printWindow?.document.close();
    printWindow?.print();
  }

  useEffect(() => {
    setTailoredCV(localStorage.getItem("tailoredCV") || "");
    // setCoverLetter(localStorage.getItem("coverLetter") || "");
    setJobDescription(localStorage.getItem("jobDescription") || "");
    const storedStats = localStorage.getItem("stats");
    const parsed = storedStats ? JSON.parse(storedStats) : null;

    setStats(parsed);
    setSkillsMatch(parsed.skills_matched);
    setgapsfound(parsed.gaps_found);
    setkeywordAdded(parsed.keywords_added);
  }, []);
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* ── Navbar with step indicator ── */}
      <nav className="flex items-center justify-between px-10 py-4 border-b border-gray-100">
        <span className="font-serif text-xl tracking-tight">
          <Link href="/">
            {" "}
            Job<span className="italic text-emerald-600">Craft</span> AI{" "}
          </Link>
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-1.5 text-gray-300">
            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-medium text-[10px]">
              ✓
            </span>
            Upload
          </span>
          <span className="w-6 h-px bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-medium text-[10px]">
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
      <div className="max-w-3xl mx-auto px-6 pt-14 pb-8">
        <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-3">
          Step 2 of 3
        </p>
        <h1 className="font-serif text-4xl tracking-tight text-gray-900 mb-2">
          Your results are ready
        </h1>
        <p className="text-sm text-gray-400 font-light">
          Here is your tailored CV, cover letter, and skills match — based on
          the job description you provided.
        </p>
      </div>

      {/* ── Match score banner ── */}
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">87%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-800">
                Strong match
              </p>
              <p className="text-xs text-emerald-600">
                Your profile aligns well with this role
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <p className="text-lg font-medium text-emerald-800">
                {skillsMatch.length}
              </p>
              <p className="text-xs text-emerald-600">Skills matched</p>
            </div>
            <div className="w-px h-8 bg-emerald-200" />
            <div>
              <p className="text-lg font-medium text-emerald-800">
                {gapsFound.length}
              </p>
              <p className="text-xs text-emerald-600">Gaps found</p>
            </div>
            <div className="w-px h-8 bg-emerald-200" />
            <div>
              <p className="text-lg font-medium text-emerald-800">
                {keywordAdded.length}
              </p>
              <p className="text-xs text-emerald-600">Keywords added</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="max-w-3xl mx-auto px-6 mb-6">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
          {["Tailored CV", "Cover letter"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => handleTabClick(i)}
              className={`text-xs font-medium px-4 py-2 rounded-md transition-all ${
                i === activeTab
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-6">
          {/* ── Left: CV content (2/3 width) ── */}
          <div className="col-span-2 space-y-5">
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              {/* CV header */}
              <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-b border-gray-100">
                {activeTab === 0 && (
                  <p className="text-xs font-medium text-gray-600">
                    Tailored CV preview
                  </p>
                )}

                {activeTab === 1 && (
                  <p className="text-xs font-medium text-gray-600">
                    Tailored cover letter preview
                  </p>
                )}

                {activeTab === 0 && (
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path
                          d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => printContent()}
                      className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium transition-colors"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Download PDF
                    </button>
                  </div>
                )}
              </div>

              {/* CV body (static placeholder) */}
              <div className="px-6 py-6 space-y-5 text-sm">
                {activeTab === 0 && (
                  <pre
                    ref={printArea}
                    className="text-xs text-gray-600 whitespace-pre-wrap"
                  >
                    {tailoredCV || "Loading tailored CV..."}
                  </pre>
                )}

                {activeTab === 1 && (
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                    {coverLetter || "Loading tailored cover letter..."}
                  </pre>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Skills sidebar (1/3 width) ── */}
          <div className="space-y-4">
            {/* Matched skills */}
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-700 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Skills matched
              </p>
              <div className="space-y-2">
                {skillsMatch.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-emerald-500 shrink-0"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-xs text-gray-600">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill gaps */}
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-700 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Gaps to address
              </p>
              <div className="space-y-2">
                {gapsFound.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-amber-400 shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs text-gray-600">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 text-center">
              <p className="text-xs font-medium text-white mb-1">
                Ready for interviews?
              </p>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Get predicted questions based on this role
              </p>
              <button
                onClick={handleInterview}
                className="w-full py-2.5 rounded-lg text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-400 transition-colors"
              >
                {
                  !isLoading ? (
                    <div> Prepare for interview →</div>
                  ) : "......"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
