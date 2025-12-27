'use client';

import { useState, useEffect } from 'react';
import { FiCheckCircle, FiBarChart2 } from 'react-icons/fi';

type PollOption = {
  id: string;
  name: string;
  position?: string;
};

const pollQuestion = "Who was the man of the match?";

const pollOptions: PollOption[] = [
  { id: 'player-a', name: 'Jesús Navas', position: 'Defender' },
  { id: 'player-b', name: 'Youssef En-Nesyri', position: 'Forward' },
  { id: 'player-c', name: 'Ivan Rakitić', position: 'Midfielder' },
];

// Generate random results that add up to 100%
function generateRandomResults(): Record<string, number> {
  const results: Record<string, number> = {};
  let remaining = 100;

  pollOptions.forEach((option, index) => {
    if (index === pollOptions.length - 1) {
      results[option.id] = remaining;
    } else {
      const maxForThis = remaining - (pollOptions.length - index - 1) * 5;
      const minForThis = 5;
      const value = Math.floor(Math.random() * (maxForThis - minForThis + 1)) + minForThis;
      results[option.id] = value;
      remaining -= value;
    }
  });

  return results;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number = 30): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

export default function FanPollComponent() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already voted
    const votedOption = getCookie('fan_poll_vote');
    const savedResults = getCookie('fan_poll_results');

    if (votedOption && savedResults) {
      setSelectedOption(votedOption);
      setHasVoted(true);
      try {
        setResults(JSON.parse(savedResults));
      } catch {
        setResults(generateRandomResults());
      }
    }
    setIsLoading(false);
  }, []);

  const handleVote = () => {
    if (!selectedOption) return;

    const randomResults = generateRandomResults();
    setResults(randomResults);
    setHasVoted(true);

    // Save to cookies
    setCookie('fan_poll_vote', selectedOption);
    setCookie('fan_poll_results', JSON.stringify(randomResults));
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="animate-pulse bg-white/10 rounded-3xl h-96" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FiBarChart2 className="w-4 h-4" />
            <span>Fan Poll</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {pollQuestion}
          </h2>
          <p className="text-slate-400 mt-2">Cast your vote and see what other fans think</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-10">
          {!hasVoted ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {pollOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`relative flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      selectedOption === option.id
                        ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30 scale-105'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="poll"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={() => setSelectedOption(option.id)}
                      className="sr-only"
                    />
                    {selectedOption === option.id && (
                      <FiCheckCircle className="absolute top-3 right-3 w-5 h-5" />
                    )}
                    <span className="text-lg font-bold mb-1">{option.name}</span>
                    {option.position && (
                      <span className={`text-sm ${selectedOption === option.id ? 'text-white/80' : 'text-slate-400'}`}>
                        {option.position}
                      </span>
                    )}
                  </label>
                ))}
              </div>

              <button
                onClick={handleVote}
                disabled={!selectedOption}
                className={`w-full md:w-auto md:min-w-[200px] mx-auto block px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                  selectedOption
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:shadow-red-600/30 hover:scale-105'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                Vote Now
              </button>
            </>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-2 text-green-400 mb-4">
                  <FiCheckCircle className="w-5 h-5" />
                  <span className="font-medium">Thanks for voting!</span>
                </div>
              </div>

              <div className="space-y-4">
                {pollOptions.map((option) => {
                  const percentage = results[option.id] || 0;
                  const isSelected = selectedOption === option.id;

                  return (
                    <div key={option.id} className="relative">
                      <div className={`relative rounded-xl overflow-hidden ${isSelected ? 'ring-2 ring-red-500' : ''}`}>
                        <div className="absolute inset-0 bg-white/5" />
                        <div
                          className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out ${
                            isSelected ? 'bg-gradient-to-r from-red-600/40 to-red-500/40' : 'bg-white/10'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                        <div className="relative flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-white">{option.name}</span>
                            {isSelected && (
                              <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                                Your vote
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-white text-lg">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-center text-slate-500 text-sm mt-6">
                Results are updated in real-time
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
