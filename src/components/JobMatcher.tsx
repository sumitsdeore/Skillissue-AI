import React, { useState, useRef } from "react";
import { 
  Sparkles, FileText, ChevronRight, Upload, Check, AlertCircle, 
  ThumbsUp, ThumbsDown, ArrowRight, RefreshCw, Briefcase, FileCheck, HelpCircle, CheckCircle2, AlertTriangle, ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { JobMatchResult } from "../types";

interface JobMatcherProps {
  initialPdfBase64: string | null;
  initialFileName: string | null;
  onBack?: () => void;
}

const EXAMPLE_JDS = [
  {
    title: "Full Stack Engineer (TypeScript/React/Postgres)",
    text: `We are looking for a Software Engineer to join our core product team. You will build and scale reliable backends and rich frontend components.
Requirements:
- Strong experience with TypeScript and modern React (Next.js/Vite)
- Database modeling proficiency, particularly with PostgreSQL or relational databases (indexing, queries, Drizzle/Prisma)
- Experience writing automated testing suites (Jest, Playwright, Vitest)
- Containerization under Docker and deployment to cloud orchestration pipelines (CI/CD, Cloud Run, GCP or AWS)`
  },
  {
    title: "Junior Frontend Developer (Vite/Tailwind)",
    text: `We lean on pristine web responsive templates to build lightweight consumer dashboard indexes.
Seeking:
- Proficiency styling with modern utility grids like Tailwind CSS and CSS modules
- Component state manipulation in React 18+ and single-page routing structures
- Foundational Javascript knowledge, including async/await and JSON APIs
- Passion for visual polish and clean pixel-perfect responsive layouts`
  },
  {
    title: "Senior Platform Architect (Docker/Cloud/Go)",
    text: `Seeking an expert backend systems engineer to govern massive high-availability sockets, transaction locks, and robust pipeline structures.
Requirements:
- Advanced backend language competency (Node.js, Go, or Python)
- In-depth socket handling, real-time sync systems, or concurrency models
- Deep container build workflows, Kubernetes setups, and multi-region continuous deployment
- Refactoring legacy callback architectures into structured safe execution systems`
  }
];

export default function JobMatcher({ initialPdfBase64, initialFileName, onBack }: JobMatcherProps) {
  const [pdfBase64, setPdfBase64] = useState<string | null>(initialPdfBase64);
  const [fileName, setFileName] = useState<string | null>(initialFileName);
  const [jobDescription, setJobDescription] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [matchError, setMatchError] = useState<string | null>(null);
  
  // Local file drag-and-drop state
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (selectedFile: File) => {
    setUploadError(null);
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith(".pdf")) {
      setUploadError("Standard PDF format only.");
      return;
    }
    const maxSize = 15 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setUploadError("File size exceeds 15MB limit.");
      return;
    }

    setFileName(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const base64Data = result.split(",")[1];
        setPdfBase64(base64Data);
        setResult(null); // Clear previous match state
      } catch (err) {
        setUploadError("Could not translate resume PDF structures.");
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyzeMatch = async () => {
    if (!pdfBase64) {
      setMatchError("Please attach or upload a resume PDF first.");
      return;
    }
    if (!jobDescription.trim()) {
      setMatchError("Please supply a Job Description to verify alignment.");
      return;
    }

    setIsMatching(true);
    setMatchError(null);

    try {
      const response = await fetch("/api/match-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfBase64, jobDescription })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to parse job alignment. Please check server logs.");
      }

      const matchReport = await response.json();
      setResult(matchReport);
    } catch (err: any) {
      setMatchError(err.message || "An unexpected match network block occurred. Please try again.");
    } finally {
      setIsMatching(false);
    }
  };

  // Score thematic styling utilities
  const getScoreTheme = (score: number) => {
    if (score >= 8) {
      return {
        bg: "border-cyan-500/20 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.05)]",
        text: "text-cyan-458 font-bold",
        border: "border-cyan-500/30",
        fill: "stroke-cyan-400",
        gaugeBg: "text-cyan-950",
        badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        verdictText: "EXCELLENT FIT MATCH"
      };
    } else if (score >= 6) {
      return {
        bg: "border-purple-500/20 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.05)]",
        text: "text-purple-400 font-bold",
        border: "border-purple-500/30",
        fill: "stroke-purple-400",
        gaugeBg: "text-purple-950",
        badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        verdictText: "MODERATE GAP FIT"
      };
    } else {
      return {
        bg: "border-rose-500/20 bg-rose-500/5",
        text: "text-rose-452 font-bold",
        border: "border-rose-500/30",
        fill: "stroke-rose-500",
        gaugeBg: "text-rose-950",
        badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        verdictText: "HIGH ADVERSITY GAP"
      };
    }
  };

  const activeTheme = result ? getScoreTheme(result.score) : null;

  return (
    <div className="w-full relative" id="job-matcher-workspace">
      {/* Header back navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2.5 rounded-xl border border-white/5 bg-zinc-950/45 text-zinc-400 hover:text-white transition-all hover:bg-zinc-900 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#050510] rounded-[6px] flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              Role Alignment Matcher
            </h1>
            <p className="text-zinc-400 text-xs mt-1">
              Check how well your resume matches any target job description on an honest 1-10 scale. Expose direct tech gaps instantly.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Setup Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6" id="job-setup-panel">
          
          {/* Resume Upload/Attachment Section */}
          <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <h3 className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              1. RESUME ATTACHMENT
            </h3>

            {pdfBase64 ? (
              <div className="p-4 bg-zinc-900/25 border border-white/5 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 p-0.5 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-[#050510] rounded-[7px] flex items-center justify-center">
                      <FileText className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white text-xs font-semibold truncate">
                      {fileName || "Attached Candidate Resume"}
                    </p>
                    <p className="text-zinc-500 text-[10px] font-mono leading-none mt-1">
                      PDF Resume Loaded
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPdfBase64(null);
                    setFileName(null);
                    setResult(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-white/10 hover:text-white text-zinc-400 text-[9px] font-mono transition-colors uppercase shrink-0 cursor-pointer"
                >
                  Change
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleDrag}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px] group ${
                  isDragActive
                    ? "border-cyan-400 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.06)]"
                    : "border-white/5 hover:border-white/10 bg-zinc-950/25 hover:bg-zinc-900/30"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      validateAndProcessFile(e.target.files[0]);
                    }
                  }}
                />
                <Upload className="w-5 h-5 text-zinc-500 group-hover:text-cyan-400 transition-colors mb-2" />
                <p className="text-zinc-300 font-medium text-xs">
                  Drag and drop resume PDF, or <span className="text-cyan-400 group-hover:underline font-semibold">browse</span>
                </p>
                <p className="text-zinc-500 text-[9px] mt-1 font-mono uppercase tracking-wide opacity-80">[Standard single-page PDF]</p>
              </div>
            )}

            {uploadError && (
              <div className="mt-3 flex items-start gap-1.5 p-2 bg-rose-950/20 border border-rose-900/30 text-rose-300 text-[10px] rounded">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>

          {/* Job Description Form Box */}
          <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-mono text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                2. TARGET JOB DESCRIPTION
              </h3>
              <span className="text-[10px] text-zinc-500 font-mono">[Paste or select seed]</span>
            </div>

            {/* Quick Helper presets */}
            <div className="flex flex-col gap-1.5 mb-4">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Apply Preset Specs</span>
              <div className="grid grid-cols-3 gap-1.5">
                {EXAMPLE_JDS.map((example, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setJobDescription(example.text);
                      setResult(null);
                    }}
                    className={`p-2 rounded-xl text-center border text-[9px] leading-tight transition-all font-sans font-bold line-clamp-1 cursor-pointer ${
                      jobDescription === example.text 
                        ? "border-purple-500/40 bg-purple-500/5 text-purple-300 shadow-sm" 
                        : "border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-zinc-250 hover:border-white/10"
                    }`}
                    title={example.title}
                  >
                    {example.title.split(" (")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Job description input field */}
            <textarea
              rows={8}
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setResult(null);
              }}
              placeholder="Paste the job requirements, responsibilities, or target engineering description here..."
              className="w-full bg-zinc-950/20 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/10 leading-relaxed resize-none font-sans"
            />

            {/* Submit match action button */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleAnalyzeMatch}
                disabled={isMatching || !pdfBase64 || !jobDescription}
                className="w-full h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:brightness-110 disabled:bg-none disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border-transparent text-white font-black text-xs rounded-xl shadow-[0_10px_25px_rgba(168,85,247,0.18)] hover:shadow-[0_15px_30px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 uppercase tracking-widest block cursor-pointer disabled:cursor-not-allowed disabled:brightness-100"
              >
                {isMatching ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Querying Matching Engine...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    Evaluate Recruitment Fit
                  </>
                )}
              </button>
            </div>

            {matchError && (
              <div className="mt-4 flex items-start gap-1.5 p-3 bg-rose-950/20 border border-rose-900/30 text-rose-300 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-normal">{matchError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Analysis Display Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4" id="job-analysis-display">
          
          <AnimatePresence mode="wait">
            
            {/* 1. MATCHING LOADER SCREEN */}
            {isMatching && (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-zinc-950/45 border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[420px] shadow-2xl"
              >
                <div className="relative w-16 h-16 mb-6">
                  {/* Elegant pulsating halo rings */}
                  <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping" />
                  <div className="absolute -inset-2 rounded-full border border-cyan-500/10 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-purple-400">
                    <RefreshCw className="w-6 h-6 animate-spin shrink-0 text-cyan-300" />
                  </div>
                </div>

                <h3 className="font-sans font-bold text-white text-base mb-2">
                  Scanning Profile Match Alignment...
                </h3>
                <p className="text-zinc-400 text-xs max-w-sm leading-relaxed mb-6 font-sans">
                  Our Recruiting Engine is parsing your resume PDF and mapping experience parameters directly to the provided Job Description to evaluate absolute core fit.
                </p>

                {/* Simulated recruiter system statements */}
                <div className="p-3.5 bg-[#030308]/60 border border-white/5 rounded-xl max-w-xs w-full shadow-inner">
                  <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest font-black block mb-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" />
                    Hiring Lead Log:
                  </span>
                  <p className="text-zinc-400 text-[10.5px] font-mono leading-normal">
                    "Scanning tech stack nodes... verifying container knowledge & active state patterns... scoring overlap thresholds."
                  </p>
                </div>
              </motion.div>
            )}

            {/* 2. MATCH REPORT RESULTS VIEW */}
            {!isMatching && result && activeTheme && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6"
              >
                {/* Header score card banner */}
                <div className={`p-6 border rounded-2xl relative overflow-hidden ${activeTheme.bg}`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(16,185,129,0.06),transparent_70%)] pointer-events-none" />

                  <div className="flex flex-col sm:flex-row items-center gap-6 relative">
                    
                    {/* Gauge circular segment */}
                    <div className="relative w-28 h-28 shrink-0 select-none">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Shadow back rail */}
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="currentColor"
                          className={`${activeTheme.gaugeBg}`}
                          strokeWidth="6"
                          fill="none"
                        />
                        {/* Main score path */}
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="currentColor"
                          className={`${activeTheme.fill}`}
                          strokeWidth="7"
                          fill="none"
                          strokeDasharray="264"
                          strokeDashoffset={264 - (264 * result.score) / 10}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Center Absolute indicator text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white tracking-tighter leading-none mt-1">
                          {result.score}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">
                          / 10 Score
                        </span>
                      </div>
                    </div>

                    {/* Text header block alignment */}
                    <div className="text-center sm:text-left flex-1">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9.5px] font-mono uppercase font-bold tracking-wider mb-2.5 bg-black/40">
                        <span className={`w-1.5 h-1.5 rounded-full bg-current ${activeTheme.text}`} />
                        {activeTheme.verdictText}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-sans text-white tracking-tight mb-2">
                        {result.score >= 8 
                          ? "Congratulations, Excellent Match Core!" 
                          : result.score >= 6 
                            ? "Viable Candidate With Specific Gaps" 
                            : "Heavy Rejection Risk Identified"
                        }
                      </h3>
                      <p className="text-zinc-300 text-xs leading-relaxed text-justify">
                        {result.summary}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Bento layout detailed tabs panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Strengths / Green Flags checklist */}
                  <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 shadow-lg">
                    <h4 className="font-mono text-[9px] font-bold text-cyan-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      MATCH HIGHLIGHTS (GREEN FLAGS)
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {result.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                      {result.strengths.length === 0 && (
                        <p className="text-zinc-500 text-[10px] italic">No prominent matching highlights recognized by parser. Fix gaps below.</p>
                      )}
                    </ul>
                  </div>

                  {/* Missing Gaps / Requirements missing */}
                  <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 shadow-lg">
                    <h4 className="font-mono text-[9px] font-bold text-rose-450 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      MISSING REQUISITES (GAPS)
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {result.gaps.map((gp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-zinc-300">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{gp}</span>
                        </li>
                      ))}
                      {result.gaps.length === 0 && (
                        <p className="text-zinc-500 text-[10px] italic">No significant missing gaps recognized. Resume is exceptionally matched!</p>
                      )}
                    </ul>
                  </div>

                </div>

                {/* Brutally Honest recruitment assessment block */}
                <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.01),transparent_70%)] pointer-events-none" />
                  
                  <h4 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    RECRUITER FEEDBACK & APPLICATION VERDICT
                  </h4>

                  <blockquote className="border-l-4 border-white/15 pl-4 py-1 text-xs text-zinc-400 italic leading-relaxed text-justify">
                    "{result.verdict}"
                  </blockquote>
                </div>

                {/* Actionable changes steps */}
                <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 shadow-lg">
                  <h4 className="font-mono text-[9px] font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    TAILORING ACTION PROTOCOLS (FIXES)
                  </h4>
                  <div className="flex flex-col gap-3">
                    {result.actionableFixes.map((fix, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/15 border border-white/5 hover:border-white/10 transition-all">
                        <div className="w-5 h-5 rounded-md bg-purple-500/10 text-purple-355 font-mono text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 select-none">
                          {idx + 1}
                        </div>
                        <p className="text-zinc-200 text-xs leading-relaxed font-sans">
                          {fix}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* 3. DEFAULT PLACEHOLDER INITIAL STATE */}
            {!isMatching && !result && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-zinc-950/30 border border-white/5 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[420px]"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-500 p-0.5 flex items-center justify-center mb-4 select-none">
                  <div className="w-full h-full bg-[#050510] rounded-[10px] flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>
                <h3 className="text-zinc-200 font-display font-bold text-sm sm:text-base mb-2">
                  No Job Analysis Generated Yet
                </h3>
                <p className="text-zinc-500 text-xs max-w-sm leading-relaxed mb-6 font-sans">
                  Provide your resume PDF on the left and input your target Job Description/Specification, then click "Evaluate Recruitment Fit" to run real alignment analytics.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-md w-full border-t border-white/5 pt-6">
                  <div className="text-center">
                    <span className="font-mono text-xs font-black text-cyan-400 block mb-0.5">1 - 10 SCALE</span>
                    <span className="text-zinc-500 text-[10px] leading-snug block">Precise alignment rating matching your profile elements</span>
                  </div>
                  <div className="text-center">
                    <span className="font-mono text-xs font-black text-purple-400 block mb-0.5">GAP DIAGNOSTIC</span>
                    <span className="text-zinc-500 text-[10px] leading-snug block">Actionable missing technology keys and custom bullet fixes</span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
