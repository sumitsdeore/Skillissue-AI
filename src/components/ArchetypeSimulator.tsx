import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Skull, ShieldAlert, Cpu, Heart, CheckCircle2, ChevronRight, AlertTriangle, Smile } from "lucide-react";

interface Archetype {
  id: string;
  name: string;
  avatar: string;
  verdict: string;
  verdictType: "savage" | "warning" | "elite";
  atsScore: number;
  highlightIssues: string[];
  funnyComment: string;
  premiumSolveAction: string;
}

const ARCHETYPES: Archetype[] = [
  {
    id: "bootcamp",
    name: "The Vite Bootcamp Graduate",
    avatar: "🎓",
    verdict: "CRITICAL TUTORIAL SMELL • CONTEXT REJECTED",
    verdictType: "savage",
    atsScore: 14,
    highlightIssues: [
      "Built 'Todo App' in React and called it an Enterprise Management System",
      "No automated testing; tested manually in Chrome tab",
      "Wrote responsive styling but page overflows on mobile browser views",
      "Handles user billing calculations on the frontend (client-side absolute bypass)"
    ],
    funnyComment: "Recruiter Feedback: 'Candidate seems to have watched 470 hours of tutorial playlists but has never touched real database replication cycles or connection gateways. We have auto-placed this profile in our /dev/null folders.'",
    premiumSolveAction: "Redesign file structures, configure Postgres transaction-safe locking, and build robust Express middleware pools."
  },
  {
    id: "cowboy",
    name: "The TypeScript Cowboy",
    avatar: "🤠",
    verdict: "INSTABILITY ADVISORY • MANUAL VERIFICATION REQUIRED",
    verdictType: "warning",
    atsScore: 42,
    highlightIssues: [
      "Uses '// @ts-ignore' or type 'any' on 82% of key application parameters",
      "Commits secret API keys to public GitHub repository nodes",
      "Resolves memory leakage issues by setting up server cron-jobs to reboot daily"
    ],
    funnyComment: "Recruiter Feedback: 'Capable of writing fast code, but their repository is a minefield of unchecked promises and dangerous null-pointers. They fear compiler logs like the plague.'",
    premiumSolveAction: "Enforce strict TypeScript config lanes, implement secure server-side proxy routers, and design isolated schema validators."
  },
  {
    id: "architect",
    name: "The Savage System Architect",
    avatar: "👑",
    verdict: "TOP 1% GOLD STANDARD • OFFERS PENDING IMMEDIATE SIGN-OFF",
    verdictType: "elite",
    atsScore: 98,
    highlightIssues: [
      "Slashed query latency from 450ms down to 14ms via custom database index adjustments",
      "Implemented gRPC backend pipelines with horizontal scale isolates",
      "Designed automatic fallback container clustering with 99.99% system availability"
    ],
    funnyComment: "Recruiter Feedback: 'This candidate is clearly an AI-human cyborg. They don't write bugs; they write beautiful low-level poetry. Call them immediately before Google doubles their current salary.'",
    premiumSolveAction: "No solve required. Ready to match directly with Silicon Valley core engineering squads."
  }
];

