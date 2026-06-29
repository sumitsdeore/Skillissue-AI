import { useState } from "react";
import { 
  Sparkles, FileText, Download, Plus, Trash2, Printer, 
  CheckCircle, ArrowLeft, Lightbulb, ChevronRight, RefreshCw, LayoutTemplate
} from "lucide-react";
import { motion } from "motion/react";
import { CareerReport } from "../types";

interface ResumeBuilderProps {
  report: CareerReport;
  onBack: () => void;
}

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

interface ProjectItem {
  id: string;
  name: string;
  technologies: string;
  description: string;
  metricUsed?: string;
}

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
}

const METRIC_SUGGESTIONS = [
  "Optimized bundle weight & implemented code-splitting to reduce page load latency by 38%",
  "Engineered state management structures to reduce duplicate API query requests by 45%",
  "Designed structured relational schemas with index locks, boosting query execution performance by 30%",
  "Introduced unit and end-to-end integration tests using Jest and Playwright, establishing 85%+ test coverage",
  "Configured responsive multi-platform layout engines, achieving perfect cross-device visual parity scores",
  "Automated container building schedules via Docker/CI-CD pipelines to shrink local deployment cycles",
  "Built authenticated socket connections handling web room syncing across massive simulated client pools",
  "Refructured legacy callback operations into typed async structures, eliminating 90% of uncaught exception incidents"
];

const SKILL_SUGGESTIONS = [
  "TypeScript", "React 18+", "Next.js", "Node.js", "Express", "Tailwind CSS",
  "PostgreSQL", "Prisma", "Docker Containers", "Vitest / Jest", "REST APIs", "Git/CI-CD"
];

