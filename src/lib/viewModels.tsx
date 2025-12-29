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
