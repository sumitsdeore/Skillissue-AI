import React, { useState, useRef, useEffect } from "react";
import { Upload, FileText, AlertCircle, Sparkles, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResumeUploadProps {
  onUpload: (base64Data: string, fileName: string) => void;
  onViewSample: () => void;
  isAnalyzing: boolean;
}

export default function ResumeUpload({ onUpload, onViewSample, isAnalyzing }: ResumeUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (selectedFile: File) => {
    setError(null);
    
    // Check if PDF
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith(".pdf")) {
      setError("Only standard PDF files are supported. Please convert your resume to PDF format.");
      return;
    }

    // Check size (Max 15MB — matches server payload limit)
    const maxSize = 15 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError("File size exceeds 15MB. Please use a smaller PDF.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadSubmit = () => {
    if (!file) {
      setError("Please select or drop a PDF file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const base64Data = result.split(",")[1];
        onUpload(base64Data, file.name);
      } catch (err) {
        setError("Error parsing PDF structure. Please try a different PDF or restart the browser.");
      }
    };
    reader.onerror = () => {
      setError("Failed to read the file. Please check file permissions.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-xl mx-auto" id="resume-uploader-container">
      <div className="bg-zinc-950/45 border border-white/5 rounded-3xl p-8 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.85)] backdrop-blur-3xl relative overflow-hidden">
        {/* Subtle decorative high-end colorful glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),rgba(34,211,238,0.05),transparent_70%)] pointer-events-none animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.05),transparent_60%)] pointer-events-none" />

        <h2 className="font-display font-black text-white text-2xl sm:text-3xl mb-3 tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-[#070710] rounded-[10px] flex items-center justify-center">
              <Upload className="w-5 h-5 text-purple-300" />
            </div>
          </div>
          Upload Your Resume
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mb-8 leading-relaxed font-normal">
          Our senior matching engine analyzes your system architecture, tracks tech stack deficits, evaluates keywords, and implements simulated interviews.
        </p>

        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`relative border rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[240px] group ${
            isDragActive
              ? "border-cyan-400 bg-cyan-500/5 shadow-[0_0_30px_rgba(34,211,238,0.08)]"
              : "border-white/5 hover:border-white/10 bg-zinc-950/25 hover:bg-zinc-900/30"
          }`}
          id="dropzone"
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            disabled={isAnalyzing}
          />

          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-inner group-hover:border-purple-500/20">
                  <FileText className="w-6 h-6 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <p className="text-zinc-200 font-bold text-sm sm:text-base mb-1.5 tracking-tight group-hover:text-white">
                  Drag & drop your resume PDF here, or <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent group-hover:underline">browse</span>
                </p>
                <p className="text-[#86868b] text-[11px] font-medium tracking-wide font-mono">
                  Standard PDF files only • Max 4MB size
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="filled-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center p-5 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl max-w-sm w-full shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <Check className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-zinc-200 font-mono text-xs truncate max-w-xs block font-semibold">
                  {file.name}
                </span>
                <span className="text-zinc-500 text-[11px] mt-1 font-mono">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • Verification ready
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="mt-4 text-rose-400/80 hover:text-rose-300 text-xs transition-colors font-medium hover:underline"
                >
                  Remove file
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error Indicator */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-xl border border-red-500/15 bg-red-500/5 text-red-400 text-xs flex items-start gap-2.5 overflow-hidden font-medium"
              id="upload-error"
            >
              <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions Button */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleUploadSubmit}
            disabled={!file || isAnalyzing}
            className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold tracking-tight text-sm transition-all focus:outline-none cursor-pointer ${
              file && !isAnalyzing
                ? "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white shadow-[0_15px_30px_rgba(168,85,247,0.25)] hover:brightness-110 active:scale-98"
                : "bg-zinc-900 border border-white/5 text-zinc-600 cursor-not-allowed"
            }`}
            id="run-analysis-btn"
          >
            <Sparkles className="w-4 h-4 shrink-0 text-white animate-pulse" />
            Analyze My Resume
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewSample}
            className="px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 bg-zinc-950 text-zinc-300 hover:text-white text-sm font-bold transition-all active:scale-98 cursor-pointer shadow-md"
            id="view-demo-btn"
          >
            Sample Record
          </button>
        </div>
      </div>
    </div>
  );
}