export default function ResumeBuilder({ report, onBack }: ResumeBuilderProps) {
  // Pre-seed state from user profile report
  const [name, setName] = useState(report.candidateName || "Candidate Developer");
  const [email, setEmail] = useState("candidate@skillissue.ai");
  const [phone, setPhone] = useState("+1 (555) 019-3824");
  const [location, setLocation] = useState("San Francisco, CA");
  const [links, setLinks] = useState("github.com/developer");
  const [summary, setSummary] = useState(
    `Dedicated Software Engineer focused on reliable web ecosystems. Background constructing component setups, setting up state routes, and implementing API validations as identified by SkillIssue Career Audits.`
  );
  
  const [skills, setSkills] = useState<string[]>(() => {
    // Collect superpowers and missing keywords (to address)
    const seed = [
      ...SKILL_SUGGESTIONS.slice(0, 5),
      ...(report.superpowers?.map(s => s.title.split(" ")[0]) || [])
    ];
    return Array.from(new Set(seed)).slice(0, 10);
  });

  const [newSkill, setNewSkill] = useState("");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "exp-1",
      company: "SkillIssue AI Labs (Portfolio Lab)",
      role: report.careerPaths?.[0]?.title || "Associate Software Engineer",
      period: "Jan 2025 - Present",
      bullets: [
        "Constructed custom content processing models to audit candidate template structures safely.",
        "Refactored nested states to enhance overall loading velocity by 18%."
      ]
    },
    {
      id: "exp-2",
      company: "Open Source Tech Projects & Freelance",
      role: "Junior Web Developer",
      period: "Jun 2024 - Dec 2024",
      bullets: [
        "Implemented local-first persistence models with safe browser configurations.",
        "Created modern dashboard widgets styled with responsive layouts to assist fresh developers."
      ]
    }
  ]);

  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "proj-1",
      name: "Dynamic Portfolio Indexer",
      technologies: "TypeScript, React, Tailwind CSS, Express",
      description: "A fast, compliant search crawler that inspects local templates for nested formatting errors and missing keywords."
    }
  ]);

  const [educations, setEducations] = useState<EducationItem[]>([
    {
      id: "edu-1",
      school: "Autonomous Tech University or Self-Taught Curriculum",
      degree: "Computer Science Career Prep Track / Deep Application Architectures",
      period: "Graduated 2024"
    }
  ]);

  // Selected state for inserting suggestions
  const [selectedExpId, setSelectedExpId] = useState<string | null>("exp-1");
  const [experienceBulletTemp, setExperienceBulletTemp] = useState("");

  // Handler functions
  const addExperience = () => {
    const id = `exp-${Date.now()}`;
    setExperiences(prev => [
      ...prev,
      {
        id,
        company: "New Company",
        role: "Software Engineer",
        period: "2025 - Present",
        bullets: ["Add outcome-oriented metrics here..."]
      }
    ]);
    setSelectedExpId(id);
  };

  const updateExperience = (id: string, key: keyof Omit<ExperienceItem, "id" | "bullets">, val: string) => {
    setExperiences(prev => prev.map(item => item.id === id ? { ...item, [key]: val } : item));
  };

  const addExpBullet = (expId: string, text: string) => {
    if (!text.trim()) return;
    setExperiences(prev => prev.map(item => {
      if (item.id === expId) {
        return { ...item, bullets: [...item.bullets, text.trim()] };
      }
      return item;
    }));
  };

  const addMetricToExperience = (expId: string, metric: string) => {
    setExperiences(prev => prev.map(item => {
      if (item.id === expId) {
        // Filter out placeholders if any
        const filtered = item.bullets.filter(b => !b.includes("Add outcome-oriented"));
        return { ...item, bullets: [...filtered, metric] };
      }
      return item;
    }));
  };

  const removeExpBullet = (expId: string, bulletIndex: number) => {
    setExperiences(prev => prev.map(item => {
      if (item.id === expId) {
        return { ...item, bullets: item.bullets.filter((_, idx) => idx !== bulletIndex) };
      }
      return item;
    }));
  };

  const deleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(item => item.id !== id));
    if (selectedExpId === id) setSelectedExpId(null);
  };

  // Projects handlers
  const addProject = () => {
    setProjects(prev => [
      ...prev,
      {
        id: `proj-${Date.now()}`,
        name: "New Software Project",
        technologies: "React, TypeScript, Node.js",
        description: "Describe what high leverage backend or frontend problem this project solved. Frame it with high metrics."
      }
    ]);
  };

  const updateProject = (id: string, key: keyof Omit<ProjectItem, "id">, val: string) => {
    setProjects(prev => prev.map(item => item.id === id ? { ...item, [key]: val } : item));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
  };

  // Educations handlers
  const addEducation = () => {
    setEducations(prev => [
      ...prev,
      {
        id: `edu-${Date.now()}`,
        school: "Institution Name",
        degree: "Field of Study",
        period: "Period"
      }
    ]);
  };

  const updateEducation = (id: string, key: keyof Omit<EducationItem, "id">, val: string) => {
    setEducations(prev => prev.map(item => item.id === id ? { ...item, [key]: val } : item));
  };

  const deleteEducation = (id: string) => {
    setEducations(prev => prev.filter(item => item.id !== id));
  };

  // Skills handlers
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (sc: string) => {
    setSkills(prev => prev.filter(s => s !== sc));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full relative" id="resume-builder-workspace">
      {/* Back Header panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-xl border border-white/5 bg-zinc-950/45 text-zinc-400 hover:text-white transition-all hover:bg-zinc-900 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#050510] rounded-[6px] flex items-center justify-center">
                  <LayoutTemplate className="w-4 h-4 text-purple-300" />
                </div>
              </div>
              Pristine ATS Resume Builder
            </h1>
            <p className="text-zinc-400 text-xs mt-1">
              Instant double-column cleanups. Convert nested tables or visual meters into a 100% compliant single-column output.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-[0_10px_30px_rgba(168,85,247,0.25)] transition-all cursor-pointer font-sans active:scale-98"
          >
            <Printer className="w-4 h-4 shrink-0" />
            Print / Save ATS PDF
          </button>
        </div>
      </div>

      {/* Tab Switcher on mobile screens underneath the headers */}
      <div className="xl:hidden bg-zinc-900 border border-white/5 p-1 rounded-xl flex items-center mb-6 gap-1 relative z-10">
        <button
          onClick={() => setMobileTab("edit")}
          className={`flex-1 py-2 text-[11px] font-mono uppercase tracking-wider font-extrabold rounded-lg transition-transform justify-center flex items-center gap-1.5 cursor-pointer ${
            mobileTab === "edit" ? "bg-white/10 text-white border border-white/10 shadow-lg" : "text-zinc-500 border border-transparent"
          }`}
        >
          [01] Edit Details
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-2 text-[11px] font-mono uppercase tracking-wider font-extrabold rounded-lg transition-transform justify-center flex items-center gap-1.5 cursor-pointer ${
            mobileTab === "preview" ? "bg-white/10 text-white border border-white/10 shadow-lg" : "text-zinc-500 border border-transparent"
          }`}
        >
          [02] Real ATS Preview
        </button>
      </div>

      {/* Main Grid: Left inputs editor, Right instant formatted print page */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Input Field Blocks (5 cols) */}
        <div className={`xl:col-span-5 flex-col gap-6 max-h-[85vh] overflow-y-auto pr-2 ${mobileTab === "edit" ? "flex" : "hidden xl:flex"}`} id="resume-input-editor-column">
          
          {/* Header Contact info */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5">
            <h3 className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              1. Contact Information
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-zinc-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-zinc-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Phone</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-zinc-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Location</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-zinc-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Links / Links (Pipe Split)</label>
                  <input 
                    type="text" 
                    value={links} 
                    onChange={e => setLinks(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-zinc-700 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Core Biography summary */}
          <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 shadow-lg">
            <h3 className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              2. Executive Summary
            </h3>
            <textarea 
              rows={4}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full bg-zinc-950/20 border border-white/5 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-white/10 text-white leading-relaxed resize-none font-sans"
              placeholder="State your technical foundations clearly and succinctly without marketing jargon..."
            />
          </div>

          {/* Work Experiences & Metric Suggestions Box */}
          <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                3. High Leverage Work History
              </h3>
              <button 
                onClick={addExperience}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-300 hover:text-white text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Role
              </button>
            </div>

            {/* List of Experiences */}
            <div className="flex flex-col gap-4">
              {experiences.map((exp) => (
                <div 
                  key={exp.id} 
                  className={`p-3.5 rounded-xl border transition-all ${
                    selectedExpId === exp.id 
                      ? "bg-zinc-900/30 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.05)]" 
                      : "bg-zinc-900/10 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                       <input 
                        type="text" 
                        value={exp.company} 
                        onChange={e => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Company Name"
                        className="bg-transparent text-white font-bold text-xs border-b border-transparent hover:border-zinc-800 focus:border-zinc-700 focus:outline-none py-0.5"
                      />
                      <input 
                        type="text" 
                        value={exp.period} 
                        onChange={e => updateExperience(exp.id, "period", e.target.value)}
                        placeholder="Jan 2025 - Present"
                        className="bg-transparent text-zinc-400 text-right text-[10px] font-mono border-b border-transparent hover:border-zinc-800 focus:border-zinc-700 focus:outline-none py-0.5"
                      />
                      <input 
                        type="text" 
                        value={exp.role} 
                        className="bg-transparent text-purple-300 text-xs border-b border-transparent hover:border-zinc-800 focus:border-zinc-700 focus:outline-none py-0.5 col-span-2 font-semibold"
                        onChange={e => updateExperience(exp.id, "role", e.target.value)}
                        placeholder="Role / Title"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setSelectedExpId(exp.id)}
                        className={`p-1.5 px-2.5 rounded-lg text-[9px] font-mono uppercase font-bold cursor-pointer transition-colors ${
                          selectedExpId === exp.id ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" : "bg-zinc-900 text-zinc-500 border border-transparent"
                        }`}
                        title="Add bullet points"
                      >
                        Edit List
                      </button>
                      <button 
                        onClick={() => deleteExperience(exp.id)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/30 text-zinc-500 hover:text-red-400 cursor-pointer"
                        title="Delete Experience"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Bullet inputs */}
                  <div className="mt-2.5">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">Outcome Bullets</span>
                    <ul className="flex flex-col gap-2 mb-3">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-[11px] leading-relaxed select-text text-zinc-300 bg-black/20 px-2.5 py-1.5 rounded-lg border border-white/5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                          <span className="flex-1 font-sans">{b}</span>
                          <button 
                            onClick={() => removeExpBullet(exp.id, bIdx)}
                            className="p-0.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-red-400 shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-3" />
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Add bullet input */}
                    {selectedExpId === exp.id && (
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="Type an outcome metric bullet..."
                          value={experienceBulletTemp}
                          onChange={e => setExperienceBulletTemp(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              addExpBullet(exp.id, experienceBulletTemp);
                              setExperienceBulletTemp("");
                            }
                          }}
                          className="flex-1 bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-zinc-700 text-white placeholder:text-zinc-650"
                        />
                        <button 
                          onClick={() => {
                            addExpBullet(exp.id, experienceBulletTemp);
                            setExperienceBulletTemp("");
                          }}
                          className="px-3 py-1.5 bg-zinc-900 border border-white/5 hover:border-white/10 rounded-lg text-xs font-mono text-purple-300 font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Metric Blueprint Suggestions (Signature Block based on user request) */}
            {selectedExpId && (
              <div className="mt-5 p-4 border border-purple-500/10 bg-purple-500/5 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.06),transparent_70%)] pointer-events-none" />
                <div className="flex items-center gap-2 mb-2.5">
                  <Lightbulb className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest font-black block">
                    High-Performance Metric Blueprints
                  </span>
                </div>
                <p className="text-zinc-400 text-[10px] leading-relaxed mb-3 font-normal">
                  Click any blueprint below to inject a high-performance, outcome-oriented bullet into your active work history card:
                </p>
                <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
                  {METRIC_SUGGESTIONS.map((metric, i) => (
                    <button
                      key={i}
                      onClick={() => addMetricToExperience(selectedExpId, metric)}
                      className="text-left py-2 px-2.5 bg-[#030308] hover:bg-zinc-900/60 border border-white/5 rounded-xl text-[10px] text-zinc-300 leading-normal hover:border-purple-500/30 transition-all select-none cursor-pointer"
                    >
                      + <span className="text-zinc-200">{metric}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Compliant Technologies (Skills) Chips List */}
          <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 shadow-lg">
            <h3 className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              4. Competencies List (Strict Layout-Safe format)
            </h3>
            
            <div className="flex flex-wrap gap-1.5 mb-4" id="resume-builder-skills-list">
              {skills.map((s, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-white/5 pl-3 pr-2 py-1 rounded-full hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  {s}
                  <button 
                    onClick={() => handleRemoveSkill(s)}
                    className="p-0.5 rounded-full hover:bg-zinc-750 text-zinc-500 hover:text-red-400 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add skill (e.g., PostgreSQL)"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddSkill()}
                className="flex-1 bg-zinc-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-white/10 text-white placeholder:text-zinc-650"
              />
              <button 
                onClick={handleAddSkill}
                className="px-3.5 bg-zinc-900 border border-white/5 hover:bg-zinc-850 hover:border-white/10 text-zinc-300 rounded-lg text-xs font-mono font-bold cursor-pointer"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Core Projects Portfolio */}
          <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                5. High leverage Projects
              </h3>
              <button 
                onClick={addProject}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-300 hover:text-white text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Project
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3.5 bg-zinc-950/20 border border-white/5 rounded-xl">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input 
                      type="text"
                      value={proj.name}
                      onChange={e => updateProject(proj.id, "name", e.target.value)}
                      placeholder="Project Name"
                      className="bg-transparent text-white font-bold text-xs border-b border-transparent hover:border-zinc-800 focus:border-zinc-700 focus:outline-none py-0.5 font-display"
                    />
                    <button 
                      onClick={() => deleteProject(proj.id)}
                      className="text-right text-rose-458 hover:text-rose-400 text-[11px] self-center transition-all cursor-pointer font-medium uppercase font-mono"
                    >
                      Delete
                    </button>
                    <input 
                      type="text"
                      value={proj.technologies}
                      onChange={e => updateProject(proj.id, "technologies", e.target.value)}
                      placeholder="Technologies (e.g. Next.js, Redux, PostgreSQL)"
                      className="bg-transparent text-cyan-400 text-xs border-b border-transparent hover:border-zinc-800 focus:border-zinc-700 focus:outline-none py-0.5 col-span-2 font-mono"
                    />
                  </div>
                  <textarea 
                    rows={2}
                    value={proj.description}
                    onChange={e => updateProject(proj.id, "description", e.target.value)}
                    placeholder="Briefly review key contributions..."
                    className="w-full bg-zinc-950/20 border border-white/5 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-zinc-700 text-zinc-200 resize-none mt-1 leading-relaxed font-sans"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Academic Background */}
          <div className="bg-zinc-950/45 border border-white/5 rounded-2xl p-5 mb-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                6. Educational History
              </h3>
              <button 
                onClick={addEducation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-300 hover:text-white text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Ed Block
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {educations.map((edu) => (
                <div key={edu.id} className="p-3.5 bg-zinc-950/20 border border-white/5 rounded-xl">
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      value={edu.school}
                      onChange={e => updateEducation(edu.id, "school", e.target.value)}
                      placeholder="School/Institution Name"
                      className="bg-transparent text-white font-bold text-xs border-b border-transparent hover:border-zinc-850 focus:border-zinc-700 focus:outline-none py-0.5"
                    />
                    <input 
                      type="text"
                      value={edu.period}
                      onChange={e => updateEducation(edu.id, "period", e.target.value)}
                      placeholder="Graduation Year"
                      className="bg-transparent text-zinc-400 text-right text-[10px] font-mono border-b border-transparent hover:border-zinc-850 focus:border-zinc-700 focus:outline-none py-0.5"
                    />
                    <input 
                      type="text"
                      value={edu.degree}
                      onChange={e => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Degree or Course Name"
                      className="bg-transparent text-purple-300 text-[11px] border-b border-transparent hover:border-zinc-850 focus:border-zinc-700 focus:outline-none py-0.5 col-span-2 font-medium"
                    />
                  </div>
                  <button 
                    onClick={() => deleteEducation(edu.id)}
                    className="text-left text-rose-458 hover:text-rose-400 text-[10px] font-mono uppercase font-bold transition-all mt-3 cursor-pointer"
                  >
                    Delete Education Block
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: High fidelity single-column direct-print preview layout sheet (7 cols) */}
        <div className={`xl:col-span-7 flex-col gap-4 ${mobileTab === "preview" ? "flex" : "hidden xl:flex"}`} id="resume-preview-sheet-column">
          <div className="flex items-center justify-between px-2 text-zinc-500 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-wider">ATS Interactive Live Stage Feed</span>
            <span className="text-[10px] font-mono text-zinc-600">[A4 / Letter Print Standard Aspect Height]</span>
          </div>

          {/* Clean White Sheet simulating physical print document page */}
          <div 
            id="pristine-ats-resume-print-card"
            className="w-full bg-white text-zinc-900 p-4 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.8)] border border-zinc-200 rounded-xl leading-normal select-all overflow-x-hidden min-h-[1050px]"
          >
            {/* Direct style modifications applied to ensure seamless physical/digital parsing */}
            <div className="max-w-4xl mx-auto flex flex-col gap-5 text-left font-sans">
              
              {/* Profile Main Header Block */}
              <div className="border-b border-zinc-900/30 pb-3 text-center">
                <h1 className="text-2xl font-black tracking-tight text-black mb-1 select-text">
                  {name.toUpperCase()}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] text-zinc-650 font-mono">
                  {email && <span className="select-text">{email}</span>}
                  {phone && <><span>•</span> <span className="select-text">{phone}</span></>}
                  {location && <><span>•</span> <span className="select-text">{location}</span></>}
                </div>
                {links && (
                  <div className="text-[10px] font-mono text-zinc-500 mt-1 select-text">
                    {links}
                  </div>
                )}
              </div>

              {/* Biography Summary block */}
              {summary && (
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold text-black uppercase tracking-wider border-b border-zinc-900/10 pb-0.5 font-sans mb-1 select-none">
                    EXECUTIVE BIOGRAPHY
                  </h3>
                  <p className="text-[11px] text-zinc-800 font-sans leading-relaxed select-text text-justify">
                    {summary}
                  </p>
                </div>
              )}

              {/* Competencies skills section */}
              {skills.length > 0 && (
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold text-black uppercase tracking-wider border-b border-zinc-900/10 pb-0.5 font-sans mb-1.5 select-none">
                    TECHNICAL COMPETENCIES
                  </h3>
                  <p className="text-[11px] text-zinc-800 font-mono tracking-tight leading-relaxed select-text font-medium">
                    {skills.join("  |  ")}
                  </p>
                </div>
              )}

              {/* Experiences list */}
              {experiences.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xs font-bold text-black uppercase tracking-wider border-b border-zinc-900/10 pb-0.5 font-sans mb-1.5 select-none">
                    PROFESSIONAL EXPERIENCE
                  </h3>
                  <div className="flex flex-col gap-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="flex flex-col gap-1 select-text">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[11px] font-bold text-black uppercase">
                            {exp.company}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-600 font-semibold">
                            {exp.period}
                          </span>
                        </div>
                        <div className="text-[10px] font-extrabold text-purple-700/95 -mt-0.5 italic lowercase tracking-tight">
                          {exp.role.toUpperCase()}
                        </div>
                        <ul className="list-disc pl-4 mt-1.5 flex flex-col gap-1 text-[11px] text-zinc-850 leading-relaxed font-sans">
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="pl-0.5 select-text">
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects List */}
              {projects.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xs font-bold text-black uppercase tracking-wider border-b border-zinc-900/10 pb-0.5 font-sans mb-1.5 select-none">
                    TECHNICAL PORTFOLIO PROJECTS
                  </h3>
                  <div className="flex flex-col gap-3.5">
                    {projects.map((proj) => (
                      <div key={proj.id} className="flex flex-col gap-0.5 select-text">
                        <div className="flex items-baseline justify-between select-text">
                          <span className="text-[11px] font-bold text-black uppercase">
                            {proj.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-600 font-semibold select-text">
                            {proj.technologies}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-800 leading-relaxed font-sans select-text mt-1 text-justify">
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Academic History block */}
              {educations.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xs font-bold text-black uppercase tracking-wider border-b border-zinc-900/10 pb-0.5 font-sans mb-1 select-none">
                    ACADEMIC BACKGROUND
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    {educations.map((edu) => (
                      <div key={edu.id} className="flex items-baseline justify-between select-text">
                        <div>
                          <span className="text-[11px] font-extrabold text-black uppercase">{edu.school}</span>
                          <span className="text-[10px] text-zinc-600 font-sans italic block">
                            {edu.degree}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600 font-semibold shrink-0">
                          {edu.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
