export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Hero Section */}
            <section className="relative h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/hero-image.jpg"
                        alt="OneNil FC"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay for contrast */}
                </div>
                <div className="relative max-w-7xl mx-auto px-4 pt-64 pb-16 z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4">Welcome to OneNil FC</h1>
                        <p className="text-lg text-white/90 mb-6">
                            Experience the passion and pride of our club. Stay updated with the latest news,
                            match highlights, and exclusive content.
                        </p>
                        <a
                            href="#"
                            className="inline-block bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition"
                        >
                            Explore More
                        </a>
                    </div>
                </div>
            </section>


            {/* News Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-red-700 mb-6">Latest News</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((id) => (
                            <div key={id} className="bg-gray-100 rounded shadow p-5 hover:shadow-lg transition">
                                <img src={`/images/news-${id}.jpg`} alt={`News ${id}`}
                                     className="w-full h-48 object-cover rounded mb-4"/>
                                <h3 className="font-bold text-xl mb-2">Matchday Highlights {id}</h3>
                                <p className="text-sm text-gray-600 mb-3">June 1, 2025</p>
                                <p className="text-gray-700 mb-4">An exciting match with stunning goals and incredible
                                    teamwork.</p>
                                <a href="#" className="text-red-700 hover:underline text-sm font-medium">Read more →</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Match */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-semibold text-red-700 mb-4">Next Match</h2>
                    <p className="text-xl font-bold text-gray-900 mb-2">OneNil FC vs Rival Town</p>
                    <p className="text-gray-700 mb-4">Saturday · June 8 · 18:00 · City Stadium</p>
                    <a href="#"
                       className="inline-block bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition">
                        Buy Tickets
                    </a>
                </div>
            </section>

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

