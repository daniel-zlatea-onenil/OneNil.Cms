export default function LeagueTablePage() {
    const standings = [
        { pos: 1, team: 'OneNil FC', played: 34, won: 24, drawn: 6, lost: 4, gf: 65, ga: 28, pts: 78 },
        { pos: 2, team: 'Rival Town', played: 34, won: 22, drawn: 7, lost: 5, gf: 59, ga: 30, pts: 73 },
        { pos: 3, team: 'Kingsport United', played: 34, won: 20, drawn: 10, lost: 4, gf: 55, ga: 32, pts: 70 },
        { pos: 4, team: 'Redbridge FC', played: 34, won: 18, drawn: 9, lost: 7, gf: 52, ga: 36, pts: 63 },
        { pos: 5, team: 'Southvale Rangers', played: 34, won: 17, drawn: 8, lost: 9, gf: 47, ga: 40, pts: 59 },
    ];

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
                            <th className="px-3 py-2 text-center">PTS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {standings.map((team) => (
                            <tr key={team.pos} className="odd:bg-white even:bg-slate-50 hover:bg-red-50 transition">
                                <td className="px-3 py-2 font-semibold text-red-700">{team.pos}</td>
                                <td className="px-3 py-2">{team.team}</td>
                                <td className="px-3 py-2 text-center">{team.played}</td>
                                <td className="px-3 py-2 text-center">{team.won}</td>
                                <td className="px-3 py-2 text-center">{team.drawn}</td>
                                <td className="px-3 py-2 text-center">{team.lost}</td>
                                <td className="px-3 py-2 text-center">{team.gf}</td>
                                <td className="px-3 py-2 text-center">{team.ga}</td>
                                <td className="px-3 py-2 text-center font-bold text-slate-900">{team.pts}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
