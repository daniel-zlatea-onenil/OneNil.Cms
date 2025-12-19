import { contentfulClient } from '@/lib/contentful';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

type RichTextComponentProps = {
  componentId: string;
};

export default async function RichTextBlock({
  componentId,
}: RichTextComponentProps) {
  const res = await contentfulClient.getEntry(componentId);

  if (!res || !('fields' in res) || !res.fields.text) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-gray-500">No content found.</p>
      </div>
    );
  }

  const content = res.fields.text as Document;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-left prose prose-slate max-w-none">
      {documentToReactComponents(content)}
    </div>
  );
}
