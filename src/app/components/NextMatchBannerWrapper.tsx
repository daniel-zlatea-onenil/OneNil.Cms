'use client';

import { useMemo } from 'react';
import NextMatchBanner from './NextMatchBanner';
import { MatchEventFields, TeamSkeleton } from '@/lib/types';
import { Asset, Entry } from 'contentful';

type Props = {
    events: MatchEventFields[];
    entries: Entry<TeamSkeleton>[];
    assets: Asset[];
};

export default function NextMatchBannerWrapper({ events, entries, assets }: Props) {
    const nextMatch = useMemo(
        () => events.find((event) => new Date(event.date) > new Date()),
        [events]
    );

    if (!nextMatch) return null;

    return <NextMatchBanner match={nextMatch} teams={entries} assets={assets} />;
}
