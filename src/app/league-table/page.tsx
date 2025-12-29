import { LeagueTableEntry } from '@/lib/types';
import { getAllTeamLogos, getSeason, getAllSeasons, getActiveSeason } from '@/lib/serverUtils';
import Image from 'next/image';
import SeasonSelector from '@/app/components/SeasonSelector';

interface LeagueTablePageProps {
  searchParams: Promise<{ season?: string }>;
}

export default async function LeagueTablePage({
  searchParams,
}: LeagueTablePageProps) {
  const params = await searchParams;
  const seasonSlug = params.season;

  // Fetch season data and all seasons for the selector
  let season;
  let error: string | null = null;

  try {
    season = await getSeason(seasonSlug);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load season data';
    // Fall back to active season if specified season not found
    try {
      season = await getActiveSeason();
    } catch {
      throw new Error('Unable to load season data');
    }
  }

  const [teamLogos, allSeasons] = await Promise.all([
    getAllTeamLogos(),
    getAllSeasons(),
  ]);

  const leagueTable = season?.fields
    .leagueTable as unknown as LeagueTableEntry[];
  const seasonTitle = season.fields.title as unknown as string;
  const isActiveSeason = season.fields.isActive as unknown as boolean;
  const activeSeasonSlug = season.fields.slug as unknown as string;

  // Determine display title based on season type
  const displayTitle = isActiveSeason
    ? 'League Table'
    : `Final Standings - ${seasonTitle}`;

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">{displayTitle}</h1>
                {!isActiveSeason && (
                  <p className="text-white/80 mt-2">{seasonTitle}</p>
                )}
              </div>
              <div className="sm:hidden">
                <SeasonSelector
                  seasons={allSeasons}
                  currentSeasonSlug={activeSeasonSlug}
                />
              </div>
            </div>
            <div className="hidden sm:flex sm:justify-end">
              <SeasonSelector
                seasons={allSeasons}
                currentSeasonSlug={activeSeasonSlug}
              />
            </div>
          </div>

          {/* Error message if invalid season was requested */}
          {error && seasonSlug && (
            <div className="mt-4 bg-red-500/20 border border-red-400/50 rounded-lg px-4 py-3 text-white/90">
              <p className="text-sm">
                Season not found. Showing active season instead.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* League Table */}
      <section className="py-12 md:py-16 px-4 max-w-6xl mx-auto">
        {!leagueTable || leagueTable.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden p-12 text-center">
            <p className="text-slate-600 text-lg">
              No league table data available for this season.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm md:text-base">
                <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold">#</th>
                    <th className="px-4 py-4 text-left font-semibold">Team</th>
                    <th
                      className="px-4 py-4 text-center font-semibold"
                      title="Played"
                    >
                      P
                    </th>
                    <th
                      className="px-4 py-4 text-center font-semibold hidden sm:table-cell"
                      title="Wins"
                    >
                      W
                    </th>
                    <th
                      className="px-4 py-4 text-center font-semibold hidden sm:table-cell"
                      title="Draws"
                    >
                      D
                    </th>
                    <th
                      className="px-4 py-4 text-center font-semibold hidden sm:table-cell"
                      title="Losses"
                    >
                      L
                    </th>
                    <th
                      className="px-4 py-4 text-center font-semibold hidden md:table-cell"
                      title="Goals For"
                    >
                      GF
                    </th>
                    <th
                      className="px-4 py-4 text-center font-semibold hidden md:table-cell"
                      title="Goals Against"
                    >
                      GA
                    </th>
                    <th
                      className="px-4 py-4 text-center font-semibold hidden md:table-cell"
                      title="Goal Difference"
                    >
                      GD
                    </th>
                    <th
                      className="px-4 py-4 text-center font-semibold"
                      title="Points"
                    >
                      PTS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leagueTable.map((team, index) => {
                    const isTop4 = index < 4;
                    const isBottom3 = index >= leagueTable.length - 3;
                    const isSupportedTeam =
                      teamLogos[team.slug]?.isTheTeamWeSupport;

                    return (
                      <tr
                        key={team.slug}
                        className={`
                          border-b border-slate-100 transition-all duration-300
                          ${
                            isSupportedTeam
                              ? 'bg-red-100 border-l-4 border-l-red-600'
                              : 'border-l-4 border-l-transparent'
                          }
                          ${!isSupportedTeam && isTop4 ? 'bg-blue-50/50' : ''}
                          ${!isSupportedTeam && isBottom3 ? 'bg-orange-50/50' : ''}
                          ${
                            !isSupportedTeam && !isTop4 && !isBottom3
                              ? 'hover:bg-slate-50'
                              : ''
                          }
                        `}
                      >
                        <td className="px-4 py-4 text-slate-600 font-medium">
                          <div className="flex items-center gap-2">
                            {team.position}
                            {isTop4 && !isSupportedTeam && (
                              <svg
                                className="w-3 h-3 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-label="Champions League spot"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            )}
                            {isBottom3 && !isSupportedTeam && (
                              <svg
                                className="w-3 h-3 text-orange-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-label="Relegation zone"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={
                                teamLogos[team.slug]?.logoUrl || '/placeholder.png'
                              }
                              alt={team.team}
                              width={32}
                              height={32}
                              className="w-8 h-8 object-contain"
                            />
                            <span
                              className={`${isSupportedTeam ? 'font-bold text-red-700' : 'font-medium text-slate-900'}`}
                            >
                              {team.team}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-slate-600">
                          {team.played}
                        </td>
                        <td className="px-4 py-4 text-center text-slate-600 hidden sm:table-cell">
                          {team.wins}
                        </td>
                        <td className="px-4 py-4 text-center text-slate-600 hidden sm:table-cell">
                          {team.draws}
                        </td>
                        <td className="px-4 py-4 text-center text-slate-600 hidden sm:table-cell">
                          {team.losses}
                        </td>
                        <td className="px-4 py-4 text-center text-slate-600 hidden md:table-cell">
                          {team.goalsFor}
                        </td>
                        <td className="px-4 py-4 text-center text-slate-600 hidden md:table-cell">
                          {team.goalsAgainst}
                        </td>
                        <td className="px-4 py-4 text-center text-slate-600 hidden md:table-cell">
                          {team.goalDifference > 0
                            ? `+${team.goalDifference}`
                            : team.goalDifference === 0
                              ? '0'
                              : team.goalDifference}
                        </td>
                        <td
                          className={`px-4 py-4 text-center font-bold ${isSupportedTeam ? 'text-red-700' : 'text-slate-900'}`}
                        >
                          {team.points}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200 flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span>Champions League (Top 4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-100 border border-orange-200 flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-orange-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>Relegation Zone (Bottom 3)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-100 border-l-4 border-l-red-600" />
            <span>Your Team</span>
          </div>
        </div>
      </section>
    </main>
  );
}
