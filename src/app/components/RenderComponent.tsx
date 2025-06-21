import NextMatchBlock from '@/app/components/NextMatchBlock';
import {NextMatchBlockEntry} from "@/lib/types";

export default function RenderComponent({ component }: { component: NextMatchBlockEntry }) 
{    
    switch (component.sys.contentType.sys.id) {
        case 'nextMatchBlock':
            return <NextMatchBlock key={component.sys.id} />;
        default:
            return null;
    }
}
