import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Lightbulb, 
  RotateCcw, 
  BookOpen, 
  FileText, 
  Dumbbell, 
  CheckCircle2, 
  Copy, 
  Check 
} from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { sendChatMessage } from '../services/api';

interface AiChatSectionProps {
  topic: string;
  language: Language;
  initialPrompt?: string;
}

export const AiChatSection: React.FC<AiChatSectionProps> = ({
  topic,
  language,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Hello! I am your **LearnMate AI Tutor**. I am ready to help you master **${topic}**.\n\nYou can ask me for simple explanations, code walk-throughs, math derivations, or use one of the quick prompt buttons below!`,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: 'Explain simply', action: 'Explain Simply' },
    { label: 'Give an example', action: 'Give Example' },
    { label: '14-mark answer', action: '14-Mark Answer' },
    { label: 'Ask me questions', action: 'Ask Me Questions' },
    { label: 'Summarize', action: 'Summarize' },
    { label: 'Give practice', action: 'Give Practice' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // If initialPrompt passed, send it automatically
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string, quickAction?: string) => {
    const text = textToSend || input.trim();
    if (!text && !quickAction) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text || `Please ${quickAction}`,
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const replyText = await sendChatMessage(topic, newHistory, quickAction, language);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: Date.now(),
      };
      setMessages([...newHistory, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Chat reset! What would you like to explore regarding **${topic}**?`,
        timestamp: Date.now(),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Chat Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md flex flex-col h-[700px] overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/90 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">LearnMate AI Tutor</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-indigo-200 truncate max-w-xs sm:max-w-md">
                Topic: <strong className="text-white">{topic}</strong> • Adaptive Academic Reasoning
              </p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-2 pr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            Quick:
          </span>
          {quickPrompts.map((btn, idx) => (
            <button
              key={idx}
              id={`quick-prompt-${idx}`}
              onClick={() => handleSendMessage('', btn.action)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold whitespace-nowrap transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs group relative ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line prose prose-slate max-w-none text-inherit">
                    {msg.text}
                  </div>

                  {/* Copy Button for Assistant responses */}
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy Answer"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 flex items-center gap-2 text-xs text-slate-500 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 font-medium">LearnMate AI is synthesizing explanation...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-chat-input-box"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask a question about ${topic}...`}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
            <button
              id="ai-chat-send-btn"
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white shadow-xs transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
            <span>Ask for easier explanations, derivations, or exam tips.</span>
            <span>Language: {language === 'ta' ? 'தமிழ்' : 'English'}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
