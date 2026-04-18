import type { Node, Edge } from '$lib/types/graph';
import nodesData from '$lib/data/nodes.json';
import edgesData from '$lib/data/edges.json';

export const nodes = nodesData as Node[];
export const edges = edgesData as Edge[];

// ---------- INDEXES ---------- //

// id → node
export const nodeById = new Map<string, Node>();

// from → edges[]
export const edgesFrom = new Map<string, Edge[]>();

// to → edges[]
export const edgesTo = new Map<string, Edge[]>();

// slug → node (for concept routing)
export const nodeBySlug = new Map<string, Node>();

// ---------- BUILD ---------- //

for (const node of nodes) {
  nodeById.set(node.id, node);
  nodeBySlug.set(node.slug, node);
}

for (const edge of edges) {
  if (!edgesFrom.has(edge.from)) edgesFrom.set(edge.from, []);
  if (!edgesTo.has(edge.to)) edgesTo.set(edge.to, []);

  edgesFrom.get(edge.from)!.push(edge);
  edgesTo.get(edge.to)!.push(edge);
}

// ---------- HELPERS ---------- //

export function getNode(id: string) {
  return nodeById.get(id);
}

export function getNodeBySlug(slug: string) {
  return nodeBySlug.get(slug);
}

export function getOutgoing(id: string) {
  return edgesFrom.get(id) || [];
}

export function getIncoming(id: string) {
  return edgesTo.get(id) || [];
}

export function resolveEdges(edgeList: Edge[]) {
  return edgeList
    .map(e => nodeById.get(e.to))
    .filter(Boolean) as Node[];
}

export function getNodeScore(nodeId: string) {
  return (edgesTo.get(nodeId) || []).length;
}