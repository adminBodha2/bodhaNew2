import { supabase } from '$lib/utils/supabaseClient'

export async function load({ params }: { params: { book: string } }) {
  const { data, error } = await supabase
    .from('db-library')
    .select()
    .eq('slug', `${params.book}`)
    .order('id')
    .single()
  if (error) throw new Error(error.message)
  return data

}