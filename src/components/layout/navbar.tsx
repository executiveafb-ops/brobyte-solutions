'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Solutions & Services' },
  { href: '/quote', label: 'Quote & Payment' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-500 text-sm font-bold">
            BB
          </span>
          <span className="text-sm font-semibold tracking-tight">
            BroByte <span className="text-slate-400">Solutions</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-3 py-1 transition hover:bg-slate-800 hover:text-slate-50',
                pathname === link.href && 'bg-slate-800 text-slate-50',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden md:inline-flex rounded-full">
            Get a Quote
          </Button>
        </div>
      </div>
    </header>
  );
}
