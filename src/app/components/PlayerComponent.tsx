import { Player } from '@/lib/types';
import Image from 'next/image';
import { FiTarget, FiUsers, FiCalendar, FiAward } from 'react-icons/fi';

type PlayerProps = {
  player: Player | null;
};

// Static data for featured player stats and info
const playerStats = {
  goals: 12,
  assists: 8,
  appearances: 24,
  cleanSheets: 0,
};

const playerInfo = {
  nationality: 'Spain',
  nationalityFlag: '🇪🇸',
  age: 27,
  height: '1.82m',
  preferredFoot: 'Right',
  joinedClub: '2021',
};

const playerHighlights = [
  'Academy graduate with 6 years at the club',
  'Team captain since 2023',
  'Fan-voted Player of the Season 2023/24',
];

const playerQuote = {
  text: "Every match is an opportunity to give everything for this club and our fans.",
  context: "On his commitment to the team",
};

const playerBio = {
  playingStyle: 'Creative midfielder with vision.\nSet-piece specialist.',
  strengths: ['Passing', 'Set pieces', 'Leadership', 'Work rate'],
  achievements: [
    'Europa League 2023',
    'La Liga Best XI 2022/23',
    'Player of the Year 2024',
  ],
};

// Sevilla FC crest from Contentful
const sevillaLogo = 'https://images.ctfassets.net/600e09scr76p/573OBjjqAf65nvIdvilpa0/44e8eded97da79543fff6446e5979e9c/Sevilla_FC-ONkDhzzby_brandlogos.net.svg';

const careerHistory = [
  {
    season: '2024/25',
    club: 'Sevilla FC',
    logo: sevillaLogo,
    competition: 'La Liga',
    competitionFlag: '🇪🇸',
    appearances: 24,
    goals: 12
  },
  {
    season: '2023/24',
    club: 'Sevilla FC',
    logo: sevillaLogo,
    competition: 'La Liga',
    competitionFlag: '🇪🇸',
    appearances: 36,
    goals: 14
  },
  {
    season: '2022/23',
    club: 'Sevilla FC',
    logo: sevillaLogo,
    competition: 'La Liga',
    competitionFlag: '🇪🇸',
    appearances: 38,
    goals: 8
  },
  {
    season: '2021/22',
    club: 'Sevilla FC',
    logo: sevillaLogo,
    competition: 'La Liga',
    competitionFlag: '🇪🇸',
    appearances: 34,
    goals: 4
  },
];

export default function PlayerComponent({ player }: PlayerProps) {
  if (!player) {
    return null;
  }

  const stats = [
    { label: 'Goals', value: playerStats.goals, icon: FiTarget },
    { label: 'Assists', value: playerStats.assists, icon: FiUsers },
    { label: 'Apps', value: playerStats.appearances, icon: FiCalendar },
    { label: 'Awards', value: 3, icon: FiAward },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 relative inline-block">
          Featured Player
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full" />
        </h2>

        <div className="group bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden relative">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-100 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-slate-200 to-transparent rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

          <div className="relative p-8 md:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Column - Player Image & Basic Info */}
              <div className="flex flex-col items-center lg:items-start lg:w-1/3">
                {/* Player Image */}
                <div className="relative mb-6">
                  <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                    <Image
                      src={player.photoUrl}
                      alt={player.name}
                      width={208}
                      height={208}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Squad number badge */}
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">
                      #{player.squadNumber}
                    </span>
                  </div>
                </div>

                {/* Name & Position */}
                <div className="text-center lg:text-left mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                    {player.name}
                  </h3>
                  <p className="text-red-600 font-semibold text-lg">
                    {player.position}
                  </p>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-6">
                  <div>
                    <span className="text-slate-400">Nationality</span>
                    <p className="font-semibold text-slate-700">
                      <span className="mr-1">{playerInfo.nationalityFlag}</span>
                      {playerInfo.nationality}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Age</span>
                    <p className="font-semibold text-slate-700">{playerInfo.age} years</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Height</span>
                    <p className="font-semibold text-slate-700">{playerInfo.height}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Foot</span>
                    <p className="font-semibold text-slate-700">{playerInfo.preferredFoot}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {playerHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Playing Style */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Playing Style
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {playerBio.playingStyle}
                  </p>
                </div>

                {/* Strengths */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Strengths
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {playerBio.strengths.map((strength, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Honours
                  </h4>
                  <div className="space-y-1.5">
                    {playerBio.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-amber-500">🏆</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Bio */}
              <div className="flex-1 flex flex-col lg:w-2/3">
                {/* Season Stats */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Season 2024/25
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center hover:shadow-md hover:border-red-100 transition-all duration-300"
                      >
                        <stat.icon className="w-5 h-5 text-red-500 mx-auto mb-2" />
                        <p className="text-2xl md:text-3xl font-bold text-slate-900">
                          {stat.value}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career History */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Career
                  </h4>
                  <div className="space-y-3">
                    {careerHistory.map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={entry.logo}
                            alt={entry.club}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                          />
                          <div>
                            <p className="font-semibold text-slate-800">{entry.season}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>{entry.club}</span>
                              <span className="text-slate-300">•</span>
                              <span>{entry.competitionFlag} {entry.competition}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <div className="text-center">
                            <p className="font-bold text-slate-800">{entry.appearances}</p>
                            <p className="text-xs text-slate-400">Apps</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-red-600">{entry.goals}</p>
                            <p className="text-xs text-slate-400">Goals</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-auto">
                  <div className="bg-gradient-to-r from-red-50 to-slate-50 rounded-2xl p-6 border-l-4 border-red-500">
                    <p className="text-slate-700 italic text-lg mb-2">
                      &ldquo;{playerQuote.text}&rdquo;
                    </p>
                    <p className="text-sm text-slate-500">
                      — {playerQuote.context}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
