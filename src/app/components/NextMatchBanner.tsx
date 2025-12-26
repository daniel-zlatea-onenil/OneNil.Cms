import Countdown from './CountdownComponent'; // we'll define this below
import { MatchViewModel } from '@/lib/viewModels';
import Image from 'next/image'; // if not modular yet, inline logic

type Props = {
  viewModel: MatchViewModel;
};

export default function NextMatchBanner({ viewModel }: Props) {
  return (
    <section
      className="relative w-full left-0 right-0 bg-cover bg-center bg-no-repeat text-white pt-24 md:pt-28 pb-10 mb-10 overflow-hidden"
      style={{ backgroundImage: `url('${viewModel.heroBannerUrl}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-screen-xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">Next Match</h2>
        <div className="flex items-center justify-center space-x-4 text-lg mb-2">
          <div className="flex items-center space-x-2">
            <Image
              src={viewModel.teamHome.logoUrl}
              alt={viewModel.teamHome.name}
              width={72}
              height={72}
              className="h-18 w-18 object-contain"
            />
            <span>{viewModel.teamHome.name}</span>
          </div>
          <span>vs</span>
          <div className="flex items-center space-x-2">
            <Image
              src={viewModel.teamAway.logoUrl}
              alt={viewModel.teamAway.name}
              width={72}
              height={72}
              className="h-18 w-18 object-contain"
            />
            <span>{viewModel.teamAway.name}</span>
          </div>
        </div>
        <p className="text-sm mb-2">
          {viewModel.location} · {viewModel.kickoffTime} ·{' '}
          {viewModel.competition}
        </p>
        <p className="text-sm mb-4">{viewModel.date}</p>
        {viewModel.targetDate && (
          <Countdown targetDate={viewModel.targetDate} />
        )}
        {viewModel.slug && (
          <a
            href={`/matches/${viewModel.slug}`}
            className="inline-block mt-4 bg-red-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            View Details
          </a>
        )}
      </div>
    </section>
  );
}
