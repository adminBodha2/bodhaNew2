import type { PageLoad } from './$types'
import { academyScholars } from '$lib/utils/localsends'
import { getCoursePayloads } from '$lib/courses/course-data'

export const load: PageLoad = async() => {
	const scholars = academyScholars;
	const courses = getCoursePayloads();
	return {
		scholars,
		courses
	}
}
