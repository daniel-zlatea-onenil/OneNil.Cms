'use client';

import { useEffect, useState } from 'react';

export default function Countdown({ targetDate }: { targetDate: Date }) {
    const [countdownText, setCountdownText] = useState<string>('');

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const seconds = Math.max(0, Math.floor((targetDate.getTime() - now.getTime()) / 1000));

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
        <div className="bg-white text-red-700 px-6 py-3 rounded font-semibold text-base shadow inline-block min-w-[280px] text-center">
            🕒 {countdownText}
        </div>
    );
}
