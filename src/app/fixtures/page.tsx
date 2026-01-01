import Link from 'next/link';
import { MatchEventSkeleton, TeamSkeleton } from '@/lib/types';
import Countdown from '@/app/components/CountdownComponent';
import { format } from 'date-fns';
import { Asset, Entry } from 'contentful';
import {
  getFixtures as getFixturesFromSeason,
  getMatchViewModel,
} from '@/lib/serverUtils';
import Image from 'next/image';

export default async function FixturesPage() {
  const { fixtures, season } = await getFixturesFromSeason();

  const seasonTitle = season.fields.title as unknown as string;
  const nextEventViewModel =
    fixtures.length > 0
      ? await getMatchViewModel(fixtures[0].fields.slug as unknown as string)
      : null;

  return (
    <>
      {nextEventViewModel && (
        <section
          className="relative bg-cover bg-center bg-no-repeat text-white py-12 md:py-20 overflow-hidden"
          style={{
            backgroundImage: nextEventViewModel.heroBannerUrl
              ? `url(${nextEventViewModel.heroBannerUrl})`
              : undefined,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative max-w-4xl mx-auto px-4 text-center">
            {/* Competition Logo */}
            {nextEventViewModel.season?.logoUrl && (
              <div className="flex justify-center mb-4">
                <Image
                  src={nextEventViewModel.season.logoUrl}
                  alt={nextEventViewModel.season.title || nextEventViewModel.competition}
                  width={120}
                  height={40}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            )}

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-white italic mb-6">
              Next Match
            </h2>

            {/* Teams Display - Horizontal inline layout */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4">
              {/* Home Team */}
              <div className="flex items-center gap-2 sm:gap-3">
                {nextEventViewModel.teamHome.logoUrl && (
                  <Image
                    src={nextEventViewModel.teamHome.logoUrl}
                    alt={nextEventViewModel.teamHome.name}
                    width={80}
                    height={80}
                    className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                  />
                )}
                <span className="font-semibold text-sm sm:text-base md:text-lg text-white">
                  {nextEventViewModel.teamHome.name}
                </span>
              </div>

              {/* VS */}
              <span className="text-white/70 text-sm sm:text-base md:text-lg px-1 sm:px-2">
                vs
              </span>

              {/* Away Team */}
              <div className="flex items-center gap-2 sm:gap-3">
                {nextEventViewModel.teamAway.logoUrl && (
                  <Image
                    src={nextEventViewModel.teamAway.logoUrl}
                    alt={nextEventViewModel.teamAway.name}
                    width={80}
                    height={80}
                    className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                  />
                )}
                <span className="font-semibold text-sm sm:text-base md:text-lg text-white">
                  {nextEventViewModel.teamAway.name}
                </span>
              </div>
            </div>

            {/* Match Info */}
            <p className="text-white/70 text-xs sm:text-sm mb-1">
              {nextEventViewModel.venue || nextEventViewModel.location} · {nextEventViewModel.kickoffTime} · {nextEventViewModel.competition}
            </p>
            <p className="text-white/70 text-xs sm:text-sm mb-8">
              {nextEventViewModel.date}
            </p>

            {/* Countdown */}
            <div className="mb-8">
              <Countdown targetDate={nextEventViewModel.targetDate} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Link href={`/matches/${nextEventViewModel.slug}`}>
                <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-md hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105 min-w-[140px]">
                  Match Center
                </button>
              </Link>

              <Link href={`/tickets/${nextEventViewModel.slug}`}>
                <button className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-medium rounded-md transition-all duration-300 hover:scale-105 min-w-[140px]">
                  Buy Tickets
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-red-700 mb-8">
          {seasonTitle} Fixtures
        </h1>
        <ul className="space-y-6">
          {fixtures.length > 1 &&
            fixtures.slice(1).map((match: Entry<MatchEventSkeleton>) => {
              const date = new Date(match.fields.date as unknown as string);
              const formattedDate = format(date, 'dd MMM yyyy');
              const formattedTime = date.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });

              const homeTeam = match.fields.teamHome as unknown as Entry<TeamSkeleton>;
              const awayTeam = match.fields.teamAway as unknown as Entry<TeamSkeleton>;

              const homeTeamLogo = homeTeam.fields.logo as unknown as Asset;
              const awayTeamLogo = awayTeam.fields.logo as unknown as Asset;
              const homeTeamName = homeTeam.fields.name as unknown as string;
              const awayTeamName = awayTeam.fields.name as unknown as string;

              const homeLogoUrl = homeTeamLogo?.fields?.file?.url
                ? `https:${homeTeamLogo.fields.file.url}`
                : undefined;
              const awayLogoUrl = awayTeamLogo?.fields?.file?.url
                ? `https:${awayTeamLogo.fields.file.url}`
                : undefined;

              return (
                <li
                  key={match.fields.slug as unknown as string}
                  className="border border-gray-200 rounded p-4 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center space-x-4">
                        {/* Home team */}
                        <div className="flex items-center space-x-2">
                          {homeLogoUrl && (
                            <Image
                              src={homeLogoUrl}
                              alt={homeTeamName}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          )}
                          <span>{homeTeamName}</span>
                        </div>

                        <span className="text-gray-400">vs</span>

                        {/* Away team */}
                        <div className="flex items-center space-x-2">
                          {awayLogoUrl && (
                            <Image
                              src={awayLogoUrl}
                              alt={awayTeamName}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          )}
                          <span>{awayTeamName}</span>
                        </div>
                      </h2>

                      <p className="text-sm text-gray-600">
                        {formattedDate} · {formattedTime} ·{' '}
                        {match.fields.location as unknown as string}
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        {match.fields.competition as unknown as string}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <Link
                        href={`/matches/${match.fields.slug}`}
                        className="text-red-700 hover:underline text-sm mr-4"
                      >
                        Match details →
                      </Link>
                      {match.fields.ticketLink && (
                        <a
                          href={match.fields.ticketLink as unknown as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 text-sm"
                        >
                          Tickets
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
