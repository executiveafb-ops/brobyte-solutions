// src/components/quote/print-quote-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface PrintQuoteButtonProps {
  label?: string;
}

export function PrintQuoteButton({ label = 'Print / Save as PDF' }: PrintQuoteButtonProps) {
  function handlePrint() {
    window.print();
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="rounded-full border-slate-600 bg-slate-950/80 text-slate-100 hover:bg-slate-900"
      onClick={handlePrint}
    >
      <Printer className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
