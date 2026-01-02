'use client';

import { useState } from 'react';
import {
  FiFilter,
} from 'react-icons/fi';
import {
  PiSoccerBallFill,
  PiArrowsLeftRightBold,
  PiTimerBold,
  PiFlagCheckeredFill,
  PiXCircleBold,
  PiVideoFill,
} from 'react-icons/pi';

type EventType =
  | 'goal'
  | 'own_goal'
  | 'penalty_scored'
  | 'penalty_missed'
  | 'yellow_card'
  | 'red_card'
  | 'substitution'
  | 'half_time'
  | 'full_time'
  | 'var_review';

type TimelineEvent = {
  id: string;
  minute: number;
  addedTime?: number;
  type: EventType;
  team: 'home' | 'away' | 'neutral';
  primaryPlayer?: string;
  secondaryPlayer?: string;
  description?: string;
};

type MatchTimelineProps = {
  homeTeam: string;
  awayTeam: string;
};

// Dummy data - will be replaced with real data from Contentful
const dummyEvents: TimelineEvent[] = [
  { id: '1', minute: 12, type: 'goal', team: 'home', primaryPlayer: 'Youssef En-Nesyri', secondaryPlayer: 'Ivan Rakitic', description: 'Clinical finish from inside the box' },
  { id: '2', minute: 23, type: 'yellow_card', team: 'away', primaryPlayer: 'Bryan Zaragoza', description: 'Tactical foul to stop counter-attack' },
  { id: '3', minute: 31, type: 'var_review', team: 'neutral', description: 'Checking possible penalty - No penalty given' },
  { id: '4', minute: 34, type: 'goal', team: 'away', primaryPlayer: 'Miquel Gutierrez', secondaryPlayer: 'Darwin Machis', description: 'Powerful header from corner kick' },
  { id: '5', minute: 45, type: 'half_time', team: 'neutral', description: 'Score at the break: 1-1' },
  { id: '6', minute: 52, type: 'substitution', team: 'home', primaryPlayer: 'Munir El Haddadi', secondaryPlayer: 'Lucas Ocampos', description: 'Tactical change' },
  { id: '7', minute: 58, type: 'penalty_missed', team: 'away', primaryPlayer: 'Jorge Molina', description: 'Saved by Bono diving to his right' },
  { id: '8', minute: 67, type: 'penalty_scored', team: 'home', primaryPlayer: 'Youssef En-Nesyri', description: 'Sends goalkeeper the wrong way' },
  { id: '9', minute: 71, type: 'red_card', team: 'away', primaryPlayer: 'Domingos Duarte', description: 'Second yellow for reckless challenge' },
  { id: '10', minute: 75, type: 'var_review', team: 'neutral', description: 'Checking offside on goal - Goal stands' },
  { id: '11', minute: 78, type: 'substitution', team: 'away', primaryPlayer: 'Alberto Soro', secondaryPlayer: 'Luis Milla' },
  { id: '12', minute: 82, type: 'yellow_card', team: 'home', primaryPlayer: 'Joan Jordan', description: 'Time wasting' },
  { id: '13', minute: 85, type: 'goal', team: 'home', primaryPlayer: 'Ivan Rakitic', description: 'Stunning long-range strike into top corner' },
  { id: '14', minute: 88, type: 'substitution', team: 'home', primaryPlayer: 'Oliver Torres', secondaryPlayer: 'Ever Banega' },
  { id: '15', minute: 90, addedTime: 3, type: 'own_goal', team: 'away', primaryPlayer: 'German Sanchez', description: 'Unfortunate deflection from cross' },
  { id: '16', minute: 90, addedTime: 5, type: 'full_time', team: 'neutral', description: 'Final score: 4-1' },
];

const eventConfig: Record<EventType, { icon: React.ReactNode; label: string; bgColor: string; textColor: string; borderColor: string }> = {
  goal: {
    icon: <PiSoccerBallFill className="w-5 h-5" />,
    label: 'Goal',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
  },
  own_goal: {
    icon: <PiSoccerBallFill className="w-5 h-5" />,
    label: 'Own Goal',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
  },
  penalty_scored: {
    icon: <PiSoccerBallFill className="w-5 h-5" />,
    label: 'Penalty',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
  },
  penalty_missed: {
    icon: <PiXCircleBold className="w-5 h-5" />,
    label: 'Penalty Missed',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
  },
  yellow_card: {
    icon: <div className="w-4 h-5 bg-yellow-400 rounded-sm" />,
    label: 'Yellow Card',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
  },
  red_card: {
    icon: <div className="w-4 h-5 bg-red-600 rounded-sm" />,
    label: 'Red Card',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
  },
  substitution: {
    icon: <PiArrowsLeftRightBold className="w-5 h-5" />,
    label: 'Substitution',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
  half_time: {
    icon: <PiTimerBold className="w-5 h-5" />,
    label: 'Half Time',
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-600',
    borderColor: 'border-slate-200',
  },
  full_time: {
    icon: <PiFlagCheckeredFill className="w-5 h-5" />,
    label: 'Full Time',
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-600',
    borderColor: 'border-slate-200',
  },
  var_review: {
    icon: <PiVideoFill className="w-5 h-5" />,
    label: 'VAR Review',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
  },
};

const filterOptions: { value: EventType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Events' },
  { value: 'goal', label: 'Goals' },
  { value: 'substitution', label: 'Substitutions' },
  { value: 'yellow_card', label: 'Yellow Cards' },
  { value: 'red_card', label: 'Red Cards' },
  { value: 'var_review', label: 'VAR' },
];

function EventCard({ event, homeTeam, awayTeam }: { event: TimelineEvent; homeTeam: string; awayTeam: string }) {
  const config = eventConfig[event.type];
  const teamName = event.team === 'home' ? homeTeam : event.team === 'away' ? awayTeam : null;

  const minuteDisplay = event.addedTime
    ? `${event.minute}+${event.addedTime}'`
    : `${event.minute}'`;

  return (
    <div
      className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-4 transition-all hover:shadow-md`}
    >
      <div className="flex items-start gap-4">
        {/* Minute Badge */}
        <div className={`flex-shrink-0 w-14 h-14 rounded-lg ${config.bgColor} border ${config.borderColor} flex flex-col items-center justify-center`}>
          <span className={`text-lg font-bold ${config.textColor}`}>{minuteDisplay}</span>
        </div>

        {/* Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${config.bgColor} border ${config.borderColor} flex items-center justify-center ${config.textColor}`}>
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold uppercase tracking-wider ${config.textColor}`}>
              {config.label}
            </span>
            {teamName && (
              <span className="text-xs text-slate-500">• {teamName}</span>
            )}
          </div>

          {event.primaryPlayer && (
            <p className="font-semibold text-slate-900">
              {event.primaryPlayer}
              {event.type === 'own_goal' && <span className="text-orange-600 font-normal"> (OG)</span>}
            </p>
          )}

          {event.type === 'substitution' && event.secondaryPlayer && (
            <p className="text-sm text-slate-600">
              <span className="text-green-600">IN</span> {event.primaryPlayer}{' '}
              <span className="text-red-600">OUT</span> {event.secondaryPlayer}
            </p>
          )}

          {event.type !== 'substitution' && event.secondaryPlayer && (
            <p className="text-sm text-slate-500">
              Assist: {event.secondaryPlayer}
            </p>
          )}

          {event.description && (
            <p className="text-sm text-slate-500 mt-1">{event.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MatchTimeline({ homeTeam, awayTeam }: MatchTimelineProps) {
  const [filter, setFilter] = useState<EventType | 'all'>('all');

  const filteredEvents = filter === 'all'
    ? dummyEvents
    : dummyEvents.filter((e) => {
        if (filter === 'goal') {
          return e.type === 'goal' || e.type === 'own_goal' || e.type === 'penalty_scored';
        }
        return e.type === filter;
      });

  if (dummyEvents.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
        <p className="text-slate-500">No events recorded</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <FiFilter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-600">Filter Events</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === option.value
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center">
          <p className="text-slate-500">No events match the selected filter.</p>
        </div>
      )}
    </div>
  );
}
