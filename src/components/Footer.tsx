import { ShieldAlert, Cpu } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onOpenStory?: () => void;
}

export default function Footer({ onOpenStory }: FooterProps) {
  return (
    <footer className="border-t border-zinc-900/60 bg-black py-12 text-zinc-500 text-xs mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <Logo size="sm" animate={false} />
          <p className="max-w-md text-zinc-500 text-[11px] leading-relaxed mt-2">
            Constructive, unfiltered career auditing for college students and fresh software developers trying to transition into the industry. Created with absolute precision and premium material aesthetics.
          </p>
        </div>


        <div className="flex items-center gap-6 font-mono text-[11px]">
          <span className="text-zinc-600">© {new Date().getFullYear()}</span>
          {onOpenStory && (
            <>
              <span className="text-zinc-850">|</span>
              <button 
                onClick={onOpenStory} 
                className="hover:text-purple-300 hover:underline transition-colors cursor-pointer select-none font-bold"
              >
                Our Story
              </button>
            </>
          )}
          <span className="hidden sm:inline text-zinc-800">|</span>
          <a href="#brand-logo" className="hover:text-zinc-300 transition-colors">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
