import './globals.css';
import { ToastProvider } from '@/components/Toast';

export const metadata = {
  title: 'LegalEase — AI-Powered Legal Document Generator',
  description: 'Generate, customize, edit, and download professional court-ready legal documents in minutes using advanced AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
