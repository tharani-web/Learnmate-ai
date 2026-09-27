import React, { useState, useEffect } from 'react';
import { 
  TopicLearningBundle, 
  Language, 
  StudentProfile, 
  SavedItem, 
  ExamQuestion, 
  VideoResource,
  RoadmapSetupData,
  CareerDiscoveryReport,
  CollegeRoadmap
} from './types';
import { DBMS_NORMALIZATION_BUNDLE } from './data/demoTopics';
import { fetchTopicBundle } from './services/api';

import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { TopicHeader } from './components/TopicHeader';
import { FullNotesSection } from './components/FullNotesSection';
import { ExamPrepSection } from './components/ExamPrepSection';
import { VideoSection } from './components/VideoSection';
import { QuizSection } from './components/QuizSection';
import { PracticeSection } from './components/PracticeSection';
import { AiChatSection } from './components/AiChatSection';
import { CareerDiscoveryView } from './components/career/CareerDiscoveryView';
import { CollegeRoadmapView } from './components/roadmap/CollegeRoadmapView';
import { LearningPathModal } from './components/LearningPathModal';
import { SavedItemsModal } from './components/SavedItemsModal';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { ProgressDashboard } from './components/ProgressDashboard';
import { LoginPage } from './components/LoginPage';

export function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home'); // 'home' | 'career' | 'roadmap' | 'learn' | 'exam' | 'videos' | 'quiz' | 'practice' | 'chat' | 'progress' | 'saved'
  const [activePillarSection, setActivePillarSection] = useState<string>('notes'); // 'notes' | 'exam' | 'videos' | 'quiz' | 'practice' | 'chat'

  // Topic & Learning Bundle State
  const [currentTopic, setCurrentTopic] = useState<string>('DBMS Normalization');
  const [bundle, setBundle] = useState<TopicLearningBundle>(DBMS_NORMALIZATION_BUNDLE);
  const [isLoadingBundle, setIsLoadingBundle] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');

  // Chat custom initial prompt & context
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);

  // Roadmap initial setup handshake from career discovery
  const [roadmapInitialSetup, setRoadmapInitialSetup] = useState<RoadmapSetupData | null>(null);

  // Modals
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Student Profile (persisted in localStorage)
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const stored = localStorage.getItem('learnmate_student_profile');
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      id: 'student-demo',
      name: 'Alex Rivera',
      email: 'alex@university.edu',
      gradeOrCourse: 'B.Tech Computer Science',
      studyStreakDays: 6,
      dailyGoalMinutes: 45,
      dailyGoalProgressMinutes: 30,
      quizzesCompleted: 14,
      quizAccuracyPercentage: 86,
      practiceQuestionsAttempted: 32,
      topicsLearnedCount: 8,
      weakAreas: ['BCNF Decomposition', 'Process Synchronization', 'B+ Tree Indexing'],
      recentTopics: ['DBMS Normalization', 'Machine Learning', 'Operating Systems Scheduling', 'Python Loops & Lists'],
    };
  });

  // Saved Items (persisted in localStorage)
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      const stored = localStorage.getItem('learnmate_saved_items');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'save-default-1',
        type: 'notes',
        topic: 'DBMS Normalization',
        title: 'DBMS Normalization - Comprehensive Summary & Flowchart',
        savedAt: Date.now() - 86400000,
        data: DBMS_NORMALIZATION_BUNDLE.notes,
      },
      {
        id: 'save-default-2',
        type: 'question',
        topic: 'DBMS Normalization',
        title: '14-Mark Question: Comprehensive Guide to 1NF through BCNF',
        savedAt: Date.now() - 43200000,
        data: DBMS_NORMALIZATION_BUNDLE.examPrep.fourteenMarkQuestions[0],
      },
    ];
  });

  // Persist Profile & Saved Items
  useEffect(() => {
    try {
      localStorage.setItem('learnmate_student_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('learnmate_saved_items', JSON.stringify(savedItems));
    } catch {}
  }, [savedItems]);

  // Load new topic bundle
  const handleLoadTopic = async (topic: string, defaultSection: string = 'notes') => {
    setIsLoadingBundle(true);
    setCurrentTopic(topic);
    try {
      const newBundle = await fetchTopicBundle(topic, language);
      setBundle(newBundle);

      // Update recent topics and stats
      setProfile((prev) => {
        const updatedRecent = [topic, ...prev.recentTopics.filter((t) => t.toLowerCase() !== topic.toLowerCase())].slice(0, 8);
        return {
          ...prev,
          recentTopics: updatedRecent,
          topicsLearnedCount: Math.max(prev.topicsLearnedCount, updatedRecent.length),
        };
      });

      // Switch to learning view with appropriate pillar
      if (defaultSection === 'quiz') {
        setCurrentTab('learn');
        setActivePillarSection('quiz');
      } else if (defaultSection === 'practice') {
        setCurrentTab('practice');
        setActivePillarSection('practice');
      } else if (defaultSection === 'exam') {
        setCurrentTab('exam');
        setActivePillarSection('exam');
      } else if (defaultSection === 'videos') {
        setCurrentTab('learn');
        setActivePillarSection('videos');
      } else if (defaultSection === 'chat') {
        setCurrentTab('chat');
        setActivePillarSection('chat');
      } else {
        setCurrentTab('learn');
        setActivePillarSection('notes');
      }
    } catch (err) {
      console.error('Error loading topic bundle:', err);
    } finally {
      setIsLoadingBundle(false);
    }
  };

  // Language Change
  const handleLanguageChange = async (newLang: Language) => {
    setLanguage(newLang);
    setIsLoadingBundle(true);
    try {
      const refreshed = await fetchTopicBundle(currentTopic, newLang);
      setBundle(refreshed);
    } finally {
      setIsLoadingBundle(false);
    }
  };

  // Saved items handling
  const handleToggleSaveNotes = () => {
    const existingIndex = savedItems.findIndex(
      (item) => item.type === 'notes' && item.topic.toLowerCase() === currentTopic.toLowerCase()
    );

    if (existingIndex >= 0) {
      setSavedItems(savedItems.filter((_, i) => i !== existingIndex));
    } else {
      const newItem: SavedItem = {
        id: `note-${Date.now()}`,
        type: 'notes',
        topic: currentTopic,
        title: `${currentTopic} - Full Notes`,
        savedAt: Date.now(),
        data: bundle.notes,
      };
      setSavedItems([newItem, ...savedItems]);
    }
  };

  const handleToggleSaveQuestion = (q: ExamQuestion) => {
    const existingIndex = savedItems.findIndex((item) => item.id === q.id);
    if (existingIndex >= 0) {
      setSavedItems(savedItems.filter((item) => item.id !== q.id));
    } else {
      const newItem: SavedItem = {
        id: q.id,
        type: 'question',
        topic: currentTopic,
        title: `${q.marks}M: ${q.question}`,
        savedAt: Date.now(),
        data: q,
      };
      setSavedItems([newItem, ...savedItems]);
    }
  };

  const handleToggleSaveVideo = (video: VideoResource) => {
    const existingIndex = savedItems.findIndex((item) => item.id === video.id);
    if (existingIndex >= 0) {
      setSavedItems(savedItems.filter((item) => item.id !== video.id));
    } else {
      const newItem: SavedItem = {
        id: video.id,
        type: 'video',
        topic: currentTopic,
        title: video.title,
        savedAt: Date.now(),
        data: video,
      };
      setSavedItems([newItem, ...savedItems]);
    }
  };

  const handleRemoveSavedItem = (id: string) => {
    setSavedItems(savedItems.filter((item) => item.id !== id));
  };

  // Nav actions
  const handleNavSelectTab = (tab: string) => {
    if (tab === 'videos') {
      setCurrentTab('learn');
      setActivePillarSection('videos');
      return;
    }
    if (tab === 'quiz') {
      setCurrentTab('learn');
      setActivePillarSection('quiz');
      return;
    }
    if (tab === 'learn') {
      setCurrentTab('learn');
      setActivePillarSection('notes');
      return;
    }
    if (tab === 'exam') {
      setCurrentTab('exam');
      setActivePillarSection('exam');
      return;
    }
    if (tab === 'practice') {
      setCurrentTab('practice');
      setActivePillarSection('practice');
      return;
    }
    if (tab === 'chat') {
      setCurrentTab('chat');
      setActivePillarSection('chat');
      return;
    }
    if (tab === 'saved') {
      setIsSavedModalOpen(true);
      return;
    }
    setCurrentTab(tab);
  };

  const isNotesSaved = savedItems.some(
    (item) => item.type === 'notes' && item.topic.toLowerCase() === currentTopic.toLowerCase()
  );
  const savedQuestionIds = savedItems.filter((item) => item.type === 'question').map((item) => item.id);
  const savedVideoIds = savedItems.filter((item) => item.type === 'video').map((item) => item.id);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Main Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleNavSelectTab}
        language={language}
        onLanguageChange={handleLanguageChange}
        savedItems={savedItems}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        onNavigateToLogin={() => setCurrentTab('login')}
        profile={profile}
      />

      {/* Main Body */}
      <main className="flex-1">
        
        {/* Loading Overlay for Topic Switching */}
        {isLoadingBundle && (
          <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-xs flex items-center justify-center">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-bold text-slate-800">LearnMate AI is preparing your learning bundle...</p>
              <p className="text-xs text-slate-400">Synthesizing notes, exam prep, quizzes, and videos</p>
            </div>
          </div>
        )}

        {/* View 1: Home / Landing Page */}
        {currentTab === 'home' && (
          <HeroSearch
            onSearchTopic={(t) => handleLoadTopic(t, 'notes')}
            isLoading={isLoadingBundle}
            profile={profile}
            onOpenTopic={(t, sec) => handleLoadTopic(t, sec)}
            onNavigateToCareer={() => setCurrentTab('career')}
            onNavigateToRoadmap={() => setCurrentTab('roadmap')}
            onNavigateToLogin={() => setCurrentTab('login')}
          />
        )}

        {/* View 2: Career Discovery (12th Grade & Beyond) */}
        {currentTab === 'career' && (
          <CareerDiscoveryView
            language={language}
            profile={profile}
            onUpdateProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
            onSelectRoadmapWithCareer={(degree, department, goal) => {
              setRoadmapInitialSetup({
                degree: degree || 'B.Tech',
                department: department,
                currentYear: '1st Year',
                currentSkills: ['Basic Python or C', 'High School Mathematics'],
                careerGoal: goal,
                skillLevel: 'Beginner',
              });
              setCurrentTab('roadmap');
            }}
            onAskTutorWithContext={(contextPrompt) => {
              setChatInitialPrompt(contextPrompt);
              setCurrentTab('chat');
              setActivePillarSection('chat');
            }}
            onLearnTopic={(t) => handleLoadTopic(t, 'notes')}
          />
        )}

        {/* View 3: Personalized College Learning Roadmap */}
        {currentTab === 'roadmap' && (
          <CollegeRoadmapView
            language={language}
            profile={profile}
            onUpdateProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
            onLearnTopic={(t) => handleLoadTopic(t, 'notes')}
            onAskTutorWithContext={(contextPrompt) => {
              setChatInitialPrompt(contextPrompt);
              setCurrentTab('chat');
              setActivePillarSection('chat');
            }}
            initialSetupData={roadmapInitialSetup}
          />
        )}

        {/* View 4: Learning Hub (With 6 Pillars & Sticky Topic Header) */}
        {(currentTab === 'learn' || currentTab === 'exam' || currentTab === 'practice' || currentTab === 'chat') && (
          <div>
            <TopicHeader
              topic={currentTopic}
              activeSection={activePillarSection}
              onSelectSection={(sec) => {
                setActivePillarSection(sec);
                if (sec === 'notes' || sec === 'videos' || sec === 'quiz') setCurrentTab('learn');
                if (sec === 'exam') setCurrentTab('exam');
                if (sec === 'practice') setCurrentTab('practice');
                if (sec === 'chat') setCurrentTab('chat');
              }}
              onOpenRoadmap={() => setIsRoadmapOpen(true)}
              onBookmarkTopic={handleToggleSaveNotes}
              isBookmarked={isNotesSaved}
              onBackToHome={() => setCurrentTab('home')}
              language={language}
            />

            {/* Active Learning Pillar Rendering */}
            <div className="pb-16">
              {activePillarSection === 'notes' && (
                <FullNotesSection
                  notes={bundle.notes}
                  onSaveNotes={handleToggleSaveNotes}
                  isSaved={isNotesSaved}
                />
              )}

              {activePillarSection === 'exam' && (
                <ExamPrepSection
                  examPrep={bundle.examPrep}
                  onSaveQuestion={handleToggleSaveQuestion}
                  savedQuestionIds={savedQuestionIds}
                />
              )}

              {activePillarSection === 'videos' && (
                <VideoSection
                  videos={bundle.videos}
                  topic={currentTopic}
                  onSaveVideo={handleToggleSaveVideo}
                  savedVideoIds={savedVideoIds}
                />
              )}

              {activePillarSection === 'quiz' && (
                <QuizSection
                  quiz={bundle.quiz}
                  topic={currentTopic}
                  onNavigateToPractice={() => {
                    setActivePillarSection('practice');
                    setCurrentTab('practice');
                  }}
                  onNavigateToChatWithPrompt={(prompt) => {
                    setChatInitialPrompt(prompt);
                    setActivePillarSection('chat');
                    setCurrentTab('chat');
                  }}
                  onQuizCompleted={(score, total) => {
                    setProfile((prev) => ({
                      ...prev,
                      quizzesCompleted: prev.quizzesCompleted + 1,
                      dailyGoalProgressMinutes: Math.min(prev.dailyGoalMinutes, prev.dailyGoalProgressMinutes + 15),
                    }));
                  }}
                />
              )}

              {activePillarSection === 'practice' && (
                <PracticeSection
                  practiceItems={bundle.practice}
                  topic={currentTopic}
                  onPracticeCompleted={() => {
                    setProfile((prev) => ({
                      ...prev,
                      practiceQuestionsAttempted: prev.practiceQuestionsAttempted + 1,
                      dailyGoalProgressMinutes: Math.min(prev.dailyGoalMinutes, prev.dailyGoalProgressMinutes + 10),
                    }));
                  }}
                />
              )}

              {activePillarSection === 'chat' && (
                <AiChatSection
                  topic={currentTopic}
                  language={language}
                  initialPrompt={chatInitialPrompt}
                />
              )}
            </div>
          </div>
        )}

        {/* View 5: Progress & Student Dashboard */}
        {currentTab === 'progress' && (
          <ProgressDashboard
            profile={profile}
            onOpenTopic={(t, sec) => handleLoadTopic(t, sec)}
            onQuickPractice={() => {
              setCurrentTab('practice');
              setActivePillarSection('practice');
            }}
            onNavigateToCareer={() => setCurrentTab('career')}
            onNavigateToRoadmap={() => setCurrentTab('roadmap')}
          />
        )}

        {/* View 6: Dedicated Student Login & Registration Page */}
        {currentTab === 'login' && (
          <LoginPage
            currentProfile={profile}
            onLoginSuccess={(newProfile) => {
              setProfile(newProfile);
              try {
                localStorage.setItem('learnmate_student_profile', JSON.stringify(newProfile));
              } catch {}
              setCurrentTab('home');
            }}
            onLogout={() => {
              const guestProfile: StudentProfile = {
                id: 'guest-learner',
                name: 'Guest Learner',
                email: 'guest@learnmate.ai',
                gradeOrCourse: 'Academic Student',
                studyStreakDays: 1,
                dailyGoalMinutes: 30,
                dailyGoalProgressMinutes: 10,
                quizzesCompleted: 0,
                quizAccuracyPercentage: 0,
                practiceQuestionsAttempted: 0,
                topicsLearnedCount: 1,
                weakAreas: ['Getting Started'],
                recentTopics: ['DBMS Normalization'],
              };
              setProfile(guestProfile);
              try {
                localStorage.removeItem('learnmate_student_profile');
              } catch {}
            }}
            onBackToHome={() => setCurrentTab('home')}
          />
        )}

      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 font-display">LearnMate AI</span>
            <span>•</span>
            <span>“Learn Smarter. Prepare Better. Practice Better.”</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Server-side Gemini AI</span>
            <span>•</span>
            <span>University Syllabus Aligned</span>
            <span>•</span>
            <span>Bilingual (English / தமிழ்)</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LearningPathModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        learningPath={bundle.learningPath}
      />

      <SavedItemsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedItems={savedItems}
        onRemoveItem={handleRemoveSavedItem}
        onSelectTopic={(t, sec) => handleLoadTopic(t, sec)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        profile={profile}
        onSaveProfile={(p) => {
          setProfile(p);
          try {
            localStorage.setItem('learnmate_student_profile', JSON.stringify(p));
          } catch {}
        }}
        onNavigateToLoginPage={() => setCurrentTab('login')}
        onLogout={() => {
          setProfile({
            id: 'guest',
            name: 'Guest Learner',
            email: '',
            gradeOrCourse: 'Academic Student',
            studyStreakDays: 1,
            dailyGoalMinutes: 30,
            dailyGoalProgressMinutes: 10,
            quizzesCompleted: 0,
            quizAccuracyPercentage: 0,
            practiceQuestionsAttempted: 0,
            topicsLearnedCount: 1,
            weakAreas: ['Getting Started'],
            recentTopics: ['DBMS Normalization'],
          });
        }}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectTopic={(t) => handleLoadTopic(t, 'notes')}
      />

    </div>
  );
}

export default App;
