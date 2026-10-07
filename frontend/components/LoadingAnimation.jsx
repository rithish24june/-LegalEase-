'use client';
import { useState, useEffect } from 'react';
import { Sparkles, Scale, CheckCircle2, Loader2 } from 'lucide-react';

export default function LoadingAnimation({ onComplete }) {
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    "Analyzing your requirements...",
    "Structuring legal clauses...",
    "Applying governing law standards...",
    "Formatting document hierarchy...",
    "Finalizing your legal document..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          if (onComplete) setTimeout(onComplete, 600);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Central Icon */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 animate-spin opacity-40 blur-md" />
          <div className="relative w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-xl">
            <Scale className="w-10 h-10 text-blue-400 animate-pulse" />
            <Sparkles className="w-5 h-5 text-indigo-300 absolute -top-1 -right-1 animate-bounce" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">LegalEase AI is creating your document</h3>
        <p className="text-xs text-slate-400 mb-8">Please hold on while our legal AI engine drafts your customized agreement.</p>

        {/* Stages Checklist */}
        <div className="space-y-3.5 text-left mb-8 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          {stages.map((stage, idx) => {
            const isDone = idx < currentStage;
            const isCurrent = idx === currentStage;

            return (
              <div key={stage} className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span
                  className={`text-xs font-medium transition-colors ${
                    isDone
                      ? 'text-slate-400 line-through'
                      : isCurrent
                      ? 'text-blue-300 font-semibold'
                      : 'text-slate-600'
                  }`}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 h-full transition-all duration-700 ease-out"
            style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
