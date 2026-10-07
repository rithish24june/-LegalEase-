'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Scale, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { setStoredUser } from '@/lib/api';
import { useToast } from '@/components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast() || {};
  const [email, setEmail] = useState('alex@legalease.ai');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      if (showToast) showToast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setStoredUser({
        name: email.split('@')[0].replace('.', ' '),
        email: email,
        company: 'LegalEase Enterprise'
      });
      if (showToast) showToast('Successfully logged in!', 'success');
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 lg:p-0">
      <div className="w-full max-w-6xl min-h-[640px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Brand Panel */}
        <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Legal<span className="text-blue-400">Ease</span>
              </span>
            </Link>

            <div className="mt-16 space-y-4">
              <h2 className="text-3xl font-extrabold text-white leading-tight">
                Welcome Back to Your AI Legal Hub
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Log in to generate, edit, organize, and download court-ready legal documents with enterprise speed.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-8 border-t border-slate-800/80">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant Gemini AI Document Drafting</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Export in PDF, DOCX, and TXT Formats</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Encrypted Data Privacy Standards</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="p-8 lg:p-12 flex flex-col justify-center bg-slate-900">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Sign In to Your Account</h3>
              <p className="text-xs text-slate-400 mt-1">Enter your credentials below to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-100 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-100 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember Me</span>
                </label>
                <a href="#" className="text-blue-400 hover:underline">Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Logging in...' : 'Login'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
              <span>Don't have an account? </span>
              <Link href="/register" className="text-blue-400 font-semibold hover:underline">
                Create one
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
