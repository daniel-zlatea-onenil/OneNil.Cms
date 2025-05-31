import { Entry, EntrySkeletonType } from 'contentful';

export type NextMatchBlockFields = {
    title: string;
    date: string;
    team1: string;
    team2: string;
};

export type NextMatchBlockSkeleton = EntrySkeletonType<NextMatchBlockFields>;
export type NextMatchBlockEntry = Entry<NextMatchBlockSkeleton>;
export type ComponentEntry = NextMatchBlockEntry;

