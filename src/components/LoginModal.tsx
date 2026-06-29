import { useState, useEffect } from "react";
import {
  X, Shield, Lock, Sparkles, Zap, Target, MessageSquare, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Logo from "./Logo";
import AuthSuccessScreen from "./AuthSuccessScreen";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, userName: string) => void;
  allowClose?: boolean;
  googleAuthEnabled: boolean;
}

const UNLOCK_FEATURES = [
  { icon: Target, label: "ATS Deep Scan", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: Zap, label: "Skill Gap Radar", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: MessageSquare, label: "Mock Interviews", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
];

const ROTATING_TAGLINES = [
  "Turn your skill issues into job offers.",
  "Expose hidden recruiter red flags instantly.",
  "Simulate elite hiring panel verdicts.",
];

function decodeGoogleCredential(credential: string) {
  const payload = JSON.parse(atob(credential.split(".")[1]));
  const email = typeof payload.email === "string" ? payload.email : "";
  const name =
    (typeof payload.name === "string" && payload.name) ||
    (typeof payload.given_name === "string" && payload.given_name) ||
    email.split("@")[0] ||
    "User";
  return { email, name };
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  allowClose = true,
  googleAuthEnabled,
}: LoginModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [successUser, setSuccessUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSuccessUser(null);
      setError(null);
      return;
    }
    const timer = setInterval(() => {
      setTaglineIdx((i) => (i + 1) % ROTATING_TAGLINES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleGoogleSuccess = (response: CredentialResponse) => {
    if (!response.credential) {
      setError("Google did not return a sign-in credential. Please try again.");
      return;
    }

    try {
      const { email, name } = decodeGoogleCredential(response.credential);
      if (!email) {
        setError("Could not read your Google email. Please try another account.");
        return;
      }
      setError(null);
      setSuccessUser({ email, name });
    } catch {
      setError("Failed to process Google sign-in. Please try again.");
    }
  };

  const handleSuccessComplete = () => {
    if (!successUser) return;
    onLoginSuccess(successUser.email, successUser.name);
    setSuccessUser(null);
    onClose();
  };

  if (successUser) {
    return (
      <AuthSuccessScreen
        userName={successUser.name}
        onComplete={handleSuccessComplete}
      />
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop with ambient aura */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => {
              if (allowClose) onClose();
            }}
            className="absolute inset-0 bg-[#020205]/92 backdrop-blur-xl cursor-pointer overflow-hidden"
          >
            <motion.div
              animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[12%] w-[380px] h-[380px] rounded-full bg-indigo-600/20 blur-[110px] mix-blend-screen pointer-events-none"
            />
            <motion.div
              animate={{ opacity: [0.25, 0.45, 0.25], scale: [1.05, 0.95, 1.05] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[5%] right-[8%] w-[320px] h-[320px] rounded-full bg-pink-500/15 blur-[100px] mix-blend-screen pointer-events-none"
            />
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px] mix-blend-screen pointer-events-none"
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.02)_1.5px,transparent_1.5px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] pointer-events-none" />
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[1px] rounded-[28px] bg-[conic-gradient(from_0deg,#4285F4,#EA4335,#FBBC05,#34A853,#a855f7,#4285F4)] opacity-40 blur-[0.5px]"
            />
            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 pointer-events-none" />

            <div className="relative bg-zinc-950/95 border border-white/10 rounded-[27px] overflow-hidden shadow-[0_40px_90px_-20px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-cyan-400/0 via-purple-400/60 to-pink-400/0" />

              {/* Header bar */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-zinc-950/60">
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                    Secure Gateway
                  </span>
                </motion.div>

                {allowClose ? (
                  <button
                    onClick={onClose}
                    className="p-1.5 px-2.5 rounded-xl border border-white/5 bg-zinc-900/60 hover:bg-zinc-900 hover:border-white/15 text-zinc-400 hover:text-white transition-all text-[10px] font-mono tracking-widest flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span className="hidden sm:inline">CLOSE</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-rose-500/15 bg-rose-500/5 text-rose-400 font-mono text-[9px] uppercase tracking-widest font-black">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Required</span>
                  </div>
                )}
              </div>

              <div className="p-7 sm:p-9 space-y-7">
                {/* Brand + headline */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-5 p-4 rounded-2xl bg-zinc-900/40 border border-white/5 shadow-inner">
                    <Logo size="md" animate />
                  </div>

                  <span className="text-[10px] font-mono font-bold bg-purple-950/30 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 mb-4">
                    <Sparkles className="w-3 h-3 text-pink-400" />
                    Identity Verification
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Unlock Your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
                      Career Audit
                    </span>
                  </h2>

                  <div className="h-6 mt-3 overflow-hidden relative w-full max-w-sm">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={taglineIdx}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35 }}
                        className="text-zinc-500 text-xs leading-relaxed absolute inset-x-0"
                      >
                        {ROTATING_TAGLINES[taglineIdx]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Feature chips */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap justify-center gap-2"
                >
                  {UNLOCK_FEATURES.map((feat, i) => (
                    <motion.div
                      key={feat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.08 }}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold uppercase tracking-wider ${feat.bg} ${feat.color}`}
                    >
                      <feat.icon className="w-3 h-3" />
                      {feat.label}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Sign-in area */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="space-y-4"
                >
                  {googleAuthEnabled ? (
                    <>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#4285F4]/20 via-purple-500/20 to-[#EA4335]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative p-5 rounded-2xl bg-zinc-900/50 border border-white/[0.06] flex flex-col items-center gap-1">
                          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                            Continue with your Google account
                          </p>
                          <div className="w-full flex justify-center [&>div]:!w-full [&>div]:!flex [&>div]:!justify-center">
                            <GoogleLogin
                              onSuccess={handleGoogleSuccess}
                              onError={() =>
                                setError("Google sign-in was cancelled or failed. Please try again.")
                              }
                              useOneTap={false}
                              theme="filled_black"
                              size="large"
                              text="signin_with"
                              shape="pill"
                              width="300"
                            />
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3.5 bg-rose-500/5 border border-rose-500/20 text-rose-300 font-mono text-[10px] rounded-xl flex items-start gap-2">
                              <span className="text-rose-400 shrink-0">!</span>
                              {error}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="p-4 bg-gradient-to-br from-zinc-900/60 to-zinc-950/40 rounded-2xl border border-white/5 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <Shield className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-zinc-300 mb-0.5">
                            Private & session-only
                          </p>
                          <p className="text-[10px] text-zinc-500 leading-relaxed">
                            We only use your name and email to personalize your audit. Your session clears when you close the browser.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-amber-200 text-xs leading-relaxed">
                      <p className="font-bold mb-2 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Google Sign-In not configured
                      </p>
                      <p className="text-amber-200/80">
                        Add{" "}
                        <code className="font-mono text-[10px] bg-black/30 px-1.5 py-0.5 rounded">
                          GOOGLE_CLIENT_ID
                        </code>{" "}
                        to your server environment variables and redeploy.
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Footer hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-600"
                >
                  <ChevronRight className="w-3 h-3 text-purple-500/60" />
                  <span>Powered by SkillIssue.ai Career Intelligence Engine</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
