import { getLatestResult, getMatchViewModel } from '@/lib/serverUtils';
import MatchHeader from './MatchHeader';

export default async function LatestResultBlock() {
  const { match } = await getLatestResult();

  if (!match) {
    return null;
  }

  const matchViewModel = await getMatchViewModel(match.fields.slug as unknown as string);

  if (!matchViewModel) {
    return null;
  }

  return <MatchHeader match={matchViewModel} variant="latestResult" />;
}
