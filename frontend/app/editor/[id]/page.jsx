'use client';
import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DocumentEditor from '@/components/DocumentEditor';
import DocumentPreview from '@/components/DocumentPreview';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { 
  ArrowLeft, 
  Eye, 
  Download, 
  Save, 
  Check, 
  Sparkles, 
  Columns, 
  FileText
} from 'lucide-react';

function DocumentEditorContent() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast() || {};
  const docId = params.id;

  const [documentItem, setDocumentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('split'); // 'editor', 'preview', 'split'

  const loadDocument = async () => {
    setLoading(true);
    try {
      const data = await fetchApi(`/documents/${docId}`);
      setDocumentItem(data);
    } catch (err) {
      console.warn("Using fallback mock document in editor");
      setDocumentItem({
        id: docId,
        title: 'Mutual Non-Disclosure Agreement',
        document_type: 'NDA / Non-Disclosure Agreement',
        effective_date: 'October 01, 2026',
        jurisdiction: 'State of New York, USA',
        branding: {
          company_name: 'Apex Innovations Inc.',
          company_address: '100 Tech Plaza, New York, NY',
          footer_text: 'Confidential & Proprietary - Apex Innovations'
        },
        content: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of October 01, 2026 ("Effective Date"), by and between:

Party 1: Apex Innovations Inc. ("Disclosing Party")
Party 2: Vanguard Solutions LLC ("Receiving Party")

1. PURPOSE OF DISCLOSURE
The Parties wish to explore a potential business relationship ("Purpose") and in connection with this Purpose, each party may disclose to the other certain confidential technical and business information.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means all information disclosed by a Party ("Disclosing Party") to the other Party ("Receiving Party"), whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential.

3. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees:
   a) To hold Confidential Information in strict confidence using at least reasonable care.
   b) Not to disclose Confidential Information to any third party without prior written consent.
   c) To use Confidential Information solely for the Purpose described herein.

4. TERM AND TERMINATION
This Agreement shall remain in effect for a period of three (3) years from the Effective Date.

5. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of New York, USA.

IN WITNESS WHEREOF, the parties hereto have executed this Mutual Non-Disclosure Agreement.

____________________________________          ____________________________________
Apex Innovations Inc.                         Vanguard Solutions LLC
Authorized Representative                    Authorized Representative

----------------------------------------------------------------------------------------------------
DISCLAIMER: This document was generated using LegalEase AI for informational and drafting purposes. Review with qualified legal counsel before execution.`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (docId) loadDocument();
  }, [docId]);

  const handleSaveContent = async (newContent) => {
    try {
      await fetchApi(`/documents/${docId}`, {
        method: 'PUT',
        body: JSON.stringify({
          content: newContent
        })
      });
      setDocumentItem(prev => ({ ...prev, content: newContent }));
      if (showToast) showToast('Document changes saved successfully!', 'success');
    } catch (err) {
      setDocumentItem(prev => ({ ...prev, content: newContent }));
      if (showToast) showToast('Saved locally!', 'success');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center text-slate-400 text-sm">Loading document editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        {/* Main Editor Container */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Top Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(`/preview/${docId}`)}
                className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white truncate max-w-md">{documentItem?.title}</h1>
                <p className="text-xs text-slate-400">Legal Content Editor & Live Sync</p>
              </div>
            </div>

            {/* View Mode Toggle & Preview Button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-2xl">
                <button
                  onClick={() => setViewMode('editor')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors ${
                    viewMode === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Editor
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`hidden lg:block py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors ${
                    viewMode === 'split' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors ${
                    viewMode === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Paper Preview
                </button>
              </div>

              <button
                onClick={() => router.push(`/preview/${docId}`)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Full Preview</span>
              </button>
            </div>
          </div>

          {/* Main Editing View Area */}
          <div className="w-full">
            {viewMode === 'editor' && (
              <DocumentEditor
                initialContent={documentItem?.content}
                onSave={handleSaveContent}
                onCancel={() => router.push(`/preview/${docId}`)}
              />
            )}

            {viewMode === 'preview' && (
              <DocumentPreview doc={documentItem} />
            )}

            {viewMode === 'split' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <DocumentEditor
                  initialContent={documentItem?.content}
                  onSave={handleSaveContent}
                  onCancel={() => router.push(`/preview/${docId}`)}
                />
                <div className="sticky top-24">
                  <DocumentPreview doc={documentItem} />
                </div>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}

export default function DocumentEditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
        <div className="text-center text-slate-400 text-sm">Loading LegalEase Editor...</div>
      </div>
    }>
      <DocumentEditorContent />
    </Suspense>
  );
}
