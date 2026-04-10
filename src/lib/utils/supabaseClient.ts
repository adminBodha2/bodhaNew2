import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY)

export async function openLibrary(){
  const { data, error } = await supabase
  .from('db-library')
  .select()
  .order('name')
  if (error) throw new Error(error.message)
  return data
}

export async function selectedOpenLibrary(type:string){
  const { data, error } = await supabase
  .from('db-library')
  .select()
  .eq('type', type)
  .order('name')
  if (error) throw new Error(error.message)
  return data
}

export async function allSchools(){
  const { data, error } = await supabase
  .from('db-schools')
  .select()
  .eq('type','school')
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function allThinkers(){
  const { data, error } = await supabase
  .from('db-schools')
  .select()
  .eq('type','thinker')
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function sixVideos(){
  const { data, error } = await supabase
  .from('db-videos')
  .select()
  .eq('show', true)
  .order('id', {ascending:false})
  .limit(6)
  if (error) throw new Error(error.message)
  return data
}

export async function allVideos(){
  const { data, error } = await supabase
  .from('db-videos')
  .select()
  .eq('show', true)
  .order('id', {ascending:false})
  if (error) throw new Error(error.message)
  return data
}

export async function otherArticles(){
  const { data, error } = await supabase
  .from('db-articles')
  .select()
  .order('date', {ascending:false})
  if (error) throw new Error(error.message)
  return data
}

export async function otherPankaj(){
  const { data, error } = await supabase
  .from('db-articles')
  .select()
  .eq('author','Pankaj Saxena')
  .order('date', {ascending:false})
  if (error) throw new Error(error.message)
  return data
}

export async function otherAmrit(){
  const { data, error } = await supabase
  .from('db-articles')
  .select()
  .eq('author','Amritanshu Pandey')
  .order('date', {ascending:false})
  if (error) throw new Error(error.message)
  return data
}

export async function allResearch(){
  const { data, error } = await supabase
  .from('db-research')
  .select()
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function bigQuestions(){
  const { data, error } = await supabase
  .from('db-questions')
  .select()
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function anveshiChapters(){
  const { data, error } = await supabase
  .from('db-anveshichapters')
  .select()
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function anveshiFaqs(){
  const { data, error } = await supabase
  .from('db-anveshifaqs')
  .select()
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function anveshiCurrent(){
  const { data, error } = await supabase
  .from('db-anveshichapters')
  .select()
  .eq('status','current')
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function anveshiFuture(){
  const { data, error } = await supabase
  .from('db-anveshichapters')
  .select()
  .eq('status','upcoming')
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function selectedAnveshiFuture(region:string){
  const { data, error } = await supabase
  .from('db-anveshichapters')
  .select()
  .eq('status','upcoming')
  .eq('region',region)
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function anveshiPast(){
  const { data, error } = await supabase
  .from('db-anveshichapters')
  .select()
  .eq('status','previous')
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function kannurTemples(){
  const { data, error } = await supabase
  .from('db-kannurtemples')
  .select()
  .order('id')
  if (error) throw new Error(error.message)
  return data
}

export async function kulluTemples(){
  const { data, error } = await supabase
  .from('db-kullu')
  .select()
  .order('id')
  if (error) throw new Error(error.message)
  return data
}