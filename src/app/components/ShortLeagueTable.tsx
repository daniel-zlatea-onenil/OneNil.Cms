import { LeagueTableEntry } from '@/lib/types';
import { getAllTeamLogos, getLastSeason } from '@/lib/serverUtils';
import Link from 'next/link';

export default async function ShortLeagueTable() {
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

  if (!leagueTable?.length) {
    return null;
  }

  const supportedIndex = leagueTable.findIndex(
    (team) => teamLogos[team.slug]?.isTheTeamWeSupport
  );
  const tableLength = leagueTable.length;
  let startIndex = Math.max(0, supportedIndex - 1);
  let endIndex = startIndex + 3;

  if (supportedIndex === -1) {
    startIndex = 0;
    endIndex = 3;
  }

  if (endIndex > tableLength) {
    endIndex = tableLength;
    startIndex = Math.max(0, endIndex - 3);
  }

  const shortTable = leagueTable.slice(startIndex, endIndex);

  return (
    <section className="py-16 md:py-20 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900">
          League Table
        </h2>

        {/* Table with modern styling */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <th className="p-4 font-semibold text-sm">Pos</th>
                <th className="p-4 font-semibold text-sm">Team</th>
                <th className="p-4 font-semibold text-sm text-center">Pld</th>
                <th className="p-4 font-semibold text-sm text-center hidden sm:table-cell">
                  W
                </th>
                <th className="p-4 font-semibold text-sm text-center hidden sm:table-cell">
                  D
                </th>
                <th className="p-4 font-semibold text-sm text-center hidden sm:table-cell">
                  L
                </th>
                <th className="p-4 font-semibold text-sm text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {shortTable.map((team) => {
                const isSupported = teamLogos[team.slug]?.isTheTeamWeSupport;
                return (
                  <tr
                    key={team.slug ?? `${team.team}-${team.position}`}
                    className={`
                      ${
                        isSupported
                          ? 'bg-red-50 border-l-4 border-red-600'
                          : 'hover:bg-slate-50 border-l-4 border-transparent'
                      }
                      border-b border-slate-100 transition-colors duration-200
                    `}
                  >
                    <td className="p-4 text-slate-600 font-medium">
                      {team.position}
                    </td>
                    <td
                      className={`p-4 ${isSupported ? 'font-bold text-red-700' : 'font-medium text-slate-900'}`}
                    >
                      {team.team}
                    </td>
                    <td className="p-4 text-center text-slate-600">
                      {team.played}
                    </td>
                    <td className="p-4 text-center text-slate-600 hidden sm:table-cell">
                      {team.wins}
                    </td>
                    <td className="p-4 text-center text-slate-600 hidden sm:table-cell">
                      {team.draws}
                    </td>
                    <td className="p-4 text-center text-slate-600 hidden sm:table-cell">
                      {team.losses}
                    </td>
                    <td
                      className={`p-4 text-center font-bold ${isSupported ? 'text-red-700' : 'text-slate-900'}`}
                    >
                      {team.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/league-table"
            className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-glow-red transition-all duration-300 hover:scale-105"
          >
            View Full Table
          </Link>
        </div>
      </div>
    </section>
  );
}
