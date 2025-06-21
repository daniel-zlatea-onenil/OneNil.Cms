import type { Entry, Asset } from 'contentful';
import { contentfulClient } from '@/lib/contentful';
import {
    MatchEventFields,
    MatchEventSkeleton,
    TeamFields,
    TeamSkeleton
} from '@/lib/types';

export default async function NextMatchBlock() {
    const res = await contentfulClient.getEntries<MatchEventSkeleton>({
        content_type: 'matchEvent',
        limit: 1,
        include: 2
    });

    const match = res.items[0];
    if (!match) {
        return (
            <div className="text-center text-gray-600 py-6">
                <p>No upcoming match found.</p>
            </div>
        );
    }

    const { date, teamHome, teamAway } = match.fields as MatchEventFields;

    const entries = res.includes?.Entry as unknown as Entry<TeamSkeleton>[]; // 👈 Avoids "any"
    const assets = res.includes?.Asset as unknown as Asset[]; // if needed

    const homeTeam = resolveTeam(teamHome.sys.id, entries);
    const awayTeam = resolveTeam(teamAway.sys.id, entries);

    const homeLogoUrl = homeTeam?.logo?.sys?.id ? resolveAsset(homeTeam.logo.sys.id, assets) : undefined;
    const awayLogoUrl = awayTeam?.logo?.sys?.id ? resolveAsset(awayTeam.logo.sys.id, assets) : undefined;

    return (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Next Match</h2>
            <p className="text-lg font-medium text-red-700 flex items-center justify-center space-x-2">
                {homeLogoUrl && <img src={homeLogoUrl} alt={homeTeam?.name} className="h-6 w-6 object-contain" />}
                <span>{homeTeam?.name}</span>
                <span className="mx-1">vs.</span>
                <span>{awayTeam?.name}</span>
                {awayLogoUrl && <img src={awayLogoUrl} alt={awayTeam?.name} className="h-6 w-6 object-contain" />}
            </p>
            <p className="text-sm text-gray-600">{new Date(date).toLocaleDateString()}</p>
        </div>
    );
}

function resolveTeam(referenceId: string, includes: Entry<TeamSkeleton>[]): TeamFields | undefined {
    return includes.find(
        (entry) =>
            entry.sys.id === referenceId &&
            entry.sys.contentType?.sys.id === 'team'
    )?.fields as TeamFields;
}

function resolveAsset(assetId: string, assets: Asset[]): string | undefined {
    const asset = assets.find((a) => a.sys.id === assetId && a.fields?.file?.url);
    return asset ? `https:${asset.fields.file?.url}` : undefined;
}
