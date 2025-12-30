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
  stadiumPhoto?: Asset;
  heroImage?: Asset;
  foundationYear?: number;
  city?: string;
  stadiumName?: string;
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
  homeScorers?: string | string[];
  awayScorers?: string | string[];
  teamHome: Entry<TeamSkeleton>;
  teamAway: Entry<TeamSkeleton>;
  heroBanner: Asset;
  season?: Entry<SeasonSkeleton>;
  stats?: StatsJson;
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
  startYear: number;
  isActive: boolean;
  leagueTable: LeagueTableEntry[];
  logo?: Asset;
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

export type DefaultSettingsFields = {
  matchHeroBanner?: Asset;
};

export type DefaultSettingsSkeleton = EntrySkeletonType<DefaultSettingsFields>;

// Stats JSON schema types
export type StatsJson = {
  match?: {
    competition?: {
      name?: string;
      season?: string;
      matchday?: number;
    };
    score?: {
      home?: number;
      away?: number;
      status?: string; // "FT", "HT", "LIVE", etc.
    };
    venue?: {
      name?: string;
      city?: string;
    };
  };
  goals?: StatsGoal[];
  cards?: StatsCard[];
  substitutions?: StatsSubstitution[];
  team_stats?: {
    home?: TeamStatistics;
    away?: TeamStatistics;
  };
  lineups?: {
    home_formation?: string;
    away_formation?: string;
    home_starting?: LineupPlayer[];
    away_starting?: LineupPlayer[];
    home_subs?: LineupPlayer[];
    away_subs?: LineupPlayer[];
  };
};

export type StatsGoal = {
  minute?: string;
  team?: string;
  scorer?: string;
  assist?: string;
  play_type?: string; // "header", "penalty", "open play", etc.
  notes?: string;
};

export type StatsCard = {
  minute?: string;
  team?: string;
  player?: string;
  type?: string; // "yellow", "red", "second yellow"
};

export type StatsSubstitution = {
  minute?: string;
  team?: string;
  player_in?: string;
  player_out?: string;
};

export type TeamStatistics = {
  possession?: number;
  shots?: number;
  shots_on_target?: number;
  corners?: number;
  fouls?: number;
  offsides?: number;
  passes?: number;
  pass_accuracy?: number;
};

export type LineupPlayer = {
  name?: string;
  number?: number;
  position?: string;
};
