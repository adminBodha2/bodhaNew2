import type { PageLoad } from './$types'
import { newsletter } from '$lib/utils/localpulls'

export const load: PageLoad = async () => {
	const posts = await newsletter();
	return {
		posts
	}
}