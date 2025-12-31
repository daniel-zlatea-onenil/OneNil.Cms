import { getMatchViewModel, getNextMatch } from '@/lib/serverUtils';
import MatchHeader from './MatchHeader';

// Note: CountdownComponent is available for reuse in other features
// like kit reveals or ticket sale announcements
// import Countdown from './CountdownComponent';

export default async function NextMatchBlock() {
  const { match } = await getNextMatch();

  if (!match) {
    return (
      <div className="text-center text-gray-600 py-6">
        <p>No upcoming match found.</p>
      </div>
    );
  }

  const matchViewModel = await getMatchViewModel(match.fields.slug as unknown as string);

  if (!matchViewModel) {
    return (
      <div className="text-center text-gray-600 py-6">
        <p>No upcoming match found.</p>
      </div>
    );
  }

  return <MatchHeader match={matchViewModel} variant="upcoming" />;
}
