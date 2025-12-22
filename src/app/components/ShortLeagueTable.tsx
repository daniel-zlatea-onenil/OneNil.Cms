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
    <section className="py-12 bg-brand-gray">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">League Table</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">Pos</th>
              <th className="p-4">Team</th>
              <th className="p-4">Pld</th>
              <th className="p-4">W</th>
              <th className="p-4">D</th>
              <th className="p-4">L</th>
              <th className="p-4">Pts</th>
            </tr>
          </thead>
          <tbody>
            {shortTable.map((team) => (
              <tr
                key={team.slug ?? `${team.team}-${team.position}`}
                className={`${teamLogos[team.slug]?.isTheTeamWeSupport ? 'bg-red-300' : ''} border-b`}
              >
                <td className="p-4">{team.position}</td>
                <td className="p-4">{team.team}</td>
                <td className="p-4">{team.played}</td>
                <td className="p-4">{team.wins}</td>
                <td className="p-4">{team.draws}</td>
                <td className="p-4">{team.losses}</td>
                <td className="p-4">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-6">
          <Link
            href="/league-table"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition-colors"
          >
            View Full Table
          </Link>
        </div>
      </div>
    </section>
  );
}
