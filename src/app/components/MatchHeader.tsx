import Image from 'next/image';
import Link from 'next/link';
import { MatchViewModel } from '@/lib/viewModels';
import Countdown from './CountdownComponent';

type MatchHeaderVariant = 'latestResult' | 'fullTime' | 'nextGame' | 'upcoming';

type MatchHeaderProps = {
  match: MatchViewModel;
  variant: MatchHeaderVariant;
};

export default function MatchHeader({ match, variant }: MatchHeaderProps) {
  const hasScore = typeof match.homeScore === 'number' && typeof match.awayScore === 'number';
  const scoreLabel = hasScore ? `${match.homeScore} - ${match.awayScore}` : 'TBD';
  const isGoalless = hasScore && match.homeScore === 0 && match.awayScore === 0;

  // Parse scorers - handle both string and array formats
  const parseScorers = (scorers: string | string[] | undefined): string[] => {
    if (!scorers) return [];
    if (Array.isArray(scorers)) return scorers;
    if (typeof scorers === 'string') return scorers.split(',').map((s) => s.trim());
    return [];
  };

  const homeScorersList = parseScorers(match.homeScorers);
  const awayScorersList = parseScorers(match.awayScorers);
  const hasScorers = homeScorersList.length > 0 || awayScorersList.length > 0;

  // Use stadium photo for nextGame variant
  const stadiumBackgroundUrl = match.homeStadiumPhotoUrl || match.heroBannerUrl;

  // nextGame variant uses the same layout as NextMatchBlock
  if (variant === 'nextGame') {
    return (
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-12 md:py-20 overflow-hidden"
        style={{
          backgroundImage: stadiumBackgroundUrl
            ? `url(${stadiumBackgroundUrl})`
            : undefined,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          {/* Competition and Season Context */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {match.season?.logoUrl && (
              <Image
                src={match.season.logoUrl}
                alt={match.season.title || match.competition}
                width={120}
                height={36}
                className="h-8 md:h-10 w-auto object-contain"
              />
            )}
            <span className="text-white/80 text-base md:text-lg font-medium">
              {match.competition} {match.season?.title && `• ${match.season.title}`}
            </span>
          </div>

          {/* Teams Display - Horizontal inline layout */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4">
            {/* Home Team */}
            <div className="flex items-center gap-2 sm:gap-3">
              {match.teamHome.logoUrl && (
                <Image
                  src={match.teamHome.logoUrl}
                  alt={match.teamHome.name}
                  width={80}
                  height={80}
                  className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                />
              )}
              <span className="font-semibold text-sm sm:text-base md:text-lg text-white">
                {match.teamHome.name}
              </span>
            </div>

            {/* VS */}
            <span className="text-white/70 text-sm sm:text-base md:text-lg px-1 sm:px-2">
              vs
            </span>

            {/* Away Team */}
            <div className="flex items-center gap-2 sm:gap-3">
              {match.teamAway.logoUrl && (
                <Image
                  src={match.teamAway.logoUrl}
                  alt={match.teamAway.name}
                  width={80}
                  height={80}
                  className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                />
              )}
              <span className="font-semibold text-sm sm:text-base md:text-lg text-white">
                {match.teamAway.name}
              </span>
            </div>
          </div>

          {/* Match Info */}
          <p className="text-white/70 text-xs sm:text-sm mb-1">
            {match.venue || match.location} · {match.kickoffTime}
          </p>
          <p className="text-white/70 text-xs sm:text-sm mb-8">
            {match.date}
          </p>

          {/* Countdown */}
          <div className="mb-8">
            <Countdown targetDate={match.targetDate} />
          </div>

          {/* Action Button */}
          {match.ticketLink && (
            <div className="flex justify-center items-center">
              <Link
                href={match.ticketLink}
                className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-medium rounded-md transition-all duration-300 hover:scale-105 min-w-[140px]"
              >
                Buy Tickets
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Post-match variants (latestResult, fullTime)
  const isPostMatch = variant === 'latestResult' || variant === 'fullTime';

  // Get title based on variant
  const getTitle = () => {
    if (variant === 'latestResult') return 'Latest Result';
    return null;
  };

  // Get status label based on variant
  const getStatusLabel = () => {
    if (variant === 'fullTime' || variant === 'latestResult') return 'Full Time';
    return null;
  };

  return (
    <section className="py-16 md:py-20 text-white relative overflow-hidden bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Subtle decorative gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-800 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Title - only for latestResult variant */}
        {variant === 'latestResult' && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {getTitle()}
          </h2>
        )}

        {/* Competition and Season Context */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {match.season?.logoUrl && (
            <Image
              src={match.season.logoUrl}
              alt={match.season.title || match.competition}
              width={80}
              height={24}
              className="h-6 w-auto object-contain opacity-90"
            />
          )}
          <span className="text-white/70 text-sm">
            {match.competition} {match.season?.title && `• ${match.season.title}`}
          </span>
        </div>

        {/* Date, Time and Venue */}
        <div className="text-center mb-4">
          <p className="text-white/60 text-sm tracking-wide">
            {match.date} • {match.kickoffTime}
          </p>
          {match.venue && (
            <p className="text-white/40 text-xs mt-1">{match.venue}</p>
          )}
        </div>

        {/* Attendance and Referee */}
        {isPostMatch && (match.attendance || match.referee) && (
          <div className="flex items-center justify-center gap-4 mb-8 text-white/50 text-xs">
            {match.attendance && (
              <span>Attendance: {match.attendance.toLocaleString()}</span>
            )}
            {match.attendance && match.referee && (
              <span>•</span>
            )}
            {match.referee && (
              <span>Referee: {match.referee}</span>
            )}
          </div>
        )}

        {/* Teams and Score Row */}
        <div className="flex items-center justify-center max-w-3xl mx-auto">
          {/* Home Team */}
          <div className="flex items-center flex-1 justify-end">
            <span className="text-lg md:text-2xl font-bold mr-4 text-right hidden sm:block">
              {match.teamHome.name}
            </span>
            <Image
              src={match.teamHome.logoUrl}
              alt={match.teamHome.name}
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
            {getStatusLabel() && (
              <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">
                {getStatusLabel()}
              </p>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center flex-1">
            <Image
              src={match.teamAway.logoUrl}
              alt={match.teamAway.name}
              width={80}
              height={80}
              className="h-14 w-14 md:h-20 md:w-20 object-contain"
            />
            <span className="text-lg md:text-2xl font-bold ml-4 hidden sm:block">
              {match.teamAway.name}
            </span>
          </div>
        </div>

        {/* Mobile team names */}
        <div className="flex justify-between mt-4 sm:hidden text-sm font-medium max-w-3xl mx-auto px-4">
          <span>{match.teamHome.name}</span>
          <span>{match.teamAway.name}</span>
        </div>

        {/* Scorers Section */}
        {isPostMatch && (
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

        {/* CTA Buttons - only for latestResult variant */}
        {variant === 'latestResult' && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href={`/matches/${match.slug}`}
              className="inline-block bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Match Report
            </Link>
            <button
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-full font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
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
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
