'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition, useRef, useEffect } from 'react';
import { Entry } from 'contentful';
import { SeasonSkeleton } from '@/lib/types';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

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
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected season for display
  const selectedSeason = seasons.find(
    (s) => (s.fields.slug as unknown as string) === selectedSlug
  );
  const selectedTitle = selectedSeason
    ? (selectedSeason.fields.title as unknown as string)
    : 'Select Season';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSeasonSelect = (slug: string) => {
    setIsOpen(false);
    startTransition(() => {
      if (slug) {
        router.push(`/league-table?season=${slug}`);
      } else {
        router.push('/league-table');
      }
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-5 py-2.5 font-medium cursor-pointer hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {isPending ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            <span className="truncate max-w-[150px] sm:max-w-[200px]">{selectedTitle}</span>
            <FiChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Select Season
            </p>
          </div>
          <ul role="listbox" className="py-1 max-h-64 overflow-auto">
            {seasons.map((season) => {
              const title = season.fields.title as unknown as string;
              const slug = season.fields.slug as unknown as string;
              const isActive = season.fields.isActive as unknown as boolean;
              const isSelected = slug === selectedSlug;

              return (
                <li key={season.sys.id} role="option" aria-selected={isSelected}>
                  <button
                    onClick={() => handleSeasonSelect(slug)}
                    className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      isSelected ? 'bg-red-50 text-red-700' : 'text-slate-700'
                    }`}
                  >
                    <span className="font-medium">
                      {title}
                      {isActive && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </span>
                    {isSelected && <FiCheck className="w-4 h-4 text-red-600" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
