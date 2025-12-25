import { Player } from '@/lib/types';
import Image from 'next/image';

type PlayerProps = {
  player: Player | null;
};

export default function PlayerComponent({ player }: PlayerProps) {
  if (!player) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 relative inline-block">
          Featured Player
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full" />
        </h2>

        <div className="group bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 p-8 md:p-10 overflow-hidden relative">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-100 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Player Image */}
            <div className="relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                <Image
                  src={player.photoUrl}
                  alt={player.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Squad number badge */}
              <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">
                  #{player.squadNumber}
                </span>
              </div>
            </div>

            {/* Player Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {player.name}
              </h3>
              <p className="text-red-600 font-semibold text-lg mb-4">
                {player.position}
              </p>
              <p className="text-slate-600 leading-relaxed max-w-xl">
                {player.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
