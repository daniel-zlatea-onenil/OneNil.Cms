import Image from 'next/image';

type Player = {
  number: number;
  name: string;
  position?: string;
  subMinute?: number;
  subbedFor?: string;
};

type LineupData = {
  formation: string;
  starting: Player[];
  substitutes: Player[];
};

type MatchLineupsProps = {
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
const dummyHomeLineup: LineupData = {
  formation: '4-3-3',
  starting: [
    { number: 1, name: 'Bono', position: 'GK' },
    { number: 2, name: 'Jesus Navas', position: 'RB' },
    { number: 3, name: 'Diego Carlos', position: 'CB' },
    { number: 4, name: 'Karim Rekik', position: 'CB' },
    { number: 23, name: 'Sergio Reguilon', position: 'LB' },
    { number: 6, name: 'Joan Jordan', position: 'CM' },
    { number: 8, name: 'Ivan Rakitic', position: 'CM' },
    { number: 10, name: 'Ever Banega', position: 'CM' },
    { number: 22, name: 'Lucas Ocampos', position: 'RW' },
    { number: 15, name: 'Youssef En-Nesyri', position: 'ST' },
    { number: 16, name: 'Suso', position: 'LW' },
  ],
  substitutes: [
    { number: 14, name: 'Munir El Haddadi', subMinute: 52, subbedFor: 'Lucas Ocampos' },
    { number: 21, name: 'Oliver Torres', subMinute: 78, subbedFor: 'Ever Banega' },
    { number: 17, name: 'Yassine Bounou' },
    { number: 5, name: 'Fernando' },
    { number: 9, name: 'Luuk de Jong' },
  ],
};

const dummyAwayLineup: LineupData = {
  formation: '4-4-2',
  starting: [
    { number: 1, name: 'Rui Silva', position: 'GK' },
    { number: 12, name: 'Domingos Duarte', position: 'CB' },
    { number: 4, name: 'German Sanchez', position: 'CB' },
    { number: 2, name: 'Foulquier', position: 'RB' },
    { number: 3, name: 'Carlos Neva', position: 'LB' },
    { number: 8, name: 'Luis Milla', position: 'CM' },
    { number: 14, name: 'Yangel Herrera', position: 'CM' },
    { number: 11, name: 'Darwin Machis', position: 'LM' },
    { number: 7, name: 'Bryan Zaragoza', position: 'RM' },
    { number: 9, name: 'Jorge Molina', position: 'ST' },
    { number: 22, name: 'Miquel Gutierrez', position: 'ST' },
  ],
  substitutes: [
    { number: 21, name: 'Alberto Soro', subMinute: 78, subbedFor: 'Luis Milla' },
    { number: 6, name: 'Maxime Gonalons', subMinute: 85, subbedFor: 'Darwin Machis' },
    { number: 13, name: 'Aaron Escandell' },
    { number: 5, name: 'Luis Suarez' },
    { number: 19, name: 'Antonio Puertas' },
  ],
};

function TeamLineup({
  team,
  lineup,
  isAway,
}: {
  team: { name: string; logoUrl: string };
  lineup: LineupData;
  isAway?: boolean;
}) {
  const usedSubs = lineup.substitutes.filter((p) => p.subMinute);
  const unusedSubs = lineup.substitutes.filter((p) => !p.subMinute);

  return (
    <div className={`flex-1 ${isAway ? 'border-l border-slate-100 pl-6' : 'pr-6'}`}>
      {/* Team header */}
      <div className={`flex items-center gap-3 mb-4 ${isAway ? 'flex-row-reverse' : ''}`}>
        <Image
          src={team.logoUrl}
          alt={team.name}
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <div className={isAway ? 'text-right' : ''}>
          <p className="font-semibold text-slate-900">{team.name}</p>
          <p className="text-sm text-slate-500">{lineup.formation}</p>
        </div>
      </div>

      {/* Starting XI */}
      <div className="mb-6">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Starting XI</p>
        <div className="space-y-2">
          {lineup.starting.map((player) => (
            <div
              key={player.number}
              className={`flex items-center gap-2 ${isAway ? 'flex-row-reverse' : ''}`}
            >
              <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                {player.number}
              </span>
              <span className="text-sm text-slate-900">{player.name}</span>
              {player.position && (
                <span className="text-xs text-slate-400">({player.position})</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Substitutes used */}
      {usedSubs.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Substitutes Used</p>
          <div className="space-y-2">
            {usedSubs.map((player) => (
              <div
                key={player.number}
                className={`flex items-center gap-2 ${isAway ? 'flex-row-reverse' : ''}`}
              >
                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium text-green-600">
                  {player.number}
                </span>
                <span className="text-sm text-slate-900">{player.name}</span>
                <span className="text-xs text-slate-400">
                  {player.subMinute}&apos; for {player.subbedFor}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unused substitutes */}
      {unusedSubs.length > 0 && (
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Unused Substitutes</p>
          <div className={`flex flex-wrap gap-2 ${isAway ? 'justify-end' : ''}`}>
            {unusedSubs.map((player) => (
              <span
                key={player.number}
                className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded"
              >
                {player.number}. {player.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MatchLineups({ homeTeam, awayTeam }: MatchLineupsProps) {
  const homeLineup = dummyHomeLineup;
  const awayLineup = dummyAwayLineup;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Lineups</h3>

      <div className="flex flex-col md:flex-row">
        <TeamLineup team={homeTeam} lineup={homeLineup} />
        <TeamLineup team={awayTeam} lineup={awayLineup} isAway />
      </div>
    </div>
  );
}
