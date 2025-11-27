import { Navbar } from './navbar';
import { Footer } from './footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
