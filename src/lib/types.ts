import { Entry, EntrySkeletonType } from 'contentful';

export type ArticleSkeleton = EntrySkeletonType<{
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
}>;

// Optional: simplified version for your app
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

export type NavigationLinkFields = {
    displayText: string;
    url: string;
};

export type NextMatchBlockSkeleton = EntrySkeletonType<NextMatchBlockFields>;
export type NextMatchBlockEntry = Entry<NextMatchBlockSkeleton>;
export type ComponentEntry = NextMatchBlockEntry;

export type NavigationLinkSkeleton = EntrySkeletonType<NavigationLinkFields>;
export type GlobalLayoutFields = { headerLinks: Entry<NavigationLinkSkeleton>[]; };
export type GlobalLayoutSkeleton = EntrySkeletonType<GlobalLayoutFields>;
export type NavigationLinkEntry = Entry<NavigationLinkSkeleton>;


