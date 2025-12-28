import Link from 'next/link';
import { MatchEventSkeleton, TeamSkeleton } from '@/lib/types';
import NextMatchBannerWrapper from '@/app/components/NextMatchBannerWrapper';
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
        <NextMatchBannerWrapper viewModel={nextEventViewModel} />
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
