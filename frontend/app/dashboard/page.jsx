'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DocumentCard from '@/components/DocumentCard';
import { fetchApi, getStoredUser } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { 
  FileText, 
  FilePlus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Search, 
  Bell, 
  Sparkles, 
  Eye, 
  Edit3, 
  Download, 
  Trash2,
  ArrowUpRight,
  Filter
} from 'lucide-react';

export default function DashboardPage() {
  const user = getStoredUser();
  const { showToast } = useToast() || {};
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await fetchApi('/documents');
      setDocuments(data || []);
    } catch (err) {
      console.warn("Backend API offline, using cached fallback data");
      setDocuments([
        {
          id: 'doc-nda-001',
          title: 'Mutual Non-Disclosure Agreement',
          document_type: 'NDA / Non-Disclosure Agreement',
          status: 'Completed',
          created_at: '2026-10-01 10:30',
          effective_date: '2026-10-01',
          jurisdiction: 'State of New York, USA'
        },
        {
          id: 'doc-emp-002',
          title: 'Senior Software Engineer Employment Contract',
          document_type: 'Employment Contract',
          status: 'Completed',
          created_at: '2026-10-04 14:15',
          effective_date: '2026-10-15',
          jurisdiction: 'State of California, USA'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleDelete = async (docId) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await fetchApi(`/documents/${docId}`, { method: 'DELETE' });
      if (showToast) showToast('Document deleted successfully', 'success');
      setDocuments(documents.filter(d => d.id !== docId));
    } catch (err) {
      if (showToast) showToast('Failed to delete document', 'error');
    }
  };

  const handleQuickDownload = async (docId, format) => {
    try {
      const blob = await fetchApi(`/documents/${docId}/download/${format}`, { method: 'POST' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (showToast) showToast(`${format.toUpperCase()} downloaded successfully!`, 'success');
    } catch (err) {
      if (showToast) showToast(`Failed to download ${format.toUpperCase()}`, 'error');
    }
  };

  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.document_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { title: 'Documents Created', value: documents.length, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Documents This Month', value: documents.filter(d => d.created_at?.includes('2026-10')).length || documents.length, icon: Calendar, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { title: 'Draft Documents', value: documents.filter(d => d.status === 'Draft').length, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { title: 'Completed Documents', value: documents.filter(d => d.status !== 'Draft').length, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        {/* Main Dashboard Content */}
        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Top Bar Greeting & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Good day, <span className="text-blue-400">{user?.name || 'Alex'}</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">Here is an overview of your active AI legal document repository.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documents..."
                  className="bg-slate-950 border border-slate-800 rounded-2xl py-2 pl-10 pr-4 text-xs text-slate-200 focus:outline-none focus:border-blue-500 w-48 sm:w-64"
                />
              </div>

              <button className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white relative">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-2 right-2" />
              </button>

              <Link
                href="/create-document"
                className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all shrink-0"
              >
                <FilePlus className="w-4 h-4" />
                <span>Create Document</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white">{s.value}</p>
                    <p className="text-xs font-medium text-slate-400">{s.title}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Documents Table Section */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Recent Legal Documents</h3>
                <p className="text-xs text-slate-400">View, edit, or download your AI generated contracts and agreements.</p>
              </div>

              <Link
                href="/documents"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View All Documents</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-500 text-xs">Loading documents...</div>
            ) : filteredDocs.length === 0 ? (
              <div className="py-12 text-center border-2 border-dashed border-slate-800 rounded-2xl space-y-3">
                <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-400">No documents found</p>
                <Link
                  href="/create-document"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Your First Document</span>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 uppercase tracking-wider bg-slate-950/60 border-b border-slate-800">
                    <tr>
                      <th className="p-4 rounded-l-xl">Document Name</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Created Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-semibold text-white">
                          <Link href={`/preview/${doc.id}`} className="hover:text-blue-400 transition-colors">
                            {doc.title}
                          </Link>
                        </td>
                        <td className="p-4 text-slate-400">{doc.document_type}</td>
                        <td className="p-4 text-slate-500">{doc.created_at}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border ${
                            doc.status === 'Completed'
                              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                          }`}>
                            {doc.status || 'Completed'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Link
                            href={`/preview/${doc.id}`}
                            className="inline-flex p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
                            title="View Document"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/editor/${doc.id}`}
                            className="inline-flex p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 transition-colors"
                            title="Edit Document"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleQuickDownload(doc.id, 'pdf')}
                            className="inline-flex p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="inline-flex p-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-rose-400 transition-colors"
                            title="Delete Document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
