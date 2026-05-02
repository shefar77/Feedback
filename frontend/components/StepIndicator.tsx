'use client';

import type { Step } from '../lib/types';
import clsx from 'clsx';

const STEPS = ['Rate', 'Suggestions', 'Edit', 'Google'];

export default function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="flex bg-[#f4f1ec] border-b border-black/10 px-6 py-3">
      {STEPS.map((label, i) => {
        const num = i + 1;
        const done   = num < step;
        const active = num === step;
        return (
          <div
            key={label}
            className={clsx(
              'flex items-center gap-2 flex-1 text-xs font-medium relative',
              done   && 'text-green-700',
              active && 'text-accent',
              !done && !active && 'text-[var(--text-3)]',
            )}
          >
            <div
              className={clsx(
                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0',
                done   && 'bg-green-600 text-white',
                active && 'bg-accent text-white',
                !done && !active && 'bg-black/10 text-[var(--text-3)]',
              )}
            >
              {done ? '✓' : num}
            </div>
            {label}
            {i < STEPS.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-black/10" />
            )}
          </div>
        );
      })}
    </div>
  );
}