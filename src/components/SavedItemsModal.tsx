import React from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  FileText, 
  BookOpen, 
  Video, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { SavedItem } from '../types';

interface SavedItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedItem[];
  onRemoveItem: (id: string) => void;
  onSelectTopic: (topic: string, section?: string) => void;
}

export const SavedItemsModal: React.FC<SavedItemsModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  onRemoveItem,
  onSelectTopic,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyContent = (item: SavedItem) => {
    let text = `${item.title} (${item.topic})\n\n`;
    if (item.type === 'notes') {
      text += (item.data as any)?.summary || 'Full Study Notes';
    } else if (item.type === 'question') {
      text += (item.data as any)?.answer || 'Exam Answer';
    }
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Bookmark className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">My Saved Content & Notes</h3>
              <p className="text-xs text-slate-400">{savedItems.length} items bookmarked</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Saved Items */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {savedItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium">No saved notes or answers yet.</p>
              <p className="text-xs">Bookmark any notes, questions, or topics to view them here.</p>
            </div>
          ) : (
            savedItems.map((item) => {
              const Icon = item.type === 'notes' ? BookOpen : item.type === 'question' ? FileText : Video;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-200 bg-slate-50/60 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {item.type}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-600">{item.topic}</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h5>
                    <span className="text-[11px] text-slate-400">
                      Saved on {new Date(item.savedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopyContent(item)}
                      title="Copy content"
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectTopic(item.topic, item.type === 'notes' ? 'notes' : item.type === 'question' ? 'exam' : 'videos');
                      }}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <span>Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove from saved"
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">Stored in local browser storage</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
