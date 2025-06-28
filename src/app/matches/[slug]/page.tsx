import {notFound} from 'next/navigation';
import {format} from 'date-fns';
import Image from 'next/image';
import {contentfulClient} from '@/lib/contentful';
import {MatchEventFields, MatchEventSkeleton, TeamSkeleton} from '@/lib/types';
import {Asset, Entry} from 'contentful';
import {getMatchViewModel} from "@/lib/serverUtils";

type Props = {
    params: {
        slug: string;
    };
};

export async function getMatchData(slug: string): Promise<{
    match: Entry<MatchEventSkeleton>;
    assets: Asset[];
}> {
    const entries = await contentfulClient.getEntries<MatchEventSkeleton>({
        content_type: 'matchEvent',
        // @ts-expect-error – ordering by fields is valid but not in the SDK's types
        'fields.slug': slug,
        include: 2,
        limit: 1,
    });

    const match = entries.items[0];
    if (!match) throw new Error(`No match event found for slug: ${slug}`);

    const assets: Asset[] = entries.includes?.Asset ?? [];

    return {match, assets};
}

export default async function MatchPage(props: {
    params: Promise<{ slug: string }>
}) {
    const params = await props.params;
    const matchViewModel = await getMatchViewModel(params.slug);
    console.log('Match data:', matchViewModel);
    if (!matchViewModel) return notFound();

    return (

        <section
            className="relative w-full bg-cover bg-center bg-no-repeat text-white py-10 mb-10 overflow-hidden"
            style={{ backgroundImage: `url('${matchViewModel.heroBannerUrl}')` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 max-w-screen-xl mx-auto text-center px-4">
                <h1 className="text-3xl font-bold mb-4">
                    {matchViewModel.teamHome.name} vs {matchViewModel.teamAway.name}
                </h1>
                <p className="text-lg mb-2">
                    {matchViewModel.date} · {matchViewModel.kickoffTime}
                </p>
                <p className="text-md italic mb-4">
                    {matchViewModel.competition} · {matchViewModel.location}
                </p>

                {/* Teams */}
                <div className="flex justify-center items-center gap-10 mt-6">
                    <div className="flex flex-col items-center">
                        <img
                            src={matchViewModel.teamHome.logoUrl}
                            alt={`${matchViewModel.teamHome.name} logo`}
                            className="h-20 w-20 object-contain"
                        />
                        <span className="mt-2 font-semibold">{matchViewModel.teamHome.name}</span>
                    </div>
                    <span className="text-xl font-bold">vs</span>
                    <div className="flex flex-col items-center">
                        <img
                            src={matchViewModel.teamAway.logoUrl}
                            alt={`${matchViewModel.teamAway.name} logo`}
                            className="h-20 w-20 object-contain"
                        />
                        <span className="mt-2 font-semibold">{matchViewModel.teamAway.name}</span>
                    </div>
                </div>
            </div>
        </section>

    )
}
        