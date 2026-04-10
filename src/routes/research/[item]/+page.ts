import { supabase } from '$lib/utils/supabaseClient'

export async function load({ params }: { params: { item: string } }) {
  const { data, error } = await supabase
    .from('db-research')
    .select()
    .eq('slug', `${params.item}`)
    .order('id')
    .single()
  if (error) throw new Error(error.message)
  return data

}