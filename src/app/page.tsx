import HeroCarousel from '@/app/components/HeroComponent';
import NewsComponent from '@/app/components/NewsComponent';

import { getLatestArticles, getPlayer } from '@/lib/contentHelper';
import NextMatchBlock from '@/app/components/NextMatchBlock';
import PlayerComponent from '@/app/components/PlayerComponent';

export default async function HomePage() {
  const articlesHero = await getLatestArticles(3);
  const articles = await getLatestArticles(18);
  const player = await getPlayer();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <HeroCarousel articles={articlesHero} />

      {/* News Section */}
      <NewsComponent articles={articles} />

      {/* Upcoming Match */}
      <NextMatchBlock />

      {/* Featured Player */}
      <PlayerComponent player={player} />
    </div>
  );
}
