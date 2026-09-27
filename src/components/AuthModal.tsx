import React, { useState } from 'react';
import { X, User, GraduationCap, Lock, Mail, CheckCircle } from 'lucide-react';
import { StudentProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile | null;
  onSaveProfile: (profile: StudentProfile) => void;
  onLogout: () => void;
  onNavigateToLoginPage?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onLogout,
  onNavigateToLoginPage,
}) => {
  const [isLoginMode, setIsLoginMode] = useState(!profile);
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [gradeOrCourse, setGradeOrCourse] = useState(profile?.gradeOrCourse || 'B.Tech Computer Science');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(profile?.dailyGoalMinutes || 45);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedProfile: StudentProfile = {
      id: profile?.id || `student-${Date.now()}`,
      name: name.trim(),
      email: email.trim() || 'student@university.edu',
      gradeOrCourse,
      dailyGoalMinutes: Number(dailyGoalMinutes) || 45,
      dailyGoalProgressMinutes: profile?.dailyGoalProgressMinutes || 30,
      studyStreakDays: profile?.studyStreakDays || 5,
      quizzesCompleted: profile?.quizzesCompleted || 12,
      quizAccuracyPercentage: profile?.quizAccuracyPercentage || 84,
      practiceQuestionsAttempted: profile?.practiceQuestionsAttempted || 28,
      topicsLearnedCount: profile?.topicsLearnedCount || 7,
      weakAreas: profile?.weakAreas || ['BCNF Decomposition', 'Process Synchronization'],
      recentTopics: profile?.recentTopics || ['DBMS Normalization', 'Machine Learning', 'Python Loops'],
    };

    onSaveProfile(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                {profile ? 'Student Profile & Goals' : isLoginMode ? 'Student Login' : 'Create Student Account'}
              </h3>
              <p className="text-xs text-slate-400">Personalize your AI study experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@university.edu"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Academic Stream / Degree</label>
            <input
              type="text"
              value={gradeOrCourse}
              onChange={(e) => setGradeOrCourse(e.target.value)}
              placeholder="e.g. B.Tech Computer Science / CBSE Class 12"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Daily Study Benchmark Goal (Minutes)
            </label>
            <input
              type="number"
              min={15}
              max={300}
              step={5}
              value={dailyGoalMinutes}
              onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            {profile && (
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
              >
                Log Out
              </button>
            )}

            <button
              type="submit"
              className="ml-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              {profile ? 'Save Changes' : isLoginMode ? 'Enter LearnMate AI' : 'Complete Registration'}
            </button>
          </div>

          {onNavigateToLoginPage && (
            <div className="pt-3 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToLoginPage();
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
              >
                Open Full Login & Account Switcher Page →
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};
