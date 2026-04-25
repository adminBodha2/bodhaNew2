import {
  createSearchIndex,
  searchAll,
  type SearchResult,
  type SearchKind
} from './lib-blog-search';

addEventListener('message', async (e: MessageEvent) => {
  const { type, payload } = e.data;

  if (type === 'load') {
    try {
      const res = await fetch('/api/lib-blog-search.json');
      if (!res.ok) throw new Error(`Search data fetch failed: ${res.status}`);
      const data: SearchResult[] = await res.json();
      await createSearchIndex(data);
      postMessage({ type: 'ready' });
    } catch (err) {
      postMessage({ type: 'error', payload: { message: String(err) } });
    }
  }

  if (type === 'search') {
    try {
      const results = await searchAll(
        payload.searchTerm,
        payload.kind as SearchKind | undefined
      );
      postMessage({
        type: 'results',
        payload: { results, searchTerm: payload.searchTerm }
      });
    } catch (err) {
      postMessage({ type: 'error', payload: { message: String(err) } });
    }
  }
});