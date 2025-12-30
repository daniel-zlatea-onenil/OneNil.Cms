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
  stats?: MatchStats; // Optional JSON field for detailed match statistics
  referee?: string;
  attendance?: number;
  matchday?: string;
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

// Match Facts types for Issue #51
export type MatchFacts = {
  competition?: string;
  season?: string;
  matchday?: string;
  kickoffTime?: string;
  kickoffDate?: string;
  venue?: string;
  venueCity?: string;
  referee?: string;
  attendance?: number;
};

// Stats JSON schema for match events (Opta-ready structure)
export type MatchStats = {
  match_facts?: MatchFacts;
  goals?: MatchGoal[];
  cards?: MatchCard[];
  substitutions?: MatchSubstitution[];
  team_stats?: {
    home?: TeamStatistics;
    away?: TeamStatistics;
  };
  lineups?: {
    home_formation?: string;
    away_formation?: string;
    home_starting_xi?: LineupPlayer[];
    away_starting_xi?: LineupPlayer[];
  };
};

export type MatchGoal = {
  minute: number;
  stoppage_time?: number;
  player_name: string;
  player_id?: string;
  assist_player_name?: string;
  assist_player_id?: string;
  goal_type?: 'penalty' | 'header' | 'free_kick' | 'own_goal' | 'regular';
  team: 'home' | 'away';
};

export type MatchCard = {
  minute: number;
  stoppage_time?: number;
  player_name: string;
  player_id?: string;
  card_type: 'yellow' | 'second_yellow' | 'red';
  team: 'home' | 'away';
  reason?: string;
};

export type MatchSubstitution = {
  minute: number;
  stoppage_time?: number;
  player_in_name: string;
  player_in_id?: string;
  player_out_name: string;
  player_out_id?: string;
  team: 'home' | 'away';
  reason?: 'tactical' | 'injury' | 'performance';
};

export type TeamStatistics = {
  possession?: number;
  shots?: number;
  shots_on_target?: number;
  corners?: number;
  offsides?: number;
  fouls?: number;
  yellow_cards?: number;
  red_cards?: number;
  pass_accuracy?: number;
};

export type LineupPlayer = {
  player_name: string;
  player_id?: string;
  shirt_number?: number;
  position?: 'GK' | 'DF' | 'MF' | 'FW';
};
