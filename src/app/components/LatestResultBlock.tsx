import Image from 'next/image';
import Link from 'next/link';
import { contentfulClient } from '@/lib/contentful';
import { MatchEventFields, MatchEventSkeleton } from '@/lib/types';
import { getMatchViewModel } from '@/lib/serverUtils';

export default async function LatestResultBlock() {
  const query = {
    content_type: 'matchEvent',
    limit: 1,
    include: 2,
    order: ['-fields.date'],
    'fields.date[lte]': new Date().toISOString(),
  };
  const res = await contentfulClient.getEntries<MatchEventSkeleton>(
    query as any // eslint-disable-line @typescript-eslint/no-explicit-any
  );
  const match = res.items[0];

  if (!match) {
    return null;
  }

  const matchViewModel = await getMatchViewModel(match.fields.slug);

  if (!matchViewModel) {
    return null;
  }

  const { homeScore, awayScore, homeScorers, awayScorers } =
    match.fields as MatchEventFields;
  const hasScore =
    typeof homeScore === 'number' && typeof awayScore === 'number';
  const scoreLabel = hasScore ? `${homeScore} - ${awayScore}` : 'TBD';

  // Parse scorers - handle both string and array formats from Contentful
  const parseScorers = (scorers: string | string[] | undefined): string[] => {
    if (!scorers) return [];
    if (Array.isArray(scorers)) return scorers;
    if (typeof scorers === 'string') return scorers.split(',').map((s) => s.trim());
    return [];
  };

  const homeScorersList = parseScorers(homeScorers);
  const awayScorersList = parseScorers(awayScorers);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-red-500 via-red-600 to-red-800 text-white relative overflow-hidden">
      {/* Decorative gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20" />

      {/* Decorative blur elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-900 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Latest Result
        </h2>

        {/* Result Card */}
        <div className="glass-dark rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
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

          {/* Scorers */}
          {(homeScorersList.length > 0 || awayScorersList.length > 0) && (
            <div className="flex justify-between mt-6 pt-6 border-t border-white/20">
              {/* Home Scorers */}
              <div className="flex-1 text-right pr-4 md:pr-8">
                {homeScorersList.length > 0 && (
                  <div className="text-sm md:text-base text-white/80 space-y-1">
                    {homeScorersList.map((scorer, i) => (
                      <p key={i} className="flex items-center justify-end gap-2">
                        <span>{scorer}</span>
                        <span className="text-lg">⚽</span>
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
                        <span className="text-lg">⚽</span>
                        <span>{scorer}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-8">
            <Link
              href={`/matches/${matchViewModel.slug}`}
              className="inline-block bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Match Report
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
