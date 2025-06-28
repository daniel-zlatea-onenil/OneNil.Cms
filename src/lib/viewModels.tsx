export type MatchViewModel = {
    title: string;
    slug: string;
    date: string;
    location: string;
    kickoffTime: string;
    competition: string;
    ticketLink?: string;
    heroBannerUrl: string;
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
