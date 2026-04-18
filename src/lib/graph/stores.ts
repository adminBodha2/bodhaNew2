import { derived, writable } from 'svelte/store';
import { nodeById, edgesFrom, edgesTo } from './index';
import type { Node } from '$lib/types/graph';

// active node (for UI pivoting later)
export const currentNodeId = writable<string | null>(null);

// ---------- DERIVED ---------- //

export const currentNode = derived(currentNodeId, ($id) =>
  $id ? nodeById.get($id) : null
);

export const relatedConcepts = derived(currentNodeId, ($id) => {
	if (!$id) return [];
  
	return (edgesFrom.get($id) || [])
	  .map(e => nodeById.get(e.to))
	  .filter((n): n is Node => n !== undefined && n.type === 'concept');
  });

  export const referencedBy = derived(currentNodeId, ($id) => {
	if (!$id) return [];
  
	return (edgesTo.get($id) || [])
	  .map(e => nodeById.get(e.from))
	  .filter((n): n is Node => n !== undefined);
  });

