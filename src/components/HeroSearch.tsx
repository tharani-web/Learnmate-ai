import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Dumbbell, 
  TrendingUp, 
  Lightbulb, 
  Clock,
  Compass,
  Map
} from 'lucide-react';
import { StudentProfile } from '../types';

interface HeroSearchProps {
  onSearchTopic: (topic: string) => void;
  isLoading: boolean;
  profile: StudentProfile;
  onOpenTopic: (topic: string, section?: string) => void;
  onNavigateToCareer?: () => void;
  onNavigateToRoadmap?: () => void;
  onNavigateToLogin?: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearchTopic,
  isLoading,
  profile,
  onOpenTopic,
  onNavigateToCareer,
  onNavigateToRoadmap,
  onNavigateToLogin,
}) => {
  const [query, setQuery] = useState('');

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const examplePrompts = [
    'Explain DBMS Normalization',
    'Teach me Python Loops with code',
    'Give me a 14-mark answer for Operating Systems',
    'Explain Machine Learning with real-world examples',
  ];

  const popularTopics = [
    { title: 'DBMS Normalization', tag: 'Database', category: 'cs', difficulty: 'University Core', learners: '2.4k' },
    { title: 'Machine Learning', tag: 'AI & Data Science', category: 'ai', difficulty: 'Intermediate', learners: '3.8k' },
    { title: 'Operating Systems Scheduling', tag: 'Core CS', category: 'cs', difficulty: 'Semester Exam', learners: '1.9k' },
    { title: 'Python Loops & Lists', tag: 'Programming', category: 'code', difficulty: 'Beginner Friendly', learners: '4.1k' },
    { title: 'Binary Search Trees & Graph BFS', tag: 'DSA & Placements', category: 'dsa', difficulty: 'Placement Ready', learners: '3.2k' },
    { title: 'Computer Networks OSI Model', tag: 'Networking', category: 'cs', difficulty: 'Exam Prep', learners: '2.1k' },
  ];

  const filteredTopics = activeCategory === 'all' 
    ? popularTopics 
    : popularTopics.filter(t => t.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchTopic(query.trim());
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    setQuery(prompt);
    onSearchTopic(prompt);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-slate-50 to-white pt-10 pb-16">
      
      {/* Decorative background grid pattern & ambient lighting mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f020_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f020_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[840px] h-[340px] bg-gradient-to-tr from-indigo-500/15 via-blue-500/10 to-purple-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Streak & Goal Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 animate-in fade-in duration-300">
          {profile && profile.id !== 'guest-learner' ? (
            <>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-amber-200 text-amber-800 text-xs font-semibold shadow-xs">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <span>{profile.studyStreakDays} Day Study Streak</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-indigo-200 text-indigo-800 text-xs font-semibold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Daily Goal: {profile.dailyGoalProgressMinutes} / {profile.dailyGoalMinutes} mins</span>
                <div className="w-16 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full" 
                    style={{ width: `${Math.min(100, Math.round((profile.dailyGoalProgressMinutes / profile.dailyGoalMinutes) * 100))}%` }} 
                  />
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={onNavigateToLogin}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/90 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Signed in as Guest Learner. <strong>Log In / Register</strong> to save streaks & roadmaps →</span>
            </button>
          )}
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/70 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Your Comprehensive Academic Companion</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Learn Smarter. Prepare Better. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 bg-clip-text text-transparent">
              Excel in College & Beyond.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Master university syllabi with detailed notes, 2-14 mark exam questions, evaluated coding practice, career discovery & 4-year engineering roadmaps.
          </p>
        </div>

        {/* Large Elevated Search Box */}
        <div className="max-w-2xl mx-auto mb-6">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="flex items-center bg-white rounded-2xl p-2 sm:p-2.5 shadow-xl shadow-indigo-100/60 border-2 border-indigo-100/90 group-hover:border-indigo-300 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-100/80 transition-all">
              <div className="pl-3 pr-2 text-indigo-600">
                <Search className="w-6 h-6" />
              </div>
              <input
                id="hero-topic-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you want to learn today? (e.g. DBMS Normalization)"
                className="w-full text-slate-800 placeholder-slate-400 bg-transparent text-sm sm:text-base font-medium focus:outline-hidden"
              />
              <button
                id="hero-ask-learnmate-btn"
                type="submit"
                disabled={isLoading || !query.trim()}
                className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-slate-300 disabled:to-slate-300 text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Preparing...</span>
                  </span>
                ) : (
                  <>
                    <span>Ask LearnMate AI</span>
                    <ArrowRight className="w-4 h-4 hidden sm:inline" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Example Prompts */}
          <div className="mt-4 flex items-center flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Try asking:
            </span>
            {examplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                id={`hero-prompt-chip-${idx}`}
                onClick={() => handleSelectPrompt(prompt)}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-600 transition-colors cursor-pointer text-[12px] font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Spotlight Banners: Career Discovery & College Roadmap */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={onNavigateToCareer}
            className="card-hover-lift p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white shadow-sm border border-indigo-800/40 cursor-pointer group flex items-start justify-between relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-bold mb-2 uppercase tracking-wide">
                <Compass className="w-3 h-3 text-indigo-300" />
                <span>12th Grade & Beyond</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors flex items-center gap-2">
                🧭 AI Career Discovery
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-sm">
                Completed 12th grade? Take our 6-step interactive assessment to discover aligned college departments and compare career options side-by-side.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 group-hover:text-white transition-colors">
                <span>Start Discovery Assessment</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Compass className="w-6 h-6" />
            </div>
          </div>

          <div 
            onClick={onNavigateToRoadmap}
            className="card-hover-lift p-6 rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white shadow-sm border border-blue-800/40 cursor-pointer group flex items-start justify-between relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold mb-2 uppercase tracking-wide">
                <Map className="w-3 h-3 text-blue-300" />
                <span>4-Year University Plan</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors flex items-center gap-2">
                🗺️ College Learning Roadmap
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-sm">
                Track Year 1 to Year 4 milestones, placement interview readiness, mini-projects, and live skill gap analysis tailored to your target goal.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 group-hover:text-white transition-colors">
                <span>Explore Personalized Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Map className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Popular Topics & Continue Learning Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Popular Topics Column */}
          <div className="md:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Popular Topics</h3>
              </div>
              
              {/* Category Pills Filter */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'cs', label: 'Core CS' },
                  { id: 'dsa', label: 'DSA & Placements' },
                  { id: 'ai', label: 'AI & Data' },
                  { id: 'code', label: 'Code' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredTopics.map((topic, i) => (
                <div
                  key={i}
                  id={`popular-topic-card-${i}`}
                  onClick={() => handleSelectPrompt(topic.title)}
                  className="card-hover-lift group p-3.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all cursor-pointer bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {topic.tag}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 mt-1.5 group-hover:text-indigo-700 transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{topic.difficulty} • {topic.learners} students</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Learning & Continue Column */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Continue Learning</h3>
              </div>

              {profile.recentTopics.length > 0 ? (
                <div className="space-y-2.5">
                  {profile.recentTopics.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectPrompt(item)}
                      className="p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800 truncate">{item}</span>
                      </div>
                      <span className="text-[10px] text-indigo-600 font-bold">Resume</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-slate-400">
                  <p>No recent topics yet.</p>
                  <p className="mt-1">Search any subject to begin!</p>
                </div>
              )}
            </div>

            {/* Quick Practice shortcut banner */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Quick Practice</span>
                  <span className="text-[11px] text-slate-500">Test with 5 flash questions</span>
                </div>
                <button
                  onClick={() => onOpenTopic('DBMS Normalization', 'quiz')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
