export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-white font-sans">

      {/* ── Navbar with step indicator ── */}
      <nav className="flex items-center justify-between px-10 py-4 border-b border-gray-100">
        <span className="font-serif text-xl tracking-tight">
          Job<span className="italic text-emerald-600">Craft</span> AI
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-1.5 text-gray-300">
            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-medium text-[10px]">✓</span>
            Upload
          </span>
          <span className="w-6 h-px bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-medium text-[10px]">2</span>
            Results
          </span>
          <span className="w-6 h-px bg-gray-200" />
          <span className="flex items-center gap-1.5 text-gray-300">
            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-medium text-[10px]">3</span>
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
          Here is your tailored CV, cover letter, and skills match — based on the job description you provided.
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
              <p className="text-sm font-medium text-emerald-800">Strong match</p>
              <p className="text-xs text-emerald-600">Your profile aligns well with this role</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <p className="text-lg font-medium text-emerald-800">12</p>
              <p className="text-xs text-emerald-600">Skills matched</p>
            </div>
            <div className="w-px h-8 bg-emerald-200" />
            <div>
              <p className="text-lg font-medium text-emerald-800">3</p>
              <p className="text-xs text-emerald-600">Gaps found</p>
            </div>
            <div className="w-px h-8 bg-emerald-200" />
            <div>
              <p className="text-lg font-medium text-emerald-800">5</p>
              <p className="text-xs text-emerald-600">Keywords added</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="max-w-3xl mx-auto px-6 mb-6">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
          {["Tailored CV", "Cover letter", "Skills match"].map((tab, i) => (
            <button
              key={tab}
              className={`text-xs font-medium px-4 py-2 rounded-md transition-all ${
                i === 0
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
                <p className="text-xs font-medium text-gray-600">Tailored CV preview</p>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Edit
                  </button>
                  <button className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Download PDF
                  </button>
                </div>
              </div>

              {/* CV body (static placeholder) */}
              <div className="px-6 py-6 space-y-5 text-sm">

                {/* Name & title */}
                <div className="pb-4 border-b border-gray-100">
                  <h2 className="font-serif text-2xl text-gray-900 mb-1">John Doe</h2>
                  <p className="text-xs text-gray-500">Frontend Developer · Kathmandu, Nepal · john@email.com</p>
                </div>

                {/* Summary */}
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-2">Summary</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Mid-level Frontend Developer with 3+ years of experience building scalable web applications using React, Next.js, and Angular. Proven ability to deliver pixel-perfect UIs and integrate REST APIs in fast-paced product teams.
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS", "REST APIs", "Git", "Figma"].map((skill) => (
                      <span key={skill} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-3">Experience</p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-800">Frontend Developer</p>
                        <p className="text-xs text-gray-400">2022 – Present</p>
                      </div>
                      <p className="text-xs text-emerald-600 mb-1.5">Acme Tech, Kathmandu</p>
                      <ul className="space-y-1">
                        {[
                          "Built and maintained 10+ React components used across 3 products",
                          "Reduced page load time by 40% through lazy loading and code splitting",
                          "Collaborated with design team to implement pixel-perfect UI from Figma",
                        ].map((item) => (
                          <li key={item} className="text-xs text-gray-500 leading-relaxed flex gap-2">
                            <span className="text-emerald-400 mt-0.5">·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

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
                {["React / Next.js", "TypeScript", "REST APIs", "Tailwind CSS", "Git"].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500 shrink-0">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
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
                {["Node.js", "PostgreSQL", "Docker"].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-400 shrink-0">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
                    </svg>
                    <span className="text-xs text-gray-600">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next step CTA */}
            <div className="bg-gray-900 rounded-xl p-4 text-center">
              <p className="text-xs font-medium text-white mb-1">Ready for interviews?</p>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">Get predicted questions based on this role</p>
              <button className="w-full py-2.5 rounded-lg text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-400 transition-colors">
                Prepare for interview →
              </button>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}