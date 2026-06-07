import { allCourses } from '$lib/courses/course-index';

export type CourseDetail = {
	title: string;
	slug: string;
	description: string;
	desc?: string;
	image?: string;
	dates?: string;
	sessions?: string;
	timings?: string;
	price?: string;
	status?: string;
	page?: boolean;
	instructor?: string;
	paylink?: string;
	paylinkD?: string;
};

export type CourseOverview = {
	para1?: string;
	para2?: string;
};

export type CourseSectionItem = {
	title: string;
	text: string;
};

export type CourseInstructor = {
	name: string;
	text: string[];
	photo?: string;
};

export type CourseSession = {
	id: number;
	title: string;
	text: string;
	books?: string;
}

export type CoursePayload = {
	detail: CourseDetail;
	overview: CourseOverview[];
	audience: CourseSectionItem[];
	takeaways: CourseSectionItem[];
	instructor: CourseInstructor[];
	sessions: CourseSession[];
};

type CourseModule = {
	allDetails?: CourseDetail[];
	courseOverview?: CourseOverview[];
	courseAudience?: CourseSectionItem[];
	courseTakeaways?: CourseSectionItem[];
	courseInstructor?: CourseInstructor[];
	courseSessions?: CourseSession[];
};

const modules = import.meta.glob(
	['/src/lib/courses/*.ts', '!/src/lib/courses/course-index.ts', '!/src/lib/courses/course-data.ts'],
	{ eager: true }
) as Record<string, CourseModule>;

export function getCoursePayload(slug: string): CoursePayload | null {
	if (!allCourses.includes(slug)) {
		return null;
	}

	const module = modules[`/src/lib/courses/${slug}.ts`];
	const detail = module?.allDetails?.find((item) => item.slug === slug) ?? module?.allDetails?.[0];

	if (!module || !detail) {
		return null;
	}

	const instructor = module.courseInstructor ?? [];

	return {
		detail: {
			...detail,
			slug,
			desc: detail.desc ?? detail.description,
			instructor: detail.instructor ?? instructor[0]?.name
		},
		overview: module.courseOverview ?? [],
		audience: module.courseAudience ?? [],
		takeaways: module.courseTakeaways ?? [],
		instructor,
		sessions: module.courseSessions ?? []
	};
}

export function getCourseSummaries() {
	return allCourses
		.map((slug) => getCoursePayload(slug)?.detail)
		.filter((course): course is CourseDetail => Boolean(course));
}

export function getCoursePayloads() {
	return allCourses
		.map((slug) => getCoursePayload(slug))
		.filter((course): course is CoursePayload => Boolean(course));
}
