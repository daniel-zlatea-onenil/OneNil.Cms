'use client';
import { Article } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface NewsProps {
  articles: Article[];
}

export default function NewsComponent({ articles }: NewsProps) {
  const articleItems = articles.map((article) => ({
    image: article.imageUrl,
    headline: article.title,
    description: article.summary,
    date: article.date,
    cta: 'Read more',
    ctaLink: `/articles/${article.slug}`,
  }));

  return (
    <section className="py-16 md:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 relative inline-block">
          Latest News
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full" />
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articleItems.map((item) => (
            <Link
              key={item.ctaLink}
              href={item.ctaLink}
              className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.headline}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 mb-2">{item.date}</p>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-red-700 transition-colors duration-300 line-clamp-2">
                  {item.headline}
                </h3>
                <p className="text-slate-600 mb-4 text-sm line-clamp-2">
                  {item.description}
                </p>
                <span className="inline-flex items-center text-red-600 text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                  Read more
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
