// search.ts
import FlexSearch from 'flexsearch'

export interface SearchItem {
  title: string;
  slug: string;
  content: string;
  category?: string;
  tags?: string[];
}

export type SearchResult = {
  slug: string
  title: string
  content: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let postsIndex: any // <-- avoid generic type problems
let posts: SearchItem[] = []

export function createPostsIndex(data: SearchItem[]) {
  postsIndex = new FlexSearch.Index({ tokenize: 'forward' })
  data.forEach((post, i) => postsIndex.add(i, `${post.title} ${post.category} ${post.slug} ${post.content ?? ''}`))
  posts = data
}

export async function searchPostsIndex(searchTerm: string): Promise<SearchResult[]> {
  const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  if (!postsIndex) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await (postsIndex.search as any)(match) // keep small any-cast if needed
  const ids = Array.isArray(raw) ? (raw as number[]) : (raw as number[])

  return ids
    .map((i: number) => posts[i])
    .filter(Boolean)
    .map(({ title, content = '', slug }): SearchResult => ({
      slug,
      title: replaceTextWithMarker(title, match),
      content: getMatches(content, match)
    }))
}

function getMatches(text: string, searchTerm: string, limit = 1) {
	// create dynamic regex 😎
	const regex = new RegExp(searchTerm, 'gi')
  // word indexes
	const indexes = []
  // matches count
	let matches = 0
  // current match in loop
	let match

	while ((match = regex.exec(text)) !== null && matches < limit) {
		// push that shit
    indexes.push(match.index)
		// increment matches
		matches++
	}

  // take the word index...
	return indexes.map((index) => {
    // go back 20 characters
		const start = index - 20
    // go forward 80 characters
		const end = index + 80
    // yoink the text
		const excerpt = text.substring(start, end).trim()
    // return excerpt 🤝
		return `...${replaceTextWithMarker(excerpt, searchTerm)}...`
	})
}

function replaceTextWithMarker(text: string, match: string) {
  // create dynamic regex 😎
	const regex = new RegExp(match, 'gi')
  // preserves the text casing 🤙
	return text.replaceAll(regex, (match) => `<mark>${match}</mark>`)
}