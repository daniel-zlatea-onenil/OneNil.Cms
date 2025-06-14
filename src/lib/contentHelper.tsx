import {contentfulClient} from '@/lib/contentful';
import { ArticleSkeleton, Article } from '@/lib/types';
import {Asset} from 'contentful';

export async function getLatestArticles(limit = 3): Promise<Article[]> {
    const response = await contentfulClient.getEntries<ArticleSkeleton>({
        content_type: 'article',
        order: ['fields.publishDate'] as any,
        limit,
    });

    return response.items.map((entry) => {
        const coverImage = entry.fields.coverImage as Asset;
        const imageUrl = coverImage.fields.file?.url
            ? `https:${coverImage.fields.file.url}`
            : '/images/fallback.jpg';

        return {
            title: entry.fields.title,
            slug: entry.fields.slug,
            summary: entry.fields.summary,
            date: entry.fields.publishDate,
            imageUrl: imageUrl,
        };
    });
}
