import { contentfulClient } from '@/lib/contentful';
import {
  DefaultSettingsSkeleton,
  MatchEventSkeleton,
  SeasonSkeleton,
  TeamSkeleton,
  StatsJson,
} from '@/lib/types';
import { MatchViewModel } from '@/lib/viewModels';
import { Asset, Entry } from 'contentful';
import { resolveAsset } from '@/lib/utils';
import { format } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentfulQuery = any;

/**
 * Error thrown when there are multiple active seasons or no active season.
 */
export class ActiveSeasonError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ActiveSeasonError';
  }
}

/**
 * Gets the currently active season (where isActive === true).
 * There must be exactly one active season at any time.
 *
 * @throws {ActiveSeasonError} If multiple seasons are active or no active season exists.
 */
export async function getActiveSeason(): Promise<Entry<SeasonSkeleton>> {
  const query: ContentfulQuery = {
    content_type: 'season',
    'fields.isActive': true,
  };
  const entries = await contentfulClient.getEntries<SeasonSkeleton>(query);

  if (entries.items.length === 0) {
    throw new ActiveSeasonError(
      'No active season found. Please mark exactly one season as active in Contentful.'
    );
  }

  if (entries.items.length > 1) {
    const activeSlugs = entries.items
      .map((s) => s.fields.slug as unknown as string)
      .join(', ');
    throw new ActiveSeasonError(
      `Multiple active seasons found: ${activeSlugs}. Only one season can be active at a time.`
    );
  }

  return entries.items[0];
}

/**
 * Gets a season by slug, or returns the active season if no slug is provided.
 *
 * @param seasonSlug Optional season slug. If not provided, returns the active season.
 */
export async function getSeason(
  seasonSlug?: string
): Promise<Entry<SeasonSkeleton>> {
  if (seasonSlug) {
    const query: ContentfulQuery = {
      content_type: 'season',
      'fields.slug': seasonSlug,
      limit: 1,
    };
    const entries = await contentfulClient.getEntries<SeasonSkeleton>(query);

    if (entries.items.length === 0) {
      throw new Error(`Season with slug "${seasonSlug}" not found.`);
    }

    return entries.items[0];
  }

  return getActiveSeason();
}

/**
 * Gets all seasons ordered by startYear descending (newest first).
 * Used for season selection dropdown in league table page.
 */
export async function getAllSeasons(): Promise<Entry<SeasonSkeleton>[]> {
  const query: ContentfulQuery = {
    content_type: 'season',
    order: '-fields.startYear',
    limit: 1000,
  };
  const entries = await contentfulClient.getEntries<SeasonSkeleton>(query);

  return entries.items;
}

/**
 * @deprecated Use getSeason() instead. This function uses startYear ordering which should not be used.
 */
export async function getLastSeason(): Promise<Entry<SeasonSkeleton>> {
  const query: ContentfulQuery = {
    content_type: 'season',
    limit: 1,
    order: '-fields.startYear',
  };
  const entries = await contentfulClient.getEntries<SeasonSkeleton>(query);

  return entries.items[0];
}

/**
 * Gets fixtures (upcoming matches) for a season.
 *
 * @param seasonSlug Optional season slug. If not provided, uses the active season.
 */
export async function getFixtures(
  seasonSlug?: string
): Promise<{ fixtures: Entry<MatchEventSkeleton>[]; season: Entry<SeasonSkeleton> }> {
  const season = await getSeason(seasonSlug);
  const seasonId = season.sys.id;

  const now = new Date().toISOString();

  const query: ContentfulQuery = {
    content_type: 'matchEvent',
    'fields.season.sys.id': seasonId,
    'fields.date[gte]': now,
    order: 'fields.date',
    limit: 1000,
  };
  const entries = await contentfulClient.getEntries<MatchEventSkeleton>(query);

  return { fixtures: entries.items, season };
}

/**
 * Gets results (past matches) for a season.
 *
 * @param seasonSlug Optional season slug. If not provided, uses the active season.
 */
export async function getResults(
  seasonSlug?: string
): Promise<{ results: Entry<MatchEventSkeleton>[]; season: Entry<SeasonSkeleton>; assets: Asset[] }> {
  const season = await getSeason(seasonSlug);
  const seasonId = season.sys.id;

  // Results are matches where kickoff + 4 hours has passed
  const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString();

  const query: ContentfulQuery = {
    content_type: 'matchEvent',
    'fields.season.sys.id': seasonId,
    'fields.date[lte]': fourHoursAgo,
    order: '-fields.date',
    include: 2,
    limit: 1000,
  };
  const entries = await contentfulClient.getEntries<MatchEventSkeleton>(query);

  const assets = (entries.includes?.Asset as unknown as Asset[]) || [];

  return { results: entries.items, season, assets };
}

/**
 * Gets all matches for a season (both fixtures and results).
 *
 * @param seasonSlug Optional season slug. If not provided, uses the active season.
 */
export async function getMatches(
  seasonSlug?: string
): Promise<{ matches: Entry<MatchEventSkeleton>[]; season: Entry<SeasonSkeleton> }> {
  const season = await getSeason(seasonSlug);
  const seasonId = season.sys.id;

  const query: ContentfulQuery = {
    content_type: 'matchEvent',
    'fields.season.sys.id': seasonId,
    order: 'fields.date',
    limit: 1000,
  };
  const entries = await contentfulClient.getEntries<MatchEventSkeleton>(query);

  return { matches: entries.items, season };
}

/**
 * Gets the next upcoming match for a season (within 3 hours before kickoff).
 *
 * @param seasonSlug Optional season slug. If not provided, uses the active season.
 */
export async function getNextMatch(
  seasonSlug?: string
): Promise<{ match: Entry<MatchEventSkeleton> | null; season: Entry<SeasonSkeleton>; assets: Asset[] }> {
  const season = await getSeason(seasonSlug);
  const seasonId = season.sys.id;

  // Get matches that haven't started yet (kickoff - 3 hours)
  const threeHoursFromNow = new Date(
    Date.now() + 3 * 60 * 60 * 1000
  ).toISOString();

  const query: ContentfulQuery = {
    content_type: 'matchEvent',
    'fields.season.sys.id': seasonId,
    'fields.date[gte]': threeHoursFromNow,
    order: 'fields.date',
    include: 2,
    limit: 1,
  };
  const entries = await contentfulClient.getEntries<MatchEventSkeleton>(query);

  const assets = (entries.includes?.Asset as unknown as Asset[]) || [];

  return { match: entries.items[0] || null, season, assets };
}

/**
 * Gets the latest completed match for a season.
 *
 * @param seasonSlug Optional season slug. If not provided, uses the active season.
 */
export async function getLatestResult(
  seasonSlug?: string
): Promise<{ match: Entry<MatchEventSkeleton> | null; season: Entry<SeasonSkeleton>; assets: Asset[] }> {
  const season = await getSeason(seasonSlug);
  const seasonId = season.sys.id;

  // Results are matches where kickoff + 4 hours has passed
  const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString();

  const query: ContentfulQuery = {
    content_type: 'matchEvent',
    'fields.season.sys.id': seasonId,
    'fields.date[lte]': fourHoursAgo,
    order: '-fields.date',
    include: 2,
    limit: 1,
  };
  const entries = await contentfulClient.getEntries<MatchEventSkeleton>(query);

  const assets = (entries.includes?.Asset as unknown as Asset[]) || [];

  return { match: entries.items[0] || null, season, assets };
}

export async function getMatchViewModel(
  slug: string
): Promise<MatchViewModel | undefined> {
  const query: ContentfulQuery = {
    content_type: 'matchEvent',
    'fields.slug': slug,
    include: 2,
    limit: 1,
  };
  const entries = await contentfulClient.getEntries<MatchEventSkeleton>(query);
  const assets = entries.includes?.Asset as unknown as Asset[];

  const match = entries.items[0];
  if (!match) return undefined;

  const { teamHome, teamAway, heroBanner, season, stats } = match.fields;
  const homeTeam = teamHome as Entry<TeamSkeleton>;
  const awayTeam = teamAway as Entry<TeamSkeleton>;

  // Parse stats JSON if available
  const statsData = stats as unknown as StatsJson | undefined;

  // Extract score from Stats JSON with fallback to direct fields
  const homeScore = statsData?.match?.score?.home ?? match.fields.homeScore;
  const awayScore = statsData?.match?.score?.away ?? match.fields.awayScore;

  // Extract competition from Stats JSON with fallback
  const competition = statsData?.match?.competition?.name ?? match.fields.competition;

  // Extract scorers from Stats JSON goals array with fallback
  let homeScorers: string | string[] | undefined;
  let awayScorers: string | string[] | undefined;

  if (statsData?.goals && statsData.goals.length > 0) {
    const homeTeamName = (homeTeam.fields.name as unknown as string)?.toLowerCase() || '';
    const awayTeamName = (awayTeam.fields.name as unknown as string)?.toLowerCase() || '';

    // Helper to match team names flexibly (handles "Real Madrid" vs "Real Madrid CF")
    const isHomeTeam = (goalTeam: string | undefined): boolean => {
      if (!goalTeam) return false;
      const goalTeamLower = goalTeam.toLowerCase();
      return homeTeamName.includes(goalTeamLower) || goalTeamLower.includes(homeTeamName.replace(' cf', '').replace(' fc', ''));
    };

    const isAwayTeam = (goalTeam: string | undefined): boolean => {
      if (!goalTeam) return false;
      const goalTeamLower = goalTeam.toLowerCase();
      return awayTeamName.includes(goalTeamLower) || goalTeamLower.includes(awayTeamName.replace(' cf', '').replace(' fc', ''));
    };

    // Group goals by team
    const homeGoals = statsData.goals.filter(g => isHomeTeam(g.team));
    const awayGoals = statsData.goals.filter(g => isAwayTeam(g.team));

    // Format scorers with minute
    homeScorers = homeGoals.map(g => {
      const minute = g.minute ? `${g.minute}'` : '';
      return g.scorer ? `${g.scorer} ${minute}`.trim() : '';
    }).filter(Boolean);

    awayScorers = awayGoals.map(g => {
      const minute = g.minute ? `${g.minute}'` : '';
      return g.scorer ? `${g.scorer} ${minute}`.trim() : '';
    }).filter(Boolean);
  } else {
    // Fallback to direct fields
    homeScorers = match.fields.homeScorers;
    awayScorers = match.fields.awayScorers;
  }

  let homeLogoUrl: string | undefined = undefined;
  let awayLogoUrl: string | undefined = undefined;
  let homeStadiumPhotoUrl: string | undefined = undefined;
  let homeHeroImageUrl: string | undefined = undefined;

  const homeTeamLogo = homeTeam.fields.logo as unknown as Asset;
  const awayTeamLogo = awayTeam.fields.logo as unknown as Asset;
  const homeTeamStadiumPhoto = homeTeam.fields.stadiumPhoto as unknown as Asset;
  const homeTeamHeroImage = homeTeam.fields.heroImage as unknown as Asset;
  const homeTeamDisplayName = homeTeam.fields.name! as unknown as string;
  const homeTeamShortName = homeTeam.fields.shortName as unknown as string;
  const awayTeamDisplayName = awayTeam.fields.name! as unknown as string;
  const awayTeamShortName = awayTeam.fields.shortName as unknown as string;

  if (homeTeamLogo.sys?.id) {
    homeLogoUrl = resolveAsset(homeTeamLogo.sys?.id, assets);
  }

  if (awayTeamLogo.sys?.id) {
    awayLogoUrl = resolveAsset(awayTeamLogo.sys?.id, assets);
  }

  if (homeTeamStadiumPhoto?.sys?.id) {
    homeStadiumPhotoUrl = resolveAsset(homeTeamStadiumPhoto.sys.id, assets);
  }

  if (homeTeamHeroImage?.sys?.id) {
    homeHeroImageUrl = resolveAsset(homeTeamHeroImage.sys.id, assets);
  }

  const date = new Date(match.fields.date);
  const formattedDate = format(date, 'dd MMM yyyy');
  const formattedTime = format(date, 'HH:mm');

  // Get venue from Stats JSON with fallback to home team's stadiumName
  const venue = statsData?.match?.venue?.name ?? (homeTeam.fields.stadiumName as unknown as string);

  // Hero banner fallback logic:
  // 1. Match hero banner (if available)
  // 2. Home team hero image (if available)
  // 3. Default settings matchHeroBanner (fetched separately if needed)
  const heroBannerAsset = heroBanner as Asset;
  let heroBannerUrl: string | undefined = undefined;

  if (heroBannerAsset?.fields?.file?.url) {
    heroBannerUrl = `https:${heroBannerAsset.fields.file.url}`;
  } else if (homeHeroImageUrl) {
    heroBannerUrl = homeHeroImageUrl;
  } else {
    // Fetch default hero banner as last fallback
    heroBannerUrl = await getDefaultHeroBannerUrl();
  }

  // Process season data
  let seasonData: { title: string; logoUrl?: string } | undefined = undefined;
  if (season) {
    const seasonEntry = season as unknown as Entry<SeasonSkeleton>;
    const seasonTitle = seasonEntry?.fields?.title as unknown as string;
    const seasonLogoAsset = seasonEntry?.fields?.logo as unknown as Asset;

    // Try to get logo URL - first check if already resolved inline, then try assets array
    let seasonLogoUrl: string | undefined = undefined;
    if (seasonLogoAsset?.fields?.file?.url) {
      // Asset is already resolved inline
      seasonLogoUrl = `https:${seasonLogoAsset.fields.file.url}`;
    } else if (seasonLogoAsset?.sys?.id) {
      // Try to resolve from assets array
      seasonLogoUrl = resolveAsset(seasonLogoAsset.sys.id, assets);
    }

    seasonData = {
      title: seasonTitle,
      logoUrl: seasonLogoUrl,
    };
  }

  return {
    title: match.fields.title,
    slug: match.fields.slug,
    date: formattedDate,
    targetDate: date,
    location: match.fields.location,
    venue,
    kickoffTime: formattedTime,
    competition,
    ticketLink: match.fields.ticketLink,
    heroBannerUrl,
    homeStadiumPhotoUrl,
    homeScore,
    awayScore,
    homeScorers,
    awayScorers,
    attendance: statsData?.match?.attendance,
    referee: statsData?.match?.referee,
    season: seasonData,
    teamHome: {
      name: homeTeamDisplayName,
      shortName: homeTeamShortName,
      logoUrl: homeLogoUrl!,
    },
    teamAway: {
      name: awayTeamDisplayName,
      shortName: awayTeamShortName,
      logoUrl: awayLogoUrl!,
    },
  };
}

/**
 * Gets the default settings from Contentful.
 * Returns undefined if no settings are found.
 */
export async function getDefaultSettings(): Promise<Entry<DefaultSettingsSkeleton> | undefined> {
  const query: ContentfulQuery = {
    content_type: 'defaultSettings',
    limit: 1,
  };
  const entries = await contentfulClient.getEntries<DefaultSettingsSkeleton>(query);
  return entries.items[0];
}

/**
 * Gets the default hero banner URL from the default settings.
 */
export async function getDefaultHeroBannerUrl(): Promise<string | undefined> {
  const settings = await getDefaultSettings();
  if (!settings) return undefined;

  const heroBanner = settings.fields.matchHeroBanner as unknown as Asset;
  if (heroBanner?.fields?.file?.url) {
    return `https:${heroBanner.fields.file.url}`;
  }
  return undefined;
}

export async function getAllTeamLogos(): Promise<
    Record<
        string,
        {
          logoUrl: string;
          isTheTeamWeSupport: boolean;
        }
    >
> {
  const query: ContentfulQuery = {
    content_type: 'team',
    select: 'fields.slug,fields.logo,fields.isTheTeamWeSupport',
  };
  const entries = await contentfulClient.getEntries<TeamSkeleton>(query);

  const teamMap: Record<
      string,
      {
        logoUrl: string;
        isTheTeamWeSupport: boolean;
      }
  > = {};

  for (const team of entries.items) {
    const slug = team.fields.slug as unknown as string;
    const logo = team.fields.logo as unknown as Asset;
    const logoUrl = logo?.fields?.file?.url as unknown as string;
    const isTheTeamWeSupport =
        team.fields.isTheTeamWeSupport as unknown as boolean;
    console.log(slug, logoUrl, isTheTeamWeSupport);
    if (slug && logoUrl) {
      teamMap[slug] = {
        logoUrl,
        isTheTeamWeSupport: Boolean(isTheTeamWeSupport),
      };
    }
  }

  return teamMap;
}
