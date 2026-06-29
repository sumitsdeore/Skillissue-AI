import { X, Heart, Sparkles, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryModal({ isOpen, onClose }: StoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with elegant blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#020205]/95 backdrop-blur-md cursor-pointer"
      />

      {/* Main Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="relative w-full max-w-2xl bg-zinc-950/80 border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] max-h-[85vh] flex flex-col"
      >
        {/* Subtle top decoration */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-950/40">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500/10" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">FOUNDER STORY</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-2.5 rounded-lg border border-white/5 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all text-xs font-mono tracking-widest flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Scrollable Story Content */}
        <div className="p-8 overflow-y-auto space-y-6 text-sm leading-relaxed text-zinc-300 selection:bg-purple-500/30">
          {/* Header section with quote card styling */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 relative overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              The Story Behind SkillIssue.ai
            </h2>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">
              By Sumit Deore • Founder, SkillIssue.ai
            </p>
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 rounded-full bg-purple-500/5 blur-2xl pointer-events-none" />
          </div>

          <div className="space-y-4">
            <p className="font-medium text-zinc-200">
              Hi, I'm Sumit Deore.
            </p>
            <p>
              I'm a BCA student, and like thousands of students, I spent months applying for internships, jobs, and opportunities while constantly wondering the same thing:
            </p>
            
            <p className="text-base font-bold text-white border-l-2 border-purple-500 pl-4 py-1 italic bg-purple-950/15">
              "Why am I not getting selected?"
            </p>

            <p>
              Every rejection email felt the same. Sometimes there was no response at all; sometimes I thought the competition was too high; sometimes I blamed the job market.
            </p>

            <p>
              But eventually, I had to ask myself a difficult question: <span className="text-white hover:text-purple-300 transition-colors cursor-help font-semibold">What if the problem wasn't the recruiter?</span> What if the problem was my resume, my skills, my projects, or the way I presented myself?
            </p>

            <p>
              The frustrating part was that <span className="font-medium text-zinc-200">nobody tells you what you're doing wrong.</span> You upload your resume. You apply. You wait. And then... silence.
            </p>
          </div>

          {/* Prompt/Dilemma Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-zinc-900/25 border border-white/5 space-y-2">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">THE RECURRING CYCLE</span>
              <p className="text-xs text-zinc-400">
                Opening AI tools and asking dozens of questions: "How good is my resume?", "What skills am I missing?", "Why would a recruiter reject me?"
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-900/25 border border-white/5 space-y-2">
              <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest block">THE REALIZATION</span>
              <p className="text-xs text-zinc-400">
                Spending more time figuring out what to ask and prompting questions than actually coding, learning, or improving.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-purple-400 font-bold flex items-center gap-1.5 pt-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              The Birth of "Skill Issue"
            </h3>
            <p>
              Then one day, while joking with friends, I heard the phrase every developer and gamer knows: <strong className="text-white font-mono text-[13px] bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5 hover:border-purple-500/20">"Skill Issue."</strong>
            </p>
            <p>
              At first, it was funny. But then I realized something. Most career problems actually are skill issues. Not because people aren't talented, but because they don't know:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/30 p-4 rounded-2xl border border-white/5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                What they're missing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                What recruiters expect
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                What skills matter most
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                What to improve first
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p>
              That's when the idea for <span className="text-white font-semibold">SkillIssue.ai</span> was born. I wanted to build something that doesn't wait for users to ask the right questions—instead, it should tell them immediately.
            </p>
            <p>
              No complicated prompts. No guessing. <span className="font-bold text-white uppercase tracking-tight">No sugar-coating.</span> Just honest, actionable feedback. SkillIssue.ai acts like a recruiter, career coach, ATS scanner, and brutally honest mentor—all in one place.
            </p>
          </div>

          {/* Slogan Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border border-purple-500/20 text-center relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-400 font-bold block mb-1">THE VISION</span>
            <p className="text-xl font-black text-white mb-2 tracking-tight">
              Fix Today. Level Up Tomorrow.
            </p>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Because getting rejected without knowing why is frustrating, and because every student deserves clear direction. The goal is to help them fix it.
            </p>
          </div>

          {/* Founder Signature */}
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-display font-medium text-white text-base">Sumit Deore</p>
              <p className="text-zinc-500 text-xs">Founder, SkillIssue.ai</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Created for student developers globally</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
