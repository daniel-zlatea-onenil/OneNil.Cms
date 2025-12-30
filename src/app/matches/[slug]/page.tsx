import { notFound } from 'next/navigation';
import { getMatchViewModel, getMatchBySlug } from '@/lib/serverUtils';
import { getMatchStatus } from '@/lib/utils';
import { MatchStats, TeamSkeleton, SeasonSkeleton } from '@/lib/types';
import { Entry } from 'contentful';
import Image from 'next/image';
import PreMatchSection from '@/app/components/PreMatchSection';
import Link from 'next/link';
import { FiMapPin, FiUsers } from 'react-icons/fi';
import { GiWhistle } from 'react-icons/gi';

export default async function MatchPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  // Fetch both view model and full match data for stats
  const [matchViewModel, { match }] = await Promise.all([
    getMatchViewModel(params.slug),
    getMatchBySlug(params.slug),
  ]);

  if (!matchViewModel || !match) return notFound();

  const matchStatus = getMatchStatus(matchViewModel.targetDate);

  // Extract additional match data
  const fields = match.fields;
  const stats = fields.stats as unknown as MatchStats | undefined;
  const homeTeam = fields.teamHome as unknown as Entry<TeamSkeleton>;
  const season = fields.season as unknown as Entry<SeasonSkeleton> | undefined;
  const seasonTitle = season?.fields?.title as unknown as string | undefined;
  const venue = homeTeam?.fields?.stadiumName as unknown as string | undefined;
  const venueCity = homeTeam?.fields?.city as unknown as string | undefined;
  const referee = stats?.match_facts?.referee ?? (fields.referee as unknown as string | undefined);
  const attendance = stats?.match_facts?.attendance ?? (fields.attendance as unknown as number | undefined);
  const matchday = stats?.match_facts?.matchday ?? (fields.matchday as unknown as string | undefined);

  // Build venue string
  const fullVenue = venueCity ? `${venue}, ${venueCity}` : venue;

  // Use stadium photo for upcoming matches, hero banner for completed/live matches
  const heroImageUrl =
    matchStatus === 'pre-match'
      ? matchViewModel.homeStadiumPhotoUrl || matchViewModel.heroBannerUrl
      : matchViewModel.heroBannerUrl;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat text-white pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden bg-slate-900"
        style={heroImageUrl ? { backgroundImage: `url('${heroImageUrl}')` } : undefined}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4 md:px-8">
          {/* Competition & Matchday */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-red-400 font-semibold text-sm">
              {matchViewModel.competition}
            </span>
            {matchday && (
              <>
                <span className="text-white/40">·</span>
                <span className="text-white/70 text-sm">{matchday}</span>
              </>
            )}
            {seasonTitle && (
              <>
                <span className="text-white/40">·</span>
                <span className="text-white/70 text-sm">{seasonTitle}</span>
              </>
            )}
          </div>

          {/* Match Status Badge */}
          <div className="mb-4">
            {matchStatus === 'pre-match' && (
              <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Upcoming
              </span>
            )}
            {matchStatus === 'live' && (
              <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                Live
              </span>
            )}
            {matchStatus === 'post-match' && (
              <span className="inline-block bg-slate-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Full Time
              </span>
            )}
          </div>

          {/* Date & Time */}
          <p className="text-white/80 text-sm mb-6">
            {matchViewModel.date} · {matchViewModel.kickoffTime}
          </p>

          {/* Teams */}
          <div className="flex justify-center items-center gap-6 md:gap-10">
            {/* Home Team */}
            <div className="flex flex-col items-center flex-1 max-w-[150px]">
              <div className="w-20 h-20 md:w-24 md:h-24 relative">
                <Image
                  src={matchViewModel.teamHome.logoUrl}
                  alt={matchViewModel.teamHome.name}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <span className="mt-3 font-semibold text-sm md:text-base text-center">
                {matchViewModel.teamHome.name}
              </span>
            </div>

            {/* Score or VS */}
            <div className="flex-shrink-0">
              {matchStatus === 'pre-match' ? (
                <span className="text-3xl md:text-4xl font-bold text-white/80">vs</span>
              ) : (
                <div className="text-4xl md:text-6xl font-black tabular-nums">
                  0 - 0
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center flex-1 max-w-[150px]">
              <div className="w-20 h-20 md:w-24 md:h-24 relative">
                <Image
                  src={matchViewModel.teamAway.logoUrl}
                  alt={matchViewModel.teamAway.name}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <span className="mt-3 font-semibold text-sm md:text-base text-center">
                {matchViewModel.teamAway.name}
              </span>
            </div>
          </div>

          {/* Match Facts Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/70">
            {fullVenue && (
              <div className="flex items-center gap-1.5">
                <FiMapPin className="w-4 h-4 text-white/50" />
                <span>{fullVenue}</span>
              </div>
            )}
            {referee && (
              <div className="flex items-center gap-1.5">
                <GiWhistle className="w-4 h-4 text-white/50" />
                <span>{referee}</span>
              </div>
            )}
            {attendance !== undefined && attendance > 0 && (
              <div className="flex items-center gap-1.5">
                <FiUsers className="w-4 h-4 text-white/50" />
                <span>{attendance.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Ticket Link for Pre-Match */}
          {matchStatus === 'pre-match' && matchViewModel.ticketLink && (
            <div className="mt-8">
              <Link
                href={matchViewModel.ticketLink}
                className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-red-600/30 hover:scale-105 transition-all duration-300"
              >
                Buy Tickets
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Pre-Match Content */}
      {matchStatus === 'pre-match' && (
        <PreMatchSection
          targetDate={matchViewModel.targetDate}
          teamHome={matchViewModel.teamHome}
          teamAway={matchViewModel.teamAway}
          competition={matchViewModel.competition}
          location={matchViewModel.location}
        />
      )}

      {/* Post-Match Content */}
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

      {/* Live Content */}
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
