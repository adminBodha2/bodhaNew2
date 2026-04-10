import { writersWithCountsAlphabetical } from '$lib/utils/localpulls'
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const allPosts = await writersWithCountsAlphabetical();
  return json(allPosts);
}