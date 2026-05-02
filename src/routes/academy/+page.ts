import type { PageLoad } from './$types'
import { academyScholars } from '$lib/utils/localsends'

export const load: PageLoad = async() => {
	const scholars = academyScholars;
	return {
		scholars
	}
}