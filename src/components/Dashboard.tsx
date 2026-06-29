import { useState, useEffect } from "react";
import { 
  Award, AlertTriangle, Crosshair, HelpCircle, 
  ChevronsUp, AlertCircle, TrendingUp, Sparkles, 
  Calendar, Eye, BookOpen, CheckCircle, Flame, 
  User, Check, RefreshCw, Printer, Compass, DollarSign, Briefcase, MessageSquare, Download
} from "lucide-react";
import { motion } from "motion/react";
import { CareerReport } from "../types";
import ResumeBuilder from "./ResumeBuilder";
import JobMatcher from "./JobMatcher";
import SkillGrowthChart from "./SkillGrowthChart";
import InterviewSimulator from "./InterviewSimulator";
import ResumeCompare from "./ResumeCompare";
import { generateReportPDF } from "../utils/pdfGenerator";

interface DashboardProps {
  report: CareerReport;
  onReset: () => void;
  initialPdfBase64?: string | null;
  initialFileName?: string | null;
  isLoggedIn: boolean;
  onRequestLogin: () => void;
}

export default function Dashboard({ report, onReset, initialPdfBase64 = null, initialFileName = null, isLoggedIn, onRequestLogin }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"report" | "builder" | "matcher" | "simulator">("report");
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const handleTabSelect = (tab: "report" | "builder" | "matcher" | "simulator") => {
    if (tab !== "report" && !isLoggedIn) {
      onRequestLogin();
    } else {
      setActiveTab(tab);
    }
  };
  const [completedXpTasks, setCompletedXpTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`xp-tasks-${report.candidateName}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(`xp-tasks-${report.candidateName}`, JSON.stringify(completedXpTasks));
  }, [completedXpTasks, report.candidateName]);

  const toggleXpTask = (taskKey: string) => {
    setCompletedXpTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPdf(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      generateReportPDF(report);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const formatDashboardSalary = (val: number, currency: string) => {
    if (currency === "INR" || currency === "₹") {
      const lpa = val > 1000 ? (val / 100000) : val;
      return `₹ ${lpa.toFixed(1).replace(/\.0$/, "")} LPA`;
    }
    const kVal = val > 1000 ? (val / 1000) : val;
    return `${currency === "USD" ? "$" : currency + " "}${kVal.toFixed(0)}k`;
  };

  // Helper for progress colors
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
    if (score >= 65) return "text-amber-400 border-amber-500/20 bg-amber-500/5";
    return "text-rose-400 border-rose-500/20 bg-rose-500/5";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
    if (score >= 65) return "bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]";
    return "bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]";
  };

  // Calculate grinding progress
  const totalTasks = (report.xpPlan.days30?.length || 0) + (report.xpPlan.days60?.length || 0) + (report.xpPlan.days90?.length || 0);
  const doneTasks = Object.values(completedXpTasks).filter(Boolean).length;
  const currentProgressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="w-full relative py-6" id="career-intelligence-dashboard">
      {/* Top action grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold mb-1 block">
            Analysis Successful
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-zinc-500" />
            {report.candidateName || "Candidate Profile"}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-center">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white text-xs font-bold font-sans transition-all hover:brightness-110 shadow-lg shadow-purple-950/40 relative overflow-hidden ${
              isGeneratingPdf ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isGeneratingPdf ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Formatting PDF...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 animate-bounce" />
                Download Branded PDF
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-zinc-200 text-xs font-semibold font-mono transition-all uppercase tracking-wider"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold font-sans hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            New Audit
          </button>
        </div>
      </div>

      {/* Tab Switcher - Premium glass segmented design */}
      <div className="bg-zinc-950/60 p-1.5 border border-white/5 rounded-2xl grid grid-cols-2 sm:flex sm:flex-nowrap items-center max-w-3xl mb-10 gap-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md relative z-10">
        <button
          onClick={() => handleTabSelect("report")}
          className={`flex-1 py-2.5 px-2.5 sm:py-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider font-mono transition-all relative flex items-center justify-center gap-2 cursor-pointer select-none ${
            activeTab === "report" ? "text-white" : "text-[#86868b] hover:text-zinc-300"
          }`}
        >
          {activeTab === "report" && (
            <motion.div 
              layoutId="dashboard-tab-pill" 
              className="absolute inset-0 bg-white/10 rounded-xl border border-white/10" 
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="flex items-center gap-1.5 relative z-10 font-bold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            [01] Audit
          </span>
        </button>

        <button
          onClick={() => handleTabSelect("builder")}
          className={`flex-1 py-2.5 px-2.5 sm:py-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider font-mono transition-all relative flex items-center justify-center gap-2 cursor-pointer select-none ${
            activeTab === "builder" ? "text-white" : "text-[#86868b] hover:text-zinc-300"
          }`}
        >
          {activeTab === "builder" && (
            <motion.div 
              layoutId="dashboard-tab-pill" 
              className="absolute inset-0 bg-white/10 rounded-xl border border-white/10" 
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="flex items-center gap-1.5 relative z-10 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#86868b] group-hover:text-emerald-400" />
            [02] Builder
          </span>
        </button>

        <button
          onClick={() => handleTabSelect("matcher")}
          className={`flex-1 py-2.5 px-2.5 sm:py-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider font-mono transition-all relative flex items-center justify-center gap-2 cursor-pointer select-none ${
            activeTab === "matcher" ? "text-white" : "text-[#86868b] hover:text-zinc-300"
          }`}
        >
          {activeTab === "matcher" && (
            <motion.div 
              layoutId="dashboard-tab-pill" 
              className="absolute inset-0 bg-white/10 rounded-xl border border-white/10" 
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="flex items-center gap-1.5 relative z-10 font-bold">
            <Briefcase className="w-3.5 h-3.5 text-[#86868b]" />
            [03] Matcher
          </span>
        </button>

        <button
          onClick={() => handleTabSelect("simulator")}
          className={`flex-1 py-2.5 px-2.5 sm:py-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider font-mono transition-all relative flex items-center justify-center gap-2 cursor-pointer select-none ${
            activeTab === "simulator" ? "text-white" : "text-[#86868b] hover:text-zinc-300"
          }`}
        >
          {activeTab === "simulator" && (
            <motion.div 
              layoutId="dashboard-tab-pill" 
              className="absolute inset-0 bg-white/10 rounded-xl border border-white/10" 
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="flex items-center gap-1.5 relative z-10 font-bold">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            [04] Simulator
          </span>
        </button>
      </div>

      {activeTab === "builder" && (
        <ResumeBuilder report={report} onBack={() => setActiveTab("report")} />
      )}
      {activeTab === "matcher" && (
        <JobMatcher 
          initialPdfBase64={initialPdfBase64} 
          initialFileName={initialFileName} 
          onBack={() => setActiveTab("report")} 
        />
      )}
      {activeTab === "simulator" && (
        <InterviewSimulator 
          report={report} 
          initialPdfBase64={initialPdfBase64} 
          onBack={() => setActiveTab("report")} 
        />
      )}
      {activeTab === "report" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left column sidebar stats */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 gap-6 flex flex-col">
          
          {/* Hireability Dial */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] rounded-full pointer-events-none ${
              report.hireabilityScore >= 80 ? "bg-emerald-500/10" : report.hireabilityScore >= 65 ? "bg-amber-500/10" : "bg-rose-500/10"
            }`} />
            
            <h3 className="font-sans font-bold text-zinc-400 text-xs uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Hireability Rating</span>
              <span className="font-mono text-[10px] text-zinc-500">Recruiter Index</span>
            </h3>

            <div className="flex flex-col items-center py-4 relative">
              {/* Custom SVG Circular Progress */}
              <div className="relative w-36 h-36">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    className="text-zinc-900"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="48"
                    cx="60"
                    cy="60"
                  />
                  <circle
                    className={
                      report.hireabilityScore >= 80 ? "text-emerald-500" : report.hireabilityScore >= 65 ? "text-amber-500" : "text-rose-500"
                    }
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={((100 - report.hireabilityScore) / 100) * (2 * Math.PI * 48)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="48"
                    cx="60"
                    cy="60"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-white tracking-tight leading-none">
                    {report.hireabilityScore}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 uppercase tracking-widest font-semibold">
                    Score
                  </span>
                </div>
              </div>

              <div className="mt-5 text-center px-2">
                <p className="text-zinc-300 text-xs font-semibold leading-relaxed mb-4">
                  {report.hireabilityExplanation}
                </p>
                <div className={`text-[10px] py-1 border rounded-full font-mono uppercase tracking-wider inline-block px-4 ${getScoreColor(report.hireabilityScore)}`}>
                  {report.hireabilityScore >= 80 ? "High Growth Potential" : report.hireabilityScore >= 65 ? "Moderate Skill Debts" : "Critical Deficits Found"}
                </div>
              </div>
            </div>
          </div>

          {/* ATS Compatibility Card */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
            <h3 className="font-sans font-semibold text-zinc-400 text-xs uppercase tracking-wider mb-5 flex items-center justify-between">
              <span>ATS Compliance Audit</span>
              <span className={`font-mono text-xs font-bold leading-none py-0.5 px-2 rounded ${getScoreColor(report.atsAnalysis.score)}`}>
                {report.atsAnalysis.score}% Compatible
              </span>
            </h3>

            {/* Micro Progress Bar */}
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mb-6">
              <div 
                className={`h-full rounded-full ${getScoreBg(report.atsAnalysis.score)}`}
                style={{ width: `${report.atsAnalysis.score}%` }}
              />
            </div>

            <div className="flex flex-col gap-5">
              {/* Keyword deficiencies */}
              {report.atsAnalysis.missingKeywords?.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                    Missing Keywords (Critical for parser)
                  </span>
                  <div className="flex flex-wrap gap-1.5" id="missing-keywords-tags">
                    {report.atsAnalysis.missingKeywords.map((kw, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-mono font-medium rounded-md px-2 py-1 bg-red-950/20 text-red-400 border border-red-900/30"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Formatting checks */}
              {report.atsAnalysis.formattingIssues?.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                    Formatting Issues Found
                  </span>
                  <ul className="flex flex-col gap-2.5" id="formatting-check-list">
                    {report.atsAnalysis.formattingIssues.map((issue, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Career Path Options */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
            <h3 className="font-sans font-bold text-zinc-400 text-xs uppercase tracking-wider mb-5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-zinc-500" />
              Career Role Matches
            </h3>
            <div className="flex flex-col gap-4">
              {report.careerPaths?.map((path, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/20 hover:border-zinc-800 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white tracking-tight">{path.title}</span>
                    <span className={`text-[10px] font-mono font-semibold py-0.5 px-1.5 rounded ${path.matchPercentage >= 75 ? "bg-emerald-950 text-emerald-400 border border-emerald-900/30" : "bg-zinc-900 text-zinc-400"}`}>
                      {path.matchPercentage}% Match
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">
                    {path.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column detailed reports */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Executive Summary */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 relative">
            <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-600 border border-zinc-850 px-2 py-0.5 rounded uppercase tracking-wider">
              Profile Summary
            </div>
            <h3 className="font-sans font-semibold text-zinc-400 text-xs uppercase tracking-wider mb-4">
              Executive Evaluation
            </h3>
            <p className="text-zinc-300 font-sans text-sm leading-relaxed whitespace-pre-line read-only:select-text">
              "{report.resumeSummary}"
            </p>
          </section>

          {/* Compare vs. Top 10% Benchmarking Module */}
          <ResumeCompare report={report} />

          {/* Superpowers */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8" id="superpowers-section">
            <h3 className="font-sans font-extrabold text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Superpowers Detected
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.superpowers?.map((p, i) => (
                <div key={i} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 relative overflow-hidden group hover:border-zinc-800 transition-colors">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 uppercase tracking-wider border border-zinc-800 absolute right-4 top-4">
                    {p.category}
                  </span>
                  <div className="text-xs font-bold text-white tracking-tight mt-6 mb-2">
                    {p.title}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Red Flags & Risk Indicators */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8" id="redflags-section">
            <h3 className="font-sans font-extrabold text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Recruiter Red Flags
            </h3>
            <div className="flex flex-col gap-4">
              {report.redFlags?.map((flag, i) => (
                <div key={i} className="p-4 rounded-xl border border-rose-950/20 bg-rose-950/5 flex items-start gap-3.5">
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                    flag.severity === "Critical" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-400/20"
                  }`}>
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white tracking-tight">{flag.title}</span>
                      <span className={`text-[8px] font-mono px-2 rounded-full leading-none py-0.5 ${
                        flag.severity === "Critical" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      }`}>
                        {flag.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {flag.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skill Issues Detected */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8" id="skillissues-section">
            <h3 className="font-sans font-extrabold text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-amber-400" />
              Skill Issues Detected
            </h3>
            <div className="flex flex-col gap-4">
              {report.skillIssues?.map((issue, i) => (
                <div key={i} className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 transition-all flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-white tracking-tight">{issue.skill}</span>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded leading-none ${
                        issue.importance === "Critical" ? "bg-rose-950/50 text-rose-400" : issue.importance === "High" ? "bg-amber-950/50 text-amber-400" : "bg-zinc-800 text-zinc-400"
                      }`}>
                        {issue.importance}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-zinc-600 block">Required Competency Focus</p>
                  </div>
                  <div className="md:w-2/3 flex flex-col gap-2">
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {issue.description}
                    </p>
                    {issue.alternativeSuggest && (
                      <div className="text-[10px] bg-zinc-900/60 p-2.5 rounded border border-zinc-850/60 text-zinc-400 leading-relaxed flex items-start gap-1.5">
                        <span className="font-mono text-emerald-400 shrink-0 font-bold uppercase text-[9px] mt-0.5">Quick Fix:</span>
                        <span>{issue.alternativeSuggest}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Salary Projections */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8">
            <h3 className="font-sans font-extrabold text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Real Marketplace Value Projections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-xl bg-zinc-900/35 border border-zinc-900">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Entry Range Estimate</span>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-black text-white">
                    {formatDashboardSalary(report.salaryEstimate.beginnerMin, report.salaryEstimate.currency)}
                  </span>
                  <span className="text-zinc-500 text-xs">-</span>
                  <span className="text-2xl font-black text-white">
                    {formatDashboardSalary(report.salaryEstimate.beginnerMax, report.salaryEstimate.currency).replace(/₹|USD/g, "").trim()}
                  </span>
                </div>
                <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[60%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/35 border border-zinc-900">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Mid-Level Growth Estimate</span>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-black text-white">
                    {formatDashboardSalary(report.salaryEstimate.growthMin, report.salaryEstimate.currency)}
                  </span>
                  <span className="text-zinc-500 text-xs">-</span>
                  <span className="text-2xl font-black text-white">
                    {formatDashboardSalary(report.salaryEstimate.growthMax, report.salaryEstimate.currency).replace(/₹|USD/g, "").trim()}
                  </span>
                </div>
                <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-700 w-[85%] rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed bg-zinc-900/20 p-3 rounded-lg border border-zinc-900">
              <span className="font-bold text-zinc-400">Salary Outlook Insight:</span> {report.salaryEstimate.commentary}
            </p>
          </section>

          {/* Interactive Boss Battle Interview Qs */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8" id="bossbattle-section">
            <h3 className="font-sans font-extrabold text-white text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-500 animate-bounce" />
              Boss Battle: Custom Interview Scenarios
            </h3>
            <p className="text-zinc-500 text-xs mb-6 -mt-1">
              Personalized technical review inquiries engineered based on your profile gaps.
            </p>
            <div className="flex flex-col gap-3">
              {report.bossBattleQuestions?.map((q, i) => (
                <div key={i} className="rounded-xl border border-zinc-900 bg-zinc-950/20 overflow-hidden">
                  <button
                    onClick={() => setActiveQuestion(activeQuestion === i ? null : i)}
                    className="w-full text-left p-4 hover:bg-zinc-900/40 transition-colors flex items-start justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded uppercase leading-none bg-zinc-800 text-zinc-300">
                          {q.type}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-600 font-semibold">Question {i + 1}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white tracking-tight leading-relaxed">
                        {q.question}
                      </h4>
                    </div>
                    <span className="text-zinc-600 hover:text-zinc-400 text-xs font-mono shrink-0 select-none font-semibold">
                      {activeQuestion === i ? "[Close]" : "[Deconstruct]"}
                    </span>
                  </button>

                  {/* Dropdown Content */}
                  {activeQuestion === i && (
                    <div className="border-t border-zinc-900 p-4 bg-zinc-900/10 flex flex-col gap-3.5 anim-fade-in text-xs leading-relaxed text-zinc-300 select-all">
                      <div className="bg-amber-500/5 p-3 rounded border border-amber-500/20">
                        <h5 className="font-mono text-[9px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-amber-500" />
                          Interviewer Strategy Look-In:
                        </h5>
                        <p className="text-[10px] text-zinc-400 select-text leading-relaxed">
                          {q.interviewerTip}
                        </p>
                      </div>

                      <div className="bg-emerald-500/5 p-3 rounded border border-emerald-500/20">
                        <h5 className="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-emerald-400" />
                          Perfect Answer Elements:
                        </h5>
                        <p className="text-[10px] text-zinc-400 select-text leading-relaxed whitespace-pre-wrap">
                          {q.idealAnswerNotes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Reality Check Mode (The signature panel) */}
          <section className="border border-red-500/30 rounded-2xl p-6 sm:p-8 relative bg-gradient-to-br from-red-950/20 to-transparent overflow-hidden" id="realitycheck-section">
            <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] bg-red-500/10 pointer-events-none rounded-full" />
            
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <h3 className="font-sans font-extrabold text-red-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-500" />
                Reality Check Mode
              </h3>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-zinc-200 text-sm italic font-medium leading-relaxed bg-black/30 p-4 rounded-xl border border-zinc-900 select-text">
                  "{report.realityCheck.brutalHonesty}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Reason You're Replaced</span>
                  <div className="text-xs font-bold text-white tracking-tight leading-snug">
                    {report.realityCheck.typicalRejectionReason}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Primary Skill Issue</span>
                  <div className="text-xs font-bold text-white tracking-tight leading-snug text-red-400">
                    {report.realityCheck.coreWeakness}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs">
                <span className="font-mono text-[9px] text-red-400 uppercase font-semibold tracking-wider block mb-1">The Highest Leverage Action Item</span>
                <p className="text-zinc-300 font-medium select-text">
                  {report.realityCheck.keyAction}
                </p>
              </div>
            </div>
          </section>

          {/* Predictive Skill Growth Projection Chart */}
          <SkillGrowthChart report={report} completedXpTasks={completedXpTasks} />

          {/* XP Grinding Plan (Interactive Roadmap with LocalStorage tracking) */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8" id="xpgrinding-section">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-sans font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  XP Grinding roadmap
                </h3>
                <p className="text-zinc-500 text-xs">
                  Your actionable milestone checkpoints. Mark tasks completed to record progress.
                </p>
              </div>

              {/* Progress counter pill */}
              <div className="shrink-0 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-900 font-mono text-[11px] border border-zinc-800">
                <span className="text-zinc-400">Roadmap Progress:</span>
                <span className="text-emerald-400 font-extrabold">{currentProgressPercent}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Day 30 */}
              <div className="flex flex-col gap-4">
                <div className="border-b border-zinc-900 pb-2">
                  <span className="font-mono text-[9px] uppercase text-zinc-500 block mb-1 font-bold">Phase I</span>
                  <span className="text-xs font-black text-white tracking-tight uppercase flex items-center justify-between">
                    <span>Next 30 Days</span>
                    <span className="text-[10px] font-normal font-mono text-emerald-400">Tactical fixes</span>
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {report.xpPlan.days30?.map((t, idx) => {
                    const k = `30-${idx}`;
                    const isDone = !!completedXpTasks[k];
                    return (
                      <div 
                        key={k} 
                        onClick={() => toggleXpTask(k)}
                        className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                          isDone 
                            ? "bg-emerald-950/10 border-emerald-500/20 text-zinc-500" 
                            : "bg-zinc-900/30 border-zinc-900 hover:border-zinc-800 text-zinc-300"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isDone ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-transparent border-zinc-700"
                        }`}>
                          {isDone && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`text-[11px] leading-relaxed ${isDone ? "line-through text-zinc-500" : ""}`}>
                          {t}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Day 60 */}
              <div className="flex flex-col gap-4">
                <div className="border-b border-zinc-900 pb-2">
                  <span className="font-mono text-[9px] uppercase text-zinc-500 block mb-1 font-bold">Phase II</span>
                  <span className="text-xs font-black text-white tracking-tight uppercase flex items-center justify-between">
                    <span>Next 60 Days</span>
                    <span className="text-[10px] font-normal font-mono text-cyan-400">Core builds</span>
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {report.xpPlan.days60?.map((t, idx) => {
                    const k = `60-${idx}`;
                    const isDone = !!completedXpTasks[k];
                    return (
                      <div 
                        key={k} 
                        onClick={() => toggleXpTask(k)}
                        className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                          isDone 
                            ? "bg-emerald-950/10 border-emerald-500/20 text-zinc-500" 
                            : "bg-zinc-900/30 border-zinc-900 hover:border-zinc-800 text-zinc-300"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isDone ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-transparent border-zinc-700"
                        }`}>
                          {isDone && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`text-[11px] leading-relaxed ${isDone ? "line-through text-zinc-500" : ""}`}>
                          {t}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Day 90 */}
              <div className="flex flex-col gap-4">
                <div className="border-b border-zinc-900 pb-2">
                  <span className="font-mono text-[9px] uppercase text-zinc-500 block mb-1 font-bold">Phase III</span>
                  <span className="text-xs font-black text-white tracking-tight uppercase flex items-center justify-between">
                    <span>Next 90 Days</span>
                    <span className="text-[10px] font-normal font-mono text-indigo-400">Integrations</span>
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {report.xpPlan.days90?.map((t, idx) => {
                    const k = `90-${idx}`;
                    const isDone = !!completedXpTasks[k];
                    return (
                      <div 
                        key={k} 
                        onClick={() => toggleXpTask(k)}
                        className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                          isDone 
                            ? "bg-emerald-950/10 border-emerald-500/20 text-zinc-500" 
                            : "bg-zinc-900/30 border-zinc-900 hover:border-zinc-800 text-zinc-300"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isDone ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-transparent border-zinc-700"
                        }`}>
                          {isDone && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`text-[11px] leading-relaxed ${isDone ? "line-through text-zinc-500" : ""}`}>
                          {t}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
      )}
    </div>
  );
}
