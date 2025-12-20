import HeroCarousel from '@/app/components/HeroComponent';
import NewsComponent from '@/app/components/NewsComponent';
import Image from 'next/image';
import Link from 'next/link';

import { getLatestArticles, getPlayer } from '@/lib/contentHelper';
import NextMatchBlock from '@/app/components/NextMatchBlock';
import PlayerComponent from '@/app/components/PlayerComponent';

export default async function HomePage() {
  const articlesHero = await getLatestArticles(3);
  const articles = await getLatestArticles(18);
  const player = await getPlayer();

  return (
    <div className="min-h-screen bg-brand-white text-brand-black font-sans">
      {/* Hero Section */}
      <HeroCarousel articles={articlesHero} />

      {/* Upcoming Match */}
      <div className="my-8">
        <NextMatchBlock />
      </div>

      {/* News Section */}
      <div className="my-8">
        <NewsComponent articles={articles} />
      </div>

      {/* Featured Player */}
      <div className="my-8">
        <PlayerComponent player={player} />
      </div>

      {/* Latest Result */}
      <section className="py-12 bg-brand-red text-brand-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Result</h2>
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center">
              <Image src="/images/onenil-crest.png" alt="OneNil FC" width={80} height={80} className="h-20" />
              <span className="text-2xl font-bold ml-4">OneNil FC</span>
            </div>
            <div className="mx-8">
              <span className="text-5xl font-bold">3 - 1</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-4">Opponent FC</span>
              <Image src="/images/opponent-crest.png" alt="Opponent FC" width={80} height={80} className="h-20" />
            </div>
          </div>
          <div className="text-center mt-4">
            <Link href="/matches/latest" className="text-brand-black hover:underline">Match Report</Link>
          </div>
        </div>
      </section>

      {/* League Table Snippet */}
      <section className="py-12 bg-brand-gray">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">League Table</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Pos</th>
                <th className="p-4">Team</th>
                <th className="p-4">Pld</th>
                <th className="p-4">W</th>
                <th className="p-4">D</th>
                <th className="p-4">L</th>
                <th className="p-4">Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">1</td>
                <td className="p-4">Team A</td>
                <td className="p-4">10</td>
                <td className="p-4">8</td>
                <td className="p-4">1</td>
                <td className="p-4">1</td>
                <td className="p-4">25</td>
              </tr>
              <tr className="border-b bg-brand-red/20">
                <td className="p-4">2</td>
                <td className="p-4">OneNil FC</td>
                <td className="p-4">10</td>
                <td className="p-4">7</td>
                <td className="p-4">2</td>
                <td className="p-4">1</td>
                <td className="p-4">23</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">3</td>
                <td className="p-4">Team C</td>
                <td className="p-4">10</td>
                <td className="p-4">6</td>
                <td className="p-4">2</td>
                <td className="p-4">2</td>
                <td className="p-4">20</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center mt-4">
            <Link href="/league-table" className="text-brand-red hover:underline">View Full Table</Link>
          </div>
        </div>
      </section>

      {/* Team Stats Leaders */}
      <section className="py-12 bg-brand-red text-brand-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Team Stats Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Image src="/images/player1.jpg" alt="Top Scorer" width={128} height={128} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold">Player A</h3>
              <p className="text-brand-white">Top Scorer</p>
              <p className="text-2xl font-bold">12 Goals</p>
            </div>
            <div>
              <Image src="/images/player2.jpg" alt="Most Assists" width={128} height={128} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold">Player B</h3>
              <p className="text-brand-white">Most Assists</p>
              <p className="text-2xl font-bold">8 Assists</p>
            </div>
            <div>
              <Image src="/images/player3.jpg" alt="Most Appearances" width={128} height={128} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold">Player C</h3>
              <p className="text-brand-white">Most Appearances</p>
              <p className="text-2xl font-bold">15 Appearances</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Feed */}
      <section className="py-12 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Social Wall</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-brand-white p-4 rounded shadow">Tweet 1</div>
            <div className="bg-brand-white p-4 rounded shadow">Instagram Post 1</div>
            <div className="bg-brand-white p-4 rounded shadow">Tweet 2</div>
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-12 bg-brand-red text-brand-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Video Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Image src="/images/video1.jpg" alt="Video 1" layout="fill" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-brand-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
              </div>
            </div>
            <div className="relative">
              <Image src="/images/video2.jpg" alt="Video 2" layout="fill" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-brand-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
              </div>
            </div>
            <div className="relative">
              <Image src="/images/video3.jpg" alt="Video 3" layout="fill" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-brand-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Polls & Quizzes */}
      <section className="py-12 bg-brand-gray">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Fan Poll</h2>
          <div className="bg-brand-white p-6 rounded shadow">
            <p className="font-semibold mb-4">Who was the man of the match?</p>
            <div className="space-y-2">
              <div><input type="radio" name="poll" id="poll1" className="mr-2" /><label htmlFor="poll1">Player A</label></div>
              <div><input type="radio" name="poll" id="poll2" className="mr-2" /><label htmlFor="poll2">Player B</label></div>
              <div><input type="radio" name="poll" id="poll3" className="mr-2" /><label htmlFor="poll3">Player C</label></div>
            </div>
            <button className="w-full bg-brand-red text-white p-2 rounded mt-4">Vote</button>
          </div>
        </div>
      </section>

      {/* Club Shop Promotion */}
      <section className="py-12 bg-brand-red text-brand-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-brand-black text-white p-8 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Official Club Shop</h2>
              <p>Get the latest kits, training wear, and merchandise.</p>
            </div>
            <Link href="/shop" className="bg-brand-red text-white px-6 py-3 rounded-lg font-semibold">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Membership/Socio Information */}
      <section className="py-12 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Become a Member</h2>
          <p className="mt-2 text-lg">Join the OneNil FC family and get exclusive benefits.</p>
          <Link href="/membership" className="mt-4 inline-block bg-brand-red text-white px-6 py-3 rounded-lg font-semibold">Learn More</Link>
          </div>
      </section>
    </div>
  );
}
