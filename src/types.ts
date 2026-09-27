export type Language = 'en' | 'ta';

export interface CodeSnippet {
  language: string;
  code: string;
  explanation: string;
  output?: string;
  commonMistakes?: string[];
}

export interface DiagramSuggestion {
  title: string;
  type: 'flowchart' | 'architecture' | 'venn' | 'er-diagram' | 'hierarchy';
  description: string;
  mermaidText?: string;
  nodes?: { id: string; label: string; subtext?: string }[];
}

export interface FullNotes {
  topic: string;
  subject?: string;
  introduction: string;
  definition: string;
  keyConcepts: { title: string; explanation: string }[];
  detailedExplanation: { stepNumber: number; title: string; details: string }[];
  examples: {
    academic: string;
    realWorld: string;
  };
  advantages: string[];
  disadvantages?: string[];
  applications: string[];
  importantPoints: string[];
  summary: string;
  codeSnippet?: CodeSnippet;
  diagramSuggestion?: DiagramSuggestion;
}

export interface ExamQuestion {
  id: string;
  marks: 2 | 5 | 10 | 14;
  question: string;
  answer: string;
  keywords?: string[];
  examTip?: string;
  // Structured 9-part breakdown specifically for 14-mark answers
  structured14Mark?: {
    introduction: string;
    definition: string;
    mainConcept: string;
    detailedExplanation: string;
    diagramFlowchart: string;
    example: string;
    advantages: string[];
    applications: string[];
    conclusion: string;
  };
}

export interface ExamPrep {
  topic: string;
  strategyAdvice: string;
  commonKeywords: string[];
  examTips: string[];
  twoMarkQuestions: ExamQuestion[];
  fiveMarkQuestions: ExamQuestion[];
  tenMarkQuestions: ExamQuestion[];
  fourteenMarkQuestions: ExamQuestion[];
}

export interface VideoResource {
  id: string;
  title: string;
  channelName: string;
  shortDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  youtubeSearchQuery: string;
  thumbnailUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0-based
  explanation: string;
  type: 'mcq' | 'true_false' | 'multiple_choice';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface PracticeQuestion {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prompt: string;
  hint: string;
  isCoding?: boolean;
  starterCode?: string;
  expectedOutput?: string;
  testCases?: { input: string; expected: string }[];
  modelSolution: string;
}

export type PracticeItem = PracticeQuestion;

export interface PracticeEvaluationResult {
  scoreOutOf10: number;
  verdict: 'Excellent' | 'Good' | 'Needs Improvement' | 'Incomplete';
  whatWasCorrect: string;
  whatNeedsImprovement: string;
  modelAnswer: string;
  encouragement: string;
}

export interface RoadmapStep {
  stepNumber: number;
  stage: 'Prerequisite' | 'Current Focus' | 'Next Step' | 'Advanced Practice';
  title: string;
  description: string;
  recommendedAction: string;
}

export interface LearningPath {
  topic: string;
  prerequisites: string[];
  currentTopic: string;
  whatToLearnNext: string[];
  practiceRecommendations: string[];
  steps: RoadmapStep[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'ai';
  text: string;
  timestamp: number | string;
  quickActions?: string[];
  topicContext?: string;
}

export interface TopicLearningBundle {
  topic: string;
  language: Language;
  notes: FullNotes;
  examPrep: ExamPrep;
  videos: VideoResource[];
  quiz: QuizQuestion[];
  practice: PracticeQuestion[];
  learningPath: LearningPath;
}

export interface SavedItem {
  id: string;
  type: string;
  topic: string;
  title: string;
  savedAt: number | string;
  contentSnippet?: string;
  data?: unknown;
  fullData?: unknown;
}

export interface StudentProfile {
  id?: string;
  name: string;
  email: string;
  gradeOrCourse?: string;
  preferredLanguage?: Language;
  learningInterests?: string[];
  studyStreakDays: number;
  lastStudyDate?: string;
  dailyGoalMinutes: number;
  dailyGoalProgressMinutes: number;
  quizzesCompleted: number;
  quizAccuracyPercentage: number;
  practiceQuestionsAttempted: number;
  topicsLearnedCount: number;
  solvedPracticeCount?: number;
  completedQuizzesCount?: number;
  averageQuizScore?: number;
  weakAreas: string[];
  learnedTopics?: string[];
  recentTopics: string[];
  completedRoadmapItemIds?: string[];
  activeRoadmap?: CollegeRoadmap;
  savedCareerReport?: CareerDiscoveryReport;
  careerReport?: CareerDiscoveryReport;
}

// -------------------------------------------------------------
// FEATURE 1: AI CAREER DISCOVERY TYPES
// -------------------------------------------------------------
export interface CareerQuestionnaireAnswers {
  academicInterests: string[];
  activityPreferences: string[];
  technologyInterest: 'Very Interested' | 'Interested' | 'Neutral' | 'Less Interested';
  creativityRating: number; // 1-5
  problemSolvingRating: number; // 1-5
  workingStyle: string;
  futureInterest: string;
  learningPreference: string;
}

export interface CareerOption {
  id: string;
  title: string;
  category: string;
  badge: string;
  matchReason: string;
  whatYouWillStudy: string[];
  skillsCommonlyUsed: string[];
  exampleCareerAreas: string[];
  beginnerSkillsToExplore: string[];
  questionsToAskBeforeChoosing: string[];
  mathInvolvement: 'High' | 'Medium' | 'Low';
  techInvolvement: 'High' | 'Medium' | 'Low';
  creativityInvolvement: 'High' | 'Medium' | 'Low';
  practicalWork: 'High' | 'Medium' | 'Low';
  suggestedBeginnerResources: { title: string; type: string; urlQuery: string }[];
  engineeringBranches?: { name: string; focus: string; potentialRoles: string }[];
}

export interface CareerDiscoveryReport {
  summaryAnalysis: string;
  disclaimer: string;
  fields: CareerOption[];
}

// -------------------------------------------------------------
// FEATURE 2: PERSONALIZED COLLEGE ROADMAP TYPES
// -------------------------------------------------------------
export interface RoadmapSetupData {
  degree: string;
  department: string;
  currentYear: string;
  currentSkills: string[];
  careerGoal: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export type RoadmapStage = 
  | 'Foundation' 
  | 'Core Skills' 
  | 'Projects' 
  | 'Specialization' 
  | 'Internship' 
  | 'Placement / Higher Studies';

export interface RoadmapItem {
  id: string;
  topic: string;
  stage: RoadmapStage;
  yearNumber: number;
  whyItMatters: string;
  prerequisites: string[];
  suggestedPractice?: string;
  miniProjectIdea?: string;
  completed: boolean;
}

export interface RoadmapYearBlock {
  yearNumber: number;
  title: string;
  theme: string;
  items: RoadmapItem[];
}

export interface SkillGapReport {
  careerGoal: string;
  strongAreas: string[];
  areasToDevelop: string[];
  suggestedLearningTopics: string[];
  practiceRecommendations: string[];
  disclaimer: string;
}

export interface SmartNextStep {
  topic: string;
  reason: string;
  actionText: string;
}

export interface CollegeRoadmap {
  id: string;
  degree: string;
  department: string;
  currentYear: string;
  careerGoal: string;
  skillLevel: string;
  years: RoadmapYearBlock[];
  smartNextStep: SmartNextStep;
  skillGapAnalysis: SkillGapReport;
  createdAt: string;
}
