export default function LeagueTableLoading() {
  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      {/* Page Header Skeleton */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="h-12 w-64 bg-white/20 rounded-lg animate-pulse" />
              <div className="h-6 w-40 bg-white/20 rounded-lg animate-pulse mt-2" />
            </div>
            <div className="h-10 w-48 bg-white/20 rounded-lg animate-pulse" />
          </div>
        </div>
      </section>

      {/* League Table Skeleton */}
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
                {Array.from({ length: 20 }).map((_, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 border-l-4 border-l-transparent"
                  >
                    <td className="px-4 py-4">
                      <div className="h-5 w-6 bg-slate-200 rounded animate-pulse" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-200 rounded animate-pulse" />
                        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-5 w-8 bg-slate-200 rounded animate-pulse mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <div className="h-5 w-8 bg-slate-200 rounded animate-pulse mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <div className="h-5 w-8 bg-slate-200 rounded animate-pulse mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <div className="h-5 w-8 bg-slate-200 rounded animate-pulse mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      <div className="h-5 w-8 bg-slate-200 rounded animate-pulse mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      <div className="h-5 w-8 bg-slate-200 rounded animate-pulse mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      <div className="h-5 w-8 bg-slate-200 rounded animate-pulse mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-5 w-8 bg-slate-200 rounded animate-pulse mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend Skeleton */}
        <div className="mt-6 flex flex-wrap gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
