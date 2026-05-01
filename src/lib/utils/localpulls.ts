type PulledEntry = {
  date: Date
  formattedDate: string
  meta: Record<string, any>
  linkpath: string
}

type MarkdownModule = {
	metadata?: Record<string, any>
}

type BlogDateFormat = 'long' | 'short' | 'medium'

const blogFiles = import.meta.glob('/src/routes/blog/*.md') as Record<string, () => Promise<MarkdownModule>>
let blogEntries: Promise<PulledEntry[]> | undefined

function formatBlogDate(date: Date, format: BlogDateFormat = 'long') {
	if (format === 'short') {
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
	}

	if (format === 'medium') {
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
	}

	return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function toBlogEntry(path: string, metadata: Record<string, any> | undefined) {
  if (!metadata?.date) {
    return null
  }

  const date = new Date(String(metadata.date))

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return {
    date,
    formattedDate: formatBlogDate(date),
    meta: metadata,
    linkpath: path.slice(11, -3)
  } satisfies PulledEntry
}

async function loadBlogEntries() {
	blogEntries ??= Promise.all(
		Object.entries(blogFiles).map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			return toBlogEntry(path, metadata)
		})
	).then((entries) =>
		entries
			.filter((entry): entry is PulledEntry => entry !== null)
			.sort((a, b) => b.date.getTime() - a.date.getTime())
	)

	return blogEntries
}

function withDateFormat(entry: PulledEntry, format: BlogDateFormat) {
	return {
		...entry,
		formattedDate: formatBlogDate(entry.date, format)
	}
}

function stringList(value: unknown) {
	if (Array.isArray(value)) {
		return value.map((item) => String(item).trim()).filter(Boolean)
	}

	if (typeof value === 'string') {
		const trimmed = value.trim()
		return trimmed ? [trimmed] : []
	}

	return []
}

function countsFor(entries: PulledEntry[], field: string) {
	const counts = new Map<string, number>()

	for (const entry of entries) {
		for (const item of stringList(entry.meta[field])) {
			counts.set(item, (counts.get(item) ?? 0) + 1)
		}
	}

	return [...counts.entries()].map(([item, count]) => ({ item, count }))
}

export type BlogPost = {
	linkpath: string;
	formattedDate: string;
	meta: {
		title: string;
		image?: string;
		excerpt?: string;
		author?: string;
		words?: string | number;
		tags: string[];
	};
};

export async function fullBlog() {
  return loadBlogEntries()
}

export function blogContentPaths() {
	return Object.keys(blogFiles).map((path) => path.slice(11, -3))
}

export async function writersWithCountsAlphabetical() {
  const entries = await loadBlogEntries()
  return countsFor(entries, 'author')
    .map(({ item, count }) => ({ writer: item, count }))
    .sort((a, b) => a.writer.localeCompare(b.writer));
}

export async function selectedWriter(writer: string, limit:number) {
  const entries = await loadBlogEntries()
  return entries
    .filter(post => stringList(post.meta.author).includes(writer))
    .map((post) => withDateFormat(post, 'medium'))
    .slice(0,limit)
}

export async function tagsWithCountsAlphabetical() {
  const entries = await loadBlogEntries()
  return countsFor(entries, 'tags')
    .map(({ item, count }) => ({ tag: item, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export async function tagsWithCounts() {
  const entries = await loadBlogEntries()
  return countsFor(entries, 'tags')
    .map(({ item, count }) => ({ tag: item, count }))
    .sort((a, b) => b.count - a.count);
}

export async function selectedTag(tag: string) {
  const entries = await loadBlogEntries()
  return entries
    .filter(post => stringList(post.meta.tags).includes(tag))
    .map((post) => withDateFormat(post, 'medium'))
}

export async function categoryPosts(category?: string) {
  const entries = await loadBlogEntries()
  const categoryKey = category?.trim().toLowerCase()
  const filteredByCategory = categoryKey
    ? entries.filter(entry => stringList(entry.meta.category).some((item) => item.toLowerCase() === categoryKey))
    : entries;

  // sort by date desc and return only the latest 6
  return filteredByCategory
    .map((post) => withDateFormat(post, 'short'))
    .slice(0, 6);
}

export async function writerPosts(writer?: string) {
  const entries = await loadBlogEntries()
  const writerKey = writer?.trim().toLowerCase()
  const filteredByWriter = writerKey
    ? entries.filter(entry => stringList(entry.meta.category).some((item) => item.toLowerCase() === writerKey))
    : entries;

  // sort by date desc and return only the latest 6
  return filteredByWriter
    .slice(0, 6);
}

export async function fullLab() {
  const allfiles = import.meta.glob('/src/routes/lab/*.md')
  const filed = Object.entries(allfiles)
  const eachfiled = await Promise.all(
    filed.map(async ([path, resolver]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { metadata } = await resolver()
      const pathitem = path.slice(11, -3)
      const date = new Date(metadata.date as string);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        date,
        formattedDate,
        meta: metadata,
        linkpath: pathitem
      };
    })
  )
  // Filter out the null values before sorting
  const filtered = eachfiled.filter(entry => entry !== null);
  const sorted = filtered.sort((a, b) => b!.date.getTime() - a!.date.getTime());
  const trimmed = sorted.slice(0, Math.floor(sorted.length / 3) * 3);
  return trimmed;
}

export function formatYear(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric'
  }).format(date);
};

export function formatDOM(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
  }).format(date);
};

