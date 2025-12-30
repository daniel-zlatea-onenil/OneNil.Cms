import { notFound } from 'next/navigation';
import { getMatchBySlug } from '@/lib/serverUtils';
import { getMatchStatus, resolveAsset } from '@/lib/utils';
import { MatchStats, MatchEventFields, TeamSkeleton, SeasonSkeleton } from '@/lib/types';
import { Asset, Entry } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function MatchPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { match, assets } = await getMatchBySlug(params.slug);

  if (!match) return notFound();

  const fields = match.fields as MatchEventFields;
  const stats = fields.stats as unknown as MatchStats | undefined;

  // Team data
  const homeTeam = fields.teamHome as unknown as Entry<TeamSkeleton>;
  const awayTeam = fields.teamAway as unknown as Entry<TeamSkeleton>;
  const homeTeamName = homeTeam.fields.name as unknown as string;
  const awayTeamName = awayTeam.fields.name as unknown as string;

  // Team logos
  const homeTeamLogo = homeTeam.fields.logo as unknown as Asset;
  const awayTeamLogo = awayTeam.fields.logo as unknown as Asset;
  const homeLogoUrl = homeTeamLogo?.sys?.id
    ? resolveAsset(homeTeamLogo.sys.id, assets) ?? '/placeholder.png'
    : homeTeamLogo?.fields?.file?.url
      ? `https:${homeTeamLogo.fields.file.url}`
      : '/placeholder.png';
  const awayLogoUrl = awayTeamLogo?.sys?.id
    ? resolveAsset(awayTeamLogo.sys.id, assets) ?? '/placeholder.png'
    : awayTeamLogo?.fields?.file?.url
      ? `https:${awayTeamLogo.fields.file.url}`
      : '/placeholder.png';

  // Match date and time
  const matchDate = new Date(fields.date as unknown as string);
  const formattedDate = format(matchDate, 'dd MMM yyyy');
  const formattedTime = format(matchDate, 'HH:mm');
  const matchStatus = getMatchStatus(matchDate);

  // Scores - try Stats first, then fallback to fields
  const homeScore = stats?.match_facts?.attendance !== undefined
    ? fields.homeScore
    : (fields.homeScore as unknown as number | undefined);
  const awayScore = fields.awayScore as unknown as number | undefined;
  const hasScore = typeof homeScore === 'number' && typeof awayScore === 'number';
  const scoreLabel = hasScore ? `${homeScore} - ${awayScore}` : 'vs';
  const isGoalless = hasScore && homeScore === 0 && awayScore === 0;

  // Season data
  const seasonEntry = fields.season as unknown as Entry<SeasonSkeleton>;
  const seasonTitle = seasonEntry?.fields?.title as unknown as string;
  const seasonLogoAsset = seasonEntry?.fields?.logo as unknown as Asset;
  const seasonLogoUrl = seasonLogoAsset?.sys?.id
    ? resolveAsset(seasonLogoAsset.sys.id, assets)
    : null;

  // Competition
  const competition = stats?.match_facts?.competition ?? fields.competition;

  // Venue - try Stats, then team stadium, then location
  const venue = stats?.match_facts?.venue
    ?? (homeTeam?.fields?.stadiumName as unknown as string)
    ?? fields.location;
  const venueCity = stats?.match_facts?.venueCity
    ?? (homeTeam?.fields?.city as unknown as string);
  const fullVenue = venueCity ? `${venue}, ${venueCity}` : venue;

  // Scorers - try Stats.goals first, then fallback to fields
  const parseScorers = (scorers: string | string[] | undefined): string[] => {
    if (!scorers) return [];
    if (Array.isArray(scorers)) return scorers;
    if (typeof scorers === 'string') return scorers.split(',').map((s) => s.trim());
    return [];
  };

  let homeScorersList: string[] = [];
  let awayScorersList: string[] = [];

  if (stats?.goals && stats.goals.length > 0) {
    homeScorersList = stats.goals
      .filter((g) => g.team === 'home')
      .map((g) => {
        let scorer = `${g.player_name} ${g.minute}'`;
        if (g.stoppage_time) scorer = `${g.player_name} ${g.minute}+${g.stoppage_time}'`;
        if (g.goal_type === 'penalty') scorer += ' P';
        if (g.goal_type === 'own_goal') scorer += ' (OG)';
        return scorer;
      });
    awayScorersList = stats.goals
      .filter((g) => g.team === 'away')
      .map((g) => {
        let scorer = `${g.player_name} ${g.minute}'`;
        if (g.stoppage_time) scorer = `${g.player_name} ${g.minute}+${g.stoppage_time}'`;
        if (g.goal_type === 'penalty') scorer += ' P';
        if (g.goal_type === 'own_goal') scorer += ' (OG)';
        return scorer;
      });
  } else {
    homeScorersList = parseScorers(fields.homeScorers);
    awayScorersList = parseScorers(fields.awayScorers);
  }

  const hasScorers = homeScorersList.length > 0 || awayScorersList.length > 0;

  // Match status label
  const getStatusLabel = () => {
    if (matchStatus === 'pre-match') return 'Upcoming';
    if (matchStatus === 'live') return 'Live';
    return 'Full Time';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Same style as LatestResultBlock */}
      <section className="pt-24 md:pt-28 pb-16 md:pb-20 bg-gradient-to-b from-black via-slate-900 to-black text-white relative overflow-hidden">
        {/* Subtle decorative gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        {/* Subtle decorative blur elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-800 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Competition and Season Context */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {seasonLogoUrl && (
              <Image
                src={seasonLogoUrl}
                alt={seasonTitle || competition}
                width={80}
                height={24}
                className="h-6 w-auto object-contain opacity-90"
              />
            )}
            <span className="text-white/70 text-sm">
              {competition} {seasonTitle && `• ${seasonTitle}`}
            </span>
          </div>

          {/* Date, Time and Venue */}
          <div className="text-center mb-8">
            <p className="text-white/60 text-sm tracking-wide">
              {formattedDate} • {formattedTime}
            </p>
            {fullVenue && (
              <p className="text-white/40 text-xs mt-1">{fullVenue}</p>
            )}
          </div>

          {/* Teams and Score Row */}
          <div className="flex items-center justify-center max-w-3xl mx-auto">
            {/* Home Team */}
            <div className="flex items-center flex-1 justify-end">
              <span className="text-lg md:text-2xl font-bold mr-4 text-right hidden sm:block">
                {homeTeamName}
              </span>
              <Image
                src={homeLogoUrl}
                alt={homeTeamName}
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
              <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">
                {getStatusLabel()}
              </p>
            </div>

            {/* Away Team */}
            <div className="flex items-center flex-1">
              <Image
                src={awayLogoUrl}
                alt={awayTeamName}
                width={80}
                height={80}
                className="h-14 w-14 md:h-20 md:w-20 object-contain"
              />
              <span className="text-lg md:text-2xl font-bold ml-4 hidden sm:block">
                {awayTeamName}
              </span>
            </div>
          </div>

          {/* Mobile team names */}
          <div className="flex justify-between mt-4 sm:hidden text-sm font-medium max-w-3xl mx-auto px-4">
            <span>{homeTeamName}</span>
            <span>{awayTeamName}</span>
          </div>

          {/* Scorers Section - Only show for completed matches */}
          {matchStatus === 'post-match' && (
            <div className="mt-8 pt-6 border-t border-white/10 max-w-3xl mx-auto">
              {isGoalless ? (
                <p className="text-center text-white/50 text-sm italic">No goals</p>
              ) : hasScorers ? (
                <div className="flex justify-between">
                  {/* Home Scorers */}
                  <div className="flex-1 text-right pr-4 md:pr-8">
                    {homeScorersList.length > 0 && (
                      <div className="text-sm md:text-base text-white/70 space-y-1">
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
                      <div className="text-sm md:text-base text-white/70 space-y-1">
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
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            {matchStatus === 'pre-match' && fields.ticketLink && (
              <Link
                href={fields.ticketLink as unknown as string}
                className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-red-600/30 hover:scale-105 transition-all duration-300"
              >
                Buy Tickets
              </Link>
            )}

            {matchStatus === 'post-match' && (
              <>
                <button className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-full font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
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
                </button>
              </>
            )}

            <Link
              href="/fixtures"
              className="inline-block text-white/60 hover:text-white text-sm transition-colors"
            >
              ← Back to fixtures
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Content Sections */}
      {matchStatus === 'post-match' && (
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm text-center">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Match Report</h2>
              <p className="text-slate-600">
                Match report content will be available soon.
              </p>
            </div>
          </div>
        </section>
      )}

      {matchStatus === 'live' && (
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <h2 className="text-xl font-bold text-slate-900">Match in Progress</h2>
              </div>
              <p className="text-slate-600">
                Live updates will appear here during the match.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
