export async function fullBlog() {
  const allfiles = import.meta.glob('/src/routes/blog/*.md')
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
  return filtered.sort((a, b) => b!.date.getTime() - a!.date.getTime());
}

export async function writersWithCountsAlphabetical() {
  const posts = import.meta.glob('/src/routes/blog/*.md');
  const allfiles = { ...posts };
  const filed = Object.entries(allfiles);
  const writerCounts = new Map(); // Create a map to store tag counts

  await Promise.all(
    filed.map(async ([, resolver]) => {
      // @ts-expect-error//why
      const { metadata } = await resolver();
      const writers = metadata.author || [];

      writers.forEach((writer: string) => {
        if (writerCounts.has(writer)) {
          writerCounts.set(writer, writerCounts.get(writer) + 1); // Increment the count
        } else {
          writerCounts.set(writer, 1); // Initialize the count to 1
        }
      });
    })
  );

  const distinctWriters = [...writerCounts.keys()]
  const writersWithCounts = distinctWriters.map((writer) => ({
    writer,
    count: writerCounts.get(writer),
  }));
  return writersWithCounts.sort((a, b) => a.writer.localeCompare(b.writer));
}

export async function selectedWriter(writer: string, limit:number) {
  const posts = import.meta.glob('/src/routes/blog/*.md')
  const allfiles = { ...posts };
  const filed = Object.entries(allfiles)
  const eachfiled = await Promise.all(
    filed.map(async ([path, resolver]) => {
      // @ts-expect-error//why
      const { metadata } = await resolver()
      const pathitem = path.slice(11, -3)
      const defaultDate = "2023-07-07"
      const date = metadata.date ? new Date(metadata.date as string) : new Date(defaultDate);
      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      return {
        meta: metadata,
        linkpath: pathitem,
        date,
        formattedDate
      };
    })
  )
  const validPosts = eachfiled.filter((post): post is NonNullable<typeof post> => post !== null);
  const groupedPosts = validPosts
    .filter(post => post.meta.author && post.meta.author.includes(writer))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  return groupedPosts.slice(0,limit)
}

export async function tagsWithCountsAlphabetical() {
  const posts = import.meta.glob('/src/routes/blog/*.md');
  const allfiles = { ...posts };
  const filed = Object.entries(allfiles);
  const tagCounts = new Map(); // Create a map to store tag counts

  await Promise.all(
    filed.map(async ([, resolver]) => {
      // @ts-expect-error//why
      const { metadata } = await resolver();
      const tags = metadata.tags || [];

      tags.forEach((tag: string) => {
        if (tagCounts.has(tag)) {
          tagCounts.set(tag, tagCounts.get(tag) + 1); // Increment the count
        } else {
          tagCounts.set(tag, 1); // Initialize the count to 1
        }
      });
    })
  );

  const distinctTags = [...tagCounts.keys()]
  const tagsWithCounts = distinctTags.map((tag) => ({
    tag,
    count: tagCounts.get(tag)
  }));
  return tagsWithCounts.sort((a, b) => a.tag.localeCompare(b.tag));
}

export async function tagsWithCounts() {
  const posts = import.meta.glob('/src/routes/blog/*.md');
  const allfiles = { ...posts };
  const filed = Object.entries(allfiles);
  const tagCounts = new Map(); // Create a map to store tag counts

  await Promise.all(
    filed.map(async ([, resolver]) => {
      // @ts-expect-error//why
      const { metadata } = await resolver();
      const tags = metadata.tags || [];

      tags.forEach((tag: string) => {
        if (tagCounts.has(tag)) {
          tagCounts.set(tag, tagCounts.get(tag) + 1); // Increment the count
        } else {
          tagCounts.set(tag, 1); // Initialize the count to 1
        }
      });
    })
  );

  const distinctTags = [...tagCounts.keys()]
  const tagsWithCounts = distinctTags.map((tag) => ({
    tag,
    count: tagCounts.get(tag)
  }));
  return tagsWithCounts.sort((a, b) => b.count - a.count);
}

export async function selectedTag(tag: string) {
  const posts = import.meta.glob('/src/routes/blog/*.md')
  const allfiles = { ...posts };
  const filed = Object.entries(allfiles)
  const eachfiled = await Promise.all(
    filed.map(async ([path, resolver]) => {
      // @ts-expect-error//why
      const { metadata } = await resolver()
      const pathitem = path.slice(11, -3)
      const defaultDate = "2023-07-07"
      const date = metadata.date ? new Date(metadata.date as string) : new Date(defaultDate);
      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      return {
        meta: metadata,
        linkpath: pathitem,
        date,
        formattedDate,
      };
    })
  )
  const validPosts = eachfiled.filter((post): post is NonNullable<typeof post> => post !== null);
  const groupedPosts = validPosts
    .filter(post => post.meta.tags && post.meta.tags.includes(tag))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  return groupedPosts
}

export async function categoryPosts(category?: string) {
  const allfiles = import.meta.glob('/src/routes/blog/*.md')
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

  // remove nulls / invalid date entries
  const filteredNonNull = eachfiled.filter(entry => entry && entry.date instanceof Date && !isNaN(entry.date.getTime()));

  // if a category was provided, filter by it (supports meta.category as string or string[])
  const filteredByCategory = category
    ? filteredNonNull.filter(entry => {
        const cat = entry!.meta?.category;
        if (!cat) return false;
        if (Array.isArray(cat)) {
          return cat.some((c: string) => String(c).trim().toLowerCase() === category.trim().toLowerCase())
        }
        return String(cat).trim().toLowerCase() === category.trim().toLowerCase();
      })
    : filteredNonNull;

  // sort by date desc and return only the latest 6
  return filteredByCategory
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 6);
}

export async function writerPosts(writer?: string) {
  const allfiles = import.meta.glob('/src/routes/blog/*.md')
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

  // remove nulls / invalid date entries
  const filteredNonNull = eachfiled.filter(entry => entry && entry.date instanceof Date && !isNaN(entry.date.getTime()));

  // if a category was provided, filter by it (supports meta.category as string or string[])
  const filteredByWriter = writer
    ? filteredNonNull.filter(entry => {
        const cat = entry!.meta?.category;
        if (!cat) return false;
        if (Array.isArray(cat)) {
          return cat.some((c: string) => String(c).trim().toLowerCase() === writer.trim().toLowerCase())
        }
        return String(cat).trim().toLowerCase() === writer.trim().toLowerCase();
      })
    : filteredNonNull;

  // sort by date desc and return only the latest 6
  return filteredByWriter
    .sort((a, b) => b.date.getTime() - a.date.getTime())
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
  const allfiles = import.meta.glob('/src/routes/blog/*.md')
  const filed = Object.entries(allfiles)

  const eachfiled = await Promise.all(
    filed.map(async ([path, resolver]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { metadata } = await resolver()
      const pathitem = path.slice(11, -3)

      const date = new Date(metadata.date as string)
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      return {
        date,
        formattedDate,
        meta: metadata,
        linkpath: pathitem
      }
    })
  )

  const filtered = eachfiled.filter(Boolean)

  const sorted = filtered.sort((a, b) => b.date.getTime() - a.date.getTime())

  return sorted.slice(0, 6)   // 🔥 Only first 3 posts
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
