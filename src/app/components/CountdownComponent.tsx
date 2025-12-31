'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const now = new Date();
      const totalSeconds = Math.max(
        0,
        Math.floor((targetDate.getTime() - now.getTime()) / 1000)
      );

      setTimeLeft({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINS' },
    { value: timeLeft.seconds, label: 'SECS' },
  ];

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
      {/* Kick-off label */}
      <p className="text-white/60 text-[10px] sm:text-xs font-medium uppercase tracking-widest">
        KICK-OFF IN
      </p>

      {/* Countdown boxes */}
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center">
            {/* Time unit box */}
            <div className="flex flex-col items-center">
              {/* Main box - muted brownish/gray style */}
              <div className="bg-stone-800/80 backdrop-blur-sm rounded px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 min-w-[50px] sm:min-w-[65px] md:min-w-[75px]">
                <span
                  className={`block text-xl sm:text-2xl md:text-3xl font-bold text-white tabular-nums text-center ${
                    mounted ? 'transition-all duration-300' : ''
                  }`}
                >
                  {unit.value.toString().padStart(2, '0')}
                </span>
              </div>

              {/* Label */}
              <span className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] md:text-xs text-white/50 font-medium tracking-wider">
                {unit.label}
              </span>
            </div>

            {/* Colon separator (not after last item) */}
            {index < timeUnits.length - 1 && (
              <span className="text-white/50 text-lg sm:text-xl md:text-2xl font-bold mx-0.5 sm:mx-1 pb-4 sm:pb-5">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
