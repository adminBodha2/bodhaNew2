import { json } from '@sveltejs/kit';
import libraryItems from '$lib/serving/library-items.json';
import { fullBlog } from '$lib/utils/blogpulls';
import type { SearchResult } from '$lib/search/lib-blog-search';

type LibraryRaw = {
  id: number;
  name: string;
  author: string;
  type: string;
  linkreal: string;
  linkfinal: string;
};

export const prerender = true;

export async function GET() {
  const books: SearchResult[] = (libraryItems as LibraryRaw[]).map((b) => ({
    id: `book:${b.id}`,
    kind: 'book',
    name: b.name,
    author: b.author,
    type: b.type,
    linkreal: b.linkreal,
    linkfinal: b.linkfinal
  }));

  const blogPosts = await fullBlog();
  const posts: SearchResult[] = blogPosts
  .map((post): SearchResult | null => {
    const meta = post.meta;
    if (!meta?.title) return null;
    const author = Array.isArray(meta.author)
      ? meta.author.join(', ')
      : (meta.author ?? '');
    return {
      id: `post:${post.linkpath.replace('/blog/', '')}`,
      kind: 'post',
      name: meta.title,
      author,
      type: meta.category ?? 'post',
      linkreal: meta.image ?? '',
      linkfinal: post.linkpath
    };
  })
  .filter((p): p is SearchResult => p !== null);

  return json([...books, ...posts]);
}
