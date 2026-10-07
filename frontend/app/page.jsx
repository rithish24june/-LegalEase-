'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocumentCard from '@/components/DocumentCard';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Edit3, 
  FileSpreadsheet, 
  FileText, 
  Lock, 
  Palette, 
  CheckCircle2, 
  Scale, 
  Zap, 
  Users, 
  Download,
  Star
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Cpu,
      title: 'AI-Powered Generation',
      description: 'Generate structured, court-standard legal documents tailored to your specific requirements in seconds.'
    },
    {
      icon: Edit3,
      title: 'Editable Documents',
      description: 'Modify generated legal text directly using our built-in rich WYSIWYG editor before downloading.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Professional Formatting',
      description: 'Clean typography, numbered clauses, preamble headers, signature blocks, and proper page margins.'
    },
    {
      icon: Download,
      title: 'Multiple Export Formats',
      description: 'Instantly download your finalized legal documents as PDF, DOCX, or plain text (TXT).'
    },
    {
      icon: Palette,
      title: 'Custom Branding',
      description: 'Personalize your agreements with your company logo, official address, and custom legal footers.'
    },
    {
      icon: Lock,
      title: 'Secure & Confidential',
      description: 'Your sensitive document data is encrypted with 256-bit security protocols and never shared.'
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Choose Document Type',
      description: 'Select from NDAs, Employment Contracts, Lease Agreements, Service Contracts, or Custom Documents.'
    },
    {
      num: '02',
      title: 'Enter Your Details',
      description: 'Input party details, effective date, governing jurisdiction, and specific terms or payment clauses.'
    },
    {
      num: '03',
      title: 'Generate with AI',
      description: 'LegalEase AI analyzes your input and builds a fully structured, professional legal agreement.'
    },
    {
      num: '04',
      title: 'Edit & Download',
      description: 'Refine clauses in real-time, attach your company logo, and export to PDF, DOCX, or TXT.'
    },
  ];

  const documentTypes = [
    { name: 'Employment Contract', description: 'Comprehensive agreement establishing roles, compensation, IP rights, and termination.' },
    { name: 'NDA / Non-Disclosure Agreement', description: 'Protect sensitive technical, financial, and business trade secrets with mutual covenants.' },
    { name: 'Lease Agreement', description: 'Residential or commercial rental terms, security deposits, and maintenance rules.' },
    { name: 'Freelance Contract', description: 'Scope of work, deliverable deadlines, hourly/project milestones, and IP transfer.' },
    { name: 'Service Agreement', description: 'Professional B2B service terms, SLA obligations, payment terms, and liability limits.' },
    { name: 'Employment Offer Letter', description: 'Formal candidate employment offer stating salary, start date, benefits, and conditions.' },
    { name: 'General Agreement', description: 'Flexible legal framework for partnerships, sales, or general commercial terms.' },
    { name: 'Custom Legal Document', description: 'Tailor-made agreement generated from your custom prompt and unique clauses.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
          
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>Next-Gen AI Legal Technology</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Create Professional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
                  Legal Documents with AI
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
                Generate, customize, edit, and download professional legal documents in minutes — without needing a legal background.
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/create-document"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold text-base shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Create Document</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-base transition-colors text-center"
                >
                  Explore Features
                </a>
              </div>

              {/* Trust Metrics */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>PDF, DOCX & TXT Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>4.9/5 Rating by Founders & Legal Counsel</span>
                </div>
              </div>

            </div>

            {/* Interactive Visual Preview Mockup */}
            <div className="mt-16 relative max-w-5xl mx-auto">
              <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 sm:p-8 shadow-2xl shadow-blue-500/5 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                
                {/* Window Controls header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-500">LegalEase AI Studio v1.0</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Gemini Legal Engine Active</span>
                  </div>
                </div>

                {/* Hero Mockup Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Left Column: Form sample */}
                  <div className="space-y-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">01. Document Parameters</h4>
                    <div className="space-y-2">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                        <span className="text-slate-500 block text-[10px]">Type</span>
                        <span className="text-slate-200 font-semibold">Mutual NDA Agreement</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                        <span className="text-slate-500 block text-[10px]">Parties</span>
                        <span className="text-slate-200 font-semibold">Apex Inc. & Vanguard LLC</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                        <span className="text-slate-500 block text-[10px]">Jurisdiction</span>
                        <span className="text-slate-200 font-semibold">State of New York, USA</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Paper Canvas Preview */}
                  <div className="md:col-span-2 bg-white text-slate-900 p-6 rounded-xl shadow-xl font-serif text-[11px] leading-relaxed relative">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-3 font-sans text-[10px] text-slate-500">
                      <span className="font-bold text-slate-900">APEX INNOVATIONS</span>
                      <span>CONFIDENTIAL AGREEMENT</span>
                    </div>
                    <h3 className="font-sans font-bold text-sm text-center uppercase tracking-wide text-slate-900 mb-2">
                      MUTUAL NON-DISCLOSURE AGREEMENT
                    </h3>
                    <p className="mb-2">This Agreement is made effective October 07, 2026, by Apex Innovations Inc. and Vanguard Solutions LLC...</p>
                    <div className="bg-blue-50/80 border-l-2 border-blue-600 p-2 my-2 font-sans text-[10px] text-slate-700">
                      <p className="font-bold text-blue-900">1. OBLIGATIONS & CLAUSES</p>
                      <p>Receiving Party agrees to hold all Technical Data in strict confidence for 3 years...</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex justify-between font-sans text-[9px] text-slate-400">
                      <span>Generated by LegalEase AI Engine</span>
                      <span className="text-emerald-700 font-bold">Verified PDF / DOCX Output</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>


        {/* FEATURES SECTION */}
        <section id="features" className="py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">Powerful Features</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Everything You Need for Modern Legal Automation
              </h3>
              <p className="text-slate-400 text-sm">
                Engineered specifically for business founders, freelancers, real estate managers, and legal teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Streamlined Process</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                How LegalEase Works in 4 Simple Steps
              </h3>
              <p className="text-slate-400 text-sm">
                From selection to download in less than 2 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {steps.map((step, idx) => (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative flex flex-col justify-between"
                >
                  <div>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4 block">
                      {step.num}
                    </span>
                    <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* DOCUMENT TYPES SHOWCASE */}
        <section id="document-types" className="py-20 bg-slate-900/40 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">Supported Agreements</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Popular Legal Document Templates
              </h3>
              <p className="text-slate-400 text-sm">
                Select any contract type to start drafting immediately with our AI assistant.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {documentTypes.map((doc) => (
                <DocumentCard
                  key={doc.name}
                  doc={doc}
                  isTemplate={true}
                  onSelect={(d) => {
                    window.location.href = `/create-document?type=${encodeURIComponent(d.name)}`;
                  }}
                />
              ))}
            </div>
          </div>
        </section>


        {/* FINAL CTA BANNER */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-violet-950/60 border border-blue-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Ready to Create Your First Legal Document?
                </h3>
                <p className="text-slate-300 text-sm max-w-xl mx-auto">
                  Join thousands of professionals generating contracts, NDAs, and agreements in minutes.
                </p>
                <div className="pt-2 flex justify-center">
                  <Link
                    href="/create-document"
                    className="px-8 py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-base shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <span>Generate Document Now</span>
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
