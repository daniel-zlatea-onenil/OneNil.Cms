import {contentfulClient} from '@/lib/contentful';
import {notFound} from 'next/navigation';
import Image from 'next/image';
import type {EntrySkeletonType} from 'contentful';
import {Asset} from 'contentful';

type ArticleFields = {
    title: string;
    slug: string;
    summary: string;
    publishDate: string;
    content: string;
    coverImage: Asset; // ✅ Use Contentful's Asset type
};

type ArticleSkeleton = EntrySkeletonType<ArticleFields>;

export default async function ArticlePage(    props: {
    params: Promise<{ slug: string }>
})
{
    const params = await props.params;
    const res = await contentfulClient.getEntries<ArticleSkeleton>({
        content_type: 'article',
        // @ts-expect-error: valid but unsupported typing
        'fields.slug': params.slug,
        limit: 1,
    });

    const article = res.items[0];
    if (!article) return notFound();

    const {title, summary, publishDate, content} = article.fields;
    const coverImage = article.fields.coverImage as Asset; // ✅ Type assertion

    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-red-700 mb-4">{title}</h1>
            <p className="text-sm text-gray-500 mb-6">{new Date(publishDate).toLocaleDateString()}</p>

            {coverImage?.fields?.file?.url && (
                <Image
                    src={`https:${coverImage.fields.file.url}`}
                    alt={title}
                    width={800}
                    height={400}
                    className="w-full h-auto rounded mb-8"
                />
            )}

            <p className="text-lg text-gray-700 mb-4">{summary}</p>
            <div className="prose prose-slate">
                <p>{content}</p>
            </div>
        </main>
    );
}
