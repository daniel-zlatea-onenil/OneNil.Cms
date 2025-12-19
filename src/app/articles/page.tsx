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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">
        Latest News
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article.slug}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition"
          >
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={600}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-1">{article.date}</p>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                {article.title}
              </h2>
              <p className="text-sm text-slate-600 mb-4">{article.summary}</p>
              <Link href={`/articles/${article.slug}`}>
                <span className="text-red-600 hover:underline font-medium">
                  Read more →
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
