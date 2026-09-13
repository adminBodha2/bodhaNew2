import type { EntryGenerator, PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { allCourses } from '$lib/courses/course-index';
import { getCoursePayload } from '$lib/courses/course-data';

export const entries: EntryGenerator = () => {
	return allCourses.map((course) => ({ course }));
};

export const load: PageLoad = ({ params }) => {
	const course = getCoursePayload(params.course);

	if (!course) {
		throw error(404, 'Course not found');
	}

	return course;
};
