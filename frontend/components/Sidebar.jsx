'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FilePlus, 
  FolderKanban, 
  Layers, 
  Settings, 
  LogOut, 
  Sparkles, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Document', href: '/create-document', icon: FilePlus, highlight: true },
    { name: 'My Documents', href: '/documents', icon: FolderKanban },
    { name: 'Templates', href: '/#document-types', icon: Layers },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block bg-slate-900/60 backdrop-blur-xl border-r border-slate-800/80 min-h-[calc(100vh-5rem)] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        
        {/* Quick Action Widget */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-blue-900/40 to-indigo-950/40 border border-blue-500/20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center mx-auto mb-3 text-blue-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h4 className="text-sm font-semibold text-white">AI Legal Assistant</h4>
          <p className="text-xs text-slate-400 mt-1 mb-3">Generate contracts, NDAs & agreements in seconds</p>
          <Link
            href="/create-document"
            className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-blue-600 text-white font-medium text-xs shadow-md hover:bg-blue-500 transition-colors"
          >
            <span>Start Generator</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Main Menu</p>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : item.highlight
                    ? 'text-blue-400 hover:bg-blue-500/10 border border-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Security Badge & Logout */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800/40 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>256-Bit Encrypted Data</span>
        </div>

        <Link
          href="/login"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </Link>
      </div>
    </aside>
  );
}