export function formatMonth(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);
};

export async function limitBlog() {
  const entries = await loadBlogEntries()
  return entries
    .map((post) => withDateFormat(post, 'short'))
    .slice(0, 6)
}

export async function limitLab() {
  const allfiles = import.meta.glob('/src/routes/lab/*.md')
  const filed = Object.entries(allfiles)
  const eachfiled = await Promise.all(
    filed.map(async ([path, resolver]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { metadata } = await resolver()
      const pathitem = path.slice(11, -3)
      const date = new Date(metadata.date as string);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        date,
        formattedDate,
        meta: metadata,
        linkpath: pathitem
      };
    })
  )
  // Filter out the null values before sorting
  const filtered = eachfiled.filter(entry => entry !== null);
  const sorted = filtered.sort((a, b) => b!.date.getTime() - a!.date.getTime());
  return sorted.slice(0, 3) 
}

export async function allSchools() {
	const posts = import.meta.glob('/src/routes/inspiration/*.md')
	const allfiles = { ...posts };
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
	  filed.map(async ([path, resolver]) => {
		// @ts-expect-error//why
		const { metadata } = await resolver()
		const pathitem = path.slice(11, -3)
		return {
		  meta: metadata,
		  linkpath: pathitem
		};
	  })
	)
	const validPosts = eachfiled.filter((post): post is NonNullable<typeof post> => post !== null);
	const groupedPosts = validPosts
	  .filter(post => post.meta.type && post.meta.type.includes('school'))
	  .sort((a, b) => a.meta.title.localeCompare(b.meta.title));
	return groupedPosts
  }

  export async function allThinkers() {
	const posts = import.meta.glob('/src/routes/inspiration/*.md')
	const allfiles = { ...posts };
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
	  filed.map(async ([path, resolver]) => {
		// @ts-expect-error//why
		const { metadata } = await resolver()
		const pathitem = path.slice(11, -3)
		return {
		  meta: metadata,
		  linkpath: pathitem
		};
	  })
	)
	const validPosts = eachfiled.filter((post): post is NonNullable<typeof post> => post !== null);
	const groupedPosts = validPosts
	  .filter(post => post.meta.type && post.meta.type.includes('thinker'))
	  .sort((a, b) => a.meta.title.localeCompare(b.meta.title));
	return groupedPosts
  }

  export async function allResearch() {
	const posts = import.meta.glob('/src/routes/research/*.md')
	const allfiles = { ...posts };
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
	  filed.map(async ([path, resolver]) => {
		// @ts-expect-error//why
		const { metadata } = await resolver()
		const pathitem = path.slice(11, -3)
		return {
		  meta: metadata,
		  linkpath: pathitem
		};
	  })
	)
	const validPosts = eachfiled.filter((post): post is NonNullable<typeof post> => post !== null);
	const groupedPosts = validPosts
	  .sort((a, b) => a.meta.title.localeCompare(b.meta.title));
	return groupedPosts
  }

  export async function allQuestions() {
	const posts = import.meta.glob('/src/routes/big-questions/*.md')
	const allfiles = { ...posts };
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
	  filed.map(async ([path, resolver]) => {
		const mod = await resolver() as {
			metadata:any
			default: any; // compiled Svelte component
		  };
		  const { metadata } = mod;
		  const content = mod.default;
		  const pathitem = path.slice(11, -3);
		return {
		  meta: metadata,
		  content,
		  linkpath: pathitem
		};
	  })
	)
	const validPosts = eachfiled.filter((post): post is NonNullable<typeof post> => post !== null);
	const groupedPosts = validPosts
	.sort((a, b) => {
		return a.meta.id - b.meta.id;
	  });
	return groupedPosts
  }


export function replaceHyphen(thisTag:string){
	const tag = thisTag.replaceAll('-', ' ')
	return tag
}


  export async function allArch() {
	const posts = import.meta.glob('/src/routes/library/journal-archaeology/*.md')
	const allfiles = { ...posts };
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
	  filed.map(async ([path, resolver]) => {
		// @ts-expect-error//why
		const { metadata } = await resolver()
		const pathitem = path.slice(11, -3)
		return {
		  meta: metadata,
		  linkpath: pathitem
		};
	  })
	)
	const validPosts = eachfiled.filter((post): post is NonNullable<typeof post> => post !== null);
	const groupedPosts = validPosts
	  .sort((a, b) => a.meta.title.localeCompare(b.meta.title));
	return groupedPosts
  }
