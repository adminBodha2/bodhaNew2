import { tagsWithCountsAlphabetical } from '$lib/utils/localpulls'
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const allPosts = await tagsWithCountsAlphabetical();
  return json(allPosts);
}