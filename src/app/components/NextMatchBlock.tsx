import {contentfulClient} from '@/lib/contentful';
import Link from 'next/link';
import {
    MatchEventFields,
    MatchEventSkeleton,
} from '@/lib/types';
import { getMatchViewModel } from '@/lib/serverUtils';
import Image from 'next/image';

export default async function NextMatchBlock() {
              const query = {
                  content_type: 'matchEvent',
                  limit: 1,
                  include: 2,
                  order: ['fields.date'],
                  'fields.date[gte]': new Date().toISOString(),
              };
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const res = await contentfulClient.getEntries<MatchEventSkeleton>(query as any);  const match = res.items[0];
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
      className="relative bg-cover bg-center bg-no-repeat text-white py-12"
      style={{
        backgroundImage: matchViewModel?.heroBannerUrl
          ? `url(${matchViewModel?.heroBannerUrl})`
          : undefined,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      {/* Dark overlay */}
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">Next Match</h2>

          <p className="text-lg font-medium text-white flex items-center justify-center space-x-2">
            {matchViewModel?.teamHome.logoUrl && (
              <Image
                src={matchViewModel?.teamHome.logoUrl}
                alt={matchViewModel?.teamHome.name}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            )}
            <span>{matchViewModel?.teamHome.name}</span>
            <span className="mx-1">vs.</span>
            <span>{matchViewModel?.teamAway.name}</span>
            {matchViewModel?.teamAway.logoUrl && (
              <Image
                src={matchViewModel?.teamAway.logoUrl}
                alt={matchViewModel?.teamAway.name}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            )}
          </p>

          <p className="text-lg font-medium text-white mt-4 flex items-center justify-center space-x-2">
            <span className="text-xl">🕒</span>
            <span>
              {new Date(date).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </span>
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href={`/matches/${slug}`}>
              <button className="px-6 py-2 bg-red-700 text-white font-medium rounded hover:bg-red-800 transition">
                Match Details
              </button>
            </Link>

            <Link href={`/tickets/${slug}`} passHref>
              <button className="px-6 py-2 bg-red-700 text-white font-medium rounded hover:bg-red-800 transition">
                Buy Tickets
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
