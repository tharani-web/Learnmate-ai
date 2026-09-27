import React, { useState } from 'react';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Map, 
  BookOpen, 
  ArrowLeft, 
  ShieldCheck, 
  LogIn, 
  LogOut, 
  UserPlus 
} from 'lucide-react';
import { StudentProfile } from '../types';

interface LoginPageProps {
  currentProfile: StudentProfile | null;
  onLoginSuccess: (profile: StudentProfile) => void;
  onLogout: () => void;
  onBackToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentProfile,
  onLoginSuccess,
  onLogout,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  
  // Sign In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCourse, setRegCourse] = useState('B.Tech Computer Science');
  const [regDailyGoal, setRegDailyGoal] = useState(45);

  // Preset Demo Accounts for 1-Click Evaluation
  const demoAccounts: Array<{
    name: string;
    email: string;
    course: string;
    streak: number;
    description: string;
    avatar: string;
    profileData: StudentProfile;
  }> = [
    {
      name: 'Alex Rivera',
      email: 'alex@university.edu',
      course: 'B.Tech Computer Science (3rd Year)',
      streak: 6,
      description: 'University core CS, DBMS, OS & Machine Learning focus.',
      avatar: 'A',
      profileData: {
        id: 'student-alex',
        name: 'Alex Rivera',
        email: 'alex@university.edu',
        gradeOrCourse: 'B.Tech Computer Science',
        studyStreakDays: 6,
        dailyGoalMinutes: 45,
        dailyGoalProgressMinutes: 35,
        quizzesCompleted: 14,
        quizAccuracyPercentage: 86,
        practiceQuestionsAttempted: 32,
        topicsLearnedCount: 8,
        weakAreas: ['BCNF Decomposition', 'Process Synchronization', 'B+ Tree Indexing'],
        recentTopics: ['DBMS Normalization', 'Machine Learning', 'Operating Systems Scheduling', 'Python Loops & Lists'],
      }
    },
    {
      name: 'Priya Sharma',
      email: 'priya@learnmate.edu',
      course: '12th Grade Science / Aspiring Engineer',
      streak: 4,
      description: 'Preparing for college admissions & AI Career Discovery.',
      avatar: 'P',
      profileData: {
        id: 'student-priya',
        name: 'Priya Sharma',
        email: 'priya@learnmate.edu',
        gradeOrCourse: '12th Grade Science / Aspiring Engineer',
        studyStreakDays: 4,
        dailyGoalMinutes: 40,
        dailyGoalProgressMinutes: 25,
        quizzesCompleted: 9,
        quizAccuracyPercentage: 91,
        practiceQuestionsAttempted: 18,
        topicsLearnedCount: 5,
        weakAreas: ['Organic Chemistry Mechanisms', 'Rotational Dynamics'],
        recentTopics: ['Physics Electromagnetism', 'Python Programming', 'Calculus Integrals'],
      }
    },
    {
      name: 'Karthik Raja',
      email: 'karthik@techcolleges.ac.in',
      course: 'B.E Electronics & Communication (1st Year)',
      streak: 2,
      description: 'Curriculum roadmap & placement interview fundamentals.',
      avatar: 'K',
      profileData: {
        id: 'student-karthik',
        name: 'Karthik Raja',
        email: 'karthik@techcolleges.ac.in',
        gradeOrCourse: 'B.E Electronics & Communication',
        studyStreakDays: 2,
        dailyGoalMinutes: 60,
        dailyGoalProgressMinutes: 40,
        quizzesCompleted: 7,
        quizAccuracyPercentage: 79,
        practiceQuestionsAttempted: 24,
        topicsLearnedCount: 4,
        weakAreas: ['Semiconductor Physics', 'Circuit Analysis KVL/KCL'],
        recentTopics: ['Digital Logic Design', 'C Programming', 'Engineering Mathematics'],
      }
    }
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your email or student username.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const matchedDemo = demoAccounts.find(
        (a) => a.email.toLowerCase() === loginEmail.trim().toLowerCase()
      );

      const student: StudentProfile = matchedDemo ? matchedDemo.profileData : {
        id: `student-${Date.now()}`,
        name: loginEmail.split('@')[0].replace(/[._-]/g, ' ') || 'Student Learner',
        email: loginEmail.trim(),
        gradeOrCourse: 'Academic Student',
        studyStreakDays: 3,
        dailyGoalMinutes: 45,
        dailyGoalProgressMinutes: 15,
        quizzesCompleted: 5,
        quizAccuracyPercentage: 82,
        practiceQuestionsAttempted: 12,
        topicsLearnedCount: 3,
        weakAreas: ['Exam Preparation Strategy'],
        recentTopics: ['DBMS Normalization', 'Python Loops & Lists'],
      };

      setSuccessMessage(`Welcome back, ${student.name}! Redirecting...`);
      setTimeout(() => {
        onLoginSuccess(student);
      }, 500);
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newStudent: StudentProfile = {
        id: `student-${Date.now()}`,
        name: regName.trim(),
        email: regEmail.trim(),
        gradeOrCourse: regCourse.trim() || 'B.Tech Student',
        studyStreakDays: 1,
        dailyGoalMinutes: Number(regDailyGoal) || 45,
        dailyGoalProgressMinutes: 0,
        quizzesCompleted: 0,
        quizAccuracyPercentage: 0,
        practiceQuestionsAttempted: 0,
        topicsLearnedCount: 1,
        weakAreas: [],
        recentTopics: ['DBMS Normalization'],
      };

      setSuccessMessage(`Account created for ${newStudent.name}! Redirecting...`);
      setTimeout(() => {
        onLoginSuccess(newStudent);
      }, 500);
    }, 700);
  };

  const handleSelectDemo = (demo: typeof demoAccounts[0]) => {
    setIsSubmitting(true);
    setSuccessMessage(`Logging in as ${demo.name}...`);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(demo.profileData);
    }, 400);
  };

  const handleContinueAsGuest = () => {
    const guestStudent: StudentProfile = {
      id: 'guest-learner',
      name: 'Guest Learner',
      email: 'guest@learnmate.ai',
      gradeOrCourse: 'General Learner',
      studyStreakDays: 1,
      dailyGoalMinutes: 30,
      dailyGoalProgressMinutes: 10,
      quizzesCompleted: 2,
      quizAccuracyPercentage: 80,
      practiceQuestionsAttempted: 5,
      topicsLearnedCount: 2,
      weakAreas: [],
      recentTopics: ['DBMS Normalization'],
    };
    onLoginSuccess(guestStudent);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-indigo-50/60 via-slate-50 to-white flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Back to Home button */}
      <div className="max-w-5xl mx-auto w-full mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white/80 hover:bg-white border border-slate-200/80 shadow-2xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to LearnMate AI Hub</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Brand & Feature Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col justify-between relative overflow-hidden border border-indigo-800/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight font-display">
                  LearnMate<span className="text-indigo-400">.ai</span>
                </span>
                <span className="block text-xs text-indigo-300">Your AI Academic Copilot</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                One Account for Your Entire University Journey
              </h1>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Log in to sync your semester study notes, active quiz streaks, 4-year roadmaps, and career assessments across devices.
              </p>
            </div>

            {/* Core Pillars List */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Full Notes & 2-14 Mark Questions</h4>
                  <p className="text-[11px] text-slate-300">Detailed answers formatted for university evaluations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AI Career Discovery (12th Grade+)</h4>
                  <p className="text-[11px] text-slate-300">Holistic guidance to choose the ideal college department.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300 mt-0.5">
                  <Map className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">4-Year College Learning Roadmap</h4>
                  <p className="text-[11px] text-slate-300">Sequential milestones for placements & skill gap tracking.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 mt-8 border-t border-indigo-800/60">
            <div className="flex items-center gap-2 text-xs text-indigo-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secure Academic Session • Bilingual English & Tamil</span>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl flex flex-col justify-between">
          
          <div>
            {/* If user is already logged in, display active session card */}
            {currentProfile && currentProfile.id !== 'guest-learner' ? (
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Currently Signed In</span>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-indigo-600/20">
                    {currentProfile.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{currentProfile.name}</h3>
                    <p className="text-xs text-slate-500">{currentProfile.email || 'student@learnmate.ai'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                        {currentProfile.gradeOrCourse}
                      </span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        🔥 {currentProfile.studyStreakDays} Day Streak
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={onBackToHome}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    <span>Enter Student Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setSuccessMessage('You have logged out.');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Switcher Tabs: Sign In / Create Account */}
                <div className="flex items-center p-1 bg-slate-100 rounded-xl mb-6 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signin');
                      setErrorMessage('');
                    }}
                    className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'signin'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Student Sign In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('register');
                      setErrorMessage('');
                    }}
                    className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'register'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                </div>

                {/* Notifications */}
                {errorMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                    <span>⚠️</span>
                    <span>{errorMessage}</span>
                  </div>
                )}
                {successMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {/* SIGN IN FORM */}
                {activeTab === 'signin' && (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Student Email or ID
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="e.g. alex@university.edu"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">Password</label>
                        <button
                          type="button"
                          onClick={() => alert('Password hint: You can enter any password or click any Demo Student Profile below for 1-click access.')}
                          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Remember my learning profile</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to LearnMate</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* REGISTER FORM */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g. Rachel Chen"
                          className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="rachel@university.edu"
                          className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Degree or Class Stream
                      </label>
                      <input
                        type="text"
                        value={regCourse}
                        onChange={(e) => setRegCourse(e.target.value)}
                        placeholder="e.g. B.Tech Computer Science / Class 12 Science"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Daily Study Target (Minutes)
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[30, 45, 60, 90].map((mins) => (
                          <button
                            key={mins}
                            type="button"
                            onClick={() => setRegDailyGoal(mins)}
                            className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              regDailyGoal === mins
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {mins}m
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Creating account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Student Account</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          {/* 1-Click Preset Demo Accounts Section */}
          {(!currentProfile || currentProfile.id === 'guest-learner') && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Instant 1-Click Demo Profiles
                </span>
                <span className="text-[11px] text-slate-400">Click to test as:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {demoAccounts.map((account, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectDemo(account)}
                    className="card-hover-lift p-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 bg-white text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {account.avatar}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-800 block truncate group-hover:text-indigo-700">
                          {account.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {account.course.split('(')[0]}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Continue as Guest */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleContinueAsGuest}
                  className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer font-medium"
                >
                  Or explore LearnMate AI as a guest without signing in →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
