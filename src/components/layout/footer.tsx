import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} BroByte Solutions. All rights reserved.</p>

        <div className="flex flex-wrap items-center gap-3">
          <span>24/7 Support: +880-XXX-XXX-XXX</span>
          <span>•</span>
          <Link href="mailto:support@brobyte.dev" className="hover:text-slate-100">
            support@brobyte.dev
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-slate-100">
            Privacy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-slate-100">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
