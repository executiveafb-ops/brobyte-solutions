// src/components/common/section-header.tsx
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'space-y-2',
        isCenter && 'text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/80">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className={cn('max-w-2xl text-sm text-slate-300', isCenter && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
