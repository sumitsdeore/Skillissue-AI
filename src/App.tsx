import { useState, useEffect } from "react";
import { 
  Sparkles, FileText, Bot, Shield, Gauge, Compass, 
  ArrowRight, Check, Target, ChevronRight, Play, AlertCircle, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import ResumeUpload from "./components/ResumeUpload";
import LoadingScreen from "./components/LoadingScreen";
import Dashboard from "./components/Dashboard";
import StoryModal from "./components/StoryModal";
import ArchetypeSimulator from "./components/ArchetypeSimulator";
import LoginModal from "./components/LoginModal";
import IntroOverlay from "./components/IntroOverlay";
import { sampleReport } from "./data/sampleReport";
import { CareerReport, ViewState } from "./types";

export default function App() {
  const [view, setView] = useState<ViewState>(() => {
    try {
      const savedView = localStorage.getItem("skillissue_view");
      return (savedView as ViewState) || "landing";
    } catch {
      return "landing";
    }
  });
  const [report, setReport] = useState<CareerReport | null>(() => {
    try {
      const savedReport = localStorage.getItem("skillissue_report");
      return savedReport ? JSON.parse(savedReport) : null;
    } catch {
      return null;
    }
  });
  const [pdfBase64, setPdfBase64] = useState<string | null>(() => {
    try {
      return localStorage.getItem("skillissue_pdf_base64");
    } catch {
      return null;
    }
  });
  const [fileName, setFileName] = useState<string | null>(() => {
    try {
      return localStorage.getItem("skillissue_file_name");
    } catch {
      return null;
    }
  });
  const [isDemo, setIsDemo] = useState(false);
  const [errorHeader, setErrorHeader] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Authentication states
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem("skillissue_user_email");
    } catch {
      return null;
    }
  });
  const [userName, setUserName] = useState<string | null>(() => {
    try {
      return localStorage.getItem("skillissue_user_name") || "Developer";
    } catch {
      return "Developer";
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(() => {
    try {
      return !localStorage.getItem("skillissue_user_email");
    } catch {
      return true;
    }
  });

  // Synchronise state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("skillissue_view", view);
    } catch (e) {
      console.warn(e);
    }
  }, [view]);

  useEffect(() => {
    try {
      if (report) {
        localStorage.setItem("skillissue_report", JSON.stringify(report));
      } else {
        localStorage.removeItem("skillissue_report");
      }
    } catch (e) {
      console.warn(e);
    }
  }, [report]);

  useEffect(() => {
    try {
      if (pdfBase64) {
        localStorage.setItem("skillissue_pdf_base64", pdfBase64);
      } else {
        localStorage.removeItem("skillissue_pdf_base64");
      }
    } catch (e) {
      console.warn(e);
    }
  }, [pdfBase64]);

  useEffect(() => {
    try {
      if (fileName) {
        localStorage.setItem("skillissue_file_name", fileName);
      } else {
        localStorage.removeItem("skillissue_file_name");
      }
    } catch (e) {
      console.warn(e);
    }
  }, [fileName]);

  const handleLoginSuccess = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
    try {
      localStorage.setItem("skillissue_user_email", email);
      localStorage.setItem("skillissue_user_name", name);
    } catch (e) {
      console.warn("Storage quotas exceeded or blocked:", e);
    }
  };

  const handleLogout = () => {
    setUserEmail(null);
    setUserName(null);
    setView("landing");
    setReport(null);
    setPdfBase64(null);
    setFileName(null);
    setIsDemo(false);
    try {
      localStorage.removeItem("skillissue_user_email");
      localStorage.removeItem("skillissue_user_name");
      localStorage.removeItem("skillissue_view");
      localStorage.removeItem("skillissue_report");
      localStorage.removeItem("skillissue_pdf_base64");
      localStorage.removeItem("skillissue_file_name");
    } catch (e) {
      console.warn("Storage deletion blocked:", e);
    }
    setIsLoginModalOpen(true);
  };

  const handleAnalyzeClick = () => {
    if (userEmail) {
      setView("upload");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const resetToHome = () => {
    setView("landing");
    setReport(null);
    setPdfBase64(null);
    setFileName(null);
    setIsDemo(false);
    setErrorHeader(null);
    setIsAnalyzing(false);
  };

  const handleUploadComplete = async (base64Data: string, fileName: string) => {
    setIsAnalyzing(true);
    setView("loading");
    setErrorHeader(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfBase64: base64Data, fileName }),
      });

      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}));
        throw new Error(errPayload.error || "The careers analysis pipeline failed to initiate. Please verify your PDF has valid text contents.");
      }

      const analysisReport = await response.json();
      setPdfBase64(base64Data);
      setFileName(fileName);
      setReport(analysisReport);
      setIsDemo(false);
      setView("dashboard");
    } catch (err: any) {
      console.error("Analysis pipeline error:", err);
      setErrorHeader(err.message || "An unexpected network block occurred. Please try again.");
      setView("upload");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = () => {
    setIsAnalyzing(true);
    setView("loading");
    
    // Simulate short loading to appreciate the gorgeous recruiter transition
    setTimeout(() => {
      setReport(sampleReport);
      setIsDemo(true);
      setView("dashboard");
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-[#f5f5f7] flex flex-col font-sans selection:bg-purple-500/30 selection:text-white antialiased relative overflow-hidden">
      {/* Premium Luxury-style Iridescent Ambient Blurred Aura Blobs */}
      <div className="absolute inset-x-0 top-0 h-[1000px] flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        {/* Violet Core Aura */}
        <div className="absolute top-[-100px] left-[15%] w-[450px] h-[450px] rounded-full bg-indigo-600/15 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: "12s" }} />
        {/* Pink Crimson Aura */}
        <div className="absolute top-[-50px] right-[10%] w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-[130px] mix-blend-screen animate-pulse" style={{ animationDuration: "8s" }} />
        {/* Cyan Emerald Matching Scheme Aura */}
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full bg-gradient-to-br from-cyan-500/10 via-[#a855f7]/10 to-transparent blur-[140px] mix-blend-screen" />
        {/* Subtle grid mesh pattern for tech specification layout */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.015)_1.5px,transparent_1.5px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
      </div>

      <AnimatePresence>
        {showIntro && (
          <IntroOverlay key="intro-overlay" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50"
          >
            {/* Header (Hidden on loading screen) */}
            {view !== "loading" && (
              <Header 
                onReset={resetToHome} 
                showSampleText={isDemo && view === "dashboard"} 
                isLoggedIn={!!userEmail}
                userName={userName}
                onLoginClick={() => setIsLoginModalOpen(true)}
                onLogout={handleLogout}
              />
            )}
          </motion.div>

      {/* Global Error Banner */}
      {errorHeader && view !== "loading" && (
        <div className="bg-rose-950/30 border-b border-rose-900/40 text-rose-300 text-xs px-6 py-3 flex items-center justify-between z-40 relative">
          <div className="flex items-center gap-2 max-w-3xl">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="font-medium">{errorHeader}</span>
          </div>
          <button 
            onClick={() => setErrorHeader(null)}
            className="text-rose-400 hover:text-rose-200 transition-colors uppercase font-mono text-[10px] tracking-wider"
          >
            [Close]
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 relative z-10 py-6">
        
        <AnimatePresence mode="wait">
          
          {/* Landing State */}
          {view === "landing" && (
            <motion.div
              key="landing-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col py-16 sm:py-24"
            >
              {/* Hero Section */}
              <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
                
                {/* Founder Story Elegant Banner */}
                <motion.button
                  onClick={() => setIsStoryOpen(true)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.6 }}
                  className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/20 hover:bg-purple-950/45 border border-purple-500/25 hover:border-purple-500/45 text-purple-300 hover:text-purple-200 transition-all text-xs font-mono select-none cursor-pointer group shadow-[0_4px_12px_rgba(168,85,247,0.05)]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse shrink-0" />
                  <span>The Story Behind SkillIssue.ai</span>
                  <span className="text-zinc-700 hidden sm:inline">•</span>
                  <span className="text-[10px] text-zinc-400 font-sans group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">By Sumit Deore <ArrowRight className="w-3 h-3 text-purple-400" /></span>
                </motion.button>

                {/* Beautiful Brand Identity & Future Matching Scheme Showcase Container */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                  className="mb-8 p-6 sm:p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all flex flex-col items-center gap-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
                >
                  <div className="absolute top-0 left-12 w-32 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
                  <Logo size="lg" />
                  <div className="h-px w-3/4 bg-white/5 my-1" />
                  <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest max-w-xs leading-relaxed text-center">
                    INTEGRATIVE FIT SPECIFICATION ENGINE
                  </p>
                </motion.div>

                {/* Animated Heading */}
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans font-black tracking-tight text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.08] mb-6 whitespace-pre-line select-text" 
                  id="landing-headline"
                >
                  Turn Your Skill Issues {"\n"}
                  Into <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">Job Offers.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-12 select-text font-medium tracking-normal" 
                  id="landing-subheadline"
                >
                  Connect your engineering capabilities directly with candidate profiles. Get an absolute, multi-dimensional career audit, ATS score optimization, and automated market simulations.
                </motion.p>

                {/* Premium Buttons Container */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
                >
                  <button
                    onClick={handleAnalyzeClick}
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-zinc-950 font-bold rounded-2xl text-sm transition-all hover:bg-neutral-150 active:scale-98 shadow-[0_15px_30px_rgba(255,255,255,0.06)] group cursor-pointer"
                    id="analyze-resume-trigger"
                  >
                    Analyze My Resume
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={handleLoadSample}
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 border border-zinc-800 hover:border-zinc-700 bg-zinc-950/50 text-zinc-300 font-bold rounded-2xl text-sm transition-all hover:bg-zinc-900 active:scale-98"
                    id="sample-report-trigger"
                  >
                    <Play className="w-3.5 h-3.5 shrink-0 text-white fill-white/10" />
                    Read Sample Report
                  </button>
                </motion.div>

              </div>

              {/* Breathtaking Interactive Archetype Simulator Demonstration */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                <div className="text-center mb-8">
                  <span className="text-[10px] font-mono font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Interactive Blueprint Sandbox
                  </span>
                  <h2 className="font-sans font-black text-white text-3xl sm:text-4xl tracking-tight mt-3">
                    Who Is Pitching?
                  </h2>
                  <p className="text-zinc-400 text-xs max-w-md mx-auto leading-relaxed mt-1">
                    Play with different developer candidates to see how elite recruiting algorithms index alignment instantly.
                  </p>
                </div>
                
                <ArchetypeSimulator />
              </motion.div>

              {/* Bento styled feature grid */}
              <div className="mt-16 border-t border-white/5 pt-20" id="feature-sections-bento">
                <div className="text-center mb-16">
                  <span className="text-[10px] font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent tracking-widest uppercase block mb-2">
                    ROBUST PLATFORM LAYER
                  </span>
                  <h2 className="font-sans font-black text-white text-3xl sm:text-5xl tracking-tight mb-4 select-none">
                    Platform Capacities
                  </h2>
                  <p className="text-zinc-400 text-xs max-w-lg mx-auto leading-relaxed mt-1.5">
                    Engineered from scratch by premium platform developers to expose hidden recruiter validation metrics through modular micro-pipelines.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  
                  {/* ATS Parser */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="p-8 rounded-3xl border border-white/[0.04] bg-gradient-to-b from-zinc-950/40 to-zinc-950/10 hover:border-cyan-500/20 hover:bg-zinc-950/60 transition-all flex flex-col gap-5 relative overflow-hidden group shadow-[0_12px_30px_rgb(0,0,0,0.5)]"
                  >
                    <div className="absolute top-0 left-0 w-28 h-28 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.06),transparent_70%)] pointer-events-none" />
                    <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-inner group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
                      <Target className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-sans font-extrabold text-white text-base leading-snug">ATS Deep Core Scan</h3>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/20 text-cyan-400 border border-cyan-800/20">PARSER v2</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                        Deep checks for template layout traps, multi-column reading risks, and flags rating widgets that crash vendor indexing engines.
                      </p>
                    </div>
                  </motion.div>

                  {/* Skill Gap */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="p-8 rounded-3xl border border-white/[0.04] bg-gradient-to-b from-zinc-950/40 to-zinc-950/10 hover:border-purple-500/20 hover:bg-zinc-950/60 transition-all flex flex-col gap-5 relative overflow-hidden group shadow-[0_12px_30px_rgb(0,0,0,0.5)]"
                  >
                    <div className="absolute top-0 left-0 w-28 h-28 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.06),transparent_70%)] pointer-events-none" />
                    <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-inner group-hover:border-purple-400 group-hover:text-purple-400 transition-colors">
                      <Bot className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-sans font-extrabold text-white text-base leading-snug">Raw Skill Gap Detection</h3>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-950/20 text-purple-400 border border-purple-800/20">LIVE</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                        Exposes core corporate tech requirements you are missing compared to active mid-tier market engineering requisites.
                      </p>
                    </div>
                  </motion.div>

                  {/* Recruiter Reality Check */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="p-8 rounded-3xl border border-white/[0.04] bg-gradient-to-b from-zinc-950/40 to-zinc-950/10 hover:border-pink-500/20 hover:bg-zinc-950/60 transition-all flex flex-col gap-5 relative overflow-hidden group shadow-[0_12px_30px_rgb(0,0,0,0.5)]"
                  >
                    <div className="absolute top-0 left-0 w-28 h-28 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.06),transparent_70%)] pointer-events-none" />
                    <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-inner group-hover:border-pink-400 group-hover:text-pink-400 transition-colors">
                      <Sparkles className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-sans font-extrabold text-white text-base leading-snug">Savage Reality Check</h3>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-pink-950/20 text-pink-400 border border-pink-800/20">SAVAGE</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                        Identifies candidate 'tutorial copies'—cluttered state controls, pure client bypasses, and generic projects that attract easy auto-rejections.
                      </p>
                    </div>
                  </motion.div>

                  {/* Level Up Roadmap */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="p-8 rounded-3xl border border-white/[0.04] bg-gradient-to-b from-zinc-950/40 to-zinc-950/10 hover:border-emerald-500/20 hover:bg-zinc-950/60 transition-all flex flex-col gap-5 relative overflow-hidden group shadow-[0_12px_30px_rgb(0,0,0,0.5)]"
                  >
                    <div className="absolute top-0 left-0 w-28 h-28 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.06),transparent_70%)] pointer-events-none" />
                    <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-inner group-hover:border-emerald-400 group-hover:text-emerald-400 transition-colors">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-sans font-extrabold text-white text-base leading-snug">XP Checkpoint Roadmap</h3>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950/20 text-emerald-400 border border-emerald-800/20">30-60-90D</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                        Generates high-leverage checklist checkpoints to establish database connection pooling, rigorous type parameters, and low-latency designs.
                      </p>
                    </div>
                  </motion.div>

                  {/* Boss Battles */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="p-8 rounded-3xl border border-white/[0.04] bg-gradient-to-b from-zinc-950/40 to-zinc-950/10 hover:border-amber-500/20 hover:bg-zinc-950/60 transition-all flex flex-col gap-5 relative overflow-hidden group shadow-[0_12px_30px_rgb(0,0,0,0.5)]"
                  >
                    <div className="absolute top-0 left-0 w-28 h-28 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none" />
                    <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-inner group-hover:border-amber-400 group-hover:text-amber-400 transition-colors">
                      <Compass className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-sans font-extrabold text-white text-base leading-snug">Interactive Boss Battles</h3>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950/20 text-amber-400 border border-amber-800/20">INTERACTIVE</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                        Generates a series of challenging code-level questions based on your loaded work to audit if you actually engineered the services.
                      </p>
                    </div>
                  </motion.div>

                  {/* Professional Gauge */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="p-8 rounded-3xl border border-white/[0.04] bg-gradient-to-b from-zinc-950/40 to-zinc-950/10 hover:border-blue-500/20 hover:bg-zinc-950/60 transition-all flex flex-col gap-5 relative overflow-hidden group shadow-[0_12px_30px_rgb(0,0,0,0.5)]"
                  >
                    <div className="absolute top-0 left-0 w-28 h-28 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />
                    <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-inner group-hover:border-blue-400 group-hover:text-blue-400 transition-colors">
                      <Gauge className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-sans font-extrabold text-white text-base leading-snug">Hireability Indexing</h3>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-950/20 text-blue-400 border border-blue-800/20">D3 GAUGES</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                        Renders clean 0-100 indicators capturing portfolio depth, professional coding discipline, and architectural scaling factors.
                      </p>
                    </div>
                  </motion.div>

                </div>
              </div>

              {/* How it works pipeline map */}
              <div className="mt-24 border-t border-white/5 pt-20">
                <div className="text-center mb-16">
                  <span className="text-[10px] font-mono font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-widest uppercase block mb-2">
                    STREAMLINED ENGINE
                  </span>
                  <h2 className="font-sans font-black text-white text-3xl sm:text-4xl tracking-tight mb-3">
                    Simplicity as Standard
                  </h2>
                  <p className="text-zinc-400 text-xs max-w-sm mx-auto leading-relaxed">
                    Designed to deliver high-fidelity diagnostics immediately without sign-up forms.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 p-[1px] flex items-center justify-center mb-4">
                      <div className="w-full h-full bg-[#030308] rounded-[15px] flex items-center justify-center text-cyan-400 font-mono font-black text-sm">
                        1
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-widest font-mono">Upload PDF</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px]">
                      Drop your resume PDF safely. No details or forms.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 p-[1px] flex items-center justify-center mb-4">
                      <div className="w-full h-full bg-[#030308] rounded-[15px] flex items-center justify-center text-purple-400 font-mono font-black text-sm">
                        2
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-widest font-mono">AI Analysis</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px]">
                      A suite of specialized Gemini prompts audit your candidate metrics.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 p-[1px] flex items-center justify-center mb-4">
                      <div className="w-full h-full bg-[#030308] rounded-[15px] flex items-center justify-center text-pink-400 font-mono font-black text-sm">
                        3
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-widest font-mono">Get Report</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px]">
                      Examine key red flags, market salary ranges, and the custom Reality Check.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 p-[1px] flex items-center justify-center mb-4">
                      <div className="w-full h-full bg-[#030308] rounded-[15px] flex items-center justify-center text-amber-400 font-mono font-black text-sm">
                        4
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-widest font-mono">Level Up</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px]">
                      Execute the custom grinding plan, close tech gap, and claim job offers.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Upload View State */}
          {view === "upload" && (
            <motion.div
              key="upload-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="py-12 sm:py-20 flex justify-center"
            >
              <ResumeUpload 
                onUpload={handleUploadComplete} 
                onViewSample={handleLoadSample}
                isAnalyzing={isAnalyzing} 
              />
            </motion.div>
          )}

          {/* Cinematic Loading State */}
          {view === "loading" && (
            <LoadingScreen />
          )}

          {/* Dashboard State */}
          {view === "dashboard" && report && (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard 
                report={report} 
                onReset={resetToHome} 
                initialPdfBase64={pdfBase64}
                initialFileName={fileName}
                isLoggedIn={!!userEmail}
                onRequestLogin={() => setIsLoginModalOpen(true)}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer (Hidden on loading screen) */}
      {view !== "loading" && <Footer onOpenStory={() => setIsStoryOpen(true)} />}

      {/* Story modal overlay */}
      <StoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      {/* Unique animated premium login modal trigger vector */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)} 
            onLoginSuccess={handleLoginSuccess}
            allowClose={!!userEmail}
          />
        )}
      </AnimatePresence>
        </>
      )}


    </div>
  );
}
