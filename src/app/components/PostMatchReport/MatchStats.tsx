import Image from 'next/image';

type TeamStats = {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  offsides: number;
  passes: number;
  passAccuracy: number;
};

type MatchStatsProps = {
  homeTeam: {
    name: string;
    logoUrl: string;
  };
  awayTeam: {
    name: string;
    logoUrl: string;
  };
};

// Dummy data - will be replaced with real data from Contentful
const dummyHomeStats: TeamStats = {
  possession: 58,
  shots: 14,
  shotsOnTarget: 6,
  corners: 7,
  fouls: 11,
  offsides: 2,
  passes: 487,
  passAccuracy: 86,
};

const dummyAwayStats: TeamStats = {
  possession: 42,
  shots: 9,
  shotsOnTarget: 3,
  corners: 4,
  fouls: 14,
  offsides: 3,
  passes: 352,
  passAccuracy: 79,
};

type StatRowProps = {
  label: string;
  homeValue: number;
  awayValue: number;
  isPercentage?: boolean;
};

function StatRow({ label, homeValue, awayValue, isPercentage }: StatRowProps) {
  const total = homeValue + awayValue;
  const homePercent = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercent = total > 0 ? (awayValue / total) * 100 : 50;

  return (
    <div className="py-3">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-slate-900">
          {homeValue}{isPercentage ? '%' : ''}
        </span>
        <span className="text-sm text-slate-500">{label}</span>
        <span className="font-semibold text-slate-900">
          {awayValue}{isPercentage ? '%' : ''}
        </span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-slate-100">
        <div
          className="bg-red-600 transition-all duration-500"
          style={{ width: `${isPercentage ? homeValue : homePercent}%` }}
        />
        <div
          className="bg-slate-400 transition-all duration-500"
          style={{ width: `${isPercentage ? awayValue : awayPercent}%` }}
        />
      </div>
    </div>
  );
}

export default function MatchStats({ homeTeam, awayTeam }: MatchStatsProps) {
  const homeStats = dummyHomeStats;
  const awayStats = dummyAwayStats;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Match Statistics</h3>

      {/* Team headers */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Image
            src={homeTeam.logoUrl}
            alt={homeTeam.name}
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="font-medium text-slate-900">{homeTeam.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-slate-900">{awayTeam.name}</span>
          <Image
            src={awayTeam.logoUrl}
            alt={awayTeam.name}
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-1">
        <StatRow
          label="Possession"
          homeValue={homeStats.possession}
          awayValue={awayStats.possession}
          isPercentage
        />
        <StatRow
          label="Total Shots"
          homeValue={homeStats.shots}
          awayValue={awayStats.shots}
        />
        <StatRow
          label="Shots on Target"
          homeValue={homeStats.shotsOnTarget}
          awayValue={awayStats.shotsOnTarget}
        />
        <StatRow
          label="Corners"
          homeValue={homeStats.corners}
          awayValue={awayStats.corners}
        />
        <StatRow
          label="Fouls"
          homeValue={homeStats.fouls}
          awayValue={awayStats.fouls}
        />
        <StatRow
          label="Offsides"
          homeValue={homeStats.offsides}
          awayValue={awayStats.offsides}
        />
        <StatRow
          label="Passes"
          homeValue={homeStats.passes}
          awayValue={awayStats.passes}
        />
        <StatRow
          label="Pass Accuracy"
          homeValue={homeStats.passAccuracy}
          awayValue={awayStats.passAccuracy}
          isPercentage
        />
      </div>
    </div>
  );
}
