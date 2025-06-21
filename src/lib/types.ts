import {Entry, EntrySkeletonType} from 'contentful';

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
    sections?: ComponentEntry[];}

export type Article =
    {
        title: string;
        slug: string;
        summary: string;
        date: string;
        imageUrl: string;
    }
    ;

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
export type ComponentEntry = Entry<NextMatchBlockSkeleton> | Entry<RichTextBlockSkeleton>;

export type NavigationLinkFields = {
    displayText: string;
    url: string;
};

export type NavigationLinkSkeleton = EntrySkeletonType<NavigationLinkFields>;
export type GlobalLayoutFields = { headerLinks: Entry<NavigationLinkSkeleton>[]; };
export type GlobalLayoutSkeleton = EntrySkeletonType<GlobalLayoutFields>;
export type NavigationLinkEntry = Entry<NavigationLinkSkeleton>;


export type MatchEventSkeleton = EntrySkeletonType<MatchEventFields>;
export type TeamSkeleton = EntrySkeletonType<TeamFields, 'team'>;
export type TeamFields = {
    name: string;
    shortName?: string;
    slug: string;
    logo: {
        sys: {
            id: string;
            type: string;
            linkType: string;
        };
    };
    foundationYear?: number;
    city?: string;
    stadium?: string;
    teamColors?: string;
    website?: string;
    bio?: string;
};


export type MatchEventFields = {
        title: string;
        slug: string;
        date: string;
        location: string;
        kickoffTime: string;
        competition: string;
        ticketLink?: string;
        teamHome: {
            sys: {
                id: string;
                type: string;
                linkType: string;
            };
        };
        teamAway: {
            sys: {
                id: string;
                type: string;
                linkType: string;
            };
        };
};


