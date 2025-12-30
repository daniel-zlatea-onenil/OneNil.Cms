export type MatchViewModel = {
  title: string;
  slug: string;
  date: string;
  targetDate: Date;
  location: string;
  venue?: string;
  kickoffTime: string;
  competition: string;
  ticketLink?: string;
  heroBannerUrl?: string;
  homeStadiumPhotoUrl?: string;
  homeScore?: number;
  awayScore?: number;
  homeScorers?: string | string[];
  awayScorers?: string | string[];
  attendance?: number;
  referee?: string;
  season?: {
    title: string;
    logoUrl?: string;
  };
  teamHome: {
    name: string;
    shortName?: string;
    logoUrl: string;
  };
  teamAway: {
    name: string;
    shortName?: string;
    logoUrl: string;
  };
};
