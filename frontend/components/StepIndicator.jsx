'use client';
import { Check } from 'lucide-react';

export default function StepIndicator({ steps, currentStep, onStepClick }) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-2 relative">
        
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-800 z-0" />
        <div
          className="absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-500 z-0 transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              onClick={() => onStepClick && isCompleted && onStepClick(step.id)}
              className={`relative z-10 flex flex-col items-center gap-2 group ${
                isCompleted ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20 group-hover:scale-110'
                    : isCurrent
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white ring-4 ring-blue-500/20 shadow-blue-500/30 scale-110'
                    : 'bg-slate-800 border border-slate-700 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : `0${step.id}`}
              </div>
              <span
                className={`text-xs font-semibold tracking-tight transition-colors hidden sm:block ${
                  isCurrent
                    ? 'text-blue-400'
                    : isCompleted
                    ? 'text-slate-300'
                    : 'text-slate-500'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
