import { Asset, Entry, EntrySkeletonType } from 'contentful';

export type ArticleSkeleton = EntrySkeletonType<ArticleFields>;

export type ArticleFields = {
  title: string;
  slug: string;
  summary: string;
  publishDate: string;
  coverImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  sections?: ComponentEntry[];
};

export type Article = {
  title: string;
  slug: string;
  summary: string;
  date: string;
  imageUrl: string;
};

export type NextMatchBlockFields = {
  title: string;
  date: string;
  team1: string;
  team2: string;
};
export type RichTextBlockSkeleton = EntrySkeletonType<RichTextBlockFields>;
export type RichTextBlockFields = {
  title: string;
  text: Document;
};
export type NextMatchBlockSkeleton = EntrySkeletonType<NextMatchBlockFields>;
export type ComponentEntry =
  | Entry<NextMatchBlockSkeleton>
  | Entry<RichTextBlockSkeleton>;

export type NavigationLinkFields = {
  displayText: string;
  url: string;
};

export type NavigationLinkSkeleton = EntrySkeletonType<NavigationLinkFields>;
export type GlobalLayoutFields = {
  headerLinks: Entry<NavigationLinkSkeleton>[];
  crest: {
    fields: {
      file: {
        url: string;
      };
    };
  };
};
export type GlobalLayoutSkeleton = EntrySkeletonType<GlobalLayoutFields>;
export type NavigationLinkEntry = Entry<NavigationLinkSkeleton>;

export type MatchEventSkeleton = EntrySkeletonType<MatchEventFields>;
export type TeamSkeleton = EntrySkeletonType<TeamFields, 'team'>;
export type TeamFields = {
  name: string;
  shortName?: string;
  slug: string;
  logo: Asset;
  foundationYear?: number;
  city?: string;
  stadium?: string;
  teamColors?: string;
  website?: string;
  bio?: string;
  isTheTeamWeSupport: boolean;
};

export type MatchEventFields = {
  title: string;
  slug: string;
  date: string;
  location: string;
  competition: string;
  ticketLink?: string;
  homeScore?: number;
  awayScore?: number;
  teamHome: Entry<TeamSkeleton>;
  teamAway: Entry<TeamSkeleton>;
  heroBanner: Asset;
};

export type LeagueTableEntry = {
  position: number;
  team: string;
  slug: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

export type SeasonFields = {
  title: string;
  slug: string;
  leagueTable: LeagueTableEntry[];
};

export type SeasonSkeleton = EntrySkeletonType<SeasonFields>;

export type PlayerSkeleton = EntrySkeletonType<PlayerFields>;

export type PlayerFields = {
  name: string;
  position: string;
  squadNumber: number;
  bio: string;
  photo: Asset;
};

export type Player = {
  name: string;
  position: string;
  squadNumber: number;
  bio: string;
  photoUrl: string;
};
