import NextMatchBlock from '@/app/components/NextMatchBlock';
import { ComponentEntry } from '@/lib/types';
import RichTextBlock from '@/app/components/RichTextBlock';

export default function RenderComponent({
  component,
}: {
  component: ComponentEntry;
}) {
  switch (component.sys.contentType.sys.id) {
    case 'nextMatchBlock':
      return <NextMatchBlock />;
    case 'richText':
      return <RichTextBlock componentId={component.sys.id} />;
    default:
      return null;
  }
}
