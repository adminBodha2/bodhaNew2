import type { PageLoad } from './$types'
import sections from '$lib/serving/bharata1000-sections.json'

export const load: PageLoad = async() => {
	return {
		sections
	}
}