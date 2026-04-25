import type { PageLoad } from './$types';
import { nodes } from '$lib/graph';

export const load: PageLoad = () => {
const contentNodes = nodes.filter(
  (n) => n.type !== 'concept' && n.type !== 'ak-varga'
);
const akVargas = nodes.filter((n) => n.type === 'ak-varga');
  const grouped = {
    blogs: contentNodes.filter((n) => n.type === 'blog'),
    books: contentNodes.filter((n) => n.type === 'book'),
    questions: contentNodes.filter((n) => n.type === 'question'),
    projects: contentNodes.filter((n) => n.type === 'project'),
    thinkers: contentNodes.filter((n) => n.type === 'thinker'),
    schools: contentNodes.filter((n) => n.type === 'school'),
    labs: contentNodes.filter((n) => n.type === 'lab'),
    externalArticles: contentNodes.filter((n) => n.type === 'external-article'),
	akVargas
  };

  return {
    grouped
  };
};