export type NodeType =
  | 'blog'
  | 'question'
  | 'project'
  | 'thinker'
  | 'school'
  | 'lab'
  | 'external-article'
  | 'book'
  | 'concept'
  | 'ak-varga'
  | 'ak-word';

export type EdgeType =
  | 'HAS_TAG'
  | 'RELATED_TO'
  | 'REFERENCES'
  | 'EXPLAINS'
  | 'CRITIQUES'
  | 'BUILDS_ON'
  | 'BROADER_THAN'
  | 'NARROWER_THAN';

export interface GraphNode {
  id: string;
  type: NodeType;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  meta: {
    author?: string[];
    route?: string;
    source: 'item' | 'tag' | 'derived';
  };
  system?: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  type: EdgeType;
  meta: {
    source: 'auto' | 'manual';
    weight?: number;
  };
}