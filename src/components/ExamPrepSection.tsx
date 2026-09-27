import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  Wand2, 
  BookOpen, 
  Award, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Tag,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { ExamPrep, ExamQuestion } from '../types';
import { modifyExamAnswer } from '../services/api';

interface ExamPrepSectionProps {
  examPrep: ExamPrep;
  onSaveQuestion: (question: ExamQuestion) => void;
  savedQuestionIds: string[];
}

export const ExamPrepSection: React.FC<ExamPrepSectionProps> = ({
  examPrep,
  onSaveQuestion,
  savedQuestionIds,
}) => {
  const [selectedMarkTab, setSelectedMarkTab] = useState<2 | 5 | 10 | 14>(14);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modifyingId, setModifyingId] = useState<string | null>(null);
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAiModify = async (q: ExamQuestion, action: 'simplify' | 'more_detail') => {
    setModifyingId(`${q.id}-${action}`);
    try {
      const currentAns = customAnswers[q.id] || q.answer;
      const modified = await modifyExamAnswer(examPrep.topic, q.question, currentAns, action);
      setCustomAnswers((prev) => ({ ...prev, [q.id]: modified }));
    } finally {
      setModifyingId(null);
    }
  };

  // Group questions by marks
  const questionsToDisplay =
    selectedMarkTab === 2
      ? examPrep.twoMarkQuestions
      : selectedMarkTab === 5
      ? examPrep.fiveMarkQuestions
      : selectedMarkTab === 10
      ? examPrep.tenMarkQuestions
      : examPrep.fourteenMarkQuestions;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Strategy & Keywords Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Exam Hall Ready Solutions
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Exam Preparation: {examPrep.topic}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <Award className="w-3.5 h-3.5" />
            <span>Curated for University Scoring</span>
          </div>
        </div>

        {/* How to Write in Exam Advice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>How to Write in Exam & Scoring Strategy</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {examPrep.strategyAdvice}
          </p>
        </div>

        {/* Important Keywords & Exam Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-600" />
              Important Keywords (Include in Answer Script):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {examPrep.commonKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Exam Tips from University Evaluators:
            </span>
            <ul className="space-y-1 text-xs text-slate-600">
              {examPrep.examTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Marks Selection Segmented Tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 bg-slate-100 rounded-xl border border-slate-200 gap-1 sm:gap-2">
          {([2, 5, 10, 14] as const).map((m) => (
            <button
              key={m}
              id={`exam-tab-${m}-marks`}
              onClick={() => setSelectedMarkTab(m)}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedMarkTab === m
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {m}-Mark Questions
            </button>
          ))}
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {questionsToDisplay.map((q) => {
          const isSaved = savedQuestionIds.includes(q.id);
          const currentAnswer = customAnswers[q.id] || q.answer;

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
            >
              {/* Question Header */}
              <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3 max-w-2xl">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-indigo-600 text-white font-bold text-xs tracking-wider shrink-0 mt-0.5">
                    {q.marks} MARKS
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                    {q.keywords && (
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap text-xs text-slate-500">
                        <span className="font-semibold text-slate-400">Must include:</span>
                        {q.keywords.map((k, i) => (
                          <span key={i} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px] font-medium text-indigo-700">
                            {k}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Question Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(q.id, currentAnswer)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-xs font-semibold text-slate-600 transition-colors"
                    title="Copy Answer"
                  >
                    {copiedId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === q.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => onSaveQuestion(q)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                      isSaved
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'border-slate-200 hover:bg-white text-slate-600'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-600 fill-amber-600" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>

              {/* Question Body */}
              <div className="p-5 sm:p-6 space-y-5">
                
                {/* 14-Mark Specific 9-Part Structure */}
                {q.marks === 14 && q.structured14Mark ? (
                  <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                    
                    {/* 1. Introduction */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                        1. Introduction
                      </span>
                      <p>{q.structured14Mark.introduction}</p>
                    </div>

                    {/* 2. Definition */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                        2. Definition
                      </span>
                      <blockquote className="italic font-medium text-slate-900 border-l-2 border-indigo-500 pl-3">
                        {q.structured14Mark.definition}
                      </blockquote>
                    </div>

                    {/* 3. Main Concept */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                        3. Main Concept
                      </span>
                      <p>{q.structured14Mark.mainConcept}</p>
                    </div>

                    {/* 4. Detailed Explanation */}
                    <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100">
                      <span className="font-bold text-indigo-800 uppercase tracking-wider block mb-2">
                        4. Detailed Explanation (Syllabus Core)
                      </span>
                      <p className="whitespace-pre-line leading-relaxed">{q.structured14Mark.detailedExplanation}</p>
                    </div>

                    {/* 5. Diagram / Flowchart */}
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800">
                      <span className="font-bold text-indigo-400 uppercase tracking-wider block mb-2 font-mono">
                        5. Diagram / Flowchart Layout
                      </span>
                      <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {q.structured14Mark.diagramFlowchart}
                      </pre>
                    </div>

                    {/* 6. Example */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                        6. Concrete Example
                      </span>
                      <p className="whitespace-pre-line">{q.structured14Mark.example}</p>
                    </div>

                    {/* 7. Advantages */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                        7. Advantages
                      </span>
                      <ul className="list-disc list-inside space-y-1">
                        {q.structured14Mark.advantages.map((adv, i) => (
                          <li key={i}>{adv}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 8. Applications */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                        8. Practical Applications
                      </span>
                      <ul className="list-disc list-inside space-y-1">
                        {q.structured14Mark.applications.map((app, i) => (
                          <li key={i}>{app}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 9. Conclusion */}
                    <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-medium">
                      <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
                        9. Conclusion
                      </span>
                      <p>{q.structured14Mark.conclusion}</p>
                    </div>

                  </div>
                ) : (
                  /* Standard 2, 5, 10 Mark Answer View */
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    {currentAnswer}
                  </div>
                )}

                {/* Exam Tip Callout if present */}
                {q.examTip && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-800">Exam Tip: </span>
                      <span>{q.examTip}</span>
                    </div>
                  </div>
                )}

                {/* AI Modification Assistant Bar */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>AI Answer Refinement:</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAiModify(q, 'simplify')}
                      disabled={modifyingId !== null}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-xs font-medium transition-colors"
                    >
                      {modifyingId === `${q.id}-simplify` ? 'Simplifying...' : '⚡ Ask AI to simplify'}
                    </button>

                    <button
                      onClick={() => handleAiModify(q, 'more_detail')}
                      disabled={modifyingId !== null}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 text-indigo-700 text-xs font-medium transition-colors"
                    >
                      {modifyingId === `${q.id}-more_detail` ? 'Expanding...' : '🔍 Ask AI for more detail'}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
