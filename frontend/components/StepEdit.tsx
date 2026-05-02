'use client';

import { RATING_LABELS, TONE_INFO } from '../lib/constants';

interface Props {
  rating: number;
  editedText: string;
  setEditedText: (t: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const QUICK_APPENDS = [
  { label: '+ Staff note', text: ' The staff were very helpful.' },
  { label: '+ Coffee',     text: ' The coffee was excellent.' },
  { label: '+ Return',     text: ' I will definitely return!' },
];

export default function StepEdit({ rating, editedText, setEditedText, onBack, onSubmit }: Props) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const tone = TONE_INFO[rating];

  return (
    <div>
      {/* Rating badge */}
      <div className="flex items-center gap-3 p-3 bg-gold-light border border-yellow-400/20 rounded-xl mb-5">
        <span className="text-gold text-lg tracking-wide">{stars}</span>
        <span className="text-sm font-medium text-yellow-900">
          {RATING_LABELS[rating]} · {tone?.label}
        </span>
      </div>

      <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--text-3)] mb-2">
        Your review
      </label>
      <textarea
        value={editedText || ''}
        onChange={(e) => setEditedText(e.target.value)}
        maxLength={1000}
        rows={5}
        className="w-full p-4 border-[1.5px] border-black/15 rounded-xl text-sm leading-relaxed font-sans text-[var(--text)] bg-white resize-y focus:outline-none focus:border-accent transition-colors"
      />
      <p className="text-right text-xs text-[var(--text-3)] mt-1 mb-4">
        {(editedText || '').length} / 1000
      </p>

      {/* Quick appends */}
      <div className="flex gap-2 flex-wrap mb-6">
        {QUICK_APPENDS.map(({ label, text }) => (
          <button
            key={label}
            onClick={() => setEditedText((editedText + text).trim())}
            className="text-xs border border-black/15 px-3 py-1.5 rounded-lg text-[var(--text-2)] hover:bg-[#f4f1ec] transition-colors"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-black/10">
        <button onClick={onBack} className="text-sm text-[var(--text-2)] border border-black/15 px-5 py-2.5 rounded-xl hover:bg-[#f4f1ec] transition-colors">
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!editedText.trim()}
          className="inline-flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit & continue →
        </button>
      </div>
    </div>
  );
}