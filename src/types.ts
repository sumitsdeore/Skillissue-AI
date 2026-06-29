export interface ATSAnalysis {
  score: number;
  formattingIssues: string[];
  missingKeywords: string[];
  improvementSuggestions: string[];
}

export interface Superpower {
  title: string;
  description: string;
  category: "Technical" | "Impact" | "Leadership" | "Portfolio";
}

export interface SkillIssue {
  skill: string;
  importance: "Critical" | "High" | "Medium";
  description: string;
  alternativeSuggest: string;
}

export interface RecruiterRedFlag {
  title: string;
  description: string;
  severity: "Critical" | "Warning";
}

export interface CareerPath {
  title: string;
  matchPercentage: number;
  reason: string;
}

export interface SalaryEstimate {
  currency: string;
  beginnerMin: number;
  beginnerMax: number;
  growthMin: number;
  growthMax: number;
  commentary: string;
}

export interface BossBattleQuestion {
  type: "Technical" | "Behavioral" | "Project-Based";
  question: string;
  interviewerTip: string;
  idealAnswerNotes: string;
}

export interface XpGrindingPlan {
  days30: string[];
  days60: string[];
  days90: string[];
}

export interface RealityCheck {
  brutalHonesty: string;
  coreWeakness: string;
  typicalRejectionReason: string;
  keyAction: string;
}

export interface CareerReport {
  candidateName: string;
  hireabilityScore: number;
  hireabilityExplanation: string;
  atsAnalysis: ATSAnalysis;
  resumeSummary: string;
  superpowers: Superpower[];
  skillIssues: SkillIssue[];
  redFlags: RecruiterRedFlag[];
  careerPaths: CareerPath[];
  salaryEstimate: SalaryEstimate;
  bossBattleQuestions: BossBattleQuestion[];
  xpPlan: XpGrindingPlan;
  realityCheck: RealityCheck;
}

export interface JobMatchResult {
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  verdict: string;
  actionableFixes: string[];
}

export type ViewState = "landing" | "upload" | "loading" | "dashboard";
