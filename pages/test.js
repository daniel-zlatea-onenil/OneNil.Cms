import { getEntries } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
                        <p>{item.fields.date}</p>

                        {/* ✅ Render the rich text field */}
                        {item.fields.quote && (
                            <div>
                                {documentToReactComponents(item.fields.quote)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
