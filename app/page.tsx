import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">

      <Navbar />

      {/* ── Hero ── */}
      <section className="max-w-2xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-300 text-emerald-700 bg-emerald-50 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Powered by Claude / Gemini AI
        </div>

        <h1 className="font-serif text-5xl leading-tight tracking-tight text-gray-900 mb-5">
          Land your next job with{" "}
          <em className="italic text-emerald-600 not-italic">smarter</em>{" "}
          applications
        </h1>

        <p className="text-lg text-gray-500 font-light max-w-md mx-auto mb-10 leading-relaxed">
          Upload your resume, paste a job description — JobCraft AI tailors
          your CV, writes your cover letter, and prepares your interview in
          seconds.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/upload"
            className="text-sm font-medium px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:scale-95 transition-all"
          >
            Start for free →
          </Link>
          <a
            href="#how-it-works"
            className="text-sm px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            See how it works
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 mt-7 text-xs text-gray-400">
          <span>No account needed</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>Free to try</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>Results in seconds</span>
        </div>
      </section>

      <hr className="border-gray-100 mx-10" />

      {/* ── How it works ── */}
      <section id="how-it-works" className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs font-medium tracking-widest uppercase text-gray-400 text-center mb-10">
          How it works
        </p>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Upload resume",
              desc: "Drop your PDF resume and paste the job description",
              active: true,
            },
            {
              step: "2",
              title: "AI analyzes",
              desc: "Claude matches your skills to the role in seconds",
              active: false,
            },
            {
              step: "3",
              title: "Get results",
              desc: "Tailored CV, cover letter and interview questions ready",
              active: false,
            },
          ].map(({ step, title, desc, active }) => (
            <div key={step} className="text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mx-auto mb-4 border ${
                  active
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1.5">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-100 mx-10" />

      {/* ── Features ── */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 text-center mb-10">
            What you get
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: "📄",
                title: "Tailored CV",
                desc: "Your resume rewritten to match the exact job requirements and keywords.",
                bg: "bg-emerald-50",
              },
              {
                icon: "✉️",
                title: "Cover letter",
                desc: "A personalised cover letter written in your tone, ready to send.",
                bg: "bg-amber-50",
              },
              {
                icon: "🎯",
                title: "Interview prep",
                desc: "Predicted questions based on the role with suggested answers.",
                bg: "bg-blue-50",
              },
              {
                icon: "✅",
                title: "Skills match",
                desc: "See which skills match the role and what gaps to address.",
                bg: "bg-rose-50",
              },
            ].map(({ icon, title, desc, bg }) => (
              <div
                key={title}
                className="bg-white border border-gray-100 rounded-xl p-5"
              >
                <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center text-base mb-4`}>
                  {icon}
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1.5">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="font-serif text-4xl tracking-tight text-gray-900 mb-4 leading-snug">
          Ready to craft your{" "}
          <em className="italic text-emerald-600">perfect</em> application?
        </h2>
        <p className="text-sm text-gray-400 font-light mb-8">
          It takes less than 2 minutes. No sign-up required.
        </p>
        <Link
          href="/upload"
          className="inline-block text-sm font-medium px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:scale-95 transition-all"
        >
          Upload your resume →
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 px-10 py-5 flex items-center justify-between">
        <span className="font-serif text-sm">
          Job<span className="italic text-emerald-600">Craft</span> AI
        </span>
        <span className="text-xs text-gray-400">Built with Next.js + Claude API</span>
      </footer>

    </main>
  );
}