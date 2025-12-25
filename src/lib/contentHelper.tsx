import { contentfulClient } from '@/lib/contentful';
import {
  ArticleSkeleton,
  Article,
  PlayerSkeleton,
  Player,
} from '@/lib/types';
import { Asset } from 'contentful';

export async function getLatestArticles(limit = 3): Promise<Article[]> {
  const response = await contentfulClient.getEntries<ArticleSkeleton>({
    content_type: 'article',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    order: ['-fields.publishDate'] as any, // Sort by publish date in descending order
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

export async function getPlayer(): Promise<Player | null> {
  const response = await contentfulClient.getEntries<PlayerSkeleton>({
    content_type: 'player',
    limit: 1,
  });

  if (response.items.length === 0) {
    return null;
  }

  const playerEntry = response.items[0];
  const photo = playerEntry.fields.photo as Asset;
  const photoUrl = photo.fields.file?.url
    ? `https:${photo.fields.file.url}`
    : '/images/player.jpg';

  return {
    name: playerEntry.fields.name,
    position: playerEntry.fields.position,
    squadNumber: playerEntry.fields.squadNumber,
    bio: playerEntry.fields.bio,
    photoUrl: photoUrl,
  };
}

export async function getPlayers(limit = 3): Promise<Player[]> {
  const response = await contentfulClient.getEntries<PlayerSkeleton>({
    content_type: 'player',
    limit,
  });

  return response.items.map((playerEntry) => {
    const photo = playerEntry.fields.photo as Asset;
    const photoUrl = photo.fields.file?.url
      ? `https:${photo.fields.file.url}`
      : '/images/player.jpg';

    return {
      name: playerEntry.fields.name,
      position: playerEntry.fields.position,
      squadNumber: playerEntry.fields.squadNumber,
      bio: playerEntry.fields.bio,
      photoUrl: photoUrl,
    };
  });
}
