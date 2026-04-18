export type NodeType =
  | "text"
  | "article"
  | "thinker"
  | "school"
  | "question"
  | "concept";

export type EdgeType =
  | "HAS_TAG"
  | "IN_TOPIC"
  | "RELATED_TO"
  | "REFERENCES"
  | "EXPLAINS"
  | "CRITIQUES"
  | "BUILDS_ON";

export interface Node {
  id: string;
  type: NodeType;
  title: string;
  slug: string;
  description: string;

  meta: {
    author?: string;
    year?: number;
    image?: string;
    route?: string;
    source: "library" | "content" | "derived" | "tag-index";
	devanagari?: string;
	wordCount?: number;
	iast?:string;
  };

  classification: {
    tags?: string[];
    topic?: string | null;
    wikigroup?: string | null;
  };

  system?: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface Edge {
  id: string;
  from: string;
  to: string;
  type: EdgeType;

  meta: {
    source: "auto" | "tag-index" | "manual";
    weight?: number;
    confidence?: number;
  };
}