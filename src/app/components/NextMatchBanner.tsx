import {MatchEventFields, TeamSkeleton} from '@/lib/types';
import { Asset, Entry } from 'contentful';
import Countdown from './CountdownComponent'; // we'll define this below
import { resolveAsset } from '@/lib/utils'; // if not modular yet, inline logic

type Props = {
    match: MatchEventFields;
    teams: Entry<TeamSkeleton>[];
    assets: Asset[];
};

export default function NextMatchBanner({ match, assets }: Props) {
    const homeTeam = match.teamHome as Entry<TeamSkeleton>;
    const awayTeam = match.teamAway as Entry<TeamSkeleton>;
    let homeLogoUrl: string | undefined = undefined;
    let awayLogoUrl: string | undefined = undefined;

    const homeTeamLogo = homeTeam.fields.logo as unknown as Asset;
    const awayTeamLogo = awayTeam.fields.logo as unknown as Asset;
    const homeTeamName = homeTeam.fields.name! as unknown as string;
    const awayTeamName = awayTeam.fields.name! as unknown as string;

    if (homeTeamLogo.sys?.id) {
        homeLogoUrl = resolveAsset(homeTeamLogo.sys?.id, assets);
    }

    if (awayTeamLogo.sys?.id) {
        awayLogoUrl = resolveAsset(awayTeamLogo.sys?.id, assets);
    }

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
        <section
            className="relative w-full left-0 right-0 bg-cover bg-center bg-no-repeat text-white py-10 mb-10 overflow-hidden"
            style={{ backgroundImage: `url('https:${match.heroBanner?.fields?.file?.url}')` }}
        >

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-screen-xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-2">Next Match</h2>
                <div className="flex items-center justify-center space-x-4 text-lg mb-2">
                    <div className="flex items-center space-x-2">
                        <img src={homeLogoUrl} alt={homeTeamName} className="h-18 w-18 object-contain" />
                        <span>{homeTeamName}</span>
                    </div>
                    <span>vs</span>
                    <div className="flex items-center space-x-2">
                        <img src={awayLogoUrl} alt={awayTeamName} className="h-18 w-18 object-contain" />
                        <span>{awayTeamName}</span>
                    </div>
                </div>
                <p className="text-sm mb-2">
                    {match.location} · match.kickoffTime · {match.competition}
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
                {match.slug && (
                    <a
                        href={`/matches/${match.slug}`}
                        className="inline-block mt-4 bg-red-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-transform transform hover:-translate-y-1"
                    >
                        View Details
                    </a>
                )}
            </div>
        </section>

    );
}
