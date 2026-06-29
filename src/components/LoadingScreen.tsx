import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const loadingSteps = [
  {
    title: "Uploading Payload",
    sub: "Formatting resume binary into secure analysis matrix..."
  },
  {
    title: "Analyzing Resume Elements",
    sub: "Deconstructing text patterns, syntax layout, and portfolio nodes..."
  },
  {
    title: "Identifying Skill Issues",
    sub: "Comparing stack profile against 35,000+ developer requisites..."
  },
  {
    title: "Simulating Recruiter Review",
    sub: "Injecting typical hiring biases, keyword blocks, and formatting audits..."
  },
  {
    title: "Flagging Potential Risks",
    sub: "Checking for vague descriptions, formatting issues, and passive language..."
  },
  {
    title: "Generating Boss Battle Scopes",
    sub: "Synthesizing customized architectural questions based on your background..."
  },
  {
    title: "Mapping out XP Grinding Plan",
    sub: "Structuring actionable 30, 60, and 90-day task schedules to improve hireability..."
  },
  {
    title: "Formulating Brutal Reality Check",
    sub: "Drafting honest, constructible hiring reality cards..."
  }
];

export default function LoadingScreen() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress increment simulates network status
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return prev;
        const speed = prev < 30 ? 1.5 : prev < 75 ? 0.8 : 0.2;
        return Math.min(prev + speed, 99);
      });
    }, 100);

    // Sequence loading steps
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  const step = loadingSteps[currentStepIndex];

  return (
    <div className="fixed inset-0 bg-[#020202] flex flex-col items-center justify-center p-6 z-[100]" id="loading-screen">
      {/* Premium background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(52,211,153,0.02),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center">
        {/* Animated Concentric Scan Rings System */}
        <div className="relative w-28 h-28 mb-12">
          {/* Outer Ring */}
          <div className="absolute inset-x-0 inset-y-0 rounded-full border border-white/5" />
          <motion.div 
            className="absolute inset-x-0 inset-y-0 rounded-full border border-transparent border-t-zinc-400/35 border-r-zinc-400/10"
            style={{ borderWidth: "1px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle Counter-Rotating Ring */}
          <motion.div 
            className="absolute inset-2.5 rounded-full border border-transparent border-b-emerald-400/40 border-l-emerald-400/5"
            style={{ borderWidth: "1.5px" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner Glowing Scanning Arc */}
          <motion.div 
            className="absolute inset-5 rounded-full border border-transparent border-t-white/85"
            style={{ borderWidth: "2px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Glass Core */}
          <div className="absolute inset-7 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
            <span className="font-mono text-sm font-semibold tracking-tighter text-white">
              {Math.round(progress)}<span className="text-[10px] text-zinc-500">%</span>
            </span>
          </div>
        </div>

        {/* Dynamic Stage Text */}
        <div className="text-center min-h-[90px] mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#86868b] uppercase block mb-2">
                STAGE {currentStepIndex + 1} OF {loadingSteps.length}
              </span>
              <h3 className="font-sans font-black text-white text-lg tracking-tight mb-2.5 selection:bg-white/10">
                {step.title}
              </h3>
              <p className="text-[#86868b] text-xs px-4 max-w-sm mx-auto leading-relaxed h-12">
                {step.sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar container - Sleek Glassmorphism Line */}
        <div className="w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-white rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Terminal logs mock simulation */}
        <div className="w-full bg-[#0a0a0a]/80 border border-white/5 rounded-2xl p-4 font-mono text-[9.5px] text-zinc-500 h-32 overflow-hidden select-none flex flex-col justify-end gap-1.5 text-left backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
            <span className="text-zinc-400 text-[8.5px] uppercase tracking-wider font-semibold">ALIGNMENT ENGINE DIAGNOSTIC LOG</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="truncate text-zinc-600"><span className="text-emerald-500/70">system/auth:</span> key connection check verified (ok)</p>
          <p className="truncate"><span className="text-zinc-600">{">"}</span> parsing pdf segments for structural vector nodes</p>
          <p className="truncate text-zinc-400"><span className="text-[#86868b]">gemini-3.5-flash:</span> loading semantic weights thread...</p>
          {progress > 45 && (
            <p className="truncate text-zinc-300"><span className="text-emerald-400/80">analyzer/spec:</span> matching resume format index coordinates...</p>
          )}
          {progress > 75 && (
            <p className="truncate text-white font-medium animate-pulse"><span className="text-emerald-400">roadmap/generator:</span> planning 90-day task sequence...</p>
          )}
        </div>
      </div>
    </div>
  );
}
