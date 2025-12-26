import { contentfulClient } from '@/lib/contentful';
import Link from 'next/link';
import { MatchEventFields, MatchEventSkeleton } from '@/lib/types';
import { getMatchViewModel } from '@/lib/serverUtils';
import Image from 'next/image';
import Countdown from './CountdownComponent';

export default async function NextMatchBlock() {
  const query = {
    content_type: 'matchEvent',
    limit: 1,
    include: 2,
    order: ['fields.date'],
    'fields.date[gte]': new Date().toISOString(),
  };
  const res = await contentfulClient.getEntries<MatchEventSkeleton>(
    query as any // eslint-disable-line @typescript-eslint/no-explicit-any
  );
  const match = res.items[0];
  if (!match) {
    return (
      <div className="text-center text-gray-600 py-6">
        <p>No upcoming match found.</p>
      </div>
    );
  }

  const { date, slug } = match.fields as MatchEventFields;
  const matchViewModel = await getMatchViewModel(match.fields.slug);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-16 md:py-24 overflow-hidden"
      style={{
        backgroundImage: matchViewModel?.heroBannerUrl
          ? `url(${matchViewModel?.heroBannerUrl})`
          : undefined,
      }}
    >
      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Next Match
        </h2>

        {/* Teams Display */}
        <div className="glass-dark rounded-3xl p-4 sm:p-6 md:p-12 inline-block mx-auto max-w-2xl w-full">
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-12">
            {/* Home Team */}
            <div className="flex flex-col items-center group flex-1 min-w-0">
              {matchViewModel?.teamHome.logoUrl && (
                <div className="relative">
                  <Image
                    src={matchViewModel?.teamHome.logoUrl}
                    alt={matchViewModel?.teamHome.name}
                    width={64}
                    height={64}
                    className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <span className="mt-2 sm:mt-3 font-semibold text-xs sm:text-sm md:text-base text-center truncate w-full px-1">
                {matchViewModel?.teamHome.name}
              </span>
            </div>

            {/* VS */}
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white/60 px-1 sm:px-2 flex-shrink-0">
              vs
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center group flex-1 min-w-0">
              {matchViewModel?.teamAway.logoUrl && (
                <div className="relative">
                  <Image
                    src={matchViewModel?.teamAway.logoUrl}
                    alt={matchViewModel?.teamAway.name}
                    width={64}
                    height={64}
                    className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <span className="mt-2 sm:mt-3 font-semibold text-xs sm:text-sm md:text-base text-center truncate w-full px-1">
                {matchViewModel?.teamAway.name}
              </span>
            </div>
          </div>

          {/* Countdown */}
          <div className="my-8">
            <Countdown targetDate={new Date(date)} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href={`/matches/${slug}`}>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105">
                Match Details
              </button>
            </Link>

            <Link href={`/tickets/${slug}`}>
              <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-full shadow-glow-red hover:shadow-glow-red-intense transition-all duration-300 hover:scale-105">
                Buy Tickets
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
