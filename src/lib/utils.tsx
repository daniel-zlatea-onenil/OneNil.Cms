import { Asset } from 'contentful';

export function resolveAsset(
  assetId: string,
  assets: Asset[]
): string | undefined {
  const asset = assets.find((a) => a.sys.id === assetId && a.fields?.file?.url);
  return asset ? `https:${asset.fields.file?.url}` : undefined;
}

/**
 * Match status utilities based on kick-off time.
 *
 * Match states:
 * - Pre-match: kickoff >= now + 3 hours
 * - Live: now - 3 hours < kickoff < now + 4 hours
 * - Post-match: kickoff <= now - 4 hours
 */

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

/**
 * Returns true if the match is in pre-match state (kickoff is at least 3 hours away)
 */
export function isPreMatch(kickoffDate: Date): boolean {
  const now = new Date();
  const threeHoursFromNow = new Date(now.getTime() + THREE_HOURS_MS);
  return kickoffDate >= threeHoursFromNow;
}

/**
 * Returns true if the match is in live state (between 3h before and 4h after kickoff)
 */
export function isLive(kickoffDate: Date): boolean {
  const now = new Date();
  const threeHoursBefore = new Date(kickoffDate.getTime() - THREE_HOURS_MS);
  const fourHoursAfter = new Date(kickoffDate.getTime() + FOUR_HOURS_MS);
  return now >= threeHoursBefore && now < fourHoursAfter;
}

/**
 * Returns true if the match is in post-match state (kickoff was at least 4 hours ago)
 */
export function isPostMatch(kickoffDate: Date): boolean {
  const now = new Date();
  const fourHoursAfterKickoff = new Date(kickoffDate.getTime() + FOUR_HOURS_MS);
  return now >= fourHoursAfterKickoff;
}

export type MatchStatus = 'pre-match' | 'live' | 'post-match';

/**
 * Returns the current match status based on kick-off time
 */
export function getMatchStatus(kickoffDate: Date): MatchStatus {
  if (isPreMatch(kickoffDate)) return 'pre-match';
  if (isPostMatch(kickoffDate)) return 'post-match';
  return 'live';
}
