'use client';
import { useState, useRef } from 'react';
import { 
  Undo, 
  Redo, 
  Bold, 
  Italic, 
  Underline, 
  Heading1, 
  Heading2, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Save, 
  X, 
  Eye, 
  Check, 
  Sparkles
} from 'lucide-react';

export default function DocumentEditor({ initialContent, onSave, onCancel }) {
  const [content, setContent] = useState(initialContent || '');
  const [history, setHistory] = useState([initialContent || '']);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef(null);

  const updateContent = (newVal) => {
    setContent(newVal);
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(newVal);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIdx > 0) {
      setHistoryIdx(historyIdx - 1);
      setContent(history[historyIdx - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      setHistoryIdx(historyIdx + 1);
      setContent(history[historyIdx + 1]);
    }
  };

  const insertTextAtCursor = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = prefix + selectedText + suffix;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    updateContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 50);
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (onSave) {
      await onSave(content);
    }
    setIsSaving(false);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
      
      {/* Top Toolbar */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        
        {/* Formatting Actions */}
        <div className="flex items-center flex-wrap gap-1">
          <button
            onClick={handleUndo}
            disabled={historyIdx <= 0}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIdx >= history.length - 1}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-800 mx-1" />

          <button
            onClick={() => insertTextAtCursor('**', '**')}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-bold"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTextAtCursor('*', '*')}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors italic"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTextAtCursor('<u>', '</u>')}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors underline"
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-800 mx-1" />

          <button
            onClick={() => insertTextAtCursor('\n\n1. SECTION TITLE\n')}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Add Section Heading"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTextAtCursor('\n   a) ')}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Add Subclause"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-800 mx-1" />

          <button
            onClick={() => insertTextAtCursor('\n   - ')}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTextAtCursor('\n   1) ')}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="py-2 px-3.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            {isSaving ? <Check className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Editor Textarea */}
      <div className="p-6 flex-1 bg-slate-900/60">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => updateContent(e.target.value)}
          rows={22}
          className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-y transition-all"
          placeholder="Edit legal document text..."
        />
      </div>
    </div>
  );
}
