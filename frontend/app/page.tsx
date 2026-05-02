import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-4xl mb-4">Feedback Portal</h1>
        <p className="text-[var(--text-2)] mb-8">Effortless feedback collection with accurate suggestions.</p>
        <Link
          href="/feedback/demo"
          className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent-hover transition-colors"
        >
          Give Feedback Demo
        </Link>
        <p className="mt-4 text-sm text-[var(--text-3)]">
          Replace the path with your Google Place ID
        </p>
      </div>
    </main>
  );
}