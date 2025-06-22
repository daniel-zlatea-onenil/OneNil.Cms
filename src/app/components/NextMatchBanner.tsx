'use client';

import {MatchEventFields, TeamFields, TeamSkeleton} from '@/lib/types';
import { Asset, Entry } from 'contentful';
import Countdown from './CountdownComponent'; // we'll define this below
import { resolveTeam, resolveAsset } from '@/lib/utils'; // if not modular yet, inline logic

type Props = {
    match: MatchEventFields;
    teams: Entry<TeamSkeleton>[];
    assets: Asset[];
};

export default function NextMatchBanner({ match, teams, assets }: Props) {
    const homeTeam = resolveTeam(match.teamHome.sys.id, teams) as TeamFields;
    const awayTeam = resolveTeam(match.teamAway.sys.id, teams) as TeamFields;

    const homeLogoUrl = homeTeam?.logo?.sys?.id
        ? resolveAsset(homeTeam.logo.sys.id, assets)
        : '';
    const awayLogoUrl = awayTeam?.logo?.sys?.id
        ? resolveAsset(awayTeam.logo.sys.id, assets)
        : '';

    let targetDate: Date | null = null;

    try {
        const parsed = new Date(match.date);

        if (!isNaN(parsed.getTime())) {
            targetDate = parsed;
        }

    } catch (err) {
        console.error('Invalid kickoff datetime:', err);
    }

    return (
        <section className="bg-red-700 text-white py-10 mb-10 shadow-md rounded-lg">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Next Match</h2>
                <div className="flex items-center justify-center space-x-4 text-lg mb-2">
                    <div className="flex items-center space-x-2">
                        <img src={homeLogoUrl} alt={homeTeam?.name} className="h-6 w-6 object-contain" />
                        <span>{homeTeam?.name}</span>
                    </div>
                    <span>vs</span>
                    <div className="flex items-center space-x-2">
                        <img src={awayLogoUrl} alt={awayTeam?.name} className="h-6 w-6 object-contain" />
                        <span>{awayTeam?.name}</span>
                    </div>
                </div>
                <p className="text-sm mb-2">
                    {match.location} · {match.kickoffTime} · {match.competition}
                </p>
                <p className="text-sm mb-4">
                    {new Date(match.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </p>
                {targetDate && <Countdown targetDate={targetDate} />}
            </div>
        </section>
    );
}
