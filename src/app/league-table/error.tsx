'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LeagueTableError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('League Table Error:', error);
  }, [error]);

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">League Table</h1>
          <p className="text-white/80 mt-2">Error Loading Data</p>
        </div>
      </section>

      {/* Error Message */}
      <section className="py-12 md:py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden p-8 md:p-12 text-center">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-16 w-16 text-red-600 mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Unable to Load League Table
            </h2>

            <p className="text-slate-600 mb-8">
              {error.message ||
                'An unexpected error occurred while loading the league table data. Please try again.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-glow-red transition-all duration-300 hover:scale-105"
              >
                Try Again
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center bg-slate-200 text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-300 transition-all duration-300"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
