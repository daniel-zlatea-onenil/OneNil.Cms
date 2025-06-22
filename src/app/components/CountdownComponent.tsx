'use client';

import { useEffect, useState } from 'react';

export default function Countdown({ targetDate }: { targetDate: Date }) {
    const [countdownText, setCountdownText] = useState<string>('');

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const seconds = Math.max(0, Math.floor((targetDate.getTime() - now.getTime()) / 1000));

            const days = Math.floor(seconds / 86400);
            const remainingDays = days % 30;

            const timeLeftInDay = seconds % 86400;
            const hours = Math.floor(timeLeftInDay / 3600);
            const minutes = Math.floor((timeLeftInDay % 3600) / 60);
            const secs = timeLeftInDay % 60;

            const parts: string[] = [];

            if (remainingDays > 0) parts.push(`${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`);
            if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
            if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
            if (secs > 0) parts.push(`${secs} ${secs === 1 ? 'second' : 'seconds'}`);
            
            setCountdownText(`Kick-off in ${parts.join(', ')}`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="bg-white text-red-700 px-6 py-3 rounded font-semibold text-base shadow inline-block">
            🕒 {countdownText}
        </div>
    );
}
