import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  BookOpen, 
  FileCode, 
  GitBranch, 
  AlertTriangle, 
  Sparkles, 
  Share2,
  CheckCircle,
  Lightbulb,
  Layers,
  ArrowRight
} from 'lucide-react';
import { FullNotes } from '../types';

interface FullNotesSectionProps {
  notes: FullNotes;
  onSaveNotes: () => void;
  isSaved: boolean;
}

export const FullNotesSection: React.FC<FullNotesSectionProps> = ({
  notes,
  onSaveNotes,
  isSaved,
}) => {
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopyAllNotes = () => {
    let fullText = `${notes.topic} - Full Study Notes\n`;
    fullText += `Subject: ${notes.subject || 'Computer Science'}\n\n`;
    fullText += `1. INTRODUCTION\n${notes.introduction}\n\n`;
    fullText += `2. ACADEMIC DEFINITION\n${notes.definition}\n\n`;
    fullText += `3. KEY CONCEPTS\n`;
    notes.keyConcepts.forEach((c) => {
      fullText += `• ${c.title}: ${c.explanation}\n`;
    });
    fullText += `\n4. DETAILED STEP-BY-STEP EXPLANATION\n`;
    notes.detailedExplanation.forEach((s) => {
      fullText += `Step ${s.stepNumber} - ${s.title}:\n${s.details}\n\n`;
    });
    fullText += `5. EXAMPLES\nAcademic: ${notes.examples.academic}\nReal-World: ${notes.examples.realWorld}\n\n`;
    fullText += `6. ADVANTAGES\n`;
    notes.advantages.forEach((a) => {
      fullText += `• ${a}\n`;
    });
    if (notes.disadvantages && notes.disadvantages.length > 0) {
      fullText += `\n7. DISADVANTAGES\n`;
      notes.disadvantages.forEach((d) => {
        fullText += `• ${d}\n`;
      });
    }
    fullText += `\n8. APPLICATIONS\n`;
    notes.applications.forEach((ap) => {
      fullText += `• ${ap}\n`;
    });
    fullText += `\n9. IMPORTANT REVISION POINTS\n`;
    notes.importantPoints.forEach((p) => {
      fullText += `• ${p}\n`;
    });
    fullText += `\n10. SUMMARY\n${notes.summary}\n`;

    if (notes.codeSnippet) {
      fullText += `\nCODE IMPLEMENTATION:\n${notes.codeSnippet.code}\n`;
    }

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    if (notes.codeSnippet?.code) {
      navigator.clipboard.writeText(notes.codeSnippet.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Comprehensive Syllabus Notes
          </span>
          <h3 className="text-lg font-bold text-slate-900">{notes.topic}</h3>
          <p className="text-xs text-slate-500">Structured for high retention and semester exam revision</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="copy-notes-btn"
            onClick={handleCopyAllNotes}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Notes</span>
              </>
            )}
          </button>

          <button
            id="save-notes-btn"
            onClick={onSaveNotes}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-2xs border transition-colors ${
              isSaved
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent'
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
                <span>Notes Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Save Notes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. Introduction & 2. Definition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Introduction */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-indigo-600">
            <BookOpen className="w-5 h-5" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">1. Introduction</h4>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {notes.introduction}
          </p>
        </div>

        {/* Definition */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-blue-50/30 rounded-2xl p-6 border border-indigo-100 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-indigo-700">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-950">2. Academic Definition</h4>
          </div>
          <blockquote className="text-sm text-slate-800 font-medium italic border-l-4 border-indigo-500 pl-4 py-1 leading-relaxed">
            "{notes.definition}"
          </blockquote>
          <p className="text-[11px] text-indigo-600 font-semibold mt-3">
            Memorize this precise definition for university answer scripts.
          </p>
        </div>

      </div>

      {/* 3. Key Concepts */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h4 className="text-base font-bold text-slate-900">3. Key Concepts</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.keyConcepts.map((concept, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-200 transition-colors">
              <span className="text-xs font-bold text-indigo-700 block mb-1">
                {idx + 1}. {concept.title}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {concept.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Detailed Step-by-Step Explanation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            4
          </div>
          <h4 className="text-base font-bold text-slate-900">Detailed Step-by-Step Explanation</h4>
        </div>

        <div className="space-y-4">
          {notes.detailedExplanation.map((step) => (
            <div key={step.stepNumber} className="relative pl-6 sm:pl-8 pb-4 border-l-2 border-indigo-200 last:border-transparent last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center" />
              <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  Step {step.stepNumber}: {step.title}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagram / Flowchart Suggestion */}
      {notes.diagramSuggestion && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-indigo-600" />
              <h4 className="text-base font-bold text-slate-900">Flowchart & Diagram Suggestion</h4>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Recommended for Exam Answers
            </span>
          </div>
          
          <p className="text-xs text-slate-600 mb-4">{notes.diagramSuggestion.description}</p>

          <div className="p-5 rounded-xl bg-slate-900 text-slate-100 overflow-x-auto">
            <div className="text-xs font-mono text-indigo-400 mb-3 font-semibold">
              Diagram: {notes.diagramSuggestion.title}
            </div>
            
            {/* Visual Node Chain */}
            <div className="flex items-center gap-2 min-w-max py-2">
              {notes.diagramSuggestion.nodes?.map((node, i, arr) => (
                <React.Fragment key={node.id}>
                  <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center min-w-[140px]">
                    <div className="text-xs font-bold text-white">{node.label}</div>
                    {node.subtext && <div className="text-[10px] text-slate-400 mt-0.5">{node.subtext}</div>}
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Code Snippet / Programming Topic Demonstration */}
      {notes.codeSnippet && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-600" />
              <div>
                <h4 className="text-base font-bold text-slate-900">Code Implementation & Syntax</h4>
                <span className="text-xs text-slate-500 font-mono capitalize">Language: {notes.codeSnippet.language}</span>
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
            >
              {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{codeCopied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Syntax Code Editor Frame */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">solution.{notes.codeSnippet.language === 'python' ? 'py' : notes.codeSnippet.language === 'sql' ? 'sql' : 'js'}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Academic Verified</span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
              <code>{notes.codeSnippet.code}</code>
            </pre>
          </div>

          {/* Explanation & Output */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-bold text-slate-800 block mb-1">Code Explanation</span>
              <p className="text-xs text-slate-600 leading-relaxed">{notes.codeSnippet.explanation}</p>
            </div>
            {notes.codeSnippet.output && (
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 block mb-1">Expected Output</span>
                <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap">{notes.codeSnippet.output}</pre>
              </div>
            )}
          </div>

          {/* Common Mistakes */}
          {notes.codeSnippet.commonMistakes && notes.codeSnippet.commonMistakes.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Common Student Mistakes to Avoid</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-amber-900">
                {notes.codeSnippet.commonMistakes.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 5. Examples (Academic & Real-World) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h4 className="text-base font-bold text-slate-900 mb-4">5. Practical Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1.5">
              Academic / Textbook Example
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {notes.examples.academic}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1.5">
              Real-World / Industry Example
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {notes.examples.realWorld}
            </p>
          </div>
        </div>
      </div>

      {/* 6. Advantages & Disadvantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Advantages */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-3">
            6. Key Advantages
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {notes.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disadvantages */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h4 className="text-sm font-bold uppercase tracking-wider text-rose-700 mb-3">
            7. Limitations & Disadvantages
          </h4>
          {notes.disadvantages && notes.disadvantages.length > 0 ? (
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {notes.disadvantages.map((dis, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{dis}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500">No major operational disadvantages in standard implementations.</p>
          )}
        </div>

      </div>

      {/* 8. Practical Applications & 9. Important Revision Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
            8. Real-World Applications
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
            {notes.applications.map((app, idx) => (
              <li key={idx}>{app}</li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200/80 shadow-xs">
          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-900 mb-3">
            9. Important Exam Points
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
            {notes.importantPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 font-medium">
                <span className="text-amber-600 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 10. Summary Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-2 text-indigo-400">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">10. Quick Revision Summary</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">
          {notes.summary}
        </p>
      </div>

    </div>
  );
};
