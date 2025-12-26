import { contentfulClient } from '@/lib/contentful';
import Link from 'next/link';
import {
  MatchEventFields,
  MatchEventSkeleton,
  TeamSkeleton,
} from '@/lib/types';
import { format } from 'date-fns';
import { Asset, Entry } from 'contentful';
import { resolveAsset } from '@/lib/utils';
import Image from 'next/image';

async function getResults(): Promise<{
  results: (MatchEventFields & { homeScore: number; awayScore: number })[];
  latestResult:
    | (MatchEventFields & { homeScore: number; awayScore: number })
    | null;
  assets?: Asset[];
}> {
  const query = {
    content_type: 'matchEvent',
    order: ['-fields.date'], // Most recent first
    include: 2,
    'fields.date[lte]': new Date().toISOString(), // Past events only
  };
  const response = await contentfulClient.getEntries<MatchEventSkeleton>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query as any
  );
  const assets = response.includes?.Asset ?? [];

  // Filter to only include matches with scores set (actual results)
  const results = response.items
    .map((item) => item.fields as MatchEventFields)
    .filter(
      (match): match is MatchEventFields & { homeScore: number; awayScore: number } =>
        typeof match.homeScore === 'number' && typeof match.awayScore === 'number'
    );

  const latestResult = results.length > 0 ? results[0] : null;

  return { results, latestResult, assets };
}

export default async function ResultsPage() {
  const { results, latestResult, assets } = await getResults();

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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Latest Result Hero Banner */}
      {latestResult && (
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
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
                    width={64}
                    height={64}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  />
                )}
                <span className="mt-2 text-sm md:text-base font-medium text-center">
                  {getTeamName(latestResult.teamHome)}
                </span>
              </div>

              {/* Score */}
              <div className="text-4xl md:text-6xl font-black tabular-nums">
                {latestResult.homeScore} - {latestResult.awayScore}
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center">
                {getLogoUrl(latestResult.teamAway) && (
                  <Image
                    src={getLogoUrl(latestResult.teamAway)!}
                    alt={getTeamName(latestResult.teamAway)}
                    width={64}
                    height={64}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  />
                )}
                <span className="mt-2 text-sm md:text-base font-medium text-center">
                  {getTeamName(latestResult.teamAway)}
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/80 text-sm mb-4">
                {format(new Date(latestResult.date), 'dd MMM yyyy')} ·{' '}
                {latestResult.competition}
              </p>
              <Link
                href={`/matches/${latestResult.slug}`}
                className="inline-block bg-white text-red-700 px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-all duration-300"
              >
                Match Report
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* No results fallback */}
      {!latestResult && (
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold">Results</h1>
            <p className="text-white/80 mt-2">Season 2024/2025</p>
          </div>
        </section>
      )}

      {/* Results List */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            All Results
          </h2>

          {results.length === 0 ? (
            <p className="text-slate-500 text-center py-12">
              No results available yet.
            </p>
          ) : (
            <div className="space-y-4">
              {results.map((match) => {
                const homeTeam = match.teamHome;
                const awayTeam = match.teamAway;
                const homeLogoUrl = getLogoUrl(homeTeam);
                const awayLogoUrl = getLogoUrl(awayTeam);

                return (
                  <Link
                    key={match.slug}
                    href={`/matches/${match.slug}`}
                    className="block bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
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

                      {/* Date & Competition */}
                      <div className="text-right ml-4 hidden md:block">
                        <p className="text-sm text-slate-600">
                          {format(new Date(match.date), 'dd MMM yyyy')}
                        </p>
                        <p className="text-xs text-slate-400">
                          {match.competition}
                        </p>
                      </div>
                    </div>

                    {/* Mobile: Team names and date */}
                    <div className="flex justify-between mt-3 sm:hidden text-xs text-slate-500">
                      <span>{getTeamName(homeTeam)}</span>
                      <span>{format(new Date(match.date), 'dd MMM')}</span>
                      <span>{getTeamName(awayTeam)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
