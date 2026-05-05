import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const docs = await getCollection('docs');
  return docs
    .filter(doc => doc.id !== 'index')
    .map(doc => ({
      params: { path: doc.id },
      props: { body: doc.body },
    }));
}

export async function GET({ props }: { props: { body: string } }) {
  return new Response(props.body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}