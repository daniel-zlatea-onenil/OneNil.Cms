'use client';
import { Article } from '@/lib/types';
import Image from 'next/image';

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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-red-700 mb-6">
          Latest News
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articleItems.map((item, id) => (
            <div
              key={id}
              className="bg-gray-100 rounded shadow p-5 hover:shadow-lg transition"
            >
              <Image
                src={item.image}
                alt={item.headline}
                width={341}
                height={192}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-bold text-xl mb-2">{item.headline}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.date}</p>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <a
                href="#"
                className="text-red-700 hover:underline text-sm font-medium"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
