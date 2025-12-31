'use client';

import { FiUsers, FiTrendingUp, FiStar } from 'react-icons/fi';
import Image from 'next/image';

type TeamInfo = {
  name: string;
  shortName?: string;
  logoUrl: string;
};

type PreMatchSectionProps = {
  targetDate: Date;
  teamHome: TeamInfo;
  teamAway: TeamInfo;
  competition: string;
  location: string;
};

// Static head-to-head data
const headToHead = {
  totalMatches: 12,
  homeWins: 5,
  draws: 3,
  awayWins: 4,
  recentMeetings: [
    { date: '2024-03-15', homeScore: 2, awayScore: 1, competition: 'La Liga' },
    { date: '2023-11-20', homeScore: 1, awayScore: 1, competition: 'La Liga' },
    { date: '2023-04-08', homeScore: 0, awayScore: 2, competition: 'Copa del Rey' },
  ],
};

// Static league positions
const leaguePositions = {
  home: { position: 6, points: 28, goalDiff: '+8', form: ['W', 'W', 'D', 'L', 'W'] },
  away: { position: 12, points: 19, goalDiff: '-3', form: ['L', 'D', 'W', 'L', 'D'] },
};

// Static key players
const keyPlayers = {
  home: [
    { name: 'Youssef En-Nesyri', position: 'Forward', stat: '8 goals' },
    { name: 'Ivan Rakitic', position: 'Midfielder', stat: '5 assists' },
  ],
  away: [
    { name: 'Bryan Zaragoza', position: 'Winger', stat: '6 goals' },
    { name: 'Miquel Gutierrez', position: 'Defender', stat: '2 assists' },
  ],
};

export default function PreMatchSection({
  teamHome,
  teamAway,
}: PreMatchSectionProps) {
  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Head to Head */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FiUsers className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-slate-900">Head to Head</h3>
            </div>

            {/* W/D/L Summary */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{headToHead.homeWins}</p>
                <p className="text-xs text-slate-500">{teamHome.shortName || teamHome.name} Wins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-400">{headToHead.draws}</p>
                <p className="text-xs text-slate-500">Draws</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{headToHead.awayWins}</p>
                <p className="text-xs text-slate-500">{teamAway.shortName || teamAway.name} Wins</p>
              </div>
            </div>

            {/* Recent Meetings */}
            <div className="space-y-2">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Recent Meetings</p>
              {headToHead.recentMeetings.map((match, i) => (
                <div key={i} className="flex items-center text-sm py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-500 w-24">{match.date}</span>
                  <span className="font-semibold text-slate-900 w-12 text-center">
                    {match.homeScore} - {match.awayScore}
                  </span>
                  <span className="text-xs text-slate-400 flex-1 text-right">{match.competition}</span>
                </div>
              ))}
            </div>
          </div>

          {/* League Positions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-slate-900">League Positions</h3>
            </div>

            <div className="space-y-4">
              {/* Home Team */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Image
                  src={teamHome.logoUrl}
                  alt={teamHome.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{teamHome.name}</p>
                  <div className="flex gap-2 mt-1">
                    {leaguePositions.home.form.map((result, i) => (
                      <span
                        key={i}
                        className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded ${
                          result === 'W' ? 'bg-green-500 text-white' :
                          result === 'D' ? 'bg-slate-400 text-white' :
                          'bg-red-500 text-white'
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{leaguePositions.home.position}</p>
                  <p className="text-xs text-slate-500">{leaguePositions.home.points} pts</p>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Image
                  src={teamAway.logoUrl}
                  alt={teamAway.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{teamAway.name}</p>
                  <div className="flex gap-2 mt-1">
                    {leaguePositions.away.form.map((result, i) => (
                      <span
                        key={i}
                        className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded ${
                          result === 'W' ? 'bg-green-500 text-white' :
                          result === 'D' ? 'bg-slate-400 text-white' :
                          'bg-red-500 text-white'
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{leaguePositions.away.position}</p>
                  <p className="text-xs text-slate-500">{leaguePositions.away.points} pts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Players */}
          <div className="bg-white rounded-2xl p-6 shadow-sm md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <FiStar className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-slate-900">Players to Watch</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Home Players */}
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">{teamHome.shortName || teamHome.name}</p>
                <div className="space-y-3">
                  {keyPlayers.home.map((player, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900 text-sm">{player.name}</p>
                      <p className="text-xs text-slate-500">{player.position}</p>
                      <p className="text-xs text-red-600 font-medium mt-1">{player.stat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Away Players */}
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">{teamAway.shortName || teamAway.name}</p>
                <div className="space-y-3">
                  {keyPlayers.away.map((player, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900 text-sm">{player.name}</p>
                      <p className="text-xs text-slate-500">{player.position}</p>
                      <p className="text-xs text-red-600 font-medium mt-1">{player.stat}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
