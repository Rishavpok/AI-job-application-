"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const badgeStyles: Record<string, string> = {
  Technical: "bg-blue-50 text-blue-600",
  Behavioral: "bg-amber-50 text-amber-600",
  Situational: "bg-purple-50 text-purple-600",
};

const numStyles: Record<string, string> = {
  Technical: "text-blue-600",
  Behavioral: "text-amber-600",
  Situational: "text-purple-600",
};

export default function InterviewPage() {
  const [questions, setquestions] = useState([]);
  const router = useRouter()

  function togoUpload() {
      localStorage.clear()
      router.push("/upload")
  }

  useEffect(() => {
    setquestions(JSON.parse(localStorage.getItem("questions") || "[]"));
  }, []);
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-10 py-4 border-b border-gray-100">
        <span className="font-serif text-xl tracking-tight">
          <Link href="/">
            Job<em className="not-italic italic text-emerald-600">Craft</em> AI
          </Link>
        </span>
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
          <span className="text-gray-300">✓ Upload</span>
          <span className="w-5 h-px bg-gray-200" />
          <span className="text-gray-300">✓ Results</span>
          <span className="w-5 h-px bg-gray-200" />
          <span className="flex items-center gap-1.5 text-gray-800 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Interview
          </span>
        </div>
      </nav>

      {/* ── Header ── */}
      <div className="max-w-2xl mx-auto px-6 pt-14 pb-6">
        <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-3">
          Step 3 of 3
        </p>
        <h1 className="font-serif text-4xl tracking-tight text-gray-900 mb-3">
          Interview preparation
        </h1>
        <p className="text-sm text-gray-400 font-light leading-relaxed">
          8 predicted questions based on your job description — practice your
          answers before the big day.
        </p>
      </div>

      {/* ── Summary bar ── */}
      <div className="max-w-2xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-6 bg-gray-50 border border-gray-100 rounded-xl px-6 py-4">
          <div>
            <p className="text-lg font-semibold text-gray-900">8</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Total
            </p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <p className="text-lg font-semibold text-blue-600">5</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Technical
            </p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <p className="text-lg font-semibold text-amber-600">2</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Behavioral
            </p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <p className="text-lg font-semibold text-purple-600">1</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Situational
            </p>
          </div>
        </div>
      </div>

      {/* ── Questions list ── */}
      <div className="max-w-2xl mx-auto px-6 pb-16 flex flex-col gap-3">
        { questions && questions.map((q:any) => (
          <div
            key={q.id}
            className="border border-gray-100 rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-gray-400">
                Q{q.id}
              </span>
              <span
                className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${badgeStyles[q.type]}`}
              >
                {q.type}
              </span>
            </div>

            <p className="text-sm font-medium text-gray-900 leading-relaxed mb-3">
              {q.question}
            </p>

            <div className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
              <span className="text-xs mt-0.5">💡</span>
              <p className="text-xs text-gray-500 leading-relaxed">{q.hint}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="max-w-2xl mx-auto px-6 pb-20 text-center">
        <p className="text-sm text-gray-400 mb-4">
          You are all set! Good luck with your interview. 🎉
        </p>
        <a
        
          onClick={togoUpload}
          className="inline-block px-7 py-3 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Start a new application →
        </a>
      </div>
    </main>
  );
}
