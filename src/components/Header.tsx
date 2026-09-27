import React, { useState } from 'react';
import { 
  Home,
  Compass,
  Map,
  BookOpen, 
  FileText, 
  Video,
  Brain,
  Dumbbell, 
  MessageSquare,
  BarChart3, 
  Bookmark, 
  Globe, 
  Menu, 
  X,
  Search,
  User as UserIcon,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { Language, StudentProfile, SavedItem } from '../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  savedItems: SavedItem[];
  onOpenSavedModal: () => void;
  onOpenAuthModal: () => void;
  onOpenSearchModal: () => void;
  onNavigateToLogin: () => void;
  profile: StudentProfile | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
  savedItems,
  onOpenSavedModal,
  onOpenAuthModal,
  onOpenSearchModal,
  onNavigateToLogin,
  profile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'career', label: 'Career Discovery', icon: Compass, highlight: true },
    { id: 'roadmap', label: 'My Roadmap', icon: Map, highlight: true },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'exam', label: 'Exam Prep', icon: FileText },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'quiz', label: 'Quiz', icon: Brain },
    { id: 'practice', label: 'Practice', icon: Dumbbell },
    { id: 'chat', label: 'AI Tutor', icon: MessageSquare },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'saved', label: 'Saved', icon: Bookmark, badgeCount: savedItems.length },
  ];

  const handleNavClick = (tabId: string) => {
    if (tabId === 'saved') {
      onOpenSavedModal();
    } else {
      onSelectTab(tabId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top ambient color stripe */}
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            id="app-header-logo"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                  LearnMate<span className="text-indigo-600">.ai</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/80">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5 text-indigo-600" />
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden lg:block tracking-tight">
                Learn Smarter. Prepare Better. Practice Better.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/20'
                      : item.highlight
                      ? 'text-indigo-950 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.id === 'career' && !isActive && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-indigo-100 text-indigo-700 uppercase">
                      12th+
                    </span>
                  )}
                  {Boolean(item.badgeCount && item.badgeCount > 0) && (
                    <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                      isActive ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'
                    }`}>
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Medium Screen (md to xl) Quick Access Nav */}
          <nav className="hidden md:flex xl:hidden items-center gap-1">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'career', label: 'Career', icon: Compass },
              { id: 'roadmap', label: 'Roadmap', icon: Map },
              { id: 'learn', label: 'Learn', icon: BookOpen },
              { id: 'exam', label: 'Exam', icon: FileText },
              { id: 'practice', label: 'Practice', icon: Dumbbell },
              { id: 'chat', label: 'AI Tutor', icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-md-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Quick Search Button with keyboard shortcut style */}
            <button
              id="header-search-btn"
              onClick={onOpenSearchModal}
              title="Search topics, notes & questions (Cmd+K)"
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-500 hover:text-indigo-600 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-lg transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white border border-slate-200 text-slate-400 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <button
                id="language-selector-btn"
                onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
                title={`Current: ${language === 'en' ? 'English' : 'Tamil (தமிழ்)'}. Click to switch.`}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>{language === 'en' ? 'EN' : 'தமிழ்'}</span>
              </button>
            </div>

            {/* Bookmarks Quick Icon */}
            <button
              id="saved-content-btn"
              onClick={onOpenSavedModal}
              title="My Saved Notes & Answers"
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              {savedItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {savedItems.length}
                </span>
              )}
            </button>

            {/* Profile / Auth Button */}
            {profile && profile.id !== 'guest-learner' ? (
              <div className="flex items-center gap-1.5">
                <button
                  id="student-profile-btn"
                  onClick={onOpenAuthModal}
                  title={`${profile.name} (${profile.gradeOrCourse}) - Click to manage profile`}
                  className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 transition-all text-xs font-semibold"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block max-w-[85px] truncate">
                    {profile.name}
                  </span>
                </button>
                <button
                  id="switch-account-btn"
                  onClick={onNavigateToLogin}
                  title="Switch student account or view login page"
                  className="hidden md:inline-flex text-[11px] font-medium text-slate-500 hover:text-indigo-600 px-1.5 py-1 rounded hover:bg-slate-100 transition-colors"
                >
                  Account
                </button>
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={onNavigateToLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg max-h-[85vh] overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Main Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {Boolean(item.badgeCount && item.badgeCount > 0) && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                    {item.badgeCount}
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
            <span>Preferred Language:</span>
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
              className="font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg"
            >
              {language === 'en' ? 'English (EN)' : 'Tamil (தமிழ்)'}
            </button>
          </div>

          <div className="pt-2 px-3">
            <button
              onClick={() => {
                onNavigateToLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span>{profile && profile.id !== 'guest-learner' ? 'Manage Account / Switch' : 'Student Sign In / Register'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
