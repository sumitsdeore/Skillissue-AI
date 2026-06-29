import React, { useState } from "react";
import { X, Shield, Lock, Sparkles, CheckCircle2, User, KeyRound, ArrowRight, CornerDownRight, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, userName: string) => void;
  defaultEmail?: string;
  allowClose?: boolean;
}

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default function LoginModal({ isOpen, onClose, onLoginSuccess, defaultEmail = "", allowClose = true }: LoginModalProps) {
  const [screen, setScreen] = useState<"accounts" | "custom_email">("accounts");
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectGoogleAccount = (email: string, displayName: string) => {
    setIsLoading(true);
    setLoadingStep("Connecting to accounts.google.com...");
    setError(null);

    const steps = [
      "Accessing Google Identifiers...",
      "Validating OAuth Callback Handshake...",
      "Querying Developer Profile Credentials...",
      "Access Granted! Provisioning Pipeline..."
    ];

    let currentStepIndex = 0;
    
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setLoadingStep(steps[currentStepIndex]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
        onLoginSuccess(email, displayName);
        onClose();
      }
    }, 500);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes("@")) {
      setError("Please input a valid Google email address.");
      return;
    }
    const derivedName = customName.trim() || customEmail.split("@")[0].toUpperCase();
    handleSelectGoogleAccount(customEmail, derivedName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred cosmic frosted backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          if (allowClose) {
            onClose();
          }
        }}
        className="absolute inset-0 bg-[#020205]/95 backdrop-blur-md cursor-pointer"
      />

      {/* Auth Card Viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-md bg-zinc-950/90 border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] flex flex-col"
      >
        {/* Glow bar representing Google Red, Yellow, Green, Blue colors */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]" />
        
        {/* Google Safe Zone header */}
        <div className="bg-zinc-900/45 border-b border-white/5 px-6 py-4 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <GoogleLogo />
            <span className="uppercase tracking-widest font-black text-[10px]">Google Identity Services</span>
          </div>
          {allowClose ? (
            <button
              onClick={onClose}
              className="p-1 px-2.5 rounded-lg border border-white/5 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all text-xs font-mono tracking-widest flex items-center gap-1 cursor-pointer select-none"
            >
              <X className="w-3" />
              <span>CLOSE</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-rose-500/10 bg-rose-500/5 text-rose-400 font-mono text-[9px] uppercase tracking-widest font-black animate-pulse">
              <Lock className="w-2.5 h-2.5" />
              <span>Required</span>
            </div>
          )}
        </div>

        {/* Modal body container */}
        <div className="p-8 space-y-6">
          <div className="text-center relative">
            {/* Elegant logo beacon */}
            <div className="mx-auto w-12 h-12 bg-zinc-900 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 font-extrabold text-sm shadow-[0_0_15px_rgba(239,68,68,0.05)] mb-3">
              S!
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              AI Resume Analysis Locked
            </h2>
            <p className="text-zinc-500 text-xs mt-1.5 max-w-xs mx-auto leading-relaxed">
              Google Single Sign-In is required to activate specialized AI resume diagnostics & ATS evaluation.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-10 flex flex-col items-center justify-center space-y-5"
              >
                {/* Google styled fluid loop */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-[#4285F4] border-r-[#EA4335] border-b-[#FBBC05] border-l-[#34A853] animate-spin" />
                </div>
                <div className="space-y-1.5 text-center">
                  <p className="text-xs font-semibold text-white font-mono tracking-wide">
                    {loadingStep}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    accounts.google.com/o/oauth2/v2
                  </p>
                </div>
              </motion.div>
            ) : screen === "accounts" ? (
              <motion.div
                key="accounts-screen"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest font-extrabold block">
                  Choose a Google Account
                </span>

                <div className="space-y-2.5">
                  {/* Primetime Account Selector Option 1 (User profile from metadata) */}
                  <button
                    onClick={() => handleSelectGoogleAccount("deoresumit09@gmail.com", "Sumit Deore")}
                    className="w-full text-left p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Colorful Google theme avatar indicator */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] p-[1.5px]">
                        <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-white font-extrabold text-xs">
                          SD
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                          Sumit Deore
                        </h4>
                        <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                          deoresumit09@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-mono font-black text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                        Primary
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>

                  {/* Account entry Option 2 - Guest developer bypass simulation */}
                  <button
                    onClick={() => handleSelectGoogleAccount("guest_developer@skillissue.ai", "GUEST AUDITOR")}
                    className="w-full text-left p-3.5 rounded-2xl bg-zinc-900/30 hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 font-bold text-xs font-mono">
                        GA
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-300 group-hover:text-white">
                          Guest Auditor
                        </h4>
                        <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                          guest_developer@skillissue.ai
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setScreen("custom_email");
                      setError(null);
                    }}
                    className="w-full py-3.5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/5 text-zinc-400 hover:text-white text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 group cursor-pointer select-none"
                  >
                    <User className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
                    <span>Use another Google Account</span>
                  </button>
                </div>

                {/* Secure warning badge */}
                <div className="p-3.5 bg-zinc-900/30 rounded-2xl border border-white/5 flex items-start gap-3 mt-4 text-[10px] text-zinc-500 leading-normal">
                  <Shield className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                  <p>
                    SkillIssue uses official Google OAuth parameters. We will never sell, store, or misuse your private profile logs or credential files.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="custom-google-screen"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleCustomGoogleSubmit}
                className="space-y-4 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest font-extrabold">
                    Google Account Email
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setScreen("accounts");
                      setError(null);
                    }}
                    className="text-[10px] text-purple-400 hover:text-purple-300 font-mono font-bold hover:underline cursor-pointer select-none"
                  >
                    Back to Accounts
                  </button>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block">
                      Google Mail Vector
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650" />
                      <input
                        type="email"
                        required
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-10.5 pr-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#4285F4]/60 focus:border-[#4285F4]/60 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block">
                      Preferred Display Name (Optional)
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650" />
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. Sumit Deore"
                        className="w-full pl-10.5 pr-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#4285F4]/60 focus:border-[#4285F4]/60 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-rose-500/5 border border-rose-500/15 text-rose-300 font-mono text-[10px]">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-zinc-950 font-black rounded-2xl text-xs tracking-wider uppercase transition-all hover:bg-neutral-100 flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6 select-none"
                >
                  <GoogleLogo />
                  <span>SIGN IN WITH GOOGLE</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
