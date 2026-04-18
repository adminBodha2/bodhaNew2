import { error } from '@sveltejs/kit'
import libraryItems from '$lib/serving/library-items.json'

export async function load({ params }: { params: { book: string } }) {
  const book = libraryItems.find((item) => item.slug === params.book)
  if (!book) throw error(404, 'Book not found')
  return book
}