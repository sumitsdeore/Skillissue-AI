import React, { useMemo } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { motion } from "motion/react";
import { TrendingUp, Award, Zap } from "lucide-react";
import { CareerReport } from "../types";

interface SkillGrowthChartProps {
  report: CareerReport;
  completedXpTasks: Record<string, boolean>;
}

export default function SkillGrowthChart({ report, completedXpTasks }: SkillGrowthChartProps) {
  // Extract lists
  const days30List = report.xpPlan.days30 || [];
  const days60List = report.xpPlan.days60 || [];
  const days90List = report.xpPlan.days90 || [];

  // Calculate completion by phase
  const p30 = useMemo(() => {
    if (days30List.length === 0) return 0;
    const done = days30List.filter((_, i) => !!completedXpTasks[`30-${i}`]).length;
    return done / days30List.length;
  }, [days30List, completedXpTasks]);

  const p60 = useMemo(() => {
    if (days60List.length === 0) return 0;
    const done = days60List.filter((_, i) => !!completedXpTasks[`60-${i}`]).length;
    return done / days60List.length;
  }, [days60List, completedXpTasks]);

  const p90 = useMemo(() => {
    if (days90List.length === 0) return 0;
    const done = days90List.filter((_, i) => !!completedXpTasks[`90-${i}`]).length;
    return done / days90List.length;
  }, [days90List, completedXpTasks]);

  // Determine scores
  const scoreBase = report.hireabilityScore;
  const maxImprovement = 100 - scoreBase;
  
  // Weights for improvements
  const boost30 = maxImprovement * 0.3; // 30% of gap covered in Phase 1
  const boost60 = maxImprovement * 0.4; // 40% of gap covered in Phase 2
  const boost90 = maxImprovement * 0.3; // Remaining 30% of gap in Phase 3

  // Current levels based on actual checked items
  const current0 = scoreBase;
  const current30 = scoreBase + (p30 * boost30);
  const current60 = current30 + (p60 * boost60);
  const current90 = current60 + (p90 * boost90);

  // Target paths (ideal trend line if finished 100%)
  const target0 = scoreBase;
  const target30 = scoreBase + boost30;
  const target60 = target30 + boost60;
  const target90 = 100;

  // Chart data points
  const data = useMemo(() => {
    return [
      {
        name: "Day 0",
        label: "Initial Audit",
        "Your Progress": Math.round(current0),
        "Ideal Target Line": Math.round(target0),
      },
      {
        name: "Day 30",
        label: "Phase I (Tactical)",
        "Your Progress": Math.round(current30),
        "Ideal Target Line": Math.round(target30),
      },
      {
        name: "Day 60",
        label: "Phase II (Core Build)",
        "Your Progress": Math.round(current60),
        "Ideal Target Line": Math.round(target60),
      },
      {
        name: "Day 90",
        label: "Phase III (Ready)",
        "Your Progress": Math.round(current90),
        "Ideal Target Line": Math.round(target90),
      }
    ];
  }, [current0, current30, current60, current90, target0, target30, target60, target90]);

  // Custom tooltips with premium design style
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/90 border border-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col gap-1.5 font-sans">
          <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-1">
            {payload[0].payload.label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 justify-between min-w-[140px]">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: entry.stroke || (index === 0 ? "#10b981" : "#ffffff") }} 
                />
                {entry.name}
              </span>
              <span className="text-xs font-bold text-white font-mono">
                {entry.value} pt
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md" id="skill-growth-trend-container">
      {/* Dynamic background lights */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase block mb-1">
            PREDICTIVE METRICS ENGINE
          </span>
          <h4 className="font-sans font-black text-white text-lg sm:text-xl tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            90-Day XP Growth Projection
          </h4>
        </div>

        {/* Live metric outputs */}
        <div className="flex items-center gap-3 bg-zinc-900/40 border border-white/5 p-2 rounded-2xl px-4 shrink-0 shadow-inner">
          <div className="flex flex-col text-right">
            <span className="text-[9px] font-mono uppercase text-zinc-500 font-bold">Estimated Rating</span>
            <span className="text-sm font-black text-white font-mono">{Math.round(current90)} / 100</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col text-right">
            <span className="text-[9px] font-mono uppercase text-zinc-500 font-bold">Status Potential</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5 justify-end">
              <Zap className="w-3 h-3 text-emerald-400" />
              +{Math.round(current90 - current0)} XP
            </span>
          </div>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="w-full h-[220px] relative select-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 15, left: -25, bottom: 5 }}
          >
            <defs>
              {/* Premium Glow Gradient for Your Progress */}
              <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
              </linearGradient>
              {/* Premium Subtle Gradient for Ideal Target Trail */}
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#86868b" stopOpacity={0.06}/>
                <stop offset="95%" stopColor="#86868b" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#ffffff" 
              opacity={0.04} 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              stroke="#86868b" 
              tickSize={0}
              tickMargin={12}
              axisLine={false}
              tick={{ fontSize: 9, fontFamily: "var(--font-mono)", fontWeight: 500 }}
            />
            <YAxis 
              domain={[Math.max(10, scoreBase - 15), 100]}
              stroke="#86868b"
              tickSize={0}
              tickMargin={12}
              axisLine={false}
              tick={{ fontSize: 9, fontFamily: "var(--font-mono)", fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1.5 }} />
            
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconSize={8}
              iconType="circle"
              wrapperStyle={{ fontSize: 10, fontFamily: "var(--font-sans)", color: "#86868b", paddingTop: "15px" }}
            />

            {/* Area representing Target Trajectory Path */}
            <Area 
              type="monotone" 
              dataKey="Ideal Target Line" 
              stroke="#cccccc" 
              strokeWidth={1} 
              strokeDasharray="4 4"
              fillOpacity={1} 
              fill="url(#colorTarget)" 
              name="Target Trajectory"
              animationDuration={600}
            />

            {/* Area representing Actual Real-time Growth Progress */}
            <Area 
              type="monotone" 
              dataKey="Your Progress" 
              stroke="#10b981" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#colorProgress)" 
              name="Simulated Progress"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-zinc-500 font-sans text-[10.5px] leading-relaxed mt-4 bg-zinc-900/10 p-3 rounded-2xl border border-white/5 text-center flex items-center justify-center gap-1.5">
        <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Your progress increases in real-time as you check off milestone items in the roadmap below.</span>
      </p>
    </div>
  );
}
