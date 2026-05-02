import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Feedback Portal',
  description: 'Effortless feedback collection with accurate suggestions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#faf8f5] text-[#1a1815] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}