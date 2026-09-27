import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  BarChart2, 
  Layers, 
  RotateCcw, 
  MessageSquare, 
  Map, 
  ExternalLink, 
  Info,
  Scale,
  Check,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  Language, 
  CareerQuestionnaireAnswers, 
  CareerOption, 
  CareerDiscoveryReport, 
  StudentProfile 
} from '../../types';
import { discoverCareers } from '../../services/api';
import { DEFAULT_CAREER_OPTIONS } from '../../data/careerAndRoadmapData';

interface CareerDiscoveryViewProps {
  language: Language;
  profile: StudentProfile | null;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onSelectRoadmapWithCareer: (degree: string, department: string, goal: string) => void;
  onAskTutorWithContext: (topicOrContext: string) => void;
  onLearnTopic: (topic: string) => void;
}

const SUBJECT_OPTIONS = [
  'Mathematics & Logic',
  'Physics & Mechanics',
  'Computer Science & Coding',
  'Electronics & Circuits',
  'Chemistry & Materials',
  'Biology & Health Science',
  'Art & Visual Design',
  'Economics & Commerce',
  'English & Technical Writing'
];

const ACTIVITY_OPTIONS = [
  'Writing code & building apps',
  'Drawing, 3D modeling & UI sketching',
  'Solving complex numerical & logic puzzles',
  'Conducting science experiments in labs',
  'Tinkering with hardware & circuits',
  'Analyzing data, charts & statistics',
  'Organizing team projects & leading groups',
  'Writing essays & explaining concepts'
];

const WORKING_STYLE_OPTIONS = [
  { id: 'analytical', label: 'Technical & Analytical', desc: 'Focusing on algorithms, code, logic, and system architecture' },
  { id: 'creative', label: 'Creative & Visual', desc: 'Designing spatial layouts, user experiences, and visual aesthetics' },
  { id: 'hands-on', label: 'Practical & Lab Tinkering', desc: 'Building physical prototypes, circuits, and mechanical devices' },
  { id: 'collaborative', label: 'People & Strategic Planning', desc: 'Managing products, business data, and cross-functional teams' }
];

const FUTURE_INTEREST_OPTIONS = [
  { id: 'cs', label: 'Software Engineering & Cloud Computing', icon: '💻' },
  { id: 'ai', label: 'Artificial Intelligence & Data Science', icon: '🧠' },
  { id: 'hardware', label: 'Robotics, IoT & Electronics', icon: '⚡' },
  { id: 'design', label: 'Architecture, UX & Industrial Design', icon: '🎨' },
  { id: 'biotech', label: 'Biotechnology & Medical Systems', icon: '🧬' },
  { id: 'business', label: 'FinTech, Analytics & Entrepreneurship', icon: '📈' }
];

