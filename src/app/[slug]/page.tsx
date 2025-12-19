import { contentfulClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import RenderComponent from '@/app/components/RenderComponent';
import { ComponentEntry } from '@/lib/types';

export async function generateStaticParams() {
  const res = await contentfulClient.getEntries({ content_type: 'page' });
  return res.items.map((item) => ({ slug: item.fields.slug }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const res = await contentfulClient.getEntries({
    content_type: 'page',
    'fields.slug': params.slug,
    limit: 1,
  });

  const page = res.items[0];
  if (!page) return notFound();

  const components = page.fields.topSection as ComponentEntry[];

  return (
    <main>
      {components.map((component) => (
        <RenderComponent key={component.sys.id} component={component} />
      ))}
    </main>
  );
}
