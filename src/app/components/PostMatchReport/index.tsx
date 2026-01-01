import { MatchViewModel } from '@/lib/viewModels';
import MatchTimeline from './MatchTimeline';
import MatchStats from './MatchStats';
import MatchLineups from './MatchLineups';

type PostMatchReportProps = {
  match: MatchViewModel;
};

export default function PostMatchReport({ match }: PostMatchReportProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Timeline */}
          <div className="lg:col-span-1">
            <MatchTimeline
              homeTeam={match.teamHome.name}
              awayTeam={match.teamAway.name}
            />
          </div>

          {/* Right column - Stats */}
          <div className="lg:col-span-1">
            <MatchStats
              homeTeam={match.teamHome}
              awayTeam={match.teamAway}
            />
          </div>

          {/* Full width - Lineups */}
          <div className="lg:col-span-2">
            <MatchLineups
              homeTeam={match.teamHome}
              awayTeam={match.teamAway}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
