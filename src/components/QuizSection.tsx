import React, { useState } from 'react';
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  Target, 
  Award, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Dumbbell
} from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizSectionProps {
  quiz: QuizQuestion[];
  topic: string;
  onNavigateToPractice: () => void;
  onNavigateToChatWithPrompt: (prompt: string) => void;
  onQuizCompleted?: (score: number, total: number) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  quiz,
  topic,
  onNavigateToPractice,
  onNavigateToChatWithPrompt,
  onQuizCompleted,
}) => {
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(10);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [answersState, setAnswersState] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Filter questions based on count and difficulty
  const eligibleQuestions = quiz
    .filter((q) => selectedDifficulty === 'All' || q.difficulty === selectedDifficulty)
    .slice(0, questionCountLimit);

  const activeQuestion = eligibleQuestions[currentIndex] || eligibleQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeQuestion) return;
    const isCorrect = selectedOption === activeQuestion.correctAnswerIndex;
    setIsAnswerSubmitted(true);
    setAnswersState((prev) => ({
      ...prev,
      [currentIndex]: { selected: selectedOption, isCorrect },
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < eligibleQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      // calculate score
      const correctCount = Object.values(answersState).filter((a) => a.isCorrect).length;
      if (onQuizCompleted) {
        onQuizCompleted(correctCount, eligibleQuestions.length);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAnswersState({});
    setIsFinished(false);
  };

  // Summary Metrics
  const totalAnswered = Object.keys(answersState).length;
  const correctAnswersCount = Object.values(answersState).filter((a) => a.isCorrect).length;
  const incorrectAnswersCount = totalAnswered - correctAnswersCount;
  const percentage = eligibleQuestions.length > 0 ? Math.round((correctAnswersCount / eligibleQuestions.length) * 100) : 0;

  const performanceFeedback =
    percentage >= 80
      ? 'Excellent Mastery! You have a solid grasp of this topic.'
      : percentage >= 60
      ? 'Good Effort! A few key areas need revision before the exam.'
      : 'Needs Attention! Review the Full Notes and practice weak concepts.';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Quiz Controls Header */}
      {!isFinished && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Knowledge Validation
            </span>
            <h3 className="text-lg font-bold text-slate-900">Review & Quiz: {topic}</h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Number of Questions Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {[5, 10, 15].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => {
                    setQuestionCountLimit(cnt);
                    handleRestartQuiz();
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    questionCountLimit === cnt ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {cnt} Qs
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => {
                    setSelectedDifficulty(diff);
                    handleRestartQuiz();
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedDifficulty === diff ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Finished Summary Dashboard */}
      {isFinished ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">Quiz Completed!</h3>
            <p className="text-sm text-slate-500 mt-1">Topic: {topic}</p>
          </div>

          {/* Big Score Card */}
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-4xl font-extrabold text-slate-900">
              {correctAnswersCount} <span className="text-xl text-slate-400 font-normal">/ {eligibleQuestions.length}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
              {percentage}% Overall Score
            </div>
            <p className="text-xs text-slate-600 mt-3 font-medium">
              {performanceFeedback}
            </p>
          </div>

          {/* Breakdown Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto text-center">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-lg font-bold text-emerald-700">{correctAnswersCount}</span>
              <span className="text-[11px] text-emerald-800 block">Correct</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
              <span className="text-lg font-bold text-rose-700">{incorrectAnswersCount}</span>
              <span className="text-[11px] text-rose-800 block">Incorrect</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
              <span className="text-lg font-bold text-blue-700">{eligibleQuestions.length}</span>
              <span className="text-[11px] text-blue-800 block">Questions</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-lg font-bold text-amber-700">{percentage >= 70 ? 'Pass' : 'Review'}</span>
              <span className="text-[11px] text-amber-800 block">Status</span>
            </div>
          </div>

          {/* Weak Areas & Recommendations */}
          <div className="max-w-md mx-auto p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 mb-1">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Diagnostic Recommendations:</span>
            </div>
            <p className="text-xs text-slate-600">
              {percentage >= 80
                ? 'Ready for exam questions! Head over to the Practice tab to solve university problems.'
                : 'Focus on reviewing the 3NF and BCNF definitions and functional dependency rules in Full Notes.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <button
              onClick={onNavigateToPractice}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Practice Weak Areas</span>
            </button>

            <button
              onClick={() => onNavigateToChatWithPrompt(`I scored ${correctAnswersCount}/${eligibleQuestions.length} on the ${topic} quiz. Can you explain the concepts I might have missed?`)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      ) : activeQuestion ? (
        /* Active Question Card */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5">
            <div
              className="bg-indigo-600 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / eligibleQuestions.length) * 100}%` }}
            />
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Question Subheader */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 tracking-wider">
                QUESTION {currentIndex + 1} OF {eligibleQuestions.length}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize">
                {activeQuestion.difficulty} • {activeQuestion.type === 'true_false' ? 'True / False' : 'Multiple Choice'}
              </span>
            </div>

            {/* Question Title */}
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {activeQuestion.question}
            </h4>

            {/* Options List */}
            <div className="space-y-2.5">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeQuestion.correctAnswerIndex;

                let optionStyles = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-700';
                if (isSelected && !isAnswerSubmitted) {
                  optionStyles = 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-semibold ring-2 ring-indigo-100';
                }
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-2 ring-emerald-100';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                  } else {
                    optionStyles = 'border-slate-200 opacity-60 text-slate-400';
                  }
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${optionStyles}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation Callout when submitted */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 animate-in fade-in duration-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <span>Answer Explanation:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeQuestion.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                {isAnswerSubmitted ? 'Answer validated' : 'Choose one option'}
              </span>

              {!isAnswerSubmitted ? (
                <button
                  id="quiz-submit-answer-btn"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  id="quiz-next-question-btn"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <span>{currentIndex + 1 === eligibleQuestions.length ? 'Show Results' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
          No questions match the selected filter.
        </div>
      )}

    </div>
  );
};
