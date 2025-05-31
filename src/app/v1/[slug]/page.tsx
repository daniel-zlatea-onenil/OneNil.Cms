export default async function Page(
    props: {
        params: Promise<{ slug: string }>
    }
) {
    const params = await props.params;
    return <h1>My Page {params.slug} </h1>
}