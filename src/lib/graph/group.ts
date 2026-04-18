import type { Node } from '$lib/types/graph';

export function groupByType(nodes: Node[]) {
  return {
    articles: nodes.filter(n => n.type === 'article'),
    texts: nodes.filter(n => n.type === 'text'),
    thinkers: nodes.filter(n => n.type === 'thinker'),
    schools: nodes.filter(n => n.type === 'school'),
    questions: nodes.filter(n => n.type === 'question')
  };
}
