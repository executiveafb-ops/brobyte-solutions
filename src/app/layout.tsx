// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BroByte Solutions – Premium Tech Agency',
  description:
    'BroByte Solutions builds custom workflow software, AI systems, websites, and content solutions for fast-growing companies worldwide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} h-full bg-slate-950 text-slate-50 antialiased`}
      >
        {/* Global toaster for notifications */}
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
