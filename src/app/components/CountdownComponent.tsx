'use client';

import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [countdownText, setCountdownText] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const seconds = Math.max(
        0,
        Math.floor((targetDate.getTime() - now.getTime()) / 1000)
      );

      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      const parts = [
        `${days} ${days === 1 ? 'day' : 'days'}`,
        `${hours.toString().padStart(2, '0')} ${hours === 1 ? 'hour' : 'hours'}`,
        `${minutes.toString().padStart(2, '0')} ${minutes === 1 ? 'minute' : 'minutes'}`,
        `${secs.toString().padStart(2, '0')} ${secs === 1 ? 'second' : 'seconds'}`,
      ];

      setCountdownText(`Kick-off in ${parts.join(', ')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="glass-light text-red-700 px-8 py-4 rounded-2xl font-semibold text-base shadow-card inline-flex items-center gap-3 min-w-[280px] justify-center">
      <FiClock className="w-5 h-5 animate-pulse" />
      <span>{countdownText}</span>
    </div>
  );
}
