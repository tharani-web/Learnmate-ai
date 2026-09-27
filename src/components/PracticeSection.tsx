import React, { useState } from 'react';
import { 
  Dumbbell, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  HelpCircle, 
  RotateCcw, 
  Send, 
  Award, 
  FileCode,
  Check,
  Tag
} from 'lucide-react';
import { PracticeItem, PracticeEvaluationResult } from '../types';
import { evaluatePracticeSubmission } from '../services/api';

interface PracticeSectionProps {
  practiceItems: PracticeItem[];
  topic: string;
  onPracticeCompleted?: (score: number) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  practiceItems,
  topic,
  onPracticeCompleted,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<PracticeEvaluationResult | null>(null);

  const categories = ['All', 'Concept Questions', 'Problem Solving', 'Coding Practice', 'Previous Exam Questions'];

  const filteredItems = practiceItems.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const currentItem = filteredItems[activeItemIndex] || filteredItems[0] || practiceItems[0];

  const handleSelectPracticeItem = (idx: number) => {
    setActiveItemIndex(idx);
    setStudentAnswer(filteredItems[idx]?.starterCode || '');
    setShowHint(false);
    setShowModelAnswer(false);
    setEvaluation(null);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setActiveItemIndex(0);
    setShowHint(false);
    setShowModelAnswer(false);
    setEvaluation(null);
  };

  const handleSubmitForEvaluation = async () => {
    if (!studentAnswer.trim() || !currentItem) return;
    setIsEvaluating(true);
    try {
      const result = await evaluatePracticeSubmission(
        topic,
        currentItem.prompt,
        studentAnswer,
        currentItem.isCoding
      );
      setEvaluation(result);
      if (onPracticeCompleted) {
        onPracticeCompleted(result.scoreOutOf10);
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleTrySimilar = () => {
    if (activeItemIndex + 1 < filteredItems.length) {
      handleSelectPracticeItem(activeItemIndex + 1);
    } else {
      handleSelectPracticeItem(0);
    }
  };

  if (!currentItem) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center text-slate-500">
        No practice items found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header & Categories */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Deliberate Practice & AI Evaluation
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Practice Workshop: {topic}
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>AI Automated Assessment</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Problem Prompts List */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 h-fit">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Available Problems ({filteredItems.length})
          </h4>

          <div className="space-y-2">
            {filteredItems.map((item, idx) => {
              const isCurrent = idx === activeItemIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectPracticeItem(idx)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-500 font-semibold text-indigo-950'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.difficulty}</span>
                  </div>
                  <p className="truncate font-medium">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Problem Workspace & AI Evaluation */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Question Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                {currentItem.category} • {currentItem.difficulty}
              </span>

              <div className="flex items-center gap-2">
                {currentItem.hint && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-semibold bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                  </button>
                )}

                <button
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 font-semibold bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showModelAnswer ? 'Hide Solution' : 'View Model Answer'}</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">{currentItem.title}</h4>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed whitespace-pre-line">
                {currentItem.prompt}
              </p>
            </div>

            {/* Hint Box */}
            {showHint && currentItem.hint && (
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 animate-in fade-in duration-150">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-950 font-bold">Hint:</strong>
                  {currentItem.hint}
                </div>
              </div>
            )}

            {/* Model Answer Box */}
            {showModelAnswer && (
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                  <span className="font-bold uppercase tracking-wider">Reference Model Solution</span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <pre className="text-xs font-mono whitespace-pre-wrap text-emerald-400 leading-relaxed overflow-x-auto">
                  {currentItem.modelSolution}
                </pre>
              </div>
            )}

            {/* Input Box / Code Area */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 block">
                {currentItem.isCoding ? 'Your Code Implementation (Python / SQL / JS):' : 'Your Detailed Academic Answer:'}
              </label>

              {currentItem.isCoding ? (
                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                  <div className="bg-slate-900 px-3 py-1.5 text-[11px] font-mono text-slate-400 border-b border-slate-800">
                    editor.py
                  </div>
                  <textarea
                    id="practice-code-input"
                    rows={8}
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="# Write your answer or code here..."
                    className="w-full p-4 font-mono text-xs text-slate-100 bg-transparent focus:outline-hidden resize-y leading-relaxed"
                  />
                </div>
              ) : (
                <textarea
                  id="practice-text-input"
                  rows={6}
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Type your explanation, steps, or calculation here..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 resize-y"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleTrySimilar}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Next / Try Similar Question</span>
              </button>

              <button
                id="submit-practice-evaluation-btn"
                onClick={handleSubmitForEvaluation}
                disabled={isEvaluating || !studentAnswer.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                {isEvaluating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating Submission...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit for AI Evaluation</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* AI Evaluation Result Card */}
          {evaluation && (
            <div className="bg-white rounded-2xl p-6 border-2 border-indigo-200 shadow-md space-y-5 animate-in slide-in-from-top-3 duration-200">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">AI Pedagogical Assessment</h4>
                    <span className="text-xs text-slate-500">Graded against academic standards</span>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-baseline gap-1 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                  <span className="text-xl font-extrabold text-indigo-700">
                    {evaluation.scoreOutOf10}
                  </span>
                  <span className="text-xs text-indigo-500 font-bold">/ 10</span>
                </div>
              </div>

              {/* What was correct */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>What Was Correct:</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  {evaluation.whatWasCorrect}
                </p>
              </div>

              {/* What needs improvement */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>What Needs Improvement for Top Marks:</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  {evaluation.whatNeedsImprovement}
                </p>
              </div>

              {/* Model Answer preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  Evaluator Model Answer:
                </span>
                <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                  {evaluation.modelAnswer}
                </p>
              </div>

              {evaluation.encouragement && (
                <div className="text-center text-xs text-indigo-600 font-medium italic">
                  "{evaluation.encouragement}"
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