export default function ArchetypeSimulator() {
  const [selectedId, setSelectedId] = useState<string>("bootcamp");
  const selected = ARCHETYPES.find((a) => a.id === selectedId) || ARCHETYPES[0];

  return (
    <div className="w-full max-w-4xl mx-auto bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden my-12" id="archetype-simulator-playground">
      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[90px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-start gap-8 relative z-10">
        
        {/* Left Side: Interactive Archetype Selectors */}
        <div className="w-full md:w-2/5 flex flex-col gap-3">
          <div className="mb-4">
            <span className="p-1 px-2.5 rounded-md border border-rose-500/30 bg-rose-950/20 text-rose-400 font-mono text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              INTERACTIVE DEMO
            </span>
            <h3 className="text-lg font-bold font-sans text-white tracking-tight mt-2">
              Savage Archetype Simulator
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Select an engineering profile model to watch our recruiting engine audit the candidate highlights in real-time.
            </p>
          </div>

          {ARCHETYPES.map((arch) => {
            const isCurrent = arch.id === selected.id;
            return (
              <button
                key={arch.id}
                onClick={() => setSelectedId(arch.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative group flex items-center justify-between cursor-pointer ${
                  isCurrent 
                    ? "bg-zinc-900/60 border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.6)]" 
                    : "bg-zinc-950 border-white/[0.03] hover:border-white/5 hover:bg-zinc-900/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">{arch.avatar}</span>
                  <div>
                    <h4 className="text-xs font-bold font-sans text-white tracking-tight">{arch.name}</h4>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5 block">
                      Target Score: {arch.atsScore}%
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-zinc-600 transition-transform ${isCurrent ? "translate-x-1 text-white" : "group-hover:translate-x-0.5"}`} />
              </button>
            );
          })}
        </div>

        {/* Right Side: Render Result Terminal Box with Premium Animations */}
        <div className="w-full md:w-3/5 flex flex-col bg-[#05050c] border border-white/5 rounded-2xl relative overflow-hidden min-h-[380px] p-5">
          {/* Mock Console Top Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-4 font-mono text-[9px] text-zinc-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/60" />
              <span className="w-2 h-2 rounded-full bg-amber-500/60" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
              <span className="font-semibold text-zinc-400 ml-1.5">RECRUIT_PARSER_DIAGNOSTICS_V4.sh</span>
            </div>
            <span>PORT_3000 // CONSOLE</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Score & Verdict Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/[0.02]">
                  <div>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">ALGORITHM STATUS</span>
                    <span className={`text-[10px] font-mono font-black tracking-wider uppercase px-2.5 py-1 rounded inline-flex items-center gap-1.5 ${
                      selected.verdictType === "savage" 
                        ? "bg-rose-950/20 border border-rose-500/25 text-rose-400" 
                        : selected.verdictType === "warning"
                        ? "bg-amber-950/10 border border-amber-500/20 text-text-amber-400 text-amber-400"
                        : "bg-emerald-950/20 border border-emerald-500/20 text-emerald-400"
                    }`}>
                      {selected.verdictType === "savage" && <Skull className="w-3 h-3 text-rose-400" />}
                      {selected.verdictType === "warning" && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                      {selected.verdictType === "elite" && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      {selected.verdict}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">FIT SCORE</span>
                    <span className={`text-2xl font-black font-mono tracking-tighter ${
                      selected.atsScore > 80 
                        ? "text-emerald-400" 
                        : selected.atsScore > 35 
                        ? "text-amber-400" 
                        : "text-rose-400"
                    }`}>
                      {selected.atsScore}%
                    </span>
                  </div>
                </div>

                {/* Funny Comment Box */}
                <div className="p-3 bg-zinc-950 border border-white/[0.03] rounded-xl text-xs font-mono text-zinc-400 leading-relaxed mb-4 relative italic">
                  <div className="absolute right-2.5 bottom-1 font-sans text-[9px] text-zinc-600 font-bold not-italic">ALIGNMENT VERDICT</div>
                  {selected.funnyComment}
                </div>

                {/* Highlights / Found Issues list */}
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">SCAN OVERVIEW:</span>
                  {selected.highlightIssues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      {selected.verdictType === "elite" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Skull className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <span className="text-zinc-300 leading-relaxed">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner to Premium Solve */}
              <div className="mt-4 pt-4 border-t border-white/[0.03] flex items-center justify-between gap-3 text-[11px]">
                <div className="flex-1">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">HOW TO SOLVE IN SKILLISSUE:</span>
                  <span className="text-purple-300 font-sans leading-snug block font-medium">{selected.premiumSolveAction}</span>
                </div>
                <div className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
                  <Cpu className="w-3 h-3 text-purple-400" />
                  <span>v3.5.flash</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
