import Link from 'next/link';
import { MatchEventFields, MatchEventSkeleton, SeasonSkeleton, TeamSkeleton } from '@/lib/types';
import { format } from 'date-fns';
import { Asset, Entry } from 'contentful';
import { resolveAsset } from '@/lib/utils';
import { getResults as getResultsFromSeason, getLatestResult } from '@/lib/serverUtils';
import Image from 'next/image';
import LatestResultBlock from '@/app/components/LatestResultBlock';

export default async function ResultsPage() {
  const { results, season, assets } = await getResultsFromSeason();
  const { match: latestMatch } = await getLatestResult();

  const seasonTitle = season.fields.title as unknown as string;
  const latestMatchSlug = latestMatch?.fields.slug as unknown as string;

  // Get season logo
  const seasonEntry = season as Entry<SeasonSkeleton>;
  const seasonLogoAsset = seasonEntry?.fields?.logo as unknown as Asset;
  const seasonLogoUrl = seasonLogoAsset?.sys?.id
    ? resolveAsset(seasonLogoAsset.sys.id, assets ?? [])
    : null;

  // Map results to include default scores
  const resultsWithScores = results.map((item: Entry<MatchEventSkeleton>) => {
    const fields = item.fields as MatchEventFields;
    return {
      ...fields,
      homeScore: typeof fields.homeScore === 'number' ? fields.homeScore : 0,
      awayScore: typeof fields.awayScore === 'number' ? fields.awayScore : 0,
    };
  });

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

  // Filter out the latest result since it's shown in the hero
  const otherResults = resultsWithScores.filter((m) => m.slug !== latestMatchSlug);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Latest Result Hero - using the shared component */}
      <div className="pt-16">
        <LatestResultBlock />
      </div>

      {/* No results fallback */}
      {!latestMatch && (
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

          {otherResults.length === 0 ? (
            <p className="text-slate-500 text-center py-12">
              No other results available yet.
            </p>
          ) : (
            <div className="space-y-4">
              {otherResults.map((match) => {
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
                          <div className="flex items-center justify-end gap-1.5 mt-0.5">
                            {seasonLogoUrl && (
                              <Image
                                src={seasonLogoUrl}
                                alt={match.competition}
                                width={16}
                                height={16}
                                className="h-4 w-auto object-contain"
                              />
                            )}
                            <p className="text-xs text-slate-400">
                              {match.competition}
                            </p>
                          </div>
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
