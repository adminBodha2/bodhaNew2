import { json } from '@sveltejs/kit'
import { fullBlog } from '$lib/utils/localpulls'

export const prerender = true

export const GET = async () => {
  const allPosts = await fullBlog();
  const allPages = [...allPosts]
  return json(allPages);
}