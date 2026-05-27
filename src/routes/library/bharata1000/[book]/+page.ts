import { supabase } from '$lib/utils/supabaseClient'

export async function load({ params }: { params: { book: string } }){
	const { data, error } = await supabase
	.from('db-bharata1000')
	.select()
	.eq('id-slug',`${params.book}`)
	.single()
	if (error) throw new Error(error.message)
	return data
}