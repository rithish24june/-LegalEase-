'use client';
import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DocumentPreview from '@/components/DocumentPreview';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { 
  Edit3, 
  Download, 
  RotateCcw, 
  FileText, 
  Check, 
  ArrowLeft, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  ShieldAlert,
  Printer
} from 'lucide-react';

function DocumentPreviewContent() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast() || {};
  const docId = params.id;

  const [documentItem, setDocumentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingFormat, setDownloadingFormat] = useState('');

  const loadDocument = async () => {
    setLoading(true);
    try {
      const data = await fetchApi(`/documents/${docId}`);
      setDocumentItem(data);
    } catch (err) {
      console.warn("Using offline fallback mock document preview");
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

  const handleDownload = async (format) => {
    setDownloadingFormat(format);
    try {
      let blob;
      try {
        blob = await fetchApi(`/documents/${docId}/download/${format}`, { method: 'POST' });
      } catch (e) {
        // Direct payload download fallback
        blob = await fetchApi(`/download/${format}`, {
          method: 'POST',
          body: JSON.stringify({
            title: documentItem?.title || 'Legal Document',
            document_type: documentItem?.document_type || 'Agreement',
            content: documentItem?.content || '',
            branding: documentItem?.branding || {}
          })
        });
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(documentItem?.title || 'document').toLowerCase().replace(/\s+/g, '_')}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      if (showToast) showToast(`Document exported as ${format.toUpperCase()} successfully!`, 'success');
    } catch (err) {
      if (showToast) showToast(`Failed to export ${format.toUpperCase()}`, 'error');
    } finally {
      setDownloadingFormat('');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center text-slate-400 text-sm">Loading document preview...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        {/* Main Preview Container */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Top Bar Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white truncate max-w-md">{documentItem?.title}</h1>
                <p className="text-xs text-slate-400">{documentItem?.document_type} • Verified Legal Draft</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="py-2.5 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-medium text-xs flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <button
                onClick={() => router.push(`/editor/${docId}`)}
                className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md flex items-center gap-2 transition-all"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Document</span>
              </button>
            </div>
          </div>

          {/* Split Screen Layout: Left Document Preview, Right Export Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Document Paper Canvas */}
            <div className="lg:col-span-2 space-y-4">
              <DocumentPreview doc={documentItem} />
            </div>

            {/* Right: Export & Controls Panel */}
            <div className="space-y-6">
              
              {/* Export Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-blue-400" />
                    <span>Download & Export</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Export in court-ready formatted file types.</p>
                </div>

                <div className="space-y-3">
                  {/* PDF Download */}
                  <button
                    onClick={() => handleDownload('pdf')}
                    disabled={downloadingFormat === 'pdf'}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4" />
                      <span>Download PDF Document</span>
                    </div>
                    {downloadingFormat === 'pdf' ? (
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Exporting...</span>
                    ) : (
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">PDF</span>
                    )}
                  </button>

                  {/* DOCX Download */}
                  <button
                    onClick={() => handleDownload('docx')}
                    disabled={downloadingFormat === 'docx'}
                    className="w-full py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs border border-slate-700 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      <span>Download Word (DOCX)</span>
                    </div>
                    {downloadingFormat === 'docx' ? (
                      <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-slate-400">Exporting...</span>
                    ) : (
                      <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full font-bold text-slate-400">DOCX</span>
                    )}
                  </button>

                  {/* TXT Download */}
                  <button
                    onClick={() => handleDownload('txt')}
                    disabled={downloadingFormat === 'txt'}
                    className="w-full py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs border border-slate-700 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>Download Plain Text (TXT)</span>
                    </div>
                    {downloadingFormat === 'txt' ? (
                      <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-slate-400">Exporting...</span>
                    ) : (
                      <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full font-bold text-slate-400">TXT</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Controls */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Actions</h4>

                <button
                  onClick={() => router.push(`/create-document?type=${encodeURIComponent(documentItem?.document_type || '')}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-blue-400" />
                    <span>Regenerate Agreement</span>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    if (showToast) showToast('Link copied to clipboard!', 'success');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-indigo-400" />
                    <span>Share Preview Link</span>
                  </div>
                </button>
              </div>

              {/* Security Banner */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-200 leading-relaxed">
                  Verified Legal Document Format. Clauses structured according to standard legal drafting guidelines.
                </p>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default function DocumentPreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
        <div className="text-center text-slate-400 text-sm">Loading LegalEase Preview...</div>
      </div>
    }>
      <DocumentPreviewContent />
    </Suspense>
  );
}
