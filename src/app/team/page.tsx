import { contentfulClient } from '@/lib/contentful';
import Image from 'next/image';

type Player = {
    name: string;
    number: number;
    position: string;
    imageUrl: string;
};

async function getPlayers(): Promise<Record<string, Player[]>> {
    const res = await contentfulClient.getEntries({ content_type: 'player' });

    const grouped: Record<string, Player[]> = {};

    for (const item of res.items) {
        const fields = item.fields as any;
        const position = fields.position || 'Unassigned';

        const player: Player = {
            name: fields.name,
            number: fields.shirtNumber,
            position,
            imageUrl: 'https:' + fields.photo.fields.file.url,
        };

        if (!grouped[position]) grouped[position] = [];
        grouped[position].push(player);
    }

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
                                key={player.name}
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
