'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { getStoredUser, setStoredUser } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { 
  User, 
  Building, 
  Lock, 
  Bell, 
  ShieldAlert, 
  Save, 
  Upload, 
  Check, 
  Palette,
  Trash2
} from 'lucide-react';

export default function SettingsPage() {
  const { showToast } = useToast() || {};
  const [activeTab, setActiveTab] = useState('profile');

  // User State
  const [name, setName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex@legalease.ai');
  const [jobTitle, setJobTitle] = useState('Chief Legal Officer / Founder');

  // Company Branding State
  const [companyName, setCompanyName] = useState('LegalEase Tech Inc.');
  const [companyAddress, setCompanyAddress] = useState('100 Tech Plaza, New York, NY 10001');
  const [defaultFooterText, setDefaultFooterText] = useState('Confidential & Proprietary - LegalEase');
  const [logoUrl, setLogoUrl] = useState('');

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications State
  const [notifyDocGenerated, setNotifyDocGenerated] = useState(true);
  const [notifySecurity, setNotifySecurity] = useState(true);
  const [notifyUpdates, setNotifyUpdates] = useState(false);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const u = getStoredUser();
    if (u) {
      setName(u.name || 'Alex Mercer');
      setEmail(u.email || 'alex@legalease.ai');
      if (u.company) setCompanyName(u.company);
    }
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setStoredUser({
        name,
        email,
        company: companyName
      });
      setSaving(false);
      if (showToast) showToast('Profile & company settings saved successfully!', 'success');
    }, 400);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      if (showToast) showToast('New passwords do not match.', 'error');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      if (showToast) showToast('Password updated successfully!', 'success');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Header Bar */}
          <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
            <h1 className="text-2xl font-bold text-white">Account & System Settings</h1>
            <p className="text-xs text-slate-400 mt-1">Manage your user profile, company branding defaults, password security, and notifications.</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Information</span>
            </button>

            <button
              onClick={() => setActiveTab('branding')}
              className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'branding'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Company & Branding</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'security'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Security & Password</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </button>
          </div>

          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-white">Personal Profile</h3>
                <p className="text-xs text-slate-400">Update your account credentials and personal information.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Job Title / Position</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </form>
          )}

          {/* TAB 2: BRANDING */}
          {activeTab === 'branding' && (
            <form onSubmit={handleSaveProfile} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-white">Default Company Branding</h3>
                <p className="text-xs text-slate-400">Set default company details for document headers and PDF/DOCX exports.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Firm Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Official Address</label>
                  <input
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Default Document Footer Text</label>
                  <input
                    type="text"
                    value={defaultFooterText}
                    onChange={(e) => setDefaultFooterText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Branding Defaults'}</span>
              </button>
            </form>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === 'security' && (
            <form onSubmit={handleUpdatePassword} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-white">Password & Security</h3>
                <p className="text-xs text-slate-400">Ensure your account uses a strong, secure password.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    placeholder="••••••••••••"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    placeholder="••••••••••••"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>{saving ? 'Updating...' : 'Update Password'}</span>
              </button>
            </form>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-white">Notification Preferences</h3>
                <p className="text-xs text-slate-400">Choose when and how LegalEase sends you alerts.</p>
              </div>

              <div className="space-y-4 divide-y divide-slate-800/80">
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Document Generation Notifications</p>
                    <p className="text-[11px] text-slate-400">Receive email confirmation whenever a new document is generated.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyDocGenerated}
                    onChange={(e) => setNotifyDocGenerated(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded bg-slate-950 border-slate-800"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Security & Account Alerts</p>
                    <p className="text-[11px] text-slate-400">Receive alerts for new logins or password changes.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifySecurity}
                    onChange={(e) => setNotifySecurity(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded bg-slate-950 border-slate-800"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Product Updates & Features</p>
                    <p className="text-[11px] text-slate-400">Stay informed about new AI legal templates and features.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyUpdates}
                    onChange={(e) => setNotifyUpdates(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded bg-slate-950 border-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* DANGER ZONE */}
          <div className="bg-rose-950/20 border border-rose-500/20 rounded-3xl p-6 space-y-4 max-w-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Danger Zone</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Delete Account & Data</p>
                <p className="text-xs text-slate-400">Permanently remove your account and all generated document history.</p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    if (showToast) showToast('Account deletion requested.', 'error');
                  }
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
