import Link from 'next/link';
import { getMatchViewModel, getNextMatch } from '@/lib/serverUtils';
import Image from 'next/image';
import Countdown from './CountdownComponent';

export default async function NextMatchBlock() {
  const { match } = await getNextMatch();

  if (!match) {
    return (
      <div className="text-center text-gray-600 py-6">
        <p>No upcoming match found.</p>
      </div>
    );
  }

  const matchViewModel = await getMatchViewModel(match.fields.slug as unknown as string);

  if (!matchViewModel) {
    return (
      <div className="text-center text-gray-600 py-6">
        <p>No upcoming match found.</p>
      </div>
    );
  }

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-12 md:py-20 overflow-hidden"
      style={{
        backgroundImage: matchViewModel.heroBannerUrl
          ? `url(${matchViewModel.heroBannerUrl})`
          : undefined,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white italic mb-6">
          Next Match
        </h2>

        {/* Teams Display - Horizontal inline layout */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4">
          {/* Home Team */}
          <div className="flex items-center gap-2 sm:gap-3">
            {matchViewModel.teamHome.logoUrl && (
              <Image
                src={matchViewModel.teamHome.logoUrl}
                alt={matchViewModel.teamHome.name}
                width={80}
                height={80}
                className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
              />
            )}
            <span className="font-semibold text-sm sm:text-base md:text-lg text-white">
              {matchViewModel.teamHome.name}
            </span>
          </div>

          {/* VS */}
          <span className="text-white/70 text-sm sm:text-base md:text-lg px-1 sm:px-2">
            vs
          </span>

          {/* Away Team */}
          <div className="flex items-center gap-2 sm:gap-3">
            {matchViewModel.teamAway.logoUrl && (
              <Image
                src={matchViewModel.teamAway.logoUrl}
                alt={matchViewModel.teamAway.name}
                width={80}
                height={80}
                className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
              />
            )}
            <span className="font-semibold text-sm sm:text-base md:text-lg text-white">
              {matchViewModel.teamAway.name}
            </span>
          </div>
        </div>

        {/* Match Info */}
        <p className="text-white/70 text-xs sm:text-sm mb-1">
          {matchViewModel.venue || matchViewModel.location} · {matchViewModel.kickoffTime} · {matchViewModel.competition}
        </p>
        <p className="text-white/70 text-xs sm:text-sm mb-8">
          {matchViewModel.date}
        </p>

        {/* Countdown */}
        <div className="mb-8">
          <Countdown targetDate={matchViewModel.targetDate} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <Link href={`/matches/${matchViewModel.slug}`}>
            <button className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-medium rounded-md transition-all duration-300 hover:scale-105 min-w-[140px]">
              Match Center
            </button>
          </Link>

          <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-md hover:bg-white/20 transition-all duration-300 hover:scale-105 min-w-[140px]">
            Highlights
          </button>
        </div>
      </div>
    </section>
  );
}
