'use client';

import type { Suggestion } from '../lib/types';
import { TONE_INFO } from '../lib/constants';
import clsx from 'clsx';

interface Props {
  rating: number;
  suggestions: Suggestion[];
  selectedIdx: number;
  loading: boolean;
  onSelect: (i: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepSuggestions({
  rating, suggestions, selectedIdx, loading, onSelect, onBack, onNext,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-medium text-base">Suggestions for your Feedback</h2>
        
      </div>

      {loading ? (
        <div>
          <div className="flex items-center gap-2 justify-center py-6 mb-4">
            <div className="pulse-dot" />
            <div className="pulse-dot" />
            <div className="pulse-dot" />
            <span className="text-sm text-[var(--text-2)] ml-2">
              Crafting suggestions…
            </span>
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="border border-black/10 rounded-xl p-4 mb-3">
              <div className="skeleton h-3 mb-2" style={{ width: '90%' }} />
              <div className="skeleton h-3 mb-2" style={{ width: '75%' }} />
              <div className="skeleton h-3" style={{ width: '60%' }} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 mb-6">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={clsx(
                'w-full text-left border rounded-xl p-4 transition-all relative',
                selectedIdx === i
                  ? 'border-accent bg-accent-light'
                  : 'border-black/10 hover:border-accent hover:bg-accent-light/50 hover:translate-x-0.5',
              )}
            >
              {selectedIdx === i && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-l-xl" />
              )}
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-relaxed text-[var(--text)]">{s}</p>
                <div className={clsx(
                  'w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all',
                  selectedIdx === i ? 'bg-accent border-accent' : 'border-black/20',
                )}>
                  {selectedIdx === i && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-black/10">
        <button onClick={onBack} className="text-sm text-[var(--text-2)] border border-black/15 px-5 py-2.5 rounded-xl hover:bg-[#f4f1ec] transition-colors">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={selectedIdx < 0 || loading}
          className="inline-flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          Use this suggestion →
        </button>
      </div>
    </div>
  );
}