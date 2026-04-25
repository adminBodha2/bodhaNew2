import nodesData from '$lib/data/nodes.json';
import edgesData from '$lib/data/edges.json';
import type { GraphNode, GraphEdge } from '$lib/noder/graph';

// raw arrays
export const nodes = nodesData as GraphNode[];
export const edges = edgesData as GraphEdge[];

// maps for fast lookup
export const nodeById = new Map<string, GraphNode>();
export const edgesFrom = new Map<string, GraphEdge[]>();
export const edgesTo = new Map<string, GraphEdge[]>();

// build indexes
for (const node of nodes) {
  nodeById.set(node.id, node);
}

for (const edge of edges) {
  if (!edgesFrom.has(edge.from)) {
    edgesFrom.set(edge.from, []);
  }
  edgesFrom.get(edge.from)!.push(edge);

  if (!edgesTo.has(edge.to)) {
    edgesTo.set(edge.to, []);
  }
  edgesTo.get(edge.to)!.push(edge);
}

// helpers

export function getNode(id: string) {
  return nodeById.get(id);
}

export function getOutgoing(id: string) {
  return edgesFrom.get(id) || [];
}

export function getIncoming(id: string) {
  return edgesTo.get(id) || [];
}

export function getNodeBySlug(slug: string) {
  return nodes.find(n => n.slug === slug);
}

export function getNodeScore(nodeId: string) {
  return (edgesTo.get(nodeId) || []).length;
}