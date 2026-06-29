import { ArrowRight, CheckCircle2, XCircle, Sparkles, TrendingUp, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { CareerReport } from "../types";

interface ResumeCompareProps {
  report: CareerReport;
}

interface BenchmarkData {
  keywords: { name: string; isPresent: boolean }[];
  metrics: {
    title: string;
    description: string;
    candidateState: string;
    eliteState: string;
  }[];
}

const BENCHMARKS: Record<string, BenchmarkData> = {
  "Full Stack Software Engineer": {
    keywords: [
      { name: "TypeScript Type Safety", isPresent: true },
      { name: "Connection Pooling", isPresent: false },
      { name: "Redis Core Caching", isPresent: false },
      { name: "Dockerized Isolation", isPresent: false },
      { name: "CI/CD Staging Gateways", isPresent: false },
      { name: "Unit & Integration Tests", isPresent: false },
      { name: "Transaction Locking", isPresent: false },
      { name: "Relational Index Tuning", isPresent: false },
      { name: "Server-Side Rendering", isPresent: true },
    ],
    metrics: [
      {
        title: "Database Read Performance",
        description: "How fast relational tables yield data under query load.",
        candidateState: "Generic statements: 'Fetched users from a SQL database.' No latency counts recorded.",
        eliteState: "Quantitative outcomes: 'Optimized PostgreSQL query index configurations, slashing average read latency from 450ms down to 14ms.'"
      },
      {
        title: "Development Lifecycle Integrity",
        description: "Prevention of regression bugs before code modifications reach production.",
        candidateState: "No automated verification: 'Tested software manually.' Higher regression risks.",
        eliteState: "Strict build-phase assertion: 'Maintained 85%+ code verification coverage implementing custom mock pipeline sweeps.'"
      },
      {
        title: "Container Asset Tuning",
        description: "Reducing startup cold storage footprints during server expansions.",
        candidateState: "Basic assets: 'Wrote simple Docker run setups.'",
        eliteState: "Horizontal scale focus: 'Configured compact multi-stage Docker builds, yielding 42% decrease in container initialization latency.'"
      }
    ]
  },
  "Frontend Developer": {
    keywords: [
      { name: "Web Core Vitals (LCP/FID)", isPresent: false },
      { name: "Component Code Splitting", isPresent: false },
      { name: "Infinite Virtual Scrolling", isPresent: false },
      { name: "State Fragmentation Splitting", isPresent: true },
      { name: "Tailwind Component Design", isPresent: true },
      { name: "WCAG Accessibility Compliance", isPresent: false },
      { name: "Automated Cypress Runs", isPresent: false },
      { name: "Fluid Layout Transitions", isPresent: true }
    ],
    metrics: [
      {
        title: "Initial Page Load Speed",
        description: "Reducing rendering delays to retain end-user engagement rates.",
        candidateState: "Default assets: 'Created single-page React app bundles.' Large compiled weight.",
        eliteState: "Active optimization: 'Decreased initial loading package sizes by 22% using active dynamic import chunking.'"
      },
      {
        title: "Dynamic Table Rendering",
        description: "Maintaining frame rates when populating intensive lists.",
        candidateState: "Raw list execution: 'Rendered long transaction streams using simple list loops.' Re-render cascades.",
        eliteState: "Surgical scrolling: 'Engineered clean virtual scrolling layers allowing glitch-free rendering of 5,000+ line arrays.'"
      }
    ]
  },
  "Backend Engineer": {
    keywords: [
      { name: "Distributed Cache Strategies", isPresent: false },
      { name: "Horizontal Scaling Policy", isPresent: false },
      { name: "Microservice Choreography", isPresent: false },
      { name: "PostgreSQL Database Schema", isPresent: true },
      { name: "gRPC or Custom RPC Ports", isPresent: false },
      { name: "RabbitMQ/Kafka Queuing Services", isPresent: false },
      { name: "Idempotence Write Keys", isPresent: false },
      { name: "API Rate Limiting Layouts", isPresent: false }
    ],
    metrics: [
      {
        title: "Concurrent Socket Capacity",
        description: "Managing active websocket interactions without choking node resources.",
        candidateState: "Elementary sockets: 'Utilized simple Express backend routes.'",
        eliteState: "High-scale engineering: 'Maintained server integrity hosting 10,000 parallel connection streams utilizing stateless authentication keys.'"
      },
      {
        title: "Relational Write Isolation",
        description: "Stopping write overlap corruption during parallel transactions.",
        candidateState: "Standard writes: 'Created CRUD tables.' Dual entry hazards.",
        eliteState: "Safe transactions: 'Formulated robust optimistic locking strategies, preventing duplication errors during Peak Sales volume.'"
      }
    ]
  },
  "DevOps / SRE Engineer": {
    keywords: [
      { name: "Terraform Infrastructure Modules", isPresent: false },
      { name: "Kubernetes Host Orchestration", isPresent: false },
      { name: "Grafana Metric Dashboards", isPresent: false },
      { name: "Canary Staged Releases", isPresent: false },
      { name: "Docker Isolation Networks", isPresent: true },
      { name: "Blue-green Release Configs", isPresent: false },
      { name: "Prometheus Tracing Systems", isPresent: false }
    ],
    metrics: [
      {
        title: "Release Deployment Durations",
        description: "Shortening pipeline intervals to enhance team iteration velocity.",
        candidateState: "Slow manual builds: 'Managed GitHub actions manually.' Cycles exceeded 15 minutes.",
        eliteState: "Optimized pipelines: 'Configured automated layer caches, slicing integration feedback loops down to 3.5 minutes.'"
      },
      {
        title: "System Availability SLA",
        description: "Preserving service reachability during server crashes.",
        candidateState: "Standard single instance: 'Deployed application on a shared hosting box.' Major downtime risk.",
        eliteState: "High availability SRE: 'Guaranteed 99.98% up-time by configuring multi-zone cluster automatic route failures.'"
      }
    ]
  },
  "Data Scientist / ML Engineer": {
    keywords: [
      { name: "Retrieval-Augmented RAG", isPresent: false },
      { name: "Semantic Vector DB Indexes", isPresent: false },
      { name: "Token Usage Cost Throttles", isPresent: false },
      { name: "Asynchronous Celery Queues", isPresent: false },
      { name: "Pandas/NumPy Clean Pipelines", isPresent: true },
      { name: "Defensive Prompt Injection Check", isPresent: false },
      { name: "Custom Embeddings Models", isPresent: false }
    ],
    metrics: [
      {
        title: "Intelligent Pipeline Yields",
        description: "Ensuring model generations map accurately to original texts.",
        candidateState: "Generic prompt passes: 'Queried Gemini API without custom grounding parameter checks.'",
        eliteState: "RAG optimization: 'Constructed dynamic vector index retrieval, boosting contextual answers precision by 24%.'"
      },
      {
        title: "API Expense Management",
        description: "Conserving generation call counts to minimize budget drains.",
        candidateState: "Uncapped passes: 'Triggered model APIs directly on every candidate request.' High hosting invoice risks.",
        eliteState: "Local efficiency caching: 'Assembled a semantic cache cluster, slashing third-party API expenses by 45%.'"
      }
    ]
  }
};

export default function ResumeCompare({ report }: ResumeCompareProps) {
  // Find matching role benchmark
  const matchedRoleTitle = report.careerPaths[0]?.title || "Full Stack Software Engineer";
  const benchmarkKeys = Object.keys(BENCHMARKS);
  const matchedKey = benchmarkKeys.find(key => 
    matchedRoleTitle.toLowerCase().includes(key.toLowerCase()) ||
    key.toLowerCase().includes(matchedRoleTitle.toLowerCase())
  ) || "Full Stack Software Engineer";

  const benchmark = BENCHMARKS[matchedKey];
  const missingKeywordsCount = benchmark.keywords.filter(k => {
    // Cross check with parsed report missing keywords or simulate based on reality check
    const isMissingInReport = report.atsAnalysis.missingKeywords?.some(
      rKw => rKw.toLowerCase().includes(k.name.toLowerCase()) || k.name.toLowerCase().includes(rKw.toLowerCase())
    );
    return isMissingInReport || !k.isPresent;
  }).length;

  const totalKeywords = benchmark.keywords.length;
  const keywordMatchPercent = Math.round(((totalKeywords - missingKeywordsCount) / totalKeywords) * 100);

  // Elite defaults
  const elitePercent = 94;
  const userScore = Math.min(elitePercent - 15, Math.max(38, report.atsAnalysis.score || report.hireabilityScore));

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden" id="resume-compare-panel">
      {/* Background radial gradient decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[80px] pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 px-2.5 rounded-md border border-purple-500/30 bg-purple-950/20 text-purple-400 font-mono text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 animate-pulse text-purple-400" />
              BENCHMARK MODULE
            </span>
            <span className="font-mono text-[10px] text-zinc-500">Industry: {matchedKey}</span>
          </div>
          <h3 className="text-xl font-bold font-sans text-white tracking-tight">
            Compare vs. Top 10% Gold Standard
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            See how your metrics, terminology, and quantitative impact compare with candidate portfolios landing top 10% tech offers in Silicon Valley.
          </p>
        </div>
      </div>

      {/* Visual Slider Graph Overlay */}
      <div className="bg-zinc-900/30 border border-white/5 p-5 rounded-2xl mb-8">
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Overall Matching Strength</span>
            <span className="text-xl font-black text-white">{userScore}% Match vs Elite Benchmarks</span>
          </div>
          <span className="text-2xl font-black text-purple-400 font-mono">{elitePercent}% <span className="text-xs text-zinc-500 font-normal">Top 10% Standard</span></span>
        </div>

        {/* Beautiful Comparative Double-Track Slider Bar */}
        <div className="relative h-4 bg-zinc-950 rounded-full border border-white/5 flex items-center mb-4">
          {/* Top 10% shaded field */}
          <div className="absolute left-[80%] right-[3%] h-2 bg-purple-500/10 rounded-full border border-purple-500/25 z-0" />
          
          {/* User Score track */}
          <div 
            className="absolute left-[1.5%] h-2 rounded-full z-10 bg-gradient-to-r from-red-500/80 via-amber-500/80 to-purple-500/80 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
            style={{ width: `calc(${userScore}% - 3%)` }}
          />

          {/* User Indicator Pin */}
          <div 
            className="absolute z-20 -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${userScore}%` }}
          >
            <div className="w-4 h-4 rounded-full bg-white border-2 border-amber-500 shadow-lg flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            </div>
          </div>

          {/* Elite Indicator Pin */}
          <div 
            className="absolute z-20 -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${elitePercent}%` }}
          >
            <div className="w-5 h-5 rounded-full bg-purple-500 border-2 border-white shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center animate-pulse">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-[10px] items-start sm:items-center font-mono text-zinc-500">
          <span>Starter Stack (40%)</span>
          <span className="text-amber-400 font-bold">Your Resume Level ({userScore}%)</span>
          <span className="text-purple-400 font-extrabold flex items-center gap-0.5">Top 10% Elite ({elitePercent}%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Keyword Overlap Audit */}
        <div className="p-5 rounded-2xl bg-[#07070f] border border-white/5">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Elite Keyword Match Index
            </h4>
            <span className="text-xs font-mono text-zinc-500 font-bold">{keywordMatchPercent}% Overlap</span>
          </div>

          <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">
            These terms distinguish senior software engineers from boot-camp graduates. Missing keywords signal lack of production system ownership to ATS algorithms.
          </p>

          <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
            {benchmark.keywords.map((k, i) => {
              // We check if it is flagged missing in ATS keywords
              const isMissingInReport = report.atsAnalysis.missingKeywords?.some(
                rKw => rKw.toLowerCase().includes(k.name.toLowerCase()) || k.name.toLowerCase().includes(rKw.toLowerCase())
              );
              const present = !isMissingInReport && k.isPresent;

              return (
                <div 
                  key={i} 
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    present 
                      ? "bg-emerald-950/5 border-emerald-950 text-emerald-400/90" 
                      : "bg-red-950/5 border-red-950/20 text-zinc-400"
                  }`}
                >
                  <span className="font-mono font-medium">{k.name}</span>
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold">
                    {present ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="uppercase tracking-wider hidden sm:inline">PRESENT</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-red-400/80 uppercase tracking-wider">MISSING</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Impact Metric Alignment Checks */}
        <div className="p-5 rounded-2xl bg-[#07070f] border border-white/5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-4 border-b border-white/5 pb-3 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            Outcome Metric Comparison
          </h4>

          <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">
            Elite resumes do not just lists "duties." They outline **production trade-offs and latency figures.** Check the difference:
          </p>

          <div className="space-y-4 max-h-[290px] overflow-y-auto pr-1">
            {benchmark.metrics.map((m, i) => (
              <div key={i} className="space-y-2 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <span className="text-[11px] font-bold text-white tracking-tight block">{m.title}</span>
                
                {/* Candidate State */}
                <div className="p-2.5 rounded-lg bg-zinc-950/40 border border-white/5 text-[10px] text-zinc-500 relative pl-7 font-mono leading-relaxed">
                  <XCircle className="w-3.5 h-3.5 text-rose-500/80 absolute left-2.5 top-2.5 shrink-0" />
                  <span className="font-sans font-bold text-zinc-400 block mb-0.5">Your Resume Style:</span>
                  {m.candidateState}
                </div>

                {/* Elite State */}
                <div className="p-2.5 rounded-lg bg-purple-950/5 border border-purple-950/20 text-[10px] text-purple-300 relative pl-7 font-mono leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 absolute left-2.5 top-2.5 shrink-0" />
                  <span className="font-sans font-extrabold text-white block mb-0.5">Top 10% Gold Standard:</span>
                  {m.eliteState}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
