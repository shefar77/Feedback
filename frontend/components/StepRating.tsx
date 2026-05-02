'use client';

import { useState } from 'react';
import { RATING_LABELS, TONE_INFO } from '../lib/constants';
import clsx from 'clsx';

interface Props {
  rating: number;
  setRating: (r: number) => void;
  onNext: () => void;
}

export default function StepRating({ rating, setRating, onNext }: Props) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || rating;
  const tone = rating ? TONE_INFO[rating] : null;

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="font-serif text-3xl mb-2">How was your visit?</h2>
      <p className="text-[var(--text-2)] mb-10 text-sm">Tap a star to rate your experience</p>

      {/* Stars */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(i)}
            className="p-1.5 rounded-full transition-transform hover:scale-110 hover:bg-gold-light focus:outline-none"
          >
            <svg
              viewBox="0 0 24 24"
              className={clsx(
                'w-11 h-11 transition-colors',
                i <= active ? 'fill-gold' : 'fill-black/15',
              )}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>

      {/* Label */}
      <div className="font-serif text-2xl h-9 mb-6 transition-all">
        {active ? RATING_LABELS[active] : ''}
      </div>

      {/* Tone pill */}
      <div className="flex gap-2 flex-wrap justify-center mb-10 h-7">
        {tone && (
          <>
            <span className={clsx(
              'text-xs font-medium px-3 py-1 rounded-full border',
              tone.cls === 'critical' && 'bg-accent-light text-accent border-accent/25',
              tone.cls === 'neutral'  && 'bg-[#f4f1ec] text-[#6b6560] border-black/15',
              tone.cls === 'positive' && 'bg-gold-light text-yellow-800 border-yellow-400/30',
            )}>
              {tone.label}
            </span>
          </>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={!rating}
        className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-xl font-medium text-[15px] hover:bg-accent-hover transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        Generate review suggestions <span className="text-base">→</span>
      </button>
    </div>
  );
}