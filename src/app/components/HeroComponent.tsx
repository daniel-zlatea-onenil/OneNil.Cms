"use client";

import {useState, useEffect} from 'react';

const slides = [
    {
        image: '/images/hero-image.jpg',
        headline: 'Welcome to OneNil FC',
        description:
            'Experience the passion and pride of our club. Stay updated with the latest news, match highlights, and exclusive content.',
        cta: 'Explore More',
        ctaLink: '#',
    },
    {
        image: '/images/hero-image.jpg',
        headline: 'New Signing Announcement',
        description:
            'John Doe joins OneNil FC. Discover what makes him a game-changer in our midfield.',
        cta: 'Meet the Player',
        ctaLink: '#',
    },
    {
        image: '/images/hero-image.jpg',
        headline: 'New Season Ahead',
        description:
            'John Doe joins OneNil FC. Discover what makes him a game-changer in our midfield.',
        cta: 'See full schedule',
        ctaLink: '#',
    },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000); // change every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                        index === current ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    {/* Background image */}
                    <img
                        src={slide.image}
                        alt={slide.headline}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60"/>

                    {/* Content absolutely over image */}
                    <div className="absolute inset-0 z-20 flex items-end pb-16">
                        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-4">{slide.headline}</h1>
                                <p className="text-lg text-white/90 mb-6">{slide.description}</p>
                                <a
                                    href={slide.ctaLink}
                                    className="inline-block bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition"
                                >
                                    {slide.cta}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                    i === current ? 'bg-white scale-125' : 'bg-white/40'
                                }`}
                            />
                        ))}
                    </div>

                </div>
            ))}
        </section>
    );
}
