import {contentfulClient} from '@/lib/contentful';
import Link from 'next/link';
import {MatchEventFields, MatchEventSkeleton} from "@/lib/types";
import {format} from 'date-fns';

async function getEvents(): Promise<MatchEventFields[]> {
    const response = await contentfulClient.getEntries<MatchEventSkeleton>({
        content_type: 'matchEvent',
        // @ts-expect-error – ordering by fields is valid but not in the SDK's types
        order: ['fields.date'],
    });

    const matches = response.items;

    return matches.map((item) => {
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
            teamAway
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
            teamAway
        };
    });
}

export default async function ArticlePage() {
    const events = await getEvents();
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-red-700 mb-8">2024/25 Fixtures</h1>

            <ul className="space-y-6">
                {events.map((match) => {
                    const {slug, date, title, location, kickoffTime, competition, ticketLink} = match;
                    const formattedDate = format(new Date(date), 'dd MMM yyyy');

                    return (
                        <li key={match.slug} className="border border-gray-200 rounded p-4 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between md:items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
                                    <p className="text-sm text-gray-600">
                                        {formattedDate} · {kickoffTime} · {location}
                                    </p>
                                    <p className="text-sm text-gray-500 italic">{competition}</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <Link
                                        href={`/matches/${slug}`}
                                        className="text-red-700 hover:underline text-sm mr-4"
                                    >
                                        Match details →
                                    </Link>
                                    {ticketLink && (
                                        <a
                                            href={ticketLink}
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
    );
}
