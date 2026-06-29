import { ShieldAlert, BookOpen, KeyRound, LogOut, User } from "lucide-react";
import Logo from "./Logo";

interface HeaderProps {
  onReset: () => void;
  showSampleText?: boolean;
  isLoggedIn: boolean;
  userName?: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Header({ 
  onReset, 
  showSampleText = false, 
  isLoggedIn, 
  userName, 
  onLoginClick, 
  onLogout 
}: HeaderProps) {
  const userInitials = userName ? userName.substring(0, 2).toUpperCase() : "DV";

  return (
    <header className="border-b border-white/5 bg-zinc-950/45 backdrop-blur-2xl sticky top-0 z-50 transition-all shadow-[0_1px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <div 
          onClick={onReset}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-95 transition-all select-none"
          id="brand-logo"
        >
          <Logo size="sm" />
        </div>

        <div className="flex items-center gap-3">

          {showSampleText && (
            <div className="hidden md:flex items-center gap-2 h-7 px-3 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/15 text-amber-300 font-mono text-[9px] uppercase tracking-wider font-bold shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Demo Record Active
            </div>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-zinc-900/60 border border-white/10 shadow-inner">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-[10px] uppercase font-black tracking-wider">
                {userInitials}
              </div>
              <span className="text-[11px] font-mono text-zinc-300 font-bold hidden sm:inline max-w-[100px] truncate">
                {userName || "Sumit Deore"}
              </span>
              <button
                onClick={onLogout}
                className="p-1 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer select-none"
                title="Disconnect Profile Keyring"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-purple-500/20 hover:border-purple-500/45 bg-purple-950/15 hover:bg-purple-950/30 text-purple-300 text-xs font-bold transition-all cursor-pointer shadow-md select-none"
              id="header-sign-in-btn"
            >
              <KeyRound className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-98 select-none"
            id="reset-state-btn"
          >
            Start Fresh
          </button>
        </div>
      </div>
    </header>
  );
}
