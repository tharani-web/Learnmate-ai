import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Brain, 
  Dumbbell, 
  MessageSquare, 
  Map, 
  Bookmark, 
  BookmarkCheck, 
  ArrowLeft,
  Share2,
  Sparkles 
} from 'lucide-react';
import { Language } from '../types';

interface TopicHeaderProps {
  topic: string;
  activeSection: string; // 'notes' | 'exam' | 'videos' | 'quiz' | 'practice' | 'chat'
  onSelectSection: (section: string) => void;
  onOpenRoadmap: () => void;
  onBookmarkTopic: () => void;
  isBookmarked: boolean;
  onBackToHome: () => void;
  language: Language;
}

export const TopicHeader: React.FC<TopicHeaderProps> = ({
  topic,
  activeSection,
  onSelectSection,
  onOpenRoadmap,
  onBookmarkTopic,
  isBookmarked,
  onBackToHome,
  language,
}) => {
  const [copied, setCopied] = React.useState(false);

  const sections = [
    { id: 'notes', label: 'Full Notes', icon: BookOpen, badge: 'Notes' },
    { id: 'exam', label: 'Exam Preparation', icon: FileText, badge: '2-14 Marks' },
    { id: 'videos', label: 'Learning Videos', icon: Video, badge: 'Lectures' },
    { id: 'quiz', label: 'Review & Quiz', icon: Brain, badge: 'MCQ & Test' },
    { id: 'practice', label: 'Practice', icon: Dumbbell, badge: 'Problems' },
    { id: 'chat', label: 'AI Chat Tutor', icon: MessageSquare, badge: 'Assistant' },
  ];

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="glass-nav border-b border-slate-200/90 shadow-xs sticky top-16 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-1.5">
        
        {/* Top Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors border border-slate-200/80 bg-white"
              title="Return to Home Search"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  Academic Learning Hub
                </span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {language === 'ta' ? 'தமிழ் விளக்கம்' : 'English Mode'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mt-0.5 font-display">
                {topic}
              </h2>
            </div>
          </div>

          {/* Quick Topic Actions */}
          <div className="flex items-center gap-2">
            <button
              id="topic-header-roadmap-btn"
              onClick={onOpenRoadmap}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200/80 transition-colors shadow-2xs"
            >
              <Map className="w-3.5 h-3.5 text-indigo-600" />
              <span>Learning Path</span>
            </button>

            <button
              id="topic-header-bookmark-btn"
              onClick={onBookmarkTopic}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all shadow-2xs ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                  <span>Save Topic</span>
                </>
              )}
            </button>

            <div className="relative">
              <button
                onClick={handleShare}
                title="Share topic link"
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              {copied && (
                <div className="absolute right-0 top-full mt-1.5 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-semibold rounded-md shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 z-50">
                  Link copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6 Primary Learning Pillar Tabs (Horizontally scrollable on mobile) */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1 -mb-px border-t border-slate-200/60">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                id={`topic-nav-${sec.id}`}
                onClick={() => onSelectSection(sec.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/70 rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50/60 rounded-t-lg'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{sec.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium hidden sm:inline-block ${
                  isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {sec.badge}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
