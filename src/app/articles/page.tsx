import { contentfulClient } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleSkeleton, ArticleFields } from '@/lib/types';

type Article = {
  title: string;
  slug: string;
  summary: string;
  date: string;
  imageUrl: string;
};

async function getArticles(): Promise<Article[]> {
  const res = await contentfulClient.getEntries<ArticleSkeleton>({
    content_type: 'article',
    // @ts-expect-error – ordering by fields is valid but not in the SDK's types
    order: ['-fields.publishDate'],
  });

  return res.items.map((item) => {
    const fields = item.fields as ArticleFields;
    const { title, slug, summary, publishDate, coverImage } = fields;

    return {
      title,
      slug,
      summary,
      date: new Date(publishDate).toLocaleDateString(),
      imageUrl: 'https:' + coverImage.fields.file.url,
    };
  });
}

export default async function ArticlePage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">Latest News</h1>
          <p className="text-white/80 mt-2">
            Stay updated with the latest from OneNil FC
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-500 mb-2">{article.date}</p>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {article.summary}
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
    </div>
  );
}
