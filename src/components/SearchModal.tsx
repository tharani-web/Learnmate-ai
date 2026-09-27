import React, { useState } from 'react';
import { X, Search, BookOpen, FileText, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topic: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const academicTopics = [
    { title: 'DBMS Normalization', category: 'Database Systems', hint: '1NF, 2NF, 3NF, BCNF' },
    { title: 'Machine Learning', category: 'Artificial Intelligence', hint: 'Supervised, Unsupervised, Neural Networks' },
    { title: 'Operating Systems Scheduling', category: 'Computer Science', hint: 'Round Robin, SJF, Priority' },
    { title: 'Python Loops & Lists', category: 'Programming', hint: 'For, While, List Comprehensions' },
    { title: 'Data Structures: Binary Trees', category: 'Algorithms', hint: 'BST, Traversals, AVL Trees' },
    { title: 'Computer Networks: TCP/IP Model', category: 'Networking', hint: 'OSI 7 layers, Handshake, Protocols' },
    { title: 'Object-Oriented Programming (OOP)', category: 'Software Engineering', hint: 'Encapsulation, Polymorphism, Inheritance' },
  ];

  const filtered = academicTopics.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.hint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectTopic(searchTerm.trim());
      onClose();
    }
  };

  const handlePick = (topic: string) => {
    onSelectTopic(topic);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            autoFocus
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search academic syllabus, topic, or question..."
            className="w-full text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-hidden"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100"
          >
            Esc
          </button>
        </form>

        {/* Results / Suggestions */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
            Academic Curricula Suggestions
          </span>

          {filtered.length > 0 ? (
            filtered.map((topic, i) => (
              <div
                key={i}
                onClick={() => handlePick(topic.title)}
                className="p-3 rounded-xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                      {topic.title}
                    </span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-500 font-medium">
                      {topic.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{topic.hint}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">
              Press <strong className="text-slate-800">Enter</strong> to generate learning materials for &ldquo;{searchTerm}&rdquo; using Gemini AI.
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Powered by LearnMate AI Curriculum Generator</span>
          <span>Tip: Press Enter to submit</span>
        </div>

      </div>
    </div>
  );
};
