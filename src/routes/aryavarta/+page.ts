import type { PageLoad } from './$types'
import { scrollsofA } from '$lib/utils/localpulls'

export const load: PageLoad = async() => {
	const posts = await scrollsofA();
	return {
		posts
	}
}
