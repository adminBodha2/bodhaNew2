/* eslint-disable @typescript-eslint/no-unused-vars */
export async function load({ params, fetch }: { params: { tag: string }, fetch: typeof globalThis.fetch }) {
  const response = await fetch(`/api/tags`);
  const allPosts = await response.json();

  return {
    allPosts
  }
}
