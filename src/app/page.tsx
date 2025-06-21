import HeroCarousel from "@/app/components/HeroComponent";
import NewsComponent from "@/app/components/NewsComponent";

import { getLatestArticles } from '@/lib/contentHelper';
import NextMatchBlock from "@/app/components/NextMatchBlock";

export default async function HomePage() {
    const articlesHero = await getLatestArticles(3);
    const articles = await getLatestArticles(18)

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Hero Section */}
            <HeroCarousel articles={articlesHero} />

            {/* News Section */}
            <NewsComponent articles={articles} />
            
            {/* Upcoming Match */}
            <NextMatchBlock />

            {/* Featured Player */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-red-700 mb-6">Featured Player</h2>
                    <div className="flex flex-col md:flex-row items-center bg-gray-100 rounded shadow p-6">
                        <img
                            src="/images/player.jpg"
                            alt="Featured Player"
                            className="w-40 h-40 rounded-full object-cover mb-4 md:mb-0 md:mr-6 border-4 border-red-700"
                        />
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                            <p className="text-gray-600 mb-2">Midfielder · #10</p>
                            <p className="text-gray-700 text-sm">
                                Known for his vision and leadership, John has been instrumental in our recent victories.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

