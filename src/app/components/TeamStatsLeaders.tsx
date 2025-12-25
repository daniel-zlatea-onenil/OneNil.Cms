import Image from 'next/image';
import { getPlayers } from '@/lib/contentHelper';

const statLabels = ['Top Scorer', 'Most Assists', 'Most Appearances'];

export default async function TeamStatsLeaders() {
  const players = await getPlayers(3);

  if (!players.length) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Team Stats Leaders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {players.map((player, i) => (
            <div
              key={`${player.name}-${player.squadNumber}-${i}`}
              className="glass-dark rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative w-28 h-28 mx-auto mb-4">
                <Image
                  src={player.photoUrl}
                  alt={player.name}
                  fill
                  sizes="112px"
                  className="rounded-full object-cover ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-red-700 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  #{player.squadNumber}
                </div>
              </div>
              <h3 className="text-xl font-bold">{player.name}</h3>
              <p className="text-white/70 text-sm mb-2">
                {statLabels[i] || player.position}
              </p>
              <p className="text-white/60 text-xs">{player.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
