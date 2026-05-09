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
	const posts = import.meta.glob('/src/routes/library/(library-subroutes)/journal-archaeology/*.md')
	const allfiles = { ...posts };
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
	  filed.map(async ([path, resolver]) => {
		// @ts-expect-error//why
		const { metadata } = await resolver()
		const pathitem = path.replace('/src/routes/library/(library-subroutes)', '/library').slice(11, -3)
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


export async function newsletter(){
	const posts = import.meta.glob('/src/routes/newsletter/*.md')
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
	return eachfiled
}

export async function scrollsofA(){
	const posts = import.meta.glob('/src/routes/aryavarta/*.md')
	const allfiles = { ...posts };
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async ([path,resolver]) => {
			//@ts-expect-error//why
			const { metadata } = await resolver()
			const pathitem = path.slice(11, -3)
			return {
				meta: metadata,
				linkpath: pathitem,
			};
		})
	)
	return eachfiled.sort((a, b) => b.meta.id - a.meta.id);
}
