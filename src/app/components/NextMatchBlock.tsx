import type {Entry, Asset} from 'contentful';
import {contentfulClient} from '@/lib/contentful';
import Link from 'next/link';
import {
    MatchEventFields,
    MatchEventSkeleton,
    TeamFields,
    TeamSkeleton
} from '@/lib/types';

export default async function NextMatchBlock() {
    const query = {
        content_type: 'matchEvent',
        limit: 1,
        include: 2,
        order: 'fields.date',
    } as any;

    query['fields.date[gte]'] = new Date().toISOString();

    const res = await contentfulClient.getEntries<MatchEventSkeleton>(query);

    const match = res.items[0];
    if (!match) {
        return (
            <div className="text-center text-gray-600 py-6">
                <p>No upcoming match found.</p>
            </div>
        );
    }

    const {date, slug, teamHome, teamAway} = match.fields as MatchEventFields;

    const entries = res.includes?.Entry as unknown as Entry<TeamSkeleton>[]; // 👈 Avoids "any"
    const assets = res.includes?.Asset as unknown as Asset[]; // if needed

    const homeTeam = resolveTeam(teamHome.sys.id, entries);
    const awayTeam = resolveTeam(teamAway.sys.id, entries);

    const homeLogoUrl = homeTeam?.logo?.sys?.id ? resolveAsset(homeTeam.logo.sys.id, assets) : undefined;
    const awayLogoUrl = awayTeam?.logo?.sys?.id ? resolveAsset(awayTeam.logo.sys.id, assets) : undefined;

    return (
    <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-red-700 mb-4">Next Match</h2>

            <p className="text-lg font-medium text-red-700 flex items-center justify-center space-x-2">
                {homeLogoUrl && (
                    <img src={homeLogoUrl} alt={homeTeam?.name} className="h-6 w-6 object-contain" />
                )}
                <span>{homeTeam?.name}</span>
                <span className="mx-1">vs.</span>
                <span>{awayTeam?.name}</span>
                {awayLogoUrl && (
                    <img src={awayLogoUrl} alt={awayTeam?.name} className="h-6 w-6 object-contain" />
                )}
            </p>

            <p className="text-lg font-medium text-gray-800 mt-4 flex items-center justify-center space-x-2">
                <span className="text-xl">🕒</span>
                <span>
        {new Date(date).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })}
      </span>
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href={`/matches/${slug}`}>
                    <button className="px-6 py-2 border border-red-700 text-red-700 font-medium rounded hover:bg-red-100 transition">
                        Match Details
                    </button>
                </Link>

                <Link href={`/tickets/${slug}`} passHref>
                    <button className="px-6 py-2 bg-red-700 text-white font-medium rounded hover:bg-red-800 transition">
                        Buy Tickets
                    </button>
                </Link>
            </div>
        </div>
    </section>

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
