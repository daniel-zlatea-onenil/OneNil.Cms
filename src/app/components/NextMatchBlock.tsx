import { contentfulClient } from '@/lib/contentful';
import { NextMatchBlockFields, NextMatchBlockSkeleton } from '@/lib/types';

export default async function NextMatchBlock() {
    const res = await contentfulClient.getEntries<NextMatchBlockSkeleton>({
        content_type: 'nextMatchBlock',
        limit: 1,
    });

    const match = res.items[0];

    if (!match) {
        return (
            <div className="text-center text-gray-600 py-6">
                <p>No upcoming match found.</p>
            </div>
        );
    }


    const { title, date, team1, team2 } = match.fields as NextMatchBlockFields;
    
    return (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Next Match</h2>
            <p className="text-lg font-medium text-red-700">{title}</p>
            <p className="text-lg font-medium text-red-700">vs. {team1}</p>
            <p className="text-sm text-gray-600">{new Date(date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">{team2}</p>
        </div>
    );
}
