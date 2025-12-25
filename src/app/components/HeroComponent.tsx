'use client';
import { useState, useEffect } from 'react';
import { Article } from '@/lib/types';
import Image from 'next/image';

interface HeroCarouselProps {
  articles: Article[];
}

export default function HeroCarousel({ articles }: HeroCarouselProps) {
  const slides = articles.map((article) => ({
    image: article.imageUrl,
    headline: article.title,
    description: article.summary,
    cta: 'Read more',
    ctaLink: `/articles/${article.slug}`,
  }));
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isHovered]);

  return (
    <section
      className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[500px] max-h-[900px] w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full transition-all duration-1000 ease-out ${
            index === current
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          {/* Background image */}
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover object-top"
          />

          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-end pb-12 md:pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div
                className={`max-w-2xl transition-all duration-700 delay-200 ${
                  index === current
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-2xl">
                  {slide.headline}
                </h1>
                <p className="text-base md:text-lg text-white/90 mb-6 max-w-xl line-clamp-3">
                  {slide.description}
                </p>
                <a
                  href={slide.ctaLink}
                  className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-glow-red transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  Explore More
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 glass rounded-full px-4 py-2 flex space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-white w-8'
                : 'bg-white/40 w-2.5 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
