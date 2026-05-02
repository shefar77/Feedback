'use client';

import { RATING_LABELS } from '../lib/constants';

interface Props {
  rating: number;
  finalText: string;
  googleUrl: string;
  onReset: () => void;
}

export default function StepGoogle({ rating, finalText, googleUrl, onReset }: Props) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const preview = finalText.length > 160 ? finalText.slice(0, 160) + '…' : finalText;

  return (
    <div className="flex flex-col items-center text-center">
      {/* Success icon */}
      <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-5 text-2xl">
        🎉
      </div>

      <h2 className="font-serif text-3xl mb-2">Review saved!</h2>
      <p className="text-sm text-[var(--text-2)] max-w-sm mb-6 leading-relaxed">
        Your {rating} star feedback has been recorded. Post it on Google to help others discover this place!
      </p>

      {/* Preview */}
      <div className="text-left bg-[#f4f1ec] border-l-4 border-[#4285F4] rounded-lg px-4 py-3 max-w-md w-full mb-6">
        <p className="text-gold text-sm mb-1">{stars}</p>
        <p className="text-sm text-[var(--text-2)] italic leading-relaxed">"{preview}"</p>
      </div>

      {/* Google CTA */}
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-[#4285F4] text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#2b6fe0] transition-all hover:-translate-y-0.5 mb-4"
      >
        {/* Google G logo */}
        <span className="w-5 h-5 bg-white rounded flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.075 17.64 11.768 17.64 9.2z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
        </span>
        Post on Google Reviews
      </a>

      <button
        onClick={onReset}
        className="text-sm text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
      >
        Submit another review
      </button>
    </div>
  );
}