export const CareerDiscoveryView: React.FC<CareerDiscoveryViewProps> = ({
  language,
  profile,
  onUpdateProfile,
  onSelectRoadmapWithCareer,
  onAskTutorWithContext,
  onLearnTopic,
}) => {
  // Questionnaire state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [report, setReport] = useState<CareerDiscoveryReport | null>(
    profile?.savedCareerReport || null
  );

  const [answers, setAnswers] = useState<CareerQuestionnaireAnswers>({
    academicInterests: ['Mathematics & Logic', 'Computer Science & Coding'],
    activityPreferences: ['Writing code & building apps', 'Solving complex numerical & logic puzzles'],
    technologyInterest: 'Very Interested',
    creativityRating: 4,
    problemSolvingRating: 5,
    workingStyle: 'Technical & Analytical',
    futureInterest: 'Software Engineering & Cloud Computing',
    learningPreference: 'Hands-on projects and problem solving'
  });

  // Comparison drawer/modal state
  const [comparingIds, setComparingIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  // Selected detail modal
  const [expandedOptionId, setExpandedOptionId] = useState<string | null>(null);

  const totalSteps = 6;

  const handleToggleSubject = (subject: string) => {
    setAnswers(prev => {
      const exists = prev.academicInterests.includes(subject);
      const updated = exists 
        ? prev.academicInterests.filter(s => s !== subject)
        : [...prev.academicInterests, subject];
      return { ...prev, academicInterests: updated };
    });
  };

  const handleToggleActivity = (activity: string) => {
    setAnswers(prev => {
      const exists = prev.activityPreferences.includes(activity);
      const updated = exists 
        ? prev.activityPreferences.filter(a => a !== activity)
        : [...prev.activityPreferences, activity];
      return { ...prev, activityPreferences: updated };
    });
  };

  const handleRunAnalysis = async () => {
    setIsSubmitting(true);
    try {
      const result = await discoverCareers(answers, language);
      setReport(result);
      onUpdateProfile({ savedCareerReport: result });
    } catch (err) {
      console.error('Error generating career discovery:', err);
      const fallbackReport = {
        summaryAnalysis: 'Based on your analytical strengths and curiosity for modern technology, fields that bridge programming, engineering, and digital systems will offer versatile paths.',
        disclaimer: 'Based on your responses, these fields may be worth exploring. Encourage students to consider personal interests, college eligibility, and campus facilities before deciding.',
        fields: DEFAULT_CAREER_OPTIONS
      };
      setReport(fallbackReport);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setReport(null);
  };

  const toggleCompare = (id: string) => {
    setComparingIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], id]; // keep max 3
      }
      return [...prev, id];
    });
  };

  const selectedForCompare = report?.fields.filter(f => comparingIds.includes(f.id)) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-3 backdrop-blur-xs border border-white/10">
            <Compass className="w-3.5 h-3.5 text-indigo-300" />
            <span>AI Career & Course Guidance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            🧭 Explore Your Best College & Career Paths
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Completed 12th grade or evaluating degree options? Discover suitable engineering, technology, 
            and design disciplines through personalized exploration rather than rigid labels.
          </p>
        </div>
      </div>

      {/* Main Container: Questionnaire OR Results */}
      {!report ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 0: Academic Subjects Enjoyed */}
          {currentStep === 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Which academic subjects did you enjoy most in high school?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Select all that apply. This helps identify foundational strengths in quantitative, physical, or creative fields.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {SUBJECT_OPTIONS.map((subject) => {
                  const isSelected = answers.academicInterests.includes(subject);
                  return (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleToggleSubject(subject)}
                      className={`flex items-center justify-between p-3.5 rounded-xl text-left border text-sm font-medium transition-all ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <span>{subject}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 1: Activities Preferred */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                What activities do you find most engaging?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Think about what you naturally gravitate toward during projects or free time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ACTIVITY_OPTIONS.map((activity) => {
                  const isSelected = answers.activityPreferences.includes(activity);
                  return (
                    <button
                      key={activity}
                      type="button"
                      onClick={() => handleToggleActivity(activity)}
                      className={`flex items-center justify-between p-3.5 rounded-xl text-left border text-sm font-medium transition-all ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <span>{activity}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Technology & Digital Curiosity */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                How interested are you in computing, coding & digital technology?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Whether you already code or are simply curious about how software and smartphones work.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { value: 'Very Interested', label: 'Very Interested', desc: 'I love technology, gadgets, coding, and building software solutions' },
                  { value: 'Interested', label: 'Interested', desc: 'Curious to learn coding and understand digital tools in depth' },
                  { value: 'Neutral', label: 'Neutral', desc: 'Open to using tech as a tool, but equally interested in other disciplines' },
                  { value: 'Less Interested', label: 'Less Interested', desc: 'Prefer physical sciences, business strategy, or visual spatial design' }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, technologyInterest: item.value as any })}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      answers.technologyInterest === item.value
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">{item.label}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Self Ratings (Creativity & Problem Solving) */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Rate your comfort with Creativity & Problem Solving
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Be honest—there are rewarding careers at every point of this spectrum!
              </p>
              <div className="space-y-6 max-w-xl mb-8">
                
                {/* Creativity */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Creativity & Visual Thinking
                    </label>
                    <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 rounded bg-indigo-50">
                      {answers.creativityRating} / 5
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Sketching, thinking outside conventional rules, designing aesthetics and UI.
                  </p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={answers.creativityRating}
                    onChange={(e) => setAnswers({ ...answers, creativityRating: Number(e.target.value) })}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>1 (Prefer standard formulas)</span>
                    <span>5 (Highly artistic / inventive)</span>
                  </div>
                </div>

                {/* Problem Solving */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Logical Problem Solving & Math
                    </label>
                    <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 rounded bg-indigo-50">
                      {answers.problemSolvingRating} / 5
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Debugging errors, writing mathematical proofs, finding efficient algorithms.
                  </p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={answers.problemSolvingRating}
                    onChange={(e) => setAnswers({ ...answers, problemSolvingRating: Number(e.target.value) })}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>1 (Find deep math tedious)</span>
                    <span>5 (Thrive on challenging puzzles)</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 4: Preferred Working Style */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                What is your preferred day-to-day working style?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                How do you envision yourself spending most of your college project and lab hours?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {WORKING_STYLE_OPTIONS.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setAnswers({ ...answers, workingStyle: style.label })}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      answers.workingStyle === style.label
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">{style.label}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Future Domain Interest & Learning Preference */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Which broad domain naturally excites you most?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Pick the primary area you are curious to explore first. You can always compare others later.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {FUTURE_INTEREST_OPTIONS.map((domain) => (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => setAnswers({ ...answers, futureInterest: domain.label })}
                    className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3 ${
                      answers.futureInterest === domain.label
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{domain.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{domain.label}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Learning Preference */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  How do you learn best?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Hands-on building & coding projects',
                    'Interactive step-by-step tutorials',
                    'Visual diagrams and video breakdowns'
                  ].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setAnswers({ ...answers, learningPreference: pref })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                        answers.learningPreference === pref
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setReport({
                  summaryAnalysis: 'Here are the foundational college tracks in modern engineering and computing.',
                  disclaimer: 'Based on your responses, these fields may be worth exploring. Encourage students to consider personal interests, college eligibility, and campus facilities before deciding.',
                  fields: DEFAULT_CAREER_OPTIONS
                })}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Skip questionnaire & explore all fields →
              </button>
            )}

            {currentStep < totalSteps - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleRunAnalysis}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Interests...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Discover My Potential Paths</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      ) : (
        /* RESULTS VIEW */
        <div className="space-y-8">
          
          {/* Top Summary & Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Exploration Report Generated</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Suitable Academic & Career Fields
                </h2>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {comparingIds.length > 0 && (
                  <button
                    onClick={() => setShowComparisonModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Compare Selected ({comparingIds.length})</span>
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Questionnaire</span>
                </button>
              </div>
            </div>

            {/* AI Summary Statement */}
            <div className="mt-6 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-slate-800 text-sm leading-relaxed">
              <span className="font-semibold text-indigo-900 block mb-1">
                💡 Summary of Your Learning Profile:
              </span>
              {report.summaryAnalysis}
            </div>

            {/* Safety & Educational Disclaimer */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Important Guidance Disclaimer: </span>
                {report.disclaimer}
              </div>
            </div>
          </div>

          {/* Recommended Field Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {report.fields.map((field) => {
              const isComparing = comparingIds.includes(field.id);
              const isExpanded = expandedOptionId === field.id;

              return (
                <div
                  key={field.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-6">
                    {/* Top Row: Category Badge + Compare Toggle */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {field.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                          {field.badge}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleCompare(field.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          isComparing
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {field.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {field.matchReason}
                    </p>

                    {/* Quick Metric Badges */}
                    <div className="grid grid-cols-4 gap-2 py-3 px-3.5 bg-slate-50 rounded-xl mb-4 text-center">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Math</div>
                        <div className="text-xs font-semibold text-slate-800">{field.mathInvolvement}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Tech</div>
                        <div className="text-xs font-semibold text-slate-800">{field.techInvolvement}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Creative</div>
                        <div className="text-xs font-semibold text-slate-800">{field.creativityInvolvement}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Practical</div>
                        <div className="text-xs font-semibold text-slate-800">{field.practicalWork}</div>
                      </div>
                    </div>

                    {/* What You Will Study Snippet */}
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Core Topics You'll Study:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {field.whatYouWillStudy.slice(0, 4).map((topic, i) => (
                          <span 
                            key={i} 
                            onClick={() => onLearnTopic(topic)}
                            title="Click to search and learn this topic in LearnMate"
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer text-[11px] text-slate-700 transition-colors"
                          >
                            {topic}
                          </span>
                        ))}
                        {field.whatYouWillStudy.length > 4 && (
                          <span className="px-2 py-1 rounded text-[11px] text-slate-400">
                            +{field.whatYouWillStudy.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expandable In-Depth Section */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-slate-100 space-y-4">
                        
                        {/* Example Career Areas */}
                        <div>
                          <div className="text-xs font-semibold text-slate-800 mb-1">
                            Example Career Roles:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {field.exampleCareerAreas.map((role, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-100">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Beginner Skills to Explore Now */}
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <div className="text-xs font-semibold text-slate-800 mb-1.5">
                            What you can try right now before joining:
                          </div>
                          <ul className="space-y-1">
                            {field.beginnerSkillsToExplore.map((skill, i) => (
                              <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                                <span className="text-indigo-600 font-bold">•</span>
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Engineering Branches Breakdown if present */}
                        {field.engineeringBranches && field.engineeringBranches.length > 0 && (
                          <div className="border border-indigo-100 rounded-xl p-3 bg-indigo-50/40">
                            <div className="text-xs font-bold text-indigo-900 mb-2">
                              Engineering Disciplines Breakdown:
                            </div>
                            <div className="space-y-2">
                              {field.engineeringBranches.map((branch, i) => (
                                <div key={i} className="bg-white p-2.5 rounded-lg border border-indigo-50 text-xs">
                                  <div className="font-semibold text-slate-900">{branch.name}</div>
                                  <div className="text-slate-500 text-[11px]">{branch.focus}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Questions to Ask Yourself */}
                        <div>
                          <div className="text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Questions to ask yourself before choosing:</span>
                          </div>
                          <ul className="space-y-1 text-xs text-slate-600">
                            {field.questionsToAskBeforeChoosing.map((q, i) => (
                              <li key={i} className="italic">• "{q}"</li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    )}

                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => setExpandedOptionId(isExpanded ? null : field.id)}
                      className="text-xs font-medium text-slate-600 hover:text-indigo-600 flex items-center justify-center gap-1 py-1"
                    >
                      <span>{isExpanded ? 'Show Less' : 'Full Curriculum & Branches'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onAskTutorWithContext(field.title)}
                        title="Chat with AI Tutor about this field"
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Ask Tutor</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectRoadmapWithCareer('B.Tech', field.title, field.exampleCareerAreas[0] || 'Software Developer')}
                        className="inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
                      >
                        <Map className="w-3.5 h-3.5" />
                        <span>Generate Roadmap</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Quick Questions to Ask the AI Tutor */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Have specific questions? Ask your LearnMate AI Tutor:</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'What will I study in Computer Science vs AI & Data Science?',
                'What is the difference between ECE and CSE?',
                'What math skills should I revise before engineering college starts?',
                'Are coding jobs available for Mechanical & EEE students?',
                'What programming language should a 1st-year student start with?'
              ].map((promptText, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onAskTutorWithContext(promptText)}
                  className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-all text-left"
                >
                  💬 {promptText}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* COMPARISON MODAL */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Side-by-Side Field Comparison</h3>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedForCompare.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No fields selected for comparison. Click "Compare" on any 2 or 3 career cards.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedForCompare.map((f) => (
                  <div key={f.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-indigo-600">{f.category}</span>
                        <button
                          onClick={() => toggleCompare(f.id)}
                          className="text-slate-400 hover:text-rose-600 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mb-3">{f.title}</h4>

                      <div className="space-y-3 text-xs mb-4">
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="text-slate-400 text-[10px] uppercase font-bold">Involvement Factors</div>
                          <div className="grid grid-cols-2 gap-1 mt-1 font-medium text-slate-700">
                            <div>Math: <span className="font-semibold text-slate-900">{f.mathInvolvement}</span></div>
                            <div>Tech: <span className="font-semibold text-slate-900">{f.techInvolvement}</span></div>
                            <div>Creative: <span className="font-semibold text-slate-900">{f.creativityInvolvement}</span></div>
                            <div>Practical: <span className="font-semibold text-slate-900">{f.practicalWork}</span></div>
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold text-slate-800 mb-1">Key Topics:</div>
                          <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                            {f.whatYouWillStudy.slice(0, 4).map((topic, i) => (
                              <li key={i}>{topic}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="font-semibold text-slate-800 mb-1">Key Careers:</div>
                          <div className="flex flex-wrap gap-1">
                            {f.exampleCareerAreas.slice(0, 3).map((role, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-700">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowComparisonModal(false);
                        onSelectRoadmapWithCareer('B.Tech', f.title, f.exampleCareerAreas[0] || 'Engineer');
                      }}
                      className="w-full py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Generate Roadmap
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200"
              >
                Close Comparison
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
