import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, Cpu, Activity, Sparkles } from "lucide-react";

interface IntroOverlayProps {
  onComplete: () => void;
  key?: string;
}

const introLogs = [
  "SYSTEM_INITIALIZATION: COMPLETED_OK",
  "RETRIEVING ALIGNMENT ENGINES...",
  "MATCHING BIAS SCHEMATICS [OK]",
  "INDEXING DEVELOPER ARCHETYPES...",
  "UP CONVERTING SKILL CORRELATION DATA...",
  "PREPARATION: COMPLETE_READY_TO_LAUNCH"
];

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [stage, setStage] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    // 1. High speed fluid progress loader
    const duration = 2200; // 2.2 seconds total duration
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const loader = setInterval(() => {
      currentStep++;
      const progressPercent = Math.min((currentStep / steps) * 100, 100);
      setProgress(progressPercent);

      // Map progress to logs
      const logIdx = Math.min(
        Math.floor((progressPercent / 100) * introLogs.length),
        introLogs.length - 1
      );
      setCurrentLogIdx(logIdx);

      if (currentStep >= steps) {
        clearInterval(loader);
        setStage("reveal");
        // Hold for the beautiful exit animation to trigger
        setTimeout(() => {
          setStage("done");
          onComplete();
        }, 750);
      }
    }, intervalTime);

    return () => clearInterval(loader);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#020205] z-[150] flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Immersive background nodes & luxury ambient flares */}
      <div className="absolute inset-0 bg-[#010103]" />
      
      {/* Extreme Deep Red Ambient Back-Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.2, 0.45, 0.2], 
          scale: [0.95, 1.1, 0.95] 
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.07),transparent_70%)] pointer-events-none"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.15, 0.3, 0.15], 
          scale: [1, 1.2, 1] 
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.04),transparent_75%)] pointer-events-none"
      />

      {/* Cybernetic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.01)_1.5px,transparent_1.5px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle,white_20%,transparent_90%)] pointer-events-none" />

      {/* Intro Reveal Wrapper */}
      <div className="relative w-full max-w-lg px-8 flex flex-col items-center z-20">
        
        {/* Animated Brand Squircle Tile */}
        <div className="relative mb-10">
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="w-24 h-24 rounded-2xl border border-red-500/25 bg-[#08080c] relative flex items-center justify-center shadow-[0_15px_40px_rgba(239,68,68,0.15)] overflow-hidden"
          >
            {/* Ambient Red Inside Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-650/10 via-transparent to-white/5" />
            
            {/* The Stylized S Line */}
            <svg className="w-14 h-14 overflow-visible" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M17 7C17 4.8 15.2 3 13 3C10.8 3 9 4.8 9 7C9 9.5 12.5 10 14 11C15.5 12 17 12.5 17 15C17 17.2 15.2 19 13 19C10.8 19 9 17.2 9 15"
                stroke="#FF2B40"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Glowing corner overlay */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-70" />
          </motion.div>

          {/* Top-Right Red Dot Banner Badge */}
          <motion.span 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#FF1E27] border-[3px] border-[#020205] shadow-[0_3px_12px_rgba(255,30,39,0.6)] flex items-center justify-center"
          >
            <Sparkles className="w-2.5 h-2.5 text-white animate-pulse" />
          </motion.span>
        </div>

        {/* Brand Text Reveal Layout */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black text-2xl tracking-tight text-white mb-2"
          >
            Skilllssue<span className="text-[#FF2B40]">.ai</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-red-500 font-bold"
          >
            ALIGNMENT SPECIFICATION ENGINE
          </motion.p>
        </div>

        {/* Progress System container */}
        <div className="w-full max-w-xs mb-8">
          <div className="flex items-center justify-between mb-3.5">
            <span className="font-mono text-[10px] text-zinc-500 font-semibold tracking-wider">BOOTING INTERFACE</span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-mono text-sm font-bold text-white tracking-widest">{Math.round(progress)}</span>
              <span className="font-mono text-[9px] text-zinc-500">%</span>
            </div>
          </div>
          
          {/* Glass Loading Line */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 via-rose-400 to-white rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Live Running Terminal Monitor */}
        <div className="w-full bg-[#0a0a0d]/80 border border-white/5 rounded-2xl p-5 font-mono text-[9.5px] text-zinc-500 min-h-24 flex flex-col justify-center gap-2 select-none shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative backdrop-blur-lg">
          <div className="absolute top-3 right-4 flex items-center gap-1.5 text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[7.5px] uppercase tracking-wider font-extrabold text-zinc-500">LIVE CORES</span>
          </div>
          
          <div className="flex items-center gap-2 text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-red-500/70" />
            <span className="uppercase tracking-widest font-bold text-[8.5px]">AUTOMATED DEPLOY PROTOCOL</span>
          </div>
          
          <div className="h-px bg-white/5 my-0.5" />
          
          <AnimatePresence mode="popLayout">
            <motion.p 
              key={currentLogIdx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="truncate text-zinc-300 font-medium font-mono"
            >
              <span className="text-red-500/70 select-none">&gt;&gt;</span> {introLogs[currentLogIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Extra luxury indicators */}
        <div className="mt-14 flex items-center gap-8 text-[9px] font-mono font-bold tracking-widest text-zinc-600 uppercase">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-red-500/40" />
            <span>SECURE IDENTITY</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-red-500/40" />
            <span>CALIBRATED BIAS</span>
          </div>
        </div>

      </div>

      {/* Screen swipe dynamic motion background mask */}
      <AnimatePresence>
        {stage === "reveal" && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-[#020205] z-50 flex items-center justify-center pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
