import { LeagueTableEntry } from '@/lib/types';
import { getAllTeamLogos, getLastSeason } from '@/lib/serverUtils';
import Image from 'next/image';

export default async function LeagueTablePage() {
  const standings = await getLastSeason();
  const teamLogos: Record<
    string,
    {
      logoUrl: string;
      isTheTeamWeSupport: boolean;
    }
  > = await getAllTeamLogos();
  const leagueTable = standings?.fields
    .leagueTable as unknown as LeagueTableEntry[];

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">League Table</h1>
          <p className="text-white/80 mt-2">Season 2024/2025</p>
        </div>
      </section>

      {/* League Table */}
      <section className="py-12 md:py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm md:text-base">
              <thead className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">#</th>
                  <th className="px-4 py-4 text-left font-semibold">Team</th>
                  <th className="px-4 py-4 text-center font-semibold">P</th>
                  <th className="px-4 py-4 text-center font-semibold hidden sm:table-cell">
                    W
                  </th>
                  <th className="px-4 py-4 text-center font-semibold hidden sm:table-cell">
                    D
                  </th>
                  <th className="px-4 py-4 text-center font-semibold hidden sm:table-cell">
                    L
                  </th>
                  <th className="px-4 py-4 text-center font-semibold hidden md:table-cell">
                    GF
                  </th>
                  <th className="px-4 py-4 text-center font-semibold hidden md:table-cell">
                    GA
                  </th>
                  <th className="px-4 py-4 text-center font-semibold hidden md:table-cell">
                    GD
                  </th>
                  <th className="px-4 py-4 text-center font-semibold">PTS</th>
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
                        border-b border-slate-100 transition-colors duration-200
                        ${
                          isSupportedTeam
                            ? 'bg-red-50 border-l-4 border-l-red-600'
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
                        {team.position}
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

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200" />
            <span>Champions League</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-100 border border-orange-200" />
            <span>Relegation Zone</span>
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
