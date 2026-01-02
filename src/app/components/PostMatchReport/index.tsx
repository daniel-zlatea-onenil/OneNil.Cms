import { MatchViewModel } from '@/lib/viewModels';
import { FiClock, FiBarChart2, FiFileText, FiVideo } from 'react-icons/fi';
import MatchTabs from './MatchTabs';
import MatchTimeline from './MatchTimeline';
import MatchStats from './MatchStats';
import MatchLineups from './MatchLineups';
import MatchAnalysis from './MatchAnalysis';
import MatchMedia from './MatchMedia';

type PostMatchReportProps = {
  match: MatchViewModel;
};

const tabs = [
  { id: 'analysis', label: 'Analysis', icon: <FiFileText className="w-4 h-4" /> },
  { id: 'events', label: 'Minute by Minute', icon: <FiClock className="w-4 h-4" /> },
  { id: 'stats', label: 'Statistics', icon: <FiBarChart2 className="w-4 h-4" /> },
  { id: 'media', label: 'Media', icon: <FiVideo className="w-4 h-4" /> },
];

export default function PostMatchReport({ match }: PostMatchReportProps) {
  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <MatchTabs tabs={tabs}>
          {/* Tab 1: Analysis */}
          <MatchAnalysis
            homeTeam={match.teamHome}
            awayTeam={match.teamAway}
            heroBannerUrl={match.heroBannerUrl}
          />

          {/* Tab 2: Minute by Minute */}
          <MatchTimeline
            homeTeam={match.teamHome.name}
            awayTeam={match.teamAway.name}
          />

          {/* Tab 3: Statistics */}
          <div className="grid grid-cols-1 gap-6">
            <MatchStats
              homeTeam={match.teamHome}
              awayTeam={match.teamAway}
            />
            <MatchLineups
              homeTeam={match.teamHome}
              awayTeam={match.teamAway}
            />
          </div>

          {/* Tab 4: Media */}
          <MatchMedia />
        </MatchTabs>
      </div>
    </section>
  );
}
