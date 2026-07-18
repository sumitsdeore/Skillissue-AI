import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import Logo from "./Logo";

const AUTH_SUCCESS_DURATION_MS = 5000;

interface AuthSuccessScreenProps {
  userName: string;
  onComplete: () => void;
}

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function AuthSuccessScreen({ userName, onComplete }: AuthSuccessScreenProps) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const start = Date.now();

    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / AUTH_SUCCESS_DURATION_MS) * 100);
      setProgress(pct);
      if (elapsed >= AUTH_SUCCESS_DURATION_MS) {
        clearInterval(tick);
        onCompleteRef.current();
      }
    }, 30);

    return () => clearInterval(tick);
  }, []);

  const firstName = userName.split(" ")[0] || userName;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#020205]"
    >
      {/* Ambient flares */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0.3, 0.6, 0.4], scale: [0.9, 1.15, 1] }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.12),transparent_65%)] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.45, 0.2], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-emerald-500/10 pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], rotate: [360, 180, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-purple-500/10 pointer-events-none"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.02)_1.5px,transparent_1.5px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Success icon burst */}
        <div className="relative mb-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-emerald-400/30 blur-2xl"
          />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="relative w-24 h-24 rounded-3xl bg-zinc-950 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.25)]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.35 }}
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400" strokeWidth={2} />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg"
            >
              <GoogleLogo />
            </motion.div>
          </motion.div>
        </div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/25 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Google Authentication Successful
        </motion.div>

        {/* Welcome headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3"
        >
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
            SkillIssue AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="text-zinc-400 text-sm sm:text-base mb-8"
        >
          Hey <span className="text-white font-semibold">{firstName}</span> — your career intelligence engine is ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mb-10 p-4 rounded-2xl bg-zinc-950/50 border border-white/5"
        >
          <Logo size="sm" animate={false} />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 1, duration: 0.4 }}
          className="w-full max-w-xs"
        >
          <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-zinc-600 mt-2 uppercase tracking-widest">
            Launching your dashboard...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
