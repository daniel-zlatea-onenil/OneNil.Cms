import { getEntries } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';

export async function getStaticProps() {
    const news = await getEntries('componentQuote'); // Replace with your content type ID
    return {
        props: { news: news || [] },
    };
}

export default function TestPage({ news }) {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>News Articles</h1>
            <p>Total: {news.length} article{news.length !== 1 ? 's' : ''}</p>

            <ul>
                {news.map((item) => (
                    <li key={item.sys.id} style={{ marginBottom: '1rem' }}>
                        <h2>{item.fields.title}</h2>
                        
                        {item.fields.quote && (
                            <div>
                                {documentToReactComponents(item.fields.quote)}
                                <Image
                                    src={`https:${item.fields.image.fields.file.url}`}
                                    alt={item.fields.title}
                                    width={item.fields.image.fields.file.details.image.width}   // you can set this dynamically if you want
                                    height={item.fields.image.fields.file.details.image.height}  // or extract width/height from item.fields.image.fields.file.details.image
                                    style={{ maxWidth: '40%', height: 'auto' }}
                                />
                            </div>

                )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
