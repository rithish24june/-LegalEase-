'use client';
import Link from 'next/link';
import { 
  FileText, 
  ShieldAlert, 
  Building2, 
  Briefcase, 
  FileCheck2, 
  UserCheck, 
  ScrollText, 
  FilePlus2,
  Eye, 
  Edit3, 
  Download, 
  Trash2, 
  Calendar,
  MoreVertical
} from 'lucide-react';
import { useState } from 'react';

export default function DocumentCard({ doc, isTemplate = false, onSelect, onDelete, onDownload }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getDocIcon = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('employment') && !t.includes('offer')) return Briefcase;
    if (t.includes('nda') || t.includes('disclosure')) return ShieldAlert;
    if (t.includes('lease')) return Building2;
    if (t.includes('freelance')) return FileCheck2;
    if (t.includes('service')) return ScrollText;
    if (t.includes('offer')) return UserCheck;
    return FileText;
  };

  const Icon = getDocIcon(doc.document_type || doc.name);

  if (isTemplate) {
    return (
      <div className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              {doc.name || doc.document_type}
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {doc.description || 'Generate legal document with AI-assisted clause generation.'}
            </p>
          </div>
        </div>

        <div className="pt-6 mt-4 border-t border-slate-800/80">
          <button
            onClick={() => onSelect && onSelect(doc)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Create Document</span>
            <FilePlus2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition-all hover:shadow-xl flex flex-col justify-between relative group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
              doc.status === 'Completed'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
            }`}
          >
            {doc.status || 'Completed'}
          </span>
        </div>

        <h4 className="text-base font-semibold text-white truncate mb-1" title={doc.title}>
          {doc.title}
        </h4>
        <p className="text-xs text-slate-400 mb-3">{doc.document_type}</p>

        <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>{doc.created_at || 'Just now'}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <Link
          href={`/preview/${doc.id}`}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span>View</span>
        </Link>
        <Link
          href={`/editor/${doc.id}`}
          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Edit</span>
        </Link>
        
        <button
          onClick={() => onDelete && onDelete(doc.id)}
          className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
          title="Delete document"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
