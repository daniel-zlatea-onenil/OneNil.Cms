import { Player } from '@/lib/types';
import Image from 'next/image';

type PlayerProps = {
  player: Player | null;
};

export default function PlayerComponent({
  player,
}: PlayerProps) {
  if (!player) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-red-700 mb-6">
          Featured Player
        </h2>
        <div className="flex flex-col md:flex-row items-center bg-gray-100 rounded shadow p-6">
          <Image
            src={player.photoUrl}
            alt="Featured Player"
            width={160}
            height={160}
            className="w-40 h-40 rounded-full object-cover mb-4 md:mb-0 md:mr-6 border-4 border-red-700"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
            <p className="text-gray-600 mb-2">
              {player.position} · #{player.squadNumber}
            </p>
            <p className="text-gray-700 text-sm">{player.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
