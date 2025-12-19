import { LeagueTableEntry } from '@/lib/types';
import { getAllTeamLogos, getLastSeason } from '@/lib/serverUtils';
import Image from 'next/image';

export default async function LeagueTablePage() {
  const standings = await getLastSeason();
  const teamLogos = (await getAllTeamLogos()) as Record<string, string>;
  const leagueTable = standings?.fields
    .leagueTable as unknown as LeagueTableEntry[];
  return (
    <main className="bg-white min-h-screen text-slate-900">
      {/* Page Header */}
      <section className="bg-red-700 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">League Table</h1>
          <p className="text-sm opacity-80">Season 2024/2025</p>
        </div>
      </section>

      {/* League Table */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="overflow-x-auto rounded-lg shadow border border-slate-200">
          <table className="w-full table-auto text-sm md:text-base">
            <thead className="bg-slate-100 text-slate-700 uppercase text-xs font-bold">
              <tr>
                <th className="px-3 py-2 text-left">#</th>
                <th className="px-3 py-2 text-left">Team</th>
                <th className="px-3 py-2 text-center">P</th>
                <th className="px-3 py-2 text-center">W</th>
                <th className="px-3 py-2 text-center">D</th>
                <th className="px-3 py-2 text-center">L</th>
                <th className="px-3 py-2 text-center">GF</th>
                <th className="px-3 py-2 text-center">GA</th>
                <th className="px-3 py-2 text-center">GD</th>
                <th className="px-3 py-2 text-center">PTS</th>
              </tr>
            </thead>
            <tbody>
              {leagueTable.map((team, index) => {
                const isTop4 = index < 4;
                const isBottom3 = index >= leagueTable.length - 3;

                return (
                  <tr
                    key={team.slug}
                    className={`
          ${isTop4 ? 'bg-blue-200' : ''}
          ${isBottom3 ? 'bg-red-200' : ''}
          ${!isTop4 && !isBottom3 ? 'odd:bg-white even:bg-slate-50' : ''}
          text-black hover:bg-opacity-80 transition
        `}
                  >
                    <td className="px-3 py-2">{team.position}</td>
                    <td className="px-3 py-2 flex items-center space-x-2">
                      <Image
                        src={teamLogos[team.slug] || '/placeholder.png'}
                        alt={team.team}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                      <span>{team.team}</span>
                    </td>
                    <td className="px-3 py-2 text-center">{team.played}</td>
                    <td className="px-3 py-2 text-center">{team.wins}</td>
                    <td className="px-3 py-2 text-center">{team.draws}</td>
                    <td className="px-3 py-2 text-center">{team.losses}</td>
                    <td className="px-3 py-2 text-center">{team.goalsFor}</td>
                    <td className="px-3 py-2 text-center">
                      {team.goalsAgainst}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {team.goalDifference}
                    </td>
                    <td className="px-3 py-2 text-center font-bold">
                      {team.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
