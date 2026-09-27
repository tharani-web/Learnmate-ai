import React from 'react';
import { 
  BarChart3, 
  Flame, 
  CheckCircle2, 
  Award, 
  Target, 
  AlertTriangle, 
  Clock, 
  BookOpen, 
  Dumbbell, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Map,
  Compass
} from 'lucide-react';
import { StudentProfile } from '../types';

interface ProgressDashboardProps {
  profile: StudentProfile;
  onOpenTopic: (topic: string, section?: string) => void;
  onQuickPractice: () => void;
  onNavigateToCareer?: () => void;
  onNavigateToRoadmap?: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  profile,
  onOpenTopic,
  onQuickPractice,
  onNavigateToCareer,
  onNavigateToRoadmap,
}) => {
  const goalPercentage = Math.min(
    100,
    Math.round((profile.dailyGoalProgressMinutes / profile.dailyGoalMinutes) * 100)
  );

  const activeRoadmap = profile.activeRoadmap;
  const completedRoadmapCount = profile.completedRoadmapItemIds?.length || 0;
  const totalRoadmapMilestones = activeRoadmap 
    ? activeRoadmap.years.reduce((acc, y) => acc + y.items.length, 0)
    : 0;
  const roadmapPercent = totalRoadmapMilestones > 0 
    ? Math.round((completedRoadmapCount / totalRoadmapMilestones) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-indigo-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Student Progress Engine
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-indigo-200 font-medium">Level 4 Scholar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              Welcome back, {profile.name}!
            </h2>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              "Consistency in academic learning is the gateway to exam mastery. You are on track for this semester!"
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onQuickPractice}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Resume Daily Practice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Streak */}
        <div className="card-hover-lift bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500 text-amber-500 animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block leading-tight font-display">
              {profile.studyStreakDays} <span className="text-xs font-normal text-slate-500">Days</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">Study Streak</span>
          </div>
        </div>

        {/* Quizzes Completed & Accuracy */}
        <div className="card-hover-lift bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block leading-tight font-display">
              {profile.quizzesCompleted}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Quizzes ({profile.quizAccuracyPercentage}% Avg)
            </span>
          </div>
        </div>

        {/* Topics Learned */}
        <div className="card-hover-lift bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block leading-tight font-display">
              {profile.topicsLearnedCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">Topics Mastered</span>
          </div>
        </div>

        {/* Practice Exercises */}
        <div className="card-hover-lift bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block leading-tight font-display">
              {profile.practiceQuestionsAttempted}
            </span>
            <span className="text-xs text-slate-500 font-medium">Practice Solved</span>
          </div>
        </div>

      </div>

      {/* Two Column Layout: Daily Goal & Weak Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Study Goal */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Daily Study Goal
              </span>
              <span className="text-xs font-bold text-indigo-600">{goalPercentage}% Completed</span>
            </div>

            <div className="text-2xl font-extrabold text-slate-900">
              {profile.dailyGoalProgressMinutes} <span className="text-sm font-normal text-slate-400">/ {profile.dailyGoalMinutes} mins</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-3 overflow-hidden">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${goalPercentage}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-500">
            {goalPercentage >= 100
              ? 'Awesome job! You reached today’s learning benchmark.'
              : `${profile.dailyGoalMinutes - profile.dailyGoalProgressMinutes} minutes remaining to keep your study streak active!`}
          </p>
        </div>

        {/* Weak Areas & Targeted Suggestions */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Identified Weak Areas & Recommendations
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Based on recent quiz results</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {profile.weakAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                    Needs Attention
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{area}</h4>
                </div>
                <button
                  onClick={() => onOpenTopic(area, 'notes')}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900"
                >
                  <span>Review Notes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* College Roadmap & Career Goal Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Roadmap Progress */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  College Roadmap Status
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {roadmapPercent}% Progress
              </span>
            </div>

            <div className="text-base font-bold text-slate-900">
              {activeRoadmap ? activeRoadmap.careerGoal : '4-Year Engineering & Placement Roadmap'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {activeRoadmap 
                ? `${activeRoadmap.department} • ${activeRoadmap.currentYear}`
                : 'Plan your curriculum from Year 1 foundations to Year 4 placements.'}
            </p>

            <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, roadmapPercent)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 flex justify-between">
              <span>{completedRoadmapCount} milestones achieved</span>
              <span>{totalRoadmapMilestones > 0 ? totalRoadmapMilestones : 16} total milestones</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={onNavigateToRoadmap}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>{activeRoadmap ? 'View & Update Roadmap' : 'Generate College Roadmap'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Career Discovery Guidance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  AI Career Discovery
                </h3>
              </div>
              <span className="text-xs text-slate-500">12th Grade & Beyond</span>
            </div>

            <div className="text-base font-bold text-slate-900">
              {profile.careerReport ? 'Personalized Career Report Ready' : 'Explore Suitable College Degrees'}
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {profile.careerReport 
                ? `Discovered ${profile.careerReport.fields.length} suitable fields based on your interests and strengths.`
                : 'Take our 6-step interactive assessment to discover which college department aligns with your goals.'}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={onNavigateToCareer}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>{profile.careerReport ? 'Review Career Options' : 'Start Career Assessment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Recently Learned Topics Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Recently Learned Topics
            </h3>
          </div>
          <span className="text-xs text-slate-400">Click to jump back in</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profile.recentTopics.map((topic, i) => (
            <div
              key={i}
              onClick={() => onOpenTopic(topic, 'notes')}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                  {topic}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Syllabus Reviewed</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
