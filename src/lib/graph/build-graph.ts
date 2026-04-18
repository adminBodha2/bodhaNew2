import fs from "fs";

// ---------- TYPES ---------- //

type NodeType =
  | "text"
  | "article"
  | "thinker"
  | "school"
  | "question"
  | "concept";

type EdgeType =
  | "HAS_TAG"
  | "IN_TOPIC"
  | "IN_GROUP"
  | "RELATED_TO"
  | "REFERENCES"
  | "EXPLAINS"
  | "CRITIQUES"
  | "BUILDS_ON";

interface Node {
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

interface Edge {
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

// ---------- LOAD FILES ---------- //

const library = JSON.parse(
  fs.readFileSync("./library-items.json", "utf-8")
);

const content = JSON.parse(
  fs.readFileSync("./content-items.json", "utf-8")
);

const tagIndex = JSON.parse(
  fs.readFileSync("./tag-index.json", "utf-8")
);

// ---------- STORAGE ---------- //

const nodeMap = new Map<string, Node>();
const edges: Edge[] = [];
const edgeSet = new Set<string>();

const now = new Date().toISOString();

// ---------- HELPERS ---------- //

const makeId = (type: string, slug: string) => `${type}:${slug}`;

const normalizeTag = (tag: string) => tag.toLowerCase().trim();

const titleFromSlug = (slug: string) =>
  slug
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

// ---------- ADD NODE ---------- //

function addNode(node: Node) {
  if (!nodeMap.has(node.id)) {
    node.system = {
      createdAt: now,
      updatedAt: now
    };
    nodeMap.set(node.id, node);
  }
}

// ---------- ADD EDGE ---------- //

function addEdge(
  from: string,
  to: string,
  type: EdgeType,
  meta: Partial<Edge["meta"]> = {}
) {
  const id = `${from}--${type}--${to}`;
  if (!edgeSet.has(id)) {
    edgeSet.add(id);

    edges.push({
      id,
      from,
      to,
      type,
      meta: {
        source: "auto",
        ...meta
      }
    });
  }
}

// ---------- 1. LIBRARY ---------- //

library.forEach((item: any) => {
  const id = makeId("book", item.slug);

  addNode({
    id,
    type: "text",
    title: item.name,
    slug: item.slug,
    description: item.summary || "",
    meta: {
      author: item.author,
      route: item.linkfinal,
      source: "library"
    },
    classification: {
      tags: item.tags || [],
      topic: item.topic || null,
      wikigroup: item.wikigroup || null
    }
  });

  // TAGS → CONCEPTS
  (item.tags || []).forEach((tag: string) => {
    const t = normalizeTag(tag);
    const conceptId = makeId("concept", t);

    addNode({
      id: conceptId,
      type: "concept",
      title: titleFromSlug(t),
      slug: t,
      description: "",
      meta: { source: "derived" },
      classification: {}
    });

    addEdge(id, conceptId, "HAS_TAG");
  });

  // TOPIC
  if (item.topic) {
	const t = normalizeTag(item.topic);
	const topicId = makeId("concept", t);

    addNode({
      id: topicId,
      type: "concept",
      title: titleFromSlug(item.topic),
      slug: item.topic,
      description: "",
      meta: { source: "derived" },
      classification: {}
    });

    addEdge(id, topicId, "IN_TOPIC");
  }

  // WIKIGROUP
  if (item.wikigroup) {
    const wgSlug = normalizeTag(item.wikigroup);
    const wgId = makeId("concept", wgSlug);

    addNode({
      id: wgId,
      type: "concept",
      title: item.wikigroup,
      slug: wgSlug,
      description: "",
      meta: { source: "derived" },
      classification: {}
    });

    addEdge(id, wgId, "IN_GROUP");
  }
});

// ---------- 2. CONTENT ---------- //

content.forEach((item: any) => {
  let type: NodeType;

  if (item.type === "thinker") type = "thinker";
  else if (item.type === "school") type = "school";
  else if (item.type === "question") type = "question";
  else type = "article";

  const id = makeId(type, item.filename);

  addNode({
    id,
    type,
    title: item.title,
    slug: item.filename,
    description: item.description || "",
    meta: {
      image: item.image,
      route: item.route,
      source: "content"
    },
    classification: {
      tags: item.tags || []
    }
  });

  // TAGS
  (item.tags || []).forEach((tag: string) => {
    const t = normalizeTag(tag);
    const conceptId = makeId("concept", t);

    addNode({
      id: conceptId,
      type: "concept",
      title: titleFromSlug(t),
      slug: t,
      description: "",
      meta: { source: "derived" },
      classification: {}
    });

    addEdge(id, conceptId, "HAS_TAG");
  });
});

// ---------- 3. TAG INDEX ---------- //

Object.entries(tagIndex).forEach(([tag, items]: any) => {
  const conceptId = makeId("concept", normalizeTag(tag));
  const t = normalizeTag(tag);
  addNode({
    id: conceptId,
    type: "concept",
    title: titleFromSlug(t),
    slug: t,
    description: "",
    meta: { source: "tag-index" },
    classification: {}
  });

  items.forEach((entry: any) => {
    let targetId: string;

    if (entry.kind === "book") {
      targetId = makeId("book", entry.slug);
    } else {
      const type =
        entry.kind === "thinker"
          ? "thinker"
          : entry.kind === "school"
          ? "school"
          : entry.kind === "big question"
          ? "question"
          : "article";

      targetId = makeId(type, entry.filename);
    }

    if (nodeMap.has(targetId)) {
      addEdge(conceptId, targetId, "RELATED_TO", {
        source: "tag-index"
      });
    }
  });
});

// ---------- OUTPUT ---------- //

const finalNodes = Array.from(nodeMap.values());

fs.writeFileSync("./nodes.json", JSON.stringify(finalNodes, null, 2));
fs.writeFileSync("./edges.json", JSON.stringify(edges, null, 2));

console.log(`Done.
Nodes: ${finalNodes.length}
Edges: ${edges.length}`);