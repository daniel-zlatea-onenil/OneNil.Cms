import { contentfulClient } from '@/lib/contentful';
import { MatchEventSkeleton, SeasonSkeleton, TeamSkeleton } from '@/lib/types';
import { MatchViewModel } from '@/lib/viewModels';
import { Asset, Entry } from 'contentful';
import { resolveAsset } from '@/lib/utils';
import { format } from 'date-fns';

export async function getLastSeason(): Promise<Entry<SeasonSkeleton>> {
  const entries = await contentfulClient.getEntries<SeasonSkeleton>({
    content_type: 'season',
    limit: 1,
    // @ts-expect-error – ordering by fields is valid but not in the SDK's types
    order: '-fields.startYear',
  });

  return entries.items[0];
}

export async function getMatchViewModel(
  slug: string
): Promise<MatchViewModel | undefined> {
  const entries = await contentfulClient.getEntries<MatchEventSkeleton>({
    content_type: 'matchEvent',
    // @ts-expect-error – ordering by fields is valid but not in the SDK's types
    'fields.slug': slug,
    include: 2,
    limit: 1,
  });
  const assets = entries.includes?.Asset as unknown as Asset[]; // if needed

  const match = entries.items[0];
  if (!match) return undefined;

  const { teamHome, teamAway, heroBanner } = match.fields;
  const homeTeam = teamHome as Entry<TeamSkeleton>;
  const awayTeam = teamAway as Entry<TeamSkeleton>;
  let homeLogoUrl: string | undefined = undefined;
  let awayLogoUrl: string | undefined = undefined;

  const homeTeamLogo = homeTeam.fields.logo as unknown as Asset;
  const awayTeamLogo = awayTeam.fields.logo as unknown as Asset;
  const homeTeamName = homeTeam.fields.name! as unknown as string;
  const homeTeamShortName = homeTeam.fields.name! as unknown as string;
  const awayTeamName = awayTeam.fields.shortName! as unknown as string;
  const awayTeamShortName = awayTeam.fields.shortName! as unknown as string;

  if (homeTeamLogo.sys?.id) {
    homeLogoUrl = resolveAsset(homeTeamLogo.sys?.id, assets);
  }

  if (awayTeamLogo.sys?.id) {
    awayLogoUrl = resolveAsset(awayTeamLogo.sys?.id, assets);
  }
  const date = new Date(match.fields.date);
  const formattedDate = format(date, 'dd MMM yyyy');
  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return {
    title: match.fields.title,
    slug: match.fields.slug,
    date: formattedDate,
    targetDate: date,
    location: match.fields.location,
    kickoffTime: formattedTime,
    competition: match.fields.competition,
    ticketLink: match.fields.ticketLink,
    heroBannerUrl: `https:${(heroBanner as Asset)?.fields?.file?.url}`,
    teamHome: {
      name: homeTeamName,
      shortName: homeTeamShortName,
      logoUrl: homeLogoUrl!,
    },
    teamAway: {
      name: awayTeamName,
      shortName: awayTeamShortName,
      logoUrl: awayLogoUrl!,
    },
  };
}

export async function getAllTeamLogos(): Promise<Record<string, string>> {
  const entries = await contentfulClient.getEntries<TeamSkeleton>({
    content_type: 'team',
    // @ts-expect-error – ordering by fields is valid but not in the SDK's types
    select: 'fields.slug,fields.logo',
  });

  const logoMap: Record<string, string> = {};

  for (const team of entries.items) {
    const slug = team.fields.slug as unknown as string;
    const logo = team.fields.logo as unknown as Asset;
    const logoUrl = logo.fields.file?.url as unknown as string;

    if (slug && logoUrl) {
      logoMap[slug] = logoUrl; // Adjust if you use full CDN URLs
    }
  }

  return logoMap;
}
