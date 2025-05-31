import NextMatchBlock from '@/app/components/NextMatchBlock';

export default function RenderComponent({ component }: { component: any }) {
    switch (component.sys.contentType.sys.id) {
        case 'nextMatchBlock':
            return <NextMatchBlock key={component.sys.id} />;
        default:
            return null;
    }
}
