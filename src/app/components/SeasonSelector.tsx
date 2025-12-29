'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Entry } from 'contentful';
import { SeasonSkeleton } from '@/lib/types';

interface SeasonSelectorProps {
  seasons: Entry<SeasonSkeleton>[];
  currentSeasonSlug?: string;
}

export default function SeasonSelector({
  seasons,
  currentSeasonSlug,
}: SeasonSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSlug = searchParams?.get('season') || currentSeasonSlug || '';

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSlug = e.target.value;

    if (newSlug) {
      router.push(`/league-table?season=${newSlug}`);
    } else {
      router.push('/league-table');
    }
  };

  return (
    <div className="relative inline-block">
      <select
        value={selectedSlug}
        onChange={handleSeasonChange}
        className="appearance-none bg-white border-2 border-red-600 text-slate-900 rounded-lg px-4 py-2 pr-10 font-semibold cursor-pointer hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Select season"
      >
        {seasons.map((season) => {
          const title = season.fields.title as unknown as string;
          const slug = season.fields.slug as unknown as string;
          const isActive = season.fields.isActive as unknown as boolean;

          return (
            <option key={season.sys.id} value={slug}>
              {title} {isActive ? '(Current)' : ''}
            </option>
          );
        })}
      </select>

      {/* Custom dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-red-600">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
