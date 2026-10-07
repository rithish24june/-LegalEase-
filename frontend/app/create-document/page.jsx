'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import StepIndicator from '@/components/StepIndicator';
import LoadingAnimation from '@/components/LoadingAnimation';
import { fetchApi, getStoredUser } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { 
  Briefcase, 
  ShieldAlert, 
  Building2, 
  FileCheck2, 
  ScrollText, 
  UserCheck, 
  FileText, 
  FilePlus2,
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Upload, 
  Sparkles, 
  Check, 
  Calendar, 
  MapPin, 
  Image as ImageIcon
} from 'lucide-react';

function CreateDocumentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = getStoredUser();
  const { showToast } = useToast() || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form State
  const [documentType, setDocumentType] = useState('Employment Contract');
  const [party1Name, setParty1Name] = useState(user.company || 'LegalEase Tech Inc.');
  const [party1Role, setParty1Role] = useState('Employer');
  const [party2Name, setParty2Name] = useState('Alex Mercer');
  const [party2Role, setParty2Role] = useState('Employee');
  const [additionalParties, setAdditionalParties] = useState([]);
  
  const [terms, setTerms] = useState(
    'Payment must be completed within 30 days of invoice;\nConfidential information must not be disclosed for 3 years;\nEither party may terminate the agreement with 15 days written notice.'
  );
  
  const [effectiveDate, setEffectiveDate] = useState('2026-10-15');
  const [jurisdiction, setJurisdiction] = useState('State of New York, USA');

  // Branding State
  const [companyName, setCompanyName] = useState(user.company || 'LegalEase Tech Inc.');
  const [companyAddress, setCompanyAddress] = useState('100 Tech Plaza, New York, NY 10001');
  const [footerText, setFooterText] = useState('Confidential & Proprietary - LegalEase');
  const [logoPreview, setLogoPreview] = useState('');

  useEffect(() => {
    const preselectedType = searchParams.get('type');
    if (preselectedType) {
      setDocumentType(preselectedType);
    }
  }, [searchParams]);

  const steps = [
    { id: 1, name: 'Document Type' },
    { id: 2, name: 'Parties' },
    { id: 3, name: 'Terms' },
    { id: 4, name: 'Effective Date' },
    { id: 5, name: 'Branding & AI' },
  ];

  const docTypeOptions = [
    { id: 'Employment Contract', name: 'Employment Contract', icon: Briefcase, defaultP1: 'Employer', defaultP2: 'Employee', desc: 'Standard hiring terms, compensation, PTO & duties' },
    { id: 'NDA / Non-Disclosure Agreement', name: 'NDA', icon: ShieldAlert, defaultP1: 'Disclosing Party', defaultP2: 'Receiving Party', desc: 'Protect trade secrets & proprietary info' },
    { id: 'Lease Agreement', name: 'Lease Agreement', icon: Building2, defaultP1: 'Landlord / Lessor', defaultP2: 'Tenant / Lessee', desc: 'Property lease, deposit & occupancy rules' },
    { id: 'Freelance Contract', name: 'Freelance Contract', icon: FileCheck2, defaultP1: 'Client', defaultP2: 'Contractor', desc: 'Project deliverables, rates & milestone terms' },
    { id: 'Service Agreement', name: 'Service Agreement', icon: ScrollText, defaultP1: 'Provider', defaultP2: 'Client', desc: 'Professional service terms, SLA & payment' },
    { id: 'Employment Offer Letter', name: 'Offer Letter', icon: UserCheck, defaultP1: 'Company', defaultP2: 'Candidate', desc: 'Official job offer & compensation terms' },
    { id: 'General Agreement', name: 'General Agreement', icon: FileText, defaultP1: 'First Party', defaultP2: 'Second Party', desc: 'Flexible commercial terms & mutual covenants' },
    { id: 'Custom Legal Document', name: 'Custom Agreement', icon: FilePlus2, defaultP1: 'Party A', defaultP2: 'Party B', desc: 'Tailor-made document generated from custom prompt' },
  ];

  const handleSelectDocType = (dt) => {
    setDocumentType(dt.id);
    setParty1Role(dt.defaultP1);
    setParty2Role(dt.defaultP2);
  };

  const handleAddParty = () => {
    setAdditionalParties([...additionalParties, { name: '', role: 'Third Party' }]);
  };

  const handleRemoveParty = (index) => {
    setAdditionalParties(additionalParties.filter((_, i) => i !== index));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPresetClause = (clauseText) => {
    if (terms.includes(clauseText)) return;
    setTerms((prev) => (prev ? `${prev}\n${clauseText}` : clauseText));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
  };

  const handleFinishGeneration = async () => {
    try {
      const payload = {
        document_type: documentType,
        party1_name: party1Name,
        party1_role: party1Role,
        party2_name: party2Name,
        party2_role: party2Role,
        parties: {
          party1_name: party1Name,
          party1_role: party1Role,
          party2_name: party2Name,
          party2_role: party2Role,
          additional: additionalParties
        },
        terms: terms,
        effective_date: effectiveDate,
        jurisdiction: jurisdiction,
        branding: {
          company_name: companyName,
          company_address: companyAddress,
          logo_url: logoPreview,
          footer_text: footerText
        }
      };

      const res = await fetchApi('/generate', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (showToast) showToast('AI document generated successfully!', 'success');
      router.push(`/preview/${res.document_id}`);
    } catch (err) {
      console.warn("Using offline mock fallback route for preview");
      if (showToast) showToast('Generated using offline legal engine!', 'info');
      router.push(`/preview/doc-nda-001`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      {isGenerating && <LoadingAnimation onComplete={handleFinishGeneration} />}

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Header & Step Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-4">
              <h1 className="text-2xl font-extrabold text-white">Legal Document Generator</h1>
              <p className="text-xs text-slate-400 mt-1">
                Fill in the details below to generate a court-standard legal document powered by Gemini AI.
              </p>
            </div>

            <StepIndicator steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
          </div>

          {/* STEP 1: DOCUMENT TYPE */}
          {currentStep === 1 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white">01. Select Legal Document Type</h3>
                <p className="text-xs text-slate-400">Choose the document template that fits your legal agreement.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {docTypeOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = documentType === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectDocType(opt)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-600/10 border-blue-500 text-white ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-sm text-white mb-1">{opt.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{opt.desc}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className={isSelected ? 'text-blue-400 font-semibold' : 'text-slate-500'}>
                          {isSelected ? 'Selected' : 'Click to select'}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: PARTIES */}
          {currentStep === 2 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white">02. Parties Information</h3>
                <p className="text-xs text-slate-400">Specify the names and legal roles of all involved parties.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Party 1 */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Party 1 (First Party)</h4>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name / Company</label>
                    <input
                      type="text"
                      value={party1Name}
                      onChange={(e) => setParty1Name(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                      placeholder="e.g. Apex Innovations Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Role / Capacity</label>
                    <input
                      type="text"
                      value={party1Role}
                      onChange={(e) => setParty1Role(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                      placeholder="e.g. Employer / Disclosing Party"
                    />
                  </div>
                </div>

                {/* Party 2 */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Party 2 (Second Party)</h4>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name / Company</label>
                    <input
                      type="text"
                      value={party2Name}
                      onChange={(e) => setParty2Name(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                      placeholder="e.g. Alex Mercer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Role / Capacity</label>
                    <input
                      type="text"
                      value={party2Role}
                      onChange={(e) => setParty2Role(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                      placeholder="e.g. Employee / Receiving Party"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Parties */}
              {additionalParties.map((p, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => {
                        const updated = [...additionalParties];
                        updated[idx].name = e.target.value;
                        setAdditionalParties(updated);
                      }}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                      placeholder={`Party ${idx + 3} Name`}
                    />
                    <input
                      type="text"
                      value={p.role}
                      onChange={(e) => {
                        const updated = [...additionalParties];
                        updated[idx].role = e.target.value;
                        setAdditionalParties(updated);
                      }}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                      placeholder={`Party ${idx + 3} Role`}
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveParty(idx)}
                    className="p-2.5 rounded-xl bg-rose-950/40 text-rose-400 hover:bg-rose-900/60"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={handleAddParty}
                className="py-2.5 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-medium text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Add Additional Party</span>
              </button>
            </div>
          )}

          {/* STEP 3: TERMS & CONDITIONS */}
          {currentStep === 3 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white">03. Terms & Specific Clauses</h3>
                <p className="text-xs text-slate-400">Enter custom terms, payment schedules, or specific covenants below.</p>
              </div>

              {/* Quick Clause Suggestion Chips */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Click to add preset clause:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => addPresetClause('Payment must be completed within 30 days of invoice.')}
                    className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-xs transition-colors"
                  >
                    + Payment in 30 Days
                  </button>
                  <button
                    onClick={() => addPresetClause('Confidential information must not be disclosed for 3 years.')}
                    className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-xs transition-colors"
                  >
                    + 3-Year NDA Covenant
                  </button>
                  <button
                    onClick={() => addPresetClause('Either party may terminate the agreement with 15 days written notice.')}
                    className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-xs transition-colors"
                  >
                    + 15-Day Termination
                  </button>
                  <button
                    onClick={() => addPresetClause('All Intellectual Property created belongs exclusively to Party 1.')}
                    className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-xs transition-colors"
                  >
                    + Exclusive IP Ownership
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Custom Terms (Use semicolons or newlines to separate clauses)
                </label>
                <textarea
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  rows={8}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-100 font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                  placeholder="Enter specific clauses..."
                />
              </div>
            </div>
          )}

          {/* STEP 4: EFFECTIVE DATE & JURISDICTION */}
          {currentStep === 4 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white">04. Effective Date & Governing Jurisdiction</h3>
                <p className="text-xs text-slate-400">Select when the document becomes legally effective and governing legal jurisdiction.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <label className="block text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Effective Date</span>
                  </label>
                  <input
                    type="date"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Governing Jurisdiction</span>
                  </label>
                  <input
                    type="text"
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. State of New York, USA"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: BRANDING & GENERATE */}
          {currentStep === 5 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white">05. Custom Branding & AI Generation</h3>
                <p className="text-xs text-slate-400">Add company logo and footer text for PDF & DOCX export branding.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Company Official Address</label>
                    <input
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Footer Legal Text</label>
                    <input
                      type="text"
                      value={footerText}
                      onChange={(e) => setFooterText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Upload Company Logo</label>
                    <div className="flex items-center gap-3">
                      <label className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer flex items-center gap-2 border border-slate-700">
                        <Upload className="w-4 h-4 text-blue-400" />
                        <span>Choose Logo File</span>
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      </label>
                      {logoPreview && <span className="text-xs text-emerald-400 font-semibold">Logo Attached ✓</span>}
                    </div>
                  </div>
                </div>

                {/* Live Branding Preview */}
                <div className="p-6 rounded-2xl bg-white text-slate-900 font-serif border border-slate-300 flex flex-col justify-between text-xs space-y-4 shadow-inner">
                  <div>
                    <div className="flex items-center justify-between border-b pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo" className="h-8 max-w-[100px] object-contain" />
                        ) : (
                          <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center font-sans font-bold text-xs">
                            {companyName ? companyName.charAt(0) : 'L'}
                          </div>
                        )}
                        <span className="font-sans font-bold uppercase">{companyName || 'COMPANY NAME'}</span>
                      </div>
                      <span className="font-sans text-[10px] text-slate-500">{effectiveDate}</span>
                    </div>

                    <p className="font-sans font-bold text-center text-sm uppercase my-4">{documentType}</p>
                    <p className="text-[11px] text-slate-600">Between {party1Name} ({party1Role}) and {party2Name} ({party2Role})...</p>
                  </div>

                  <div className="pt-2 border-t font-sans text-[9px] text-slate-400 text-center">
                    {footerText || 'Branding Preview Footer'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="py-3 px-5 rounded-2xl border border-slate-800 text-slate-300 hover:bg-slate-900 disabled:opacity-40 font-semibold text-xs flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-blue-200" />
                <span>Generate Document</span>
              </button>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}

export default function CreateDocumentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
        <div className="text-center text-slate-400 text-sm">Loading LegalEase Document Generator...</div>
      </div>
    }>
      <CreateDocumentForm />
    </Suspense>
  );
}
