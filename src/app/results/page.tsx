import Link from 'next/link';
import { MatchEventFields, MatchEventSkeleton, TeamSkeleton } from '@/lib/types';
import { format } from 'date-fns';
import { Asset, Entry } from 'contentful';
import { resolveAsset } from '@/lib/utils';
import { getResults as getResultsFromSeason } from '@/lib/serverUtils';
import Image from 'next/image';

export default async function ResultsPage() {
  const { results, season, assets } = await getResultsFromSeason();

  const seasonTitle = season.fields.title as unknown as string;

  // Map results to include default scores
  const resultsWithScores = results.map((item: Entry<MatchEventSkeleton>) => {
    const fields = item.fields as MatchEventFields;
    return {
      ...fields,
      homeScore: typeof fields.homeScore === 'number' ? fields.homeScore : 0,
      awayScore: typeof fields.awayScore === 'number' ? fields.awayScore : 0,
    };
  });

  const latestResult = resultsWithScores.length > 0 ? resultsWithScores[0] : null;

  // Helper to get team logo URL
  const getLogoUrl = (team: Entry<TeamSkeleton>): string | undefined => {
    const logo = team.fields.logo as unknown as Asset;
    if (logo?.sys?.id) {
      return resolveAsset(logo.sys.id, assets ?? []);
    }
    return undefined;
  };

  // Helper to get team name safely
  const getTeamName = (team: Entry<TeamSkeleton>): string => {
    return (team.fields.name as unknown as string) || '';
  };

  // Helper to get hero banner URL
  const getHeroBannerUrl = (
    match: MatchEventFields | null
  ): string | undefined => {
    if (!match?.heroBanner) return undefined;
    const banner = match.heroBanner as unknown as Asset;
    if (banner?.sys?.id) {
      return resolveAsset(banner.sys.id, assets ?? []);
    }
    // Direct URL fallback
    if (banner?.fields?.file?.url) {
      return `https:${banner.fields.file.url}`;
    }
    return undefined;
  };

  // Helper to parse scorers - handle both string and array formats
  const parseScorers = (scorers: string | string[] | undefined): string[] => {
    if (!scorers) return [];
    if (Array.isArray(scorers)) return scorers;
    if (typeof scorers === 'string')
      return scorers.split(',').map((s) => s.trim());
    return [];
  };

  const heroBannerUrl = getHeroBannerUrl(latestResult);
  const homeScorersList = latestResult
    ? parseScorers(latestResult.homeScorers)
    : [];
  const awayScorersList = latestResult
    ? parseScorers(latestResult.awayScorers)
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Latest Result Hero Banner */}
      {latestResult && (
        <section
          className="relative text-white pt-28 md:pt-36 pb-16 md:pb-24 bg-cover bg-top bg-no-repeat overflow-hidden bg-black"
          style={
            heroBannerUrl
              ? { backgroundImage: `url(${heroBannerUrl})` }
              : undefined
          }
        >
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          {/* Stronger side gradients for images that don't fill the width */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

          {/* Fallback gradient if no banner - softer red tones */}
          {!heroBannerUrl && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-red-600" />
          )}

          <div className="relative max-w-6xl mx-auto px-4 md:px-8">
            <p className="text-white/70 text-sm uppercase tracking-wider mb-2">
              Latest Result
            </p>

            <div className="flex items-center justify-center gap-4 md:gap-8 my-8">
              {/* Home Team */}
              <div className="flex flex-col items-center">
                {getLogoUrl(latestResult.teamHome) && (
                  <Image
                    src={getLogoUrl(latestResult.teamHome)!}
                    alt={getTeamName(latestResult.teamHome)}
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
                  />
                )}
                <span className="mt-2 text-sm md:text-lg font-semibold text-center drop-shadow-md">
                  {getTeamName(latestResult.teamHome)}
                </span>
              </div>

              {/* Score */}
              <div className="text-5xl md:text-7xl font-black tabular-nums drop-shadow-lg">
                {latestResult.homeScore} - {latestResult.awayScore}
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center">
                {getLogoUrl(latestResult.teamAway) && (
                  <Image
                    src={getLogoUrl(latestResult.teamAway)!}
                    alt={getTeamName(latestResult.teamAway)}
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
                  />
                )}
                <span className="mt-2 text-sm md:text-lg font-semibold text-center drop-shadow-md">
                  {getTeamName(latestResult.teamAway)}
                </span>
              </div>
            </div>

            {/* Scorers */}
            {(homeScorersList.length > 0 || awayScorersList.length > 0) && (
              <div className="flex justify-center gap-8 md:gap-16 my-6">
                {/* Home Scorers */}
                <div className="flex-1 text-right max-w-[200px]">
                  {homeScorersList.length > 0 && (
                    <div className="text-sm md:text-base text-white/90 space-y-1">
                      {homeScorersList.map((scorer, i) => (
                        <p key={i} className="flex items-center justify-end gap-2">
                          <span>{scorer}</span>
                          <span>⚽</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Away Scorers */}
                <div className="flex-1 text-left max-w-[200px]">
                  {awayScorersList.length > 0 && (
                    <div className="text-sm md:text-base text-white/90 space-y-1">
                      {awayScorersList.map((scorer, i) => (
                        <p key={i} className="flex items-center gap-2">
                          <span>⚽</span>
                          <span>{scorer}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-white/80 text-sm mb-4">
                {format(new Date(latestResult.date), 'dd MMM yyyy')} ·{' '}
                {latestResult.competition}
              </p>
              <Link
                href={`/matches/${latestResult.slug}`}
                className="inline-block bg-white text-red-700 px-6 py-2 rounded-full font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Match Report
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* No results fallback - softer red tones */}
      {!latestResult && (
        <section className="bg-gradient-to-r from-red-400 to-red-500 text-white pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold">Results</h1>
            <p className="text-white/80 mt-2">{seasonTitle}</p>
          </div>
        </section>
      )}

      {/* Results List */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            All Results
          </h2>

          {/* Filter out the latest result since it's already shown in the hero */}
          {resultsWithScores.filter((m) => m.slug !== latestResult?.slug).length === 0 ? (
            <p className="text-slate-500 text-center py-12">
              No other results available yet.
            </p>
          ) : (
            <div className="space-y-4">
              {resultsWithScores
                .filter((m) => m.slug !== latestResult?.slug)
                .map((match) => {
                  const homeTeam = match.teamHome;
                  const awayTeam = match.teamAway;
                  const homeLogoUrl = getLogoUrl(homeTeam);
                  const awayLogoUrl = getLogoUrl(awayTeam);

                  return (
                    <div
                      key={match.slug}
                      className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-between">
                        {/* Match Info */}
                        <div className="flex items-center gap-4 flex-1">
                          {/* Home Team */}
                          <div className="flex items-center gap-2 flex-1 justify-end">
                            <span className="text-sm md:text-base font-medium text-slate-900 text-right hidden sm:block">
                              {getTeamName(homeTeam)}
                            </span>
                            {homeLogoUrl && (
                              <Image
                                src={homeLogoUrl}
                                alt={getTeamName(homeTeam)}
                                width={32}
                                height={32}
                                className="w-8 h-8 object-contain"
                              />
                            )}
                          </div>

                          {/* Score */}
                          <div className="flex items-center justify-center min-w-[80px]">
                            <span className="text-xl md:text-2xl font-bold text-slate-900 tabular-nums">
                              {match.homeScore} - {match.awayScore}
                            </span>
                          </div>

                          {/* Away Team */}
                          <div className="flex items-center gap-2 flex-1">
                            {awayLogoUrl && (
                              <Image
                                src={awayLogoUrl}
                                alt={getTeamName(awayTeam)}
                                width={32}
                                height={32}
                                className="w-8 h-8 object-contain"
                              />
                            )}
                            <span className="text-sm md:text-base font-medium text-slate-900 hidden sm:block">
                              {getTeamName(awayTeam)}
                            </span>
                          </div>
                        </div>

                        {/* Date, Competition & Button */}
                        <div className="flex items-center gap-4 ml-4">
                          <div className="text-right hidden md:block">
                            <p className="text-sm text-slate-600">
                              {format(new Date(match.date), 'dd MMM yyyy')}
                            </p>
                            <p className="text-xs text-slate-400">
                              {match.competition}
                            </p>
                          </div>
                          <Link
                            href={`/matches/${match.slug}`}
                            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors whitespace-nowrap"
                          >
                            Match Report
                          </Link>
                        </div>
                      </div>

                      {/* Mobile: Team names and date */}
                      <div className="flex justify-between items-center mt-3 sm:hidden">
                        <div className="text-xs text-slate-500">
                          <span>{getTeamName(homeTeam)}</span>
                          <span className="mx-2">vs</span>
                          <span>{getTeamName(awayTeam)}</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {format(new Date(match.date), 'dd MMM')}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
