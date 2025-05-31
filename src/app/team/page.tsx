import {contentfulClient} from '@/lib/contentful';
import {EntrySkeletonType} from 'contentful';
import Image from 'next/image';

type PlayerFields = {
    name: string;
    shirtNumber: number;
    position: string;
    photo: {
        fields: {
            file: {
                url: string;
            };
        };
    };
};

type PlayerSkeleton = EntrySkeletonType<PlayerFields>;

type Player = {
    name: string;
    number: number;
    position: string;
    imageUrl: string;
};

async function getPlayers(): Promise<Record<string, Player[]>> {
    const res = await contentfulClient.getEntries<PlayerSkeleton>({
        content_type: 'player',
    });

    const grouped: Record<string, Player[]> = {};

    res.items.forEach((item) => {
        // Ensure TS knows item.fields is PlayerFields
        const fields = item.fields as PlayerFields;

        const player: Player = {
            name: fields.name,
            number: fields.shirtNumber,
            position: fields.position || 'Unassigned',
            imageUrl: 'https:' + fields.photo.fields.file.url,
        };

        if (!grouped[player.position]) {
            grouped[player.position] = [];
        }

        grouped[player.position].push(player);
    });

    return grouped;
}


export default async function TeamPage() {
    const players = await getPlayers();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">Meet the Team</h1>
            {Object.entries(players).map(([position, group]) => (
                <section key={position} className="mb-12">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">{position}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {group.map((player) => (
                            <div
                                key={`${player.number}-${player.name}`}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden text-center"
                            >
                                <Image
                                    src={player.imageUrl}
                                    alt={player.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-64 object-cover object-top"
                                />
                                <div className="p-4">
                                    <p className="text-sm text-red-600 font-bold">#{player.number}</p>
                                    <p className="text-lg font-medium text-slate-800">{player.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
