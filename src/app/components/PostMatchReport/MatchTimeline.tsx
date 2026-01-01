import { FiCircle } from 'react-icons/fi';

type TimelineEvent = {
  minute: number;
  addedTime?: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'half_time' | 'full_time';
  team: 'home' | 'away' | 'neutral';
  primaryPlayer?: string;
  secondaryPlayer?: string;
  description?: string;
  isOwnGoal?: boolean;
  isPenalty?: boolean;
};

type MatchTimelineProps = {
  homeTeam: string;
  awayTeam: string;
};

// Dummy data - will be replaced with real data from Contentful
const dummyEvents: TimelineEvent[] = [
  { minute: 12, type: 'goal', team: 'home', primaryPlayer: 'Youssef En-Nesyri', secondaryPlayer: 'Ivan Rakitic' },
  { minute: 23, type: 'yellow_card', team: 'away', primaryPlayer: 'Bryan Zaragoza' },
  { minute: 34, type: 'goal', team: 'away', primaryPlayer: 'Miquel Gutierrez', description: 'Header from corner' },
  { minute: 45, type: 'half_time', team: 'neutral' },
  { minute: 52, type: 'substitution', team: 'home', primaryPlayer: 'Suso', secondaryPlayer: 'Lucas Ocampos' },
  { minute: 67, type: 'goal', team: 'home', primaryPlayer: 'Youssef En-Nesyri', isPenalty: true },
  { minute: 71, type: 'red_card', team: 'away', primaryPlayer: 'Domingos Duarte' },
  { minute: 78, type: 'substitution', team: 'away', primaryPlayer: 'Alberto Soro', secondaryPlayer: 'Luis Milla' },
  { minute: 85, type: 'goal', team: 'home', primaryPlayer: 'Ivan Rakitic', description: 'Long range effort' },
  { minute: 90, type: 'full_time', team: 'neutral' },
];

const getEventIcon = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'goal':
      return <span className="text-lg">⚽</span>;
    case 'yellow_card':
      return <div className="w-3 h-4 bg-yellow-400 rounded-sm" />;
    case 'red_card':
      return <div className="w-3 h-4 bg-red-600 rounded-sm" />;
    case 'substitution':
      return (
        <div className="flex flex-col text-xs">
          <span className="text-green-500">▲</span>
          <span className="text-red-500">▼</span>
        </div>
      );
    case 'half_time':
    case 'full_time':
      return <FiCircle className="w-4 h-4 text-slate-400" />;
    default:
      return null;
  }
};

const getEventContent = (event: TimelineEvent) => {
  switch (event.type) {
    case 'goal':
      return (
        <div>
          <p className="font-semibold text-slate-900">
            {event.primaryPlayer}
            {event.isPenalty && <span className="text-slate-500 font-normal"> (Pen)</span>}
            {event.isOwnGoal && <span className="text-slate-500 font-normal"> (OG)</span>}
          </p>
          {event.secondaryPlayer && (
            <p className="text-sm text-slate-500">Assist: {event.secondaryPlayer}</p>
          )}
          {event.description && (
            <p className="text-xs text-slate-400 mt-1">{event.description}</p>
          )}
        </div>
      );
    case 'yellow_card':
    case 'red_card':
      return (
        <p className="font-semibold text-slate-900">{event.primaryPlayer}</p>
      );
    case 'substitution':
      return (
        <div>
          <p className="text-sm">
            <span className="text-green-600 font-medium">{event.primaryPlayer}</span>
            <span className="text-slate-400 mx-2">for</span>
            <span className="text-red-600 font-medium">{event.secondaryPlayer}</span>
          </p>
        </div>
      );
    case 'half_time':
      return <p className="font-medium text-slate-500">Half Time</p>;
    case 'full_time':
      return <p className="font-medium text-slate-500">Full Time</p>;
    default:
      return null;
  }
};

export default function MatchTimeline({ homeTeam, awayTeam }: MatchTimelineProps) {
  if (dummyEvents.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
        <p className="text-slate-500">No events recorded</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Match Timeline</h3>

      {/* Team headers */}
      <div className="flex justify-between mb-4 px-4">
        <span className="text-sm font-medium text-slate-600">{homeTeam}</span>
        <span className="text-sm font-medium text-slate-600">{awayTeam}</span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

        <div className="space-y-4">
          {dummyEvents.map((event, index) => {
            const isNeutral = event.team === 'neutral';
            const isHome = event.team === 'home';

            if (isNeutral) {
              return (
                <div key={index} className="flex items-center justify-center py-3">
                  <div className="bg-slate-100 px-4 py-2 rounded-full flex items-center gap-2 z-10">
                    {getEventIcon(event.type)}
                    {getEventContent(event)}
                    <span className="text-sm text-slate-400 ml-2">{event.minute}&apos;</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`flex items-center gap-4 ${isHome ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Event content */}
                <div className={`flex-1 ${isHome ? 'text-right pr-4' : 'text-left pl-4'}`}>
                  <div className={`inline-block ${isHome ? 'text-right' : 'text-left'}`}>
                    {getEventContent(event)}
                  </div>
                </div>

                {/* Center marker with minute */}
                <div className="flex flex-col items-center z-10 bg-white px-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    {getEventIcon(event.type)}
                  </div>
                  <span className="text-xs text-slate-400 mt-1">
                    {event.minute}&apos;{event.addedTime ? `+${event.addedTime}` : ''}
                  </span>
                </div>

                {/* Empty space for other side */}
                <div className="flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
