'use client';
import Link from 'next/link';
import { Scale, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/30">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Legal<span className="text-blue-400">Ease</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AI-powered legal document generation platform. Draft, customize, edit, and download court-ready agreements and contracts in minutes.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise-Grade Encryption & AI Verification</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/create-document" className="hover:text-blue-400 transition-colors">AI Document Generator</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">User Dashboard</Link></li>
              <li><Link href="/documents" className="hover:text-blue-400 transition-colors">My Documents</Link></li>
              <li><Link href="/#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
            </ul>
          </div>

          {/* Document Types */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Documents</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/create-document?type=Employment+Contract" className="hover:text-blue-400 transition-colors">Employment Contract</Link></li>
              <li><Link href="/create-document?type=NDA" className="hover:text-blue-400 transition-colors">Non-Disclosure (NDA)</Link></li>
              <li><Link href="/create-document?type=Lease+Agreement" className="hover:text-blue-400 transition-colors">Lease Agreement</Link></li>
              <li><Link href="/create-document?type=Freelance+Contract" className="hover:text-blue-400 transition-colors">Freelance Contract</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-blue-400 cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Security Protocol</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">AI Ethics & Disclaimer</span></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 text-center space-y-4">
          <p className="text-[11px] text-slate-500 max-w-3xl mx-auto italic leading-relaxed">
            LegalEase provides AI-generated documents for informational and drafting purposes. Review important documents with a qualified legal professional before execution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <p>© 2026 LegalEase AI Platform. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with precision & AI excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
