import fs from 'fs';
import type { GraphNode, GraphEdge, NodeType } from './graph';
const allItems = JSON.parse(fs.readFileSync('./all-items.json', 'utf-8'));
const allTags = JSON.parse(fs.readFileSync('./all-tags.json', 'utf-8'));
const amarakoshaVargas = JSON.parse(
  fs.readFileSync('./amarakosha-varga-map.json', 'utf-8')
);

const nodes = new Map<string, GraphNode>();
const edges: GraphEdge[] = [];
const edgeIds = new Set<string>();

const now = new Date().toISOString();

function normalizeTag(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getConceptId(tag: string) {
  return `concept:${normalizeTag(tag)}`;
}

function addNode(node: GraphNode) {
  if (!nodes.has(node.id)) {
    nodes.set(node.id, {
      ...node,
      system: {
        createdAt: now,
        updatedAt: now
      }
    });
  }
}

function addEdge(from: string, to: string, type: GraphEdge['type']) {
  const id = `${from}--${type}--${to}`;

  if (!edgeIds.has(id)) {
    edgeIds.add(id);

    edges.push({
      id,
      from,
      to,
      type,
      meta: {
        source: 'auto'
      }
    });
  }
}

function getItemSlug(item: any) {
  if (item.linkpath) {
    const parts = item.linkpath.split('/').filter(Boolean);
    const last = parts[parts.length - 1];

    return slugify(
      decodeURIComponent(last)
        .replace(/\.pdf$/i, '')
        .replace(/\.html$/i, '')
    );
  }

  return slugify(item.title);
}

function getItemId(item: any) {
  return `${item.type}:${getItemSlug(item)}`;
}

function isNodeType(type: string): type is NodeType {
  return [
    'blog',
    'question',
    'project',
    'thinker',
    'school',
    'lab',
    'external-article',
    'book',
    'concept'
  ].includes(type);
}

// 1. Create item nodes

for (const item of allItems) {
  const slug = getItemSlug(item);
  const type = isNodeType(item.type) ? item.type : 'blog';

  const id = `${type}:${slug}`;

  addNode({
    id,
    type,
    title: item.title,
    slug,
    description: item.description || '',
    tags: item.tags || [],
    meta: {
      author: Array.isArray(item.author)
        ? item.author
        : item.author
          ? [item.author]
          : [],
      route: item.linkpath,
      source: 'item'
    }
  });
}

// 2. Create concept nodes from all-tags.json

for (const entry of allTags) {
  const tag = normalizeTag(entry.tag);

  addNode({
    id: `concept:${tag}`,
    type: 'concept',
    title: titleFromSlug(tag),
    slug: tag,
    description: '',
    tags: [],
    meta: {
      source: 'tag'
    }
  });
}

// 3. Create missing concept nodes from item tags

for (const item of allItems) {
  for (const rawTag of item.tags || []) {
    const tag = normalizeTag(rawTag);

    addNode({
      id: `concept:${tag}`,
      type: 'concept',
      title: titleFromSlug(tag),
      slug: tag,
      description: '',
      tags: [],
      meta: {
        source: 'derived'
      }
    });
  }
}

for (const varga of amarakoshaVargas) {
  addNode({
    id: `ak-varga:${varga.slug}`,
    type: 'ak-varga',
    title: varga.label,
    slug: varga.slug,
    description: varga.description || '',
    tags: varga.conceptSlugs || [],
    meta: {
      source: 'derived'
    }
  });
}

for (const varga of amarakoshaVargas) {
  const vargaId = `ak-varga:${varga.slug}`;

  for (const conceptSlug of varga.conceptSlugs || []) {
    addEdge(vargaId, getConceptId(conceptSlug), 'RELATED_TO');
  }
}

// 4. Create item → concept edges

for (const item of allItems) {
  const itemId = getItemId(item);

  for (const rawTag of item.tags || []) {
    addEdge(itemId, getConceptId(rawTag), 'HAS_TAG');
  }
}

// 5. Write output

const finalNodes = Array.from(nodes.values());

fs.writeFileSync('./nodes.json', JSON.stringify(finalNodes, null, 2));
fs.writeFileSync('./edges.json', JSON.stringify(edges, null, 2));

console.log(`Done.
Nodes: ${finalNodes.length}
Edges: ${edges.length}`);