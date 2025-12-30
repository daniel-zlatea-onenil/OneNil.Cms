import { MatchFacts as MatchFactsType, MatchStats } from '@/lib/types';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiAward } from 'react-icons/fi';
import { GiWhistle } from 'react-icons/gi';

interface MatchFactsProps {
  stats?: MatchStats;
  // Fallback fields from existing Contentful structure
  fallbackData?: {
    competition?: string;
    season?: string;
    matchday?: string;
    date?: Date;
    venue?: string;
    venueCity?: string;
    referee?: string;
    attendance?: number;
  };
}

interface FactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function FactItem({ icon, label, value }: FactItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center text-red-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/60 uppercase tracking-wider font-medium">
          {label}
        </p>
        <p className="text-white font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatAttendance(attendance: number): string {
  return attendance.toLocaleString('en-GB');
}

export default function MatchFacts({ stats, fallbackData }: MatchFactsProps) {
  // Try Stats.match_facts first, then fall back to individual fields
  const matchFacts: MatchFactsType | undefined = stats?.match_facts;

  // Build facts with fallback strategy
  const competition = matchFacts?.competition ?? fallbackData?.competition;
  const season = matchFacts?.season ?? fallbackData?.season;
  const matchday = matchFacts?.matchday ?? fallbackData?.matchday;
  const referee = matchFacts?.referee ?? fallbackData?.referee;
  const attendance = matchFacts?.attendance ?? fallbackData?.attendance;

  // Venue handling
  const venue = matchFacts?.venue ?? fallbackData?.venue;
  const venueCity = matchFacts?.venueCity ?? fallbackData?.venueCity;
  const fullVenue = venueCity ? `${venue}, ${venueCity}` : venue;

  // Date/time handling
  const kickoffDate = fallbackData?.date;
  const formattedDate = kickoffDate ? formatDate(kickoffDate) : matchFacts?.kickoffDate;
  const formattedTime = kickoffDate ? formatTime(kickoffDate) : matchFacts?.kickoffTime;

  // Log warning in development mode when using fallback
  if (process.env.NODE_ENV === 'development' && !matchFacts && fallbackData) {
    console.warn(
      '[MatchFacts] Stats.match_facts not found, using fallback data from Contentful fields'
    );
  }

  // Collect all available facts
  const facts: { icon: React.ReactNode; label: string; value: string | number }[] = [];

  if (competition) {
    facts.push({ icon: <FiAward className="w-5 h-5" />, label: 'Competition', value: competition });
  }

  if (season) {
    facts.push({ icon: <FiAward className="w-5 h-5" />, label: 'Season', value: season });
  }

  if (matchday) {
    facts.push({ icon: <FiAward className="w-5 h-5" />, label: 'Matchday', value: matchday });
  }

  if (formattedDate) {
    facts.push({ icon: <FiCalendar className="w-5 h-5" />, label: 'Date', value: formattedDate });
  }

  if (formattedTime) {
    facts.push({ icon: <FiClock className="w-5 h-5" />, label: 'Kickoff', value: formattedTime });
  }

  if (fullVenue) {
    facts.push({ icon: <FiMapPin className="w-5 h-5" />, label: 'Venue', value: fullVenue });
  }

  if (referee) {
    facts.push({ icon: <GiWhistle className="w-5 h-5" />, label: 'Referee', value: referee });
  }

  if (attendance !== undefined && attendance > 0) {
    facts.push({
      icon: <FiUsers className="w-5 h-5" />,
      label: 'Attendance',
      value: formatAttendance(attendance),
    });
  }

  // Don't render if no facts available
  if (facts.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-red-600 rounded-full" />
        Match Facts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {facts.map((fact, index) => (
          <FactItem key={index} icon={fact.icon} label={fact.label} value={fact.value} />
        ))}
      </div>
    </section>
  );
}
