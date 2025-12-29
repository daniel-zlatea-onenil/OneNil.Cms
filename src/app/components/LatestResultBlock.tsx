import Image from 'next/image';
import Link from 'next/link';
import { MatchEventFields, SeasonSkeleton } from '@/lib/types';
import { getLatestResult, getMatchViewModel } from '@/lib/serverUtils';
import { Asset, Entry } from 'contentful';
import { resolveAsset } from '@/lib/utils';

export default async function LatestResultBlock() {
  const { match, assets } = await getLatestResult();

  if (!match) {
    return null;
  }

  const matchViewModel = await getMatchViewModel(match.fields.slug as unknown as string);

  if (!matchViewModel) {
    return null;
  }

  const { homeScore, awayScore, homeScorers, awayScorers, competition, season, location } =
    match.fields as MatchEventFields;
  const hasScore =
    typeof homeScore === 'number' && typeof awayScore === 'number';
  const scoreLabel = hasScore ? `${homeScore} - ${awayScore}` : 'TBD';
  const isGoalless = hasScore && homeScore === 0 && awayScore === 0;

  // Get season title and logo
  const seasonEntry = season as unknown as Entry<SeasonSkeleton>;
  const seasonTitle = seasonEntry?.fields?.title as unknown as string;
  const seasonLogoAsset = seasonEntry?.fields?.logo as unknown as Asset;
  const seasonLogoUrl = seasonLogoAsset?.sys?.id
    ? resolveAsset(seasonLogoAsset.sys.id, assets)
    : null;

  // Get venue - prefer matchViewModel.venue, fall back to match location
  const venue = matchViewModel.venue || location;

  // Parse scorers - handle both string and array formats from Contentful
  const parseScorers = (scorers: string | string[] | undefined): string[] => {
    if (!scorers) return [];
    if (Array.isArray(scorers)) return scorers;
    if (typeof scorers === 'string') return scorers.split(',').map((s) => s.trim());
    return [];
  };

  const homeScorersList = parseScorers(homeScorers);
  const awayScorersList = parseScorers(awayScorers);
  const hasScorers = homeScorersList.length > 0 || awayScorersList.length > 0;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-rose-400 via-red-500 to-red-700 text-white relative overflow-hidden">
      {/* Softer decorative gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

      {/* Softer decorative blur elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Latest Result
        </h2>

        {/* Competition and Season Context */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {seasonLogoUrl && (
            <Image
              src={seasonLogoUrl}
              alt={seasonTitle || competition}
              width={80}
              height={24}
              className="h-6 w-auto object-contain opacity-90"
            />
          )}
          <span className="text-white/80 text-sm">
            {competition} {seasonTitle && `• ${seasonTitle}`}
          </span>
        </div>

        {/* Result Card */}
        <div className="glass-dark rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
          {/* Date, Time and Venue */}
          <div className="text-center mb-6">
            <p className="text-white/70 text-sm tracking-wide">
              {matchViewModel.date} • {matchViewModel.kickoffTime}
            </p>
            {venue && (
              <p className="text-white/50 text-xs mt-1">{venue}</p>
            )}
          </div>

          {/* Teams and Score Row */}
          <div className="flex items-center justify-center">
            {/* Home Team */}
            <div className="flex items-center flex-1 justify-end">
              <span className="text-lg md:text-2xl font-bold mr-4 text-right hidden sm:block">
                {matchViewModel.teamHome.name}
              </span>
              <Image
                src={matchViewModel.teamHome.logoUrl}
                alt={matchViewModel.teamHome.name}
                width={80}
                height={80}
                className="h-14 w-14 md:h-20 md:w-20 object-contain"
              />
            </div>

            {/* Score */}
            <div className="mx-4 md:mx-10 text-center">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">
                {scoreLabel}
              </div>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                Full Time
              </p>
            </div>

            {/* Away Team */}
            <div className="flex items-center flex-1">
              <Image
                src={matchViewModel.teamAway.logoUrl}
                alt={matchViewModel.teamAway.name}
                width={80}
                height={80}
                className="h-14 w-14 md:h-20 md:w-20 object-contain"
              />
              <span className="text-lg md:text-2xl font-bold ml-4 hidden sm:block">
                {matchViewModel.teamAway.name}
              </span>
            </div>
          </div>

          {/* Mobile team names */}
          <div className="flex justify-between mt-4 sm:hidden text-sm font-medium">
            <span>{matchViewModel.teamHome.name}</span>
            <span>{matchViewModel.teamAway.name}</span>
          </div>

          {/* Scorers Section */}
          <div className="mt-6 pt-6 border-t border-white/20">
            {isGoalless ? (
              <p className="text-center text-white/60 text-sm italic">No goals</p>
            ) : hasScorers ? (
              <div className="flex justify-between">
                {/* Home Scorers */}
                <div className="flex-1 text-right pr-4 md:pr-8">
                  {homeScorersList.length > 0 && (
                    <div className="text-sm md:text-base text-white/80 space-y-1">
                      {homeScorersList.map((scorer, i) => (
                        <p key={i} className="flex items-center justify-end gap-2">
                          <span>{scorer}</span>
                          <span className="text-base">⚽</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Away Scorers */}
                <div className="flex-1 text-left pl-4 md:pl-8">
                  {awayScorersList.length > 0 && (
                    <div className="text-sm md:text-base text-white/80 space-y-1">
                      {awayScorersList.map((scorer, i) => (
                        <p key={i} className="flex items-center gap-2">
                          <span className="text-base">⚽</span>
                          <span>{scorer}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href={`/matches/${matchViewModel.slug}`}
              className="inline-block bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Match Report
            </Link>

            {/* Highlights Button (Placeholder) */}
            <button
              disabled
              className="inline-flex items-center gap-2 bg-white/10 text-white/50 px-8 py-3 rounded-full font-semibold cursor-not-allowed border border-white/20"
              title="Highlights coming soon"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Highlights
              <span className="text-xs opacity-70">(Soon)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
