import type { PageLoad } from './$types'
import { academyScholars, acadCourses } from '$lib/utils/localsends'

export const load: PageLoad = async() => {
	const scholars = academyScholars;
	const courses = acadCourses;
	return {
		scholars,
		courses
	}
}