export async function load({ params, fetch }: { params: { writer: string }, fetch: typeof globalThis.fetch }) {
  const normalizedWriter = params.writer.replace(/%20|_/g, '').toLowerCase();
  const response = await fetch(`/api/writers`);
  const allWriters = await response.json();

  const posts = allWriters.filter((writerObj: { writer: string }) =>
    writerObj.writer.replace(/ /g, '').toLowerCase() === normalizedWriter);

  return {
    posts
  }
}
