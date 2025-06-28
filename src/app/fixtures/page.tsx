import {contentfulClient} from '@/lib/contentful';
import Link from 'next/link';
import {MatchEventFields, MatchEventSkeleton, TeamSkeleton} from "@/lib/types";
import NextMatchBannerWrapper from '@/app/components/NextMatchBannerWrapper';
import {format} from 'date-fns';
import {Asset, Entry} from "contentful";
import {resolveAsset} from "@/lib/utils";
import {getMatchViewModel} from "@/lib/serverUtils";
import {MatchViewModel} from "@/lib/viewModels";

async function getEvents(): Promise<{
    events: MatchEventFields[];
    nextEventViewModel: MatchViewModel | undefined;
    assets?: Asset[];
}> {
    const response = await contentfulClient.getEntries<MatchEventSkeleton>({
        content_type: 'matchEvent',
        // @ts-expect-error – ordering by fields is valid but not in the SDK's types
        order: ['fields.date'],
        include: 2,
        'fields.date[gte]': new Date().toISOString(),
    });
    const assets = response.includes?.Asset as unknown as Asset[];
    const nextEventViewModel = await getMatchViewModel(response.items[0].fields.slug);
    const events = response.items.map((item) => {
        const fields = item.fields as MatchEventFields;
        const {
            slug,
            date,
            title,
            location,
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
            competition,
            ticketLink,
            teamHome,
            teamAway,
            heroBanner
        };
    });

    return { events, nextEventViewModel, assets };
}

export default async function FixturesPage() {
    const { events, nextEventViewModel, assets } = await getEvents();
    
    return (
        <>
            <NextMatchBannerWrapper viewModel={nextEventViewModel} />
            <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-red-700 mb-8">2024/25 Fixtures</h1>
            <ul className="space-y-6">
                {events.length > 1 && events.slice(1).map((match) => {
                    const date = new Date(match.date);
                    const formattedDate = format(date, 'dd MMM yyyy');
                    const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });

                    const homeTeam = match.teamHome as Entry<TeamSkeleton>;
                    const awayTeam = match.teamAway as Entry<TeamSkeleton>;

                    const assetIncludes = assets as Asset[] ?? [];

                    let homeLogoUrl: string | undefined = undefined;
                    let awayLogoUrl: string | undefined = undefined;

                    const homeTeamLogo = homeTeam.fields.logo as unknown as Asset;
                    const awayTeamLogo = awayTeam.fields.logo as unknown as Asset;
                    const homeTeamName = homeTeam.fields.name! as unknown as string;
                    const awayTeamName = awayTeam.fields.name! as unknown as string;

                    if (homeTeamLogo.sys?.id) {
                        homeLogoUrl = resolveAsset(homeTeamLogo.sys?.id, assetIncludes);
                    }

                    if (awayTeamLogo.sys?.id) {
                        awayLogoUrl = resolveAsset(awayTeamLogo.sys?.id, assetIncludes);
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
                                                alt={homeTeamName}
                                                width={24}
                                                height={24}
                                                className="object-contain"
                                            />
                                            <span>{homeTeamName}</span>
                                        </div>

                                        <span className="text-gray-400">vs</span>

                                        {/* Away team */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={awayLogoUrl}
                                                alt={awayTeamName}
                                                width={24}
                                                height={24}
                                                className="object-contain"
                                            />
                                            <span>{awayTeamName}</span>
                                        </div>
                                    </h2>

                                    <p className="text-sm text-gray-600">
                                        {formattedDate} · {formattedTime} · {match.location}
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
