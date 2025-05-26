export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4 drop-shadow">OneNil Football Club</h1>
                    <p className="text-lg opacity-90">Pride of the city. Fueled by passion. Driven by fans.</p>
                </div>
            </section>

            {/* Latest News */}
            <section className="py-12 px-4 max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-blue-800">Latest News</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((id) => (
                        <div
                            key={id}
                            className="bg-gradient-to-br from-white via-slate-50 to-slate-100 border rounded-lg shadow-lg p-5 hover:shadow-xl transition"
                        >
                            <h3 className="font-bold text-xl mb-2 text-blue-900">Matchday Recap {id}</h3>
                            <p className="text-sm text-slate-500 mb-3">May 25, 2025</p>
                            <p className="text-slate-700 mb-4">The boys gave their all in a thrilling 2–2 draw at home...</p>
                            <a href="#" className="text-blue-600 hover:underline text-sm font-medium">Read more →</a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming Match */}
            <section className="bg-gradient-to-br from-white to-blue-50 py-12 px-4 border-t border-slate-200">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-2 text-blue-800">Next Match</h2>
                    <p className="text-xl font-bold text-blue-900">OneNil FC vs Rival Town</p>
                    <p className="text-slate-600">Saturday · June 1 · 18:00 · City Stadium</p>
                    <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium rounded shadow hover:from-blue-800 hover:to-blue-600 transition">
                        Buy Tickets
                    </button>
                </div>
            </section>

            {/* Featured Player */}
            <section className="py-12 px-4 max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-blue-800">Featured Player</h2>
                <div className="flex flex-col sm:flex-row bg-white border shadow-lg rounded-lg p-6 items-center">
                    <img
                        src="/player.jpg"
                        alt="Featured Player"
                        className="w-40 h-40 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 border-4 border-blue-500"
                    />
                    <div>
                        <h3 className="text-xl font-bold text-blue-900">John Doe</h3>
                        <p className="text-slate-600 mb-2">Midfielder · #10</p>
                        <p className="text-slate-700 text-sm">
                            Known for his vision, precision passing, and on-field leadership, John has been a key player this season.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
