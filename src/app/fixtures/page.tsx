import {contentfulClient} from '@/lib/contentful';
import Link from 'next/link';
import {MatchEventFields, MatchEventSkeleton, TeamSkeleton} from "@/lib/types";
import NextMatchBannerWrapper from '@/app/components/NextMatchBannerWrapper';
import {format} from 'date-fns';
import {Asset, Entry} from "contentful";
import {resolveAsset, resolveTeam} from "@/lib/utils";

async function getEvents(): Promise<{
    events: MatchEventFields[];
    entries: Entry<TeamSkeleton>[];
    assets: Asset[];
}> {
    const response = await contentfulClient.getEntries<MatchEventSkeleton>({
        content_type: 'matchEvent',
        // @ts-expect-error – ordering by fields is valid but not in the SDK's types
        order: ['fields.date'],
        include: 2,
        'fields.date[gte]': new Date().toISOString(),
    });

    const entries = response.includes?.Entry as unknown as Entry<TeamSkeleton>[];
    const assets = response.includes?.Asset as unknown as Asset[];

    const events = response.items.map((item) => {
        const fields = item.fields as MatchEventFields;
        const {
            slug,
            date,
            title,
            location,
            kickoffTime,
            competition,
            ticketLink,
            teamHome,
            teamAway,
            heroBanner
        } = fields;

        return {
            slug,
            date,
            title,
            location,
            kickoffTime,
            competition,
            ticketLink,
            teamHome,
            teamAway,
            heroBanner
        };
    });

    return { events, entries, assets };
}

export default async function FixturesPage() {
    const { events, entries, assets } = await getEvents();

    return (
        <>
            <NextMatchBannerWrapper events={events} entries={entries} assets={assets} />
            <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-red-700 mb-8">2024/25 Fixtures</h1>
            <ul className="space-y-6">
                {events.length > 1 && events.slice(1).map((match) => {
                    const formattedDate = format(new Date(match.date), 'dd MMM yyyy');

                    const homeTeam = resolveTeam(match.teamHome.sys.id, entries);
                    const awayTeam = resolveTeam(match.teamAway.sys.id, entries);

                    const assetIncludes = assets as Asset[] ?? [];

                    let homeLogoUrl: string | undefined = undefined;
                    let awayLogoUrl: string | undefined = undefined;

                    if (homeTeam?.logo?.sys?.id) {
                        homeLogoUrl = resolveAsset(homeTeam.logo.sys.id, assetIncludes);
                    }

                    if (awayTeam?.logo?.sys?.id) {
                        awayLogoUrl = resolveAsset(awayTeam.logo.sys.id, assetIncludes);
                    }
                    return (
                        <li key={match.slug} className="border border-gray-200 rounded p-4 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between md:items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center space-x-4">
                                        {/* Home team */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={homeLogoUrl}
                                                alt={homeTeam?.name}
                                                width={24}
                                                height={24}
                                                className="object-contain"
                                            />
                                            <span>{homeTeam?.name}</span>
                                        </div>

                                        <span className="text-gray-400">vs</span>

                                        {/* Away team */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={awayLogoUrl}
                                                alt={awayTeam?.name}
                                                width={24}
                                                height={24}
                                                className="object-contain"
                                            />
                                            <span>{awayTeam?.name}</span>
                                        </div>
                                    </h2>

                                    <p className="text-sm text-gray-600">
                                        {formattedDate} · {match.kickoffTime} · {match.location}
                                    </p>
                                    <p className="text-sm text-gray-500 italic">{match.competition}</p>
                                </div>

                                <div className="mt-4 md:mt-0">
                                    <Link
                                        href={`/matches/${match.slug}`}
                                        className="text-red-700 hover:underline text-sm mr-4"
                                    >
                                        Match details →
                                    </Link>
                                    {match.ticketLink && (
                                        <a
                                            href={match.ticketLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 text-sm"
                                        >
                                            Tickets
                                        </a>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
        </>
    );
}
