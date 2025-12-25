import HeroCarousel from '@/app/components/HeroComponent';
import NewsComponent from '@/app/components/NewsComponent';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlay } from 'react-icons/fi';

import { getLatestArticles, getPlayer } from '@/lib/contentHelper';
import NextMatchBlock from '@/app/components/NextMatchBlock';
import PlayerComponent from '@/app/components/PlayerComponent';
import ShortLeagueTable from '@/app/components/ShortLeagueTable';
import LatestResultBlock from '@/app/components/LatestResultBlock';
import TeamStatsLeaders from '@/app/components/TeamStatsLeaders';

export default async function HomePage() {
  const articlesHero = await getLatestArticles(3);
  const articles = await getLatestArticles(18);
  const player = await getPlayer();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Hero Section */}
      <HeroCarousel articles={articlesHero} />

      {/* Upcoming Match */}
      <NextMatchBlock />

      {/* News Section */}
      <NewsComponent articles={articles} />

      {/* Featured Player */}
      <PlayerComponent player={player} />

      {/* Latest Result */}
      <LatestResultBlock />

      {/* League Table Snippet */}
      <ShortLeagueTable />

      {/* Team Stats Leaders */}
      <TeamStatsLeaders />

      {/* Social Media Feed */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            Social Wall
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Tweet 1', 'Instagram Post 1', 'Tweet 2'].map((content, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-slate-600">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Video Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
              >
                <Image
                  src={`/images/video${num}.jpg`}
                  alt={`Video ${num}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                    <FiPlay className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Polls & Quizzes */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900">
            Fan Poll
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-card">
            <p className="font-semibold text-slate-900 mb-6">
              Who was the man of the match?
            </p>
            <div className="space-y-3">
              {['Player A', 'Player B', 'Player C'].map((player, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    name="poll"
                    className="w-5 h-5 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-slate-700">{player}</span>
                </label>
              ))}
            </div>
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-glow-red transition-all duration-300 hover:scale-105 mt-6">
              Vote
            </button>
          </div>
        </div>
      </section>

      {/* Club Shop Promotion */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="glass-dark rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Official Club Shop
              </h2>
              <p className="text-white/70">
                Get the latest kits, training wear, and merchandise.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-glow-red transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Membership/Socio Information */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Become a Member
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join the OneNil FC family and get exclusive benefits.
          </p>
          <Link
            href="/membership"
            className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-glow-red transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
