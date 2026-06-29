import { useState } from "react";
import { X, Shield, Lock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, userName: string) => void;
  allowClose?: boolean;
  googleAuthEnabled: boolean;
}

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

  if (!isOpen) return null;

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
      onLoginSuccess(email, name);
      onClose();
    } catch {
      setError("Failed to process Google sign-in. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          if (allowClose) onClose();
        }}
        className="absolute inset-0 bg-[#020205]/95 backdrop-blur-md cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-md bg-zinc-950/90 border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]" />

        <div className="bg-zinc-900/45 border-b border-white/5 px-6 py-4 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="uppercase tracking-widest font-black text-[10px]">Secure Sign In</span>
          </div>
          {allowClose ? (
            <button
              onClick={onClose}
              className="p-1 px-2.5 rounded-lg border border-white/5 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all text-xs font-mono tracking-widest flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>CLOSE</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-rose-500/10 bg-rose-500/5 text-rose-400 font-mono text-[9px] uppercase tracking-widest font-black">
              <Lock className="w-2.5 h-2.5" />
              <span>Required</span>
            </div>
          )}
        </div>

        <div className="p-8 space-y-6">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-zinc-900 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 font-extrabold text-sm mb-3">
              S!
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Sign in to continue
            </h2>
            <p className="text-zinc-500 text-xs mt-1.5 max-w-xs mx-auto leading-relaxed">
              Use your own Google account to unlock resume analysis, job matching, and interview tools.
            </p>
          </div>

          {googleAuthEnabled ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-full flex justify-center [&>div]:!w-full [&>div]:!flex [&>div]:!justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google sign-in was cancelled or failed. Please try again.")}
                  useOneTap={false}
                  theme="filled_black"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  width="320"
                />
              </div>

              {error && (
                <div className="w-full p-3 bg-rose-500/5 border border-rose-500/15 text-rose-300 font-mono text-[10px] rounded-xl">
                  {error}
                </div>
              )}

              <div className="p-3.5 bg-zinc-900/30 rounded-2xl border border-white/5 flex items-start gap-3 text-[10px] text-zinc-500 leading-normal w-full">
                <Shield className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                <p>
                  You will sign in with your Google account. We only use your name and email to personalize your session — nothing is shared publicly.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-amber-200 text-xs leading-relaxed">
              <p className="font-bold mb-2">Google Sign-In is not configured yet.</p>
              <p className="text-amber-200/80">
                Add <code className="font-mono text-[10px]">VITE_GOOGLE_CLIENT_ID</code> to your environment variables and redeploy. Create a Web OAuth client in Google Cloud Console.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
