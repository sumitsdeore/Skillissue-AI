import { CareerReport } from "../types";

export const sampleReport: CareerReport = {
  candidateName: "Alex Carter",
  hireabilityScore: 68,
  hireabilityExplanation: "You have a solid set of personal projects and decent frontend literacy. However, your profile lacks professional-grade practices like testing, CI/CD, database indexing, or cloud deployments. Your resume reads like a series of tutorials rather than products designed for real users, which flags you as a risk for fast-paced mid-sized engineering teams.",
  atsAnalysis: {
    score: 62,
    formattingIssues: [
      "Multi-column layout is confusing basic ATS software engines, causing your skills profile portion to read backward.",
      "Used text boxes for your 'Contact Details' sidebar which are ignored entirely by major ATS vendor scrapers.",
      "Included non-standard visual rating stars for skills (e.g. 'React: 4/5 Stars'), which import into ATS as raw symbols like '[[[[['"
    ],
    missingKeywords: [
      "TypeScript",
      "Jest/Cypress",
      "REST APIs",
      "CI/CD Pipelines",
      "PostgreSQL/NoSQL",
      "System Design"
    ],
    improvementSuggestions: [
      "Format your resume to a clean, single-column, left-aligned standard template.",
      "Replace graphical rating bars with a comma-separated list of technical competencies labeled explicitly.",
      "Inject quantitative metrics reflecting impact (e.g., 'Optimized asset loader reducing Bundle Size by 35%') instead of abstract achievements."
    ]
  },
  resumeSummary: "Highly motivated self-taught frontend developer and computer science student with 2+ years of educational tinkering in Python and React. Creator of multiple local-first browser utility prototypes including a custom weather lookup widget and a grocery cart calculator. Proficient in styling fluid interfaces with Tailwind CSS and managing local component state.",
  superpowers: [
    {
      title: "Strong Tailwind Mastery",
      description: "Pixel-perfect visual execution across your weather and grocery apps. Responsive breakpoints are fully implemented, and you avoid excessive custom CSS overrides.",
      category: "Technical"
    },
    {
      title: "Grit and Consistency",
      description: "Your commit history reflects a 120-day streak of active coding on your GitHub personal profile, demonstrating excellent self-learning discipline.",
      category: "Portfolio"
    },
    {
      title: "Project Autonomy",
      description: "You built your custom grocery utility completely from scratch without direct tutorial copy-pasting, showing solid foundational JavaScript capabilities.",
      category: "Impact"
    }
  ],
  skillIssues: [
    {
      skill: "TypeScript",
      importance: "Critical",
      description: "Your projects are written in pure JavaScript, exposing you to runtime bugs. 92% of corporate React codebases require TS today. Recruiters ignore entry-level React developers who cannot write type-safe code.",
      alternativeSuggest: "Migrate your weather tracker project from JS to TS, implementing explicit interfaces for OpenWeather API responses."
    },
    {
      skill: "Testing (Jest / React Testing Library)",
      importance: "High",
      description: "Zero tests present. Enterprise teams cannot spend cycles manually QA-ing your branch submissions. If you don't write tests, recruiters assume you produce regression-heavy code.",
      alternativeSuggest: "Write at least 5 unit tests for your grocery basket state machine using RTL."
    },
    {
      skill: "Relational & Production-ready Databases",
      importance: "High",
      description: "You use local storage exclusively to persist state. Knowing how to query databases with optimized indexes and safe parameter schemes is standard software engineering.",
      alternativeSuggest: "Introduce PostgreSQL with Prisma ORM to save user profiles rather than syncing to local storage."
    },
    {
      skill: "Cloud Deployment & Docker",
      importance: "Medium",
      description: "Your deployment strategy relies entirely on local dev machines or drag-and-drop hosts like Netlify. Knowing how to spin up lightweight container configurations is a major hiring edge.",
      alternativeSuggest: "Write a simple Dockerfile for your React applications and deploy them to Cloud Run or Vercel through a Git pipeline."
    }
  ],
  redFlags: [
    {
      title: "Zero Measurable Impact",
      description: "You wrote: 'Responsible for building components and integrating weather data'. This is duty-oriented, not outcome-oriented. Recruiters look for metrics (e.g. 'Reduced state-management bugs by 20%').",
      severity: "Critical"
    },
    {
      title: "Passive Language Usage",
      description: "Using soft verbs like 'helped create' or 'learned about' instead of proactive engineering verbs ('Designed', 'Refactored', 'Optimized', 'Debugged'). This frames you as a bystander.",
      severity: "Warning"
    },
    {
      title: "No Collaborative Experience",
      description: "Every single portfolio link is a soliloquy of local git commits. Hiring managers are afraid you do not know how to merge branches, conduct code reviews, or resolve git merge conflicts.",
      severity: "Critical"
    }
  ],
  careerPaths: [
    {
      title: "Frontend Developer (Junior)",
      matchPercentage: 85,
      reason: "Excellent component-styling and basic API fetching fluency. If you master TypeScript, you reside in the top decile of React freshers."
    },
    {
      title: "Full Stack Software Engineer",
      matchPercentage: 55,
      reason: "You have basic Python scripting knowledge, but you lack deep database queries, session auth experience, or cloud server deployments."
    },
    {
      title: "UI Engineer / Design System Specialist",
      matchPercentage: 78,
      reason: "Outstanding focus on clean responsive layouts and component polish. Matches teams that operate heavy design-to-code pipelines."
    }
  ],
  salaryEstimate: {
    currency: "INR",
    beginnerMin: 4.5,
    beginnerMax: 7.5,
    growthMin: 12.0,
    growthMax: 18.0,
    commentary: "Your frontend abilities place you into traditional junior developer ranges in top Indian Tech hubs like Bengaluru and Pune. Transitioning your projects to TypeScript, learning database index tuning with PostgreSQL, and adding automated unit tests will push your candidate file into premium mid-tier packages starting upward of ₹12 LPA."
  },
  bossBattleQuestions: [
    {
      type: "Technical",
      question: "In React, what are the primary performance risks of passing inline callback functions inside your components, and how does useCallback/useMemo resolve them?",
      interviewerTip: "The interviewer wants to see if you understand reference equality and how React handles re-renders on child elements.",
      idealAnswerNotes: "Explain that inline functions are recreated on every render, causing React child elements optimized with React.memo to wastefully re-render due to reference mismatches. Detail how useCallback memoizes function references and state dependencies."
    },
    {
      type: "Project-Based",
      question: "Talk me through how you handled asynchronous error states and network timeouts in your Weather API integration. What happens when the server returns a 500 error?",
      interviewerTip: "This tests if you built production-ready error handling, or just standard happy-path fetch models.",
      idealAnswerNotes: "Describe implementing a guard block, catching specific HTTP failure codes (400, 404, 500), displaying responsive toast indicators, and maintaining a fallback cache rather than letting the UI crash."
    },
    {
      type: "Behavioral",
      question: "Give me an example of a time you disagreed with a specific development tutorial or architecture. How did you decide on your custom implementation?",
      interviewerTip: "This screens for independent decision-making and curiosity vs blindly copying standard video templates.",
      idealAnswerNotes: "Acknowledge recognizing that standard tutorials over-simplify authentication or bypass testing, prompting you to research best-practices and build your own custom token handler or RTL setup."
    }
  ],
  xpPlan: {
    days30: [
      "Refactor your existing React weather app to use TypeScript entirely (eliminate all 'any' types).",
      "Rewrite your resume into a clean, left-aligned, single-column plain PDF template."
    ],
    days60: [
      "Add Jest and React Testing Library to your grocery basket component. Achieve 80% code coverage.",
      "Form a Mock Team with a classmate or join an open-source project to learn about Git workflows (pull requests, rebase, conflicts)."
    ],
    days90: [
      "Replace local storage in your core project with a real backend using Node Express or Supabase Postgres.",
      "Deploy the backend database safely, writing automated database connection pooling and configuring variables in Vercel/Cloud Run."
    ]
  },
  realityCheck: {
    brutalHonesty: "Your resume represents a standard 'Vite tutorial graduate' profile. You have visually pleasing apps, but under the hood, the missing types, non-existent tests, and local-storage storage structures suggest you cannot build stable, enterprise-scale features.",
    coreWeakness: "Lack of commercial-quality technical practices (TypeScript, Testing, SQL databases, Git Collaboration).",
    typicalRejectionReason: "Candidates lack depth in collaborative workflows, unit test writing, and corporate typescript standards; we opted for a candidate with previous internship experience.",
    keyAction: "Build a single, unified TS + React + PostgreSQL project with fully automated testing coverage, and record a 3-minute video explaining your architectural trade-offs."
  }
};
