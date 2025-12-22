import Image from 'next/image';
import Link from 'next/link';
import { contentfulClient } from '@/lib/contentful';
import { MatchEventFields, MatchEventSkeleton } from '@/lib/types';
import { getMatchViewModel } from '@/lib/serverUtils';

export default async function LatestResultBlock() {
  const query = {
    content_type: 'matchEvent',
    limit: 1,
    include: 2,
    order: ['-fields.date'],
    'fields.date[lte]': new Date().toISOString(),
  };
  const res = await contentfulClient.getEntries<MatchEventSkeleton>(
    query as any // eslint-disable-line @typescript-eslint/no-explicit-any
  );
  const match = res.items[0];

  if (!match) {
    return null;
  }

  const matchViewModel = await getMatchViewModel(match.fields.slug);

  if (!matchViewModel) {
    return null;
  }

  const { homeScore, awayScore } = match.fields as MatchEventFields;
  const hasScore =
    typeof homeScore === 'number' && typeof awayScore === 'number';
  const scoreLabel = hasScore ? `${homeScore} - ${awayScore}` : 'TBD';

  return (
    <section className="py-12 bg-brand-red text-brand-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Result</h2>
        <div className="flex items-center justify-center text-center">
          <div className="flex items-center">
            <Image
              src={matchViewModel.teamHome.logoUrl}
              alt={matchViewModel.teamHome.name}
              width={80}
              height={80}
              className="h-20"
            />
            <span className="text-2xl font-bold ml-4">
              {matchViewModel.teamHome.name}
            </span>
          </div>
          <div className="mx-8">
            <span className="text-5xl font-bold">{scoreLabel}</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-4">
              {matchViewModel.teamAway.name}
            </span>
            <Image
              src={matchViewModel.teamAway.logoUrl}
              alt={matchViewModel.teamAway.name}
              width={80}
              height={80}
              className="h-20"
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <Link
            href={`/matches/${matchViewModel.slug}`}
            className="inline-block bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition-colors"
          >
            Match Report
          </Link>
        </div>
      </div>
    </section>
  );
}
