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
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 w-full px-2 sm:px-4">
      {/* Kick-off label */}
      <p className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-widest">
        Kick-off in
      </p>

      {/* Countdown boxes */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 justify-center w-full">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Time unit box */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-red-500/20 rounded-lg sm:rounded-xl blur-lg sm:blur-xl" />

                {/* Main box */}
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl px-2 py-2 sm:px-3 sm:py-3 md:px-5 md:py-4 min-w-[48px] sm:min-w-[60px] md:min-w-[80px]">
                  <span
                    className={`block text-xl sm:text-2xl md:text-4xl font-bold text-white tabular-nums text-center ${
                      mounted ? 'transition-all duration-300' : ''
                    }`}
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Label */}
              <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-white/50 font-medium uppercase tracking-wider">
                {unit.label}
              </span>
            </div>

            {/* Separator (not after last item) */}
            {index < timeUnits.length - 1 && (
              <div className="flex flex-col gap-1 sm:gap-1.5 pb-4 sm:pb-6">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-white/40" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-white/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
