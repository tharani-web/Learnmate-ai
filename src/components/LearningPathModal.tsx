import React from 'react';
import { 
  X, 
  Map, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Dumbbell, 
  TrendingUp, 
  Layers 
} from 'lucide-react';
import { LearningPath } from '../types';

interface LearningPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  learningPath: LearningPath;
  onSelectSubtopic?: (subtopic: string) => void;
}

export const LearningPathModal: React.FC<LearningPathModalProps> = ({
  isOpen,
  onClose,
  learningPath,
  onSelectSubtopic,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Personalized Learning Roadmap</h3>
              <p className="text-xs text-indigo-200">Topic: {learningPath.topic}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Prerequisites & What to learn next pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Prerequisites */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-2">
                1. What to learn first (Prerequisites)
              </span>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {learningPath.prerequisites.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-2">
                2. What to learn next (Post-Requisites)
              </span>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {learningPath.whatToLearnNext.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Timeline Steps */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Recommended Milestone Pathway</span>
            </h4>

            <div className="relative pl-6 space-y-6 border-l-2 border-indigo-200 ml-2">
              {learningPath.steps.map((step) => {
                const isCurrent = step.stage === 'Current Focus';
                return (
                  <div key={step.stepNumber} className="relative group">
                    {/* Bullet marker */}
                    <div
                      className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 ${
                        isCurrent
                          ? 'bg-indigo-600 border-indigo-600 ring-4 ring-indigo-100'
                          : 'bg-white border-slate-400'
                      }`}
                    />

                    <div
                      className={`p-4 rounded-2xl border text-xs sm:text-sm transition-all ${
                        isCurrent
                          ? 'bg-indigo-50/70 border-indigo-200 shadow-xs'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isCurrent
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Step {step.stepNumber} • {step.stage}
                        </span>
                      </div>

                      <h5 className="font-bold text-slate-900 mt-1">{step.title}</h5>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="mt-2 text-[11px] font-medium text-indigo-700 bg-white/80 p-2 rounded-lg border border-indigo-100/50">
                        <strong>Action: </strong> {step.recommendedAction}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practice Recommendations */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 mb-2">
              <Dumbbell className="w-4 h-4 text-indigo-600" />
              <span>Practice Recommendations:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-indigo-950">
              {learningPath.practiceRecommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Got it, Continue Studying
          </button>
        </div>

      </div>

    </div>
  );
};
