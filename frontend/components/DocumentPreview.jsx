'use client';
import { Scale, Building2, Calendar, MapPin, ShieldCheck } from 'lucide-react';

export default function DocumentPreview({ doc }) {
  if (!doc) return null;

  const content = doc.content || '';
  const branding = doc.branding || {};
  const companyName = branding.company_name || '';
  const logoUrl = branding.logo_url || '';
  const footerText = branding.footer_text || '';

  const lines = content.split('\n');

  return (
    <div className="w-full bg-slate-200/50 p-4 sm:p-8 rounded-2xl flex justify-center overflow-x-auto border border-slate-300/40 shadow-inner">
      <div className="w-full max-w-3xl bg-white text-slate-900 min-h-[1050px] p-8 sm:p-12 shadow-2xl rounded-sm font-serif border border-slate-300 relative flex flex-col justify-between">
        
        {/* Paper Header */}
        <div>
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4 mb-8">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-10 w-auto max-w-[140px] object-contain" />
              ) : (
                <div className="w-10 h-10 rounded bg-slate-900 text-white flex items-center justify-center font-sans font-bold text-lg">
                  {companyName ? companyName.charAt(0) : 'L'}
                </div>
              )}
              <div>
                <h3 className="font-sans font-bold text-sm text-slate-900 uppercase tracking-wider">
                  {companyName || 'LEGAL DOCUMENT'}
                </h3>
                {branding.company_address && (
                  <p className="font-sans text-[11px] text-slate-500">{branding.company_address}</p>
                )}
              </div>
            </div>

            <div className="text-right font-sans text-xs text-slate-500">
              <p className="font-bold text-slate-900 uppercase">OFFICIAL DRAFT</p>
              <p>Date: {doc.effective_date || doc.created_at || 'October 2026'}</p>
              {doc.jurisdiction && <p>Jurisdiction: {doc.jurisdiction}</p>}
            </div>
          </div>

          {/* Document Content Rendering */}
          <div className="space-y-4 text-justify leading-relaxed text-slate-900 text-sm">
            {lines.map((line, idx) => {
              const str = line.trim();
              if (!str) return <div key={idx} className="h-2" />;

              if (str.startsWith("DISCLAIMER:")) {
                return (
                  <div key={idx} className="mt-8 pt-4 border-t border-slate-300 font-sans text-[11px] text-slate-500 italic text-center">
                    {str}
                  </div>
                );
              }

              // Main Document Title
              if (idx === 0 || (str === str.toUpperCase() && str.length < 65 && !str.includes("THIS"))) {
                return (
                  <h1 key={idx} className="font-serif font-bold text-xl text-center uppercase tracking-wide text-slate-900 pt-2 pb-4 border-b border-slate-200">
                    {str}
                  </h1>
                );
              }

              // Headings / Clauses (1., 2., 3.)
              if (/^\d+\./.test(str) || (str === str.toUpperCase() && str.length < 50)) {
                return (
                  <h2 key={idx} className="font-serif font-bold text-base text-slate-900 pt-3 pb-1 uppercase tracking-tight border-b border-slate-100">
                    {str}
                  </h2>
                );
              }

              // Bullet points or subclauses (a), b), -)
              if (/^[a-z]\)/i.test(str) || str.startsWith("-")) {
                return (
                  <p key={idx} className="pl-6 text-slate-800 text-sm font-normal">
                    {str}
                  </p>
                );
              }

              // Signature Line formatting
              if (str.includes("_____")) {
                return (
                  <pre key={idx} className="font-serif text-sm text-slate-900 whitespace-pre-wrap py-2">
                    {str}
                  </pre>
                );
              }

              return (
                <p key={idx} className="text-slate-900 leading-relaxed font-normal">
                  {str}
                </p>
              );
            })}
          </div>
        </div>

        {/* Paper Footer */}
        <div className="mt-12 pt-4 border-t border-slate-300 flex items-center justify-between text-[11px] font-sans text-slate-500">
          <div>
            <span>{footerText || 'LegalEase AI Powered Legal Document'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI Verified Structure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
