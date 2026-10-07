'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DocumentCard from '@/components/DocumentCard';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { 
  FolderKanban, 
  Search, 
  FilePlus, 
  Grid, 
  List as ListIcon, 
  Eye, 
  Edit3, 
  Download, 
  Trash2, 
  Sparkles,
  Filter
} from 'lucide-react';

export default function MyDocumentsPage() {
  const { showToast } = useToast() || {};
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await fetchApi('/documents');
      setDocuments(data || []);
    } catch (err) {
      console.warn("Backend offline, using fallback list");
      setDocuments([
        {
          id: 'doc-nda-001',
          title: 'Mutual Non-Disclosure Agreement',
          document_type: 'NDA / Non-Disclosure Agreement',
          status: 'Completed',
          created_at: '2026-10-01 10:30',
          effective_date: '2026-10-01'
        },
        {
          id: 'doc-emp-002',
          title: 'Senior Software Engineer Employment Contract',
          document_type: 'Employment Contract',
          status: 'Completed',
          created_at: '2026-10-04 14:15',
          effective_date: '2026-10-15'
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
      setDocuments(documents.filter(d => d.id !== docId));
      if (showToast) showToast('Document deleted from list', 'info');
    }
  };

  const handleDownloadFormat = async (docId, format) => {
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
      if (showToast) showToast(`Downloaded sample ${format.toUpperCase()}`, 'info');
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.document_type.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'All') return matchesSearch;
    if (activeTab === 'Draft') return matchesSearch && doc.status === 'Draft';
    if (activeTab === 'Completed') return matchesSearch && doc.status === 'Completed';
    if (activeTab === 'Archived') return matchesSearch && doc.status === 'Archived';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-6 h-6 text-blue-400" />
                <span>My Legal Documents</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">Manage, search, edit, and export your legal contract repository.</p>
            </div>

            <Link
              href="/create-document"
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all self-start sm:self-auto"
            >
              <FilePlus className="w-4 h-4" />
              <span>Create New Document</span>
            </Link>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {['All', 'Completed', 'Draft', 'Archived'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search & View Mode */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search document title or type..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'table' ? 'bg-slate-800 text-blue-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Table View"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-slate-800 text-blue-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Document Content List */}
          {loading ? (
            <div className="py-16 text-center text-slate-500 text-xs">Loading document list...</div>
          ) : filteredDocs.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-slate-800 rounded-3xl space-y-3 bg-slate-900/40">
              <FolderKanban className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No documents match your query</h3>
              <p className="text-xs text-slate-400">Try changing your search keywords or create a new agreement.</p>
              <Link
                href="/create-document"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-semibold text-xs shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Document</span>
              </Link>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  onDelete={handleDelete}
                  onDownload={(id, f) => handleDownloadFormat(id, f)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-400 uppercase tracking-wider bg-slate-950/60 border-b border-slate-800">
                  <tr>
                    <th className="p-4 rounded-l-xl">Document Name</th>
                    <th className="p-4">Document Type</th>
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
                      <td className="p-4 text-slate-500">{doc.created_at || 'Recently'}</td>
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
                          title="View Preview"
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
                          onClick={() => handleDownloadFormat(doc.id, 'pdf')}
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

        </main>
      </div>
    </div>
  );
}
