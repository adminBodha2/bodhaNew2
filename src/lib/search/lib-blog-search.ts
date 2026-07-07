import { Index } from 'flexsearch';

export type SearchKind = 'book' | 'post';

export type SearchResult = {
  id: string;
  kind: SearchKind;
  name: string;
  author: string;
  type: string;
  linkreal: string;
  linkfinal: string;
};

let searchIndex: Index;
let items: SearchResult[] = [];

export async function createSearchIndex(data: SearchResult[]) {
  // Single-field index — same pattern as the joyofcode article.
  // We concatenate name + author so both fields are searchable.
  searchIndex = new Index({ tokenize: 'forward' });
  items = data;
  await Promise.all(
    data.map((item, i) => {
      const content = `${item.name} ${item.author}`;
      return searchIndex.add(i, content);
    })
  );
}

export async function searchAll(
  term: string,
  kind?: SearchKind
): Promise<SearchResult[]> {
  if (!term?.trim()) return [];

  // Pass the raw term to FlexSearch — it tokenizes internally.
  const matches = await searchIndex.search(term, { limit: 200 });

  return matches
    .map((idx) => items[idx as number])
    .filter((it): it is SearchResult => !!it)
    .filter((it) => (kind ? it.kind === kind : true))
    .map((it) => ({
      ...it,
      name: highlight(it.name, term),
      author: highlight(it.author, term)
    }));
}

function highlight(text: string, m: string): string {
  // Escape regex metacharacters so queries like "(" or "." don't throw.
  const escaped = m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replaceAll(new RegExp(escaped, 'gi'), (s) => `<mark>${s}</mark>`);
}
