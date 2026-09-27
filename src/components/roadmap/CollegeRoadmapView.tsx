import React, { useState } from 'react';
import { 
  Map, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  MessageSquare, 
  Award, 
  Target, 
  TrendingUp, 
  Filter, 
  Settings2, 
  ArrowRight, 
  AlertCircle,
  ExternalLink,
  Info,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Code2,
  Calendar,
  Briefcase
} from 'lucide-react';
import { 
  Language, 
  CollegeRoadmap, 
  RoadmapSetupData, 
  RoadmapItem, 
  StudentProfile 
} from '../../types';
import { generateCollegeRoadmap } from '../../services/api';
import { generateDefaultRoadmap } from '../../data/careerAndRoadmapData';

interface CollegeRoadmapViewProps {
  language: Language;
  profile: StudentProfile | null;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onLearnTopic: (topic: string) => void;
  onAskTutorWithContext: (context: string) => void;
  initialSetupData?: RoadmapSetupData | null;
}

const COMMON_DEPARTMENTS = [
  'Computer Science & Engineering (CSE)',
  'Artificial Intelligence & Data Science (AIDS)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering (MECH)',
  'Civil Engineering (CIVIL)',
  'Biotechnology / Biomedical',
  'Bachelor of Computer Applications (BCA / B.Sc CS)'
];

const COMMON_CAREER_GOALS = [
  'Full-Stack Software Engineer',
  'AI / Machine Learning Engineer',
  'Cloud & DevOps Engineer',
  'Data Scientist / Analyst',
  'Embedded Systems & IoT Engineer',
  'Mobile App Developer (iOS/Android)',
  'UI/UX Product Designer',
  'Cybersecurity Analyst',
  'Technical Product Manager'
];

export const CollegeRoadmapView: React.FC<CollegeRoadmapViewProps> = ({
  language,
  profile,
  onUpdateProfile,
  onLearnTopic,
  onAskTutorWithContext,
  initialSetupData,
}) => {
  // Existing active roadmap or generate initial default
  const [roadmap, setRoadmap] = useState<CollegeRoadmap>(() => {
    if (profile?.activeRoadmap) {
      return profile.activeRoadmap;
    }
    const setup: RoadmapSetupData = initialSetupData || {
      degree: 'B.Tech',
      department: 'Computer Science & Engineering (CSE)',
      currentYear: '1st Year',
      currentSkills: ['Basic Python or C', 'High School Algebra'],
      careerGoal: 'Full-Stack Software Engineer',
      skillLevel: 'Beginner'
    };
    return generateDefaultRoadmap(setup);
  });

  const [isEditingSetup, setIsEditingSetup] = useState<boolean>(!profile?.activeRoadmap);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedYearFilter, setSelectedYearFilter] = useState<number | 'all'>('all');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Form setup state
  const [setupForm, setSetupForm] = useState<RoadmapSetupData>(() => ({
    degree: roadmap.degree || 'B.Tech',
    department: roadmap.department || 'Computer Science & Engineering (CSE)',
    currentYear: roadmap.currentYear || '1st Year',
    currentSkills: roadmap.skillGapAnalysis?.strongAreas || ['Basic Python', 'HTML Basics'],
    careerGoal: roadmap.careerGoal || 'Full-Stack Software Engineer',
    skillLevel: (roadmap.skillLevel as any) || 'Beginner'
  }));

  const [skillInput, setSkillInput] = useState<string>('');

  // Calculate completed stats
  const allItems = roadmap.years.flatMap(y => y.items);
  const completedCount = allItems.filter(i => i.completed).length;
  const progressPercent = allItems.length > 0 ? Math.round((completedCount / allItems.length) * 100) : 0;

  const handleToggleItemCompleted = (itemId: string) => {
    const updatedYears = roadmap.years.map(year => ({
      ...year,
      items: year.items.map(item => {
        if (item.id === itemId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    }));

    const updatedRoadmap: CollegeRoadmap = {
      ...roadmap,
      years: updatedYears
    };

    setRoadmap(updatedRoadmap);

    // Save to profile
    const completedIds = updatedYears.flatMap(y => y.items.filter(i => i.completed).map(i => i.id));
    onUpdateProfile({
      activeRoadmap: updatedRoadmap,
      completedRoadmapItemIds: completedIds
    });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !setupForm.currentSkills.includes(skillInput.trim())) {
      setSetupForm(prev => ({
        ...prev,
        currentSkills: [...prev.currentSkills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSetupForm(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.filter(s => s !== skill)
    }));
  };

  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const generated = await generateCollegeRoadmap(setupForm, language);
      setRoadmap(generated);
      onUpdateProfile({ activeRoadmap: generated });
      setIsEditingSetup(false);
    } catch (err) {
      console.error('Error creating roadmap:', err);
      const fallback = generateDefaultRoadmap(setupForm);
      setRoadmap(fallback);
      onUpdateProfile({ activeRoadmap: fallback });
      setIsEditingSetup(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-3 backdrop-blur-xs border border-white/10">
              <Map className="w-3.5 h-3.5 text-indigo-300" />
              <span>Personalized 4-Year University Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              🗺️ College Learning & Skill Roadmap
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Structured sequence from Year 1 foundations to Year 4 placement and capstone readiness, 
              tailored to <strong className="text-white underline decoration-indigo-400">{roadmap.department}</strong> aiming for <strong className="text-white underline decoration-indigo-400">{roadmap.careerGoal}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
            <button
              onClick={() => setIsEditingSetup(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-xs transition-colors"
            >
              <Settings2 className="w-4 h-4" />
              <span>Customize Roadmap Settings</span>
            </button>

            {/* Overall Progress Stat */}
            <div className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-indigo-400 flex items-center justify-center font-bold text-xs">
                {progressPercent}%
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">{completedCount} of {allItems.length} Milestones</div>
                <div className="text-[10px] text-indigo-200">Completed towards your degree</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SETUP & CUSTOMIZATION MODAL */}
      {isEditingSetup && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Set Up Your College Roadmap</h3>
                <p className="text-xs text-slate-500">Provide your degree details to generate a sequential curriculum plan.</p>
              </div>
            </div>

            <form onSubmit={handleGenerateRoadmap} className="space-y-5">
              
              {/* Degree & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree Program
                  </label>
                  <select
                    value={setupForm.degree}
                    onChange={(e) => setSetupForm({ ...setupForm, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                    <option value="B.E.">B.E. (Bachelor of Engineering)</option>
                    <option value="BCA">BCA (Computer Applications)</option>
                    <option value="B.Sc CS">B.Sc Computer Science</option>
                    <option value="B.Des">B.Des (Design / Architecture)</option>
                    <option value="M.Tech">M.Tech / Dual Degree</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Year of Study
                  </label>
                  <select
                    value={setupForm.currentYear}
                    onChange={(e) => setSetupForm({ ...setupForm, currentYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="1st Year">1st Year (Fresher / Foundation)</option>
                    <option value="2nd Year">2nd Year (Core Skills & Projects)</option>
                    <option value="3rd Year">3rd Year (Specialization & Internship)</option>
                    <option value="4th Year">4th Year (Placement & Capstone)</option>
                  </select>
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College Department / Major
                </label>
                <input
                  type="text"
                  list="departments-list"
                  value={setupForm.department}
                  onChange={(e) => setSetupForm({ ...setupForm, department: e.target.value })}
                  placeholder="e.g. Computer Science & Engineering (CSE)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <datalist id="departments-list">
                  {COMMON_DEPARTMENTS.map((dept, i) => (
                    <option key={i} value={dept} />
                  ))}
                </datalist>
              </div>

              {/* Career Goal */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Career / Role Goal
                </label>
                <input
                  type="text"
                  list="goals-list"
                  value={setupForm.careerGoal}
                  onChange={(e) => setSetupForm({ ...setupForm, careerGoal: e.target.value })}
                  placeholder="e.g. Full-Stack Software Engineer, AI Engineer"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <datalist id="goals-list">
                  {COMMON_CAREER_GOALS.map((goal, i) => (
                    <option key={i} value={goal} />
                  ))}
                </datalist>
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Programming / Technical Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSetupForm({ ...setupForm, skillLevel: lvl })}
                      className={`py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        setupForm.skillLevel === lvl
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Skills Known */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Skills You Currently Know (for Skill Gap Analysis)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="e.g. Python, Git, HTML, Basic SQL"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-medium hover:bg-slate-900"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {setupForm.currentSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                {profile?.activeRoadmap && (
                  <button
                    type="button"
                    onClick={() => setIsEditingSetup(false)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Sequential Roadmap...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate My Personalized Roadmap</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* TOP DUAL-CARD ROW: SMART NEXT STEP & SKILL GAP ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Smart Next Step (1 Column) */}
        <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[11px] font-bold mb-3 shadow-xs">
              <Target className="w-3.5 h-3.5" />
              <span>Smart Next Step Priority</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1.5">
              {roadmap.smartNextStep?.topic || 'Core Programming Fundamentals'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {roadmap.smartNextStep?.reason || 'Mastering fundamental control logic accelerates every subsequent semester.'}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-indigo-100">
            <button
              onClick={() => onLearnTopic(roadmap.smartNextStep?.topic || 'Programming Fundamentals')}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{roadmap.smartNextStep?.actionText || 'Start Learning This Topic'}</span>
            </button>
            <button
              onClick={() => onAskTutorWithContext(`I am currently focusing on "${roadmap.smartNextStep?.topic}". What should I learn first and how should I practice?`)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-white border border-indigo-200 text-indigo-700 text-xs font-semibold hover:bg-indigo-50 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI Tutor for Study Advice</span>
            </button>
          </div>
        </div>

        {/* Skill Gap Analysis (2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Skill Gap Analysis: {roadmap.careerGoal}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                Year: {roadmap.currentYear}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Strong Areas */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5">
                <div className="text-xs font-bold text-emerald-800 mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Strengths / Existing Skills:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {roadmap.skillGapAnalysis?.strongAreas?.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white text-emerald-900 border border-emerald-200 text-[11px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Areas to Develop */}
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5">
                <div className="text-xs font-bold text-amber-800 mb-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Areas to Prioritize Developing:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {roadmap.skillGapAnalysis?.areasToDevelop?.map((skill, i) => (
                    <span 
                      key={i} 
                      onClick={() => onLearnTopic(skill)}
                      title="Click to learn this skill"
                      className="px-2 py-0.5 rounded bg-white hover:bg-amber-100 cursor-pointer text-amber-900 border border-amber-200 text-[11px] font-medium transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested Practice Recommendations */}
            <div className="space-y-1 mb-2">
              <div className="text-xs font-semibold text-slate-700">Recommended Action Plan:</div>
              <ul className="text-xs text-slate-600 space-y-1">
                {roadmap.skillGapAnalysis?.practiceRecommendations?.slice(0, 2).map((rec, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 italic">
            {roadmap.skillGapAnalysis?.disclaimer}
          </div>
        </div>

      </div>

      {/* ROADMAP TIMELINE VIEW */}
      <div className="space-y-8">
        
        {/* Filter Tabs by Year */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-900">4-Year Curriculum Stages</span>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setSelectedYearFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedYearFilter === 'all'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              All Years (Full Plan)
            </button>
            {[1, 2, 3, 4].map((yearNum) => (
              <button
                key={yearNum}
                onClick={() => setSelectedYearFilter(yearNum)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedYearFilter === yearNum
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Year {yearNum}
              </button>
            ))}
          </div>
        </div>

        {/* Years Blocks */}
        {roadmap.years
          .filter(y => selectedYearFilter === 'all' || y.yearNumber === selectedYearFilter)
          .map((yearBlock) => {
            const yearCompleted = yearBlock.items.filter(i => i.completed).length;
            const yearTotal = yearBlock.items.length;

            return (
              <div 
                key={yearBlock.yearNumber} 
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
              >
                {/* Year Header */}
                <div className="px-6 py-4 bg-slate-50/90 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>{yearBlock.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                        {yearCompleted} / {yearTotal} Done
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {yearBlock.theme}
                    </p>
                  </div>

                  <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden shrink-0">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${yearTotal > 0 ? (yearCompleted / yearTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-slate-100">
                  {yearBlock.items.map((item) => {
                    const isExpanded = expandedItemId === item.id;
                    const stageColor = 
                      item.stage === 'Foundation' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      item.stage === 'Core Skills' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                      item.stage === 'Projects' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                      item.stage === 'Specialization' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      item.stage === 'Internship' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-rose-50 text-rose-700 border-rose-100';

                    return (
                      <div 
                        key={item.id} 
                        className={`p-4 sm:p-5 transition-colors ${
                          item.completed ? 'bg-emerald-50/20' : 'hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          
                          {/* Checkbox + Title */}
                          <div className="flex items-start gap-3 flex-1">
                            <button
                              type="button"
                              onClick={() => handleToggleItemCompleted(item.id)}
                              className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                              title={item.completed ? 'Mark incomplete' : 'Mark completed'}
                            >
                              {item.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              ) : (
                                <Circle className="w-5 h-5 hover:text-slate-600" />
                              )}
                            </button>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${stageColor}`}>
                                  {item.stage}
                                </span>
                                <h4 className={`text-sm font-bold ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                  {item.topic}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {item.whyItMatters}
                              </p>
                            </div>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => onLearnTopic(item.topic)}
                              title="Learn this topic in LearnMate"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Study</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>

                        </div>

                        {/* Expanded details (Prerequisites, Practice, Mini project) */}
                        {isExpanded && (
                          <div className="mt-4 pt-3 border-t border-slate-100 pl-8 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            
                            {/* Prerequisites */}
                            <div className="bg-slate-50 p-3 rounded-xl">
                              <div className="font-bold text-slate-700 mb-1">Prerequisites:</div>
                              <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                                {item.prerequisites && item.prerequisites.length > 0 ? (
                                  item.prerequisites.map((p, i) => <li key={i}>{p}</li>)
                                ) : (
                                  <li>None (Foundational)</li>
                                )}
                              </ul>
                            </div>

                            {/* Suggested Practice */}
                            <div className="bg-slate-50 p-3 rounded-xl">
                              <div className="font-bold text-slate-700 mb-1">Suggested Practice:</div>
                              <p className="text-slate-600 leading-relaxed">
                                {item.suggestedPractice || 'Solve 5-10 targeted problem sets in our Practice tab.'}
                              </p>
                            </div>

                            {/* Mini Project Idea */}
                            <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl">
                              <div className="font-bold text-indigo-950 mb-1 flex items-center gap-1">
                                <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Portfolio Mini Project:</span>
                              </div>
                              <p className="text-slate-700 leading-relaxed">
                                {item.miniProjectIdea || 'Create a working GitHub project demonstrating this concept.'}
                              </p>
                            </div>

                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}

      </div>

      {/* Bottom Contextual AI Tutor Prompt */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Need roadmap guidance for college exams or placement prep?</h4>
            <p className="text-xs text-slate-500">Ask your AI tutor questions directly tied to your department and year.</p>
          </div>
        </div>

        <button
          onClick={() => onAskTutorWithContext(`I am in ${roadmap.currentYear} studying ${roadmap.department}. My goal is ${roadmap.careerGoal}. What is the best strategy for this semester?`)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shrink-0 shadow-xs"
        >
          <span>Ask AI Tutor About Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
