<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { GraphEdge, GraphNode, NodeType } from '$lib/noder/graph';

	type GraphLink = {
		id: string;
		source: string | GraphPoint;
		target: string | GraphPoint;
		type: GraphEdge['type'];
		meta: GraphEdge['meta'];
	};

	type GraphPoint = GraphNode & {
		degree: number;
		neighbors: Set<string>;
		x?: number;
		y?: number;
		vx?: number;
		vy?: number;
		fx?: number | null;
		fy?: number | null;
	};

	type ForceGraphInstance = {
		graphData: (data?: { nodes: GraphPoint[]; links: GraphLink[] }) => ForceGraphInstance | { nodes: GraphPoint[]; links: GraphLink[] };
		width: (value: number) => ForceGraphInstance;
		height: (value: number) => ForceGraphInstance;
		backgroundColor: (value: string) => ForceGraphInstance;
		nodeRelSize: (value: number) => ForceGraphInstance;
		nodeVal: (value: (node: GraphPoint) => number) => ForceGraphInstance;
		nodeColor: (value: (node: GraphPoint) => string) => ForceGraphInstance;
		nodeLabel: (value: (node: GraphPoint) => string) => ForceGraphInstance;
		nodeCanvasObject: (value: (node: GraphPoint, context: CanvasRenderingContext2D, globalScale: number) => void) => ForceGraphInstance;
		nodePointerAreaPaint: (value: (node: GraphPoint, color: string, context: CanvasRenderingContext2D) => void) => ForceGraphInstance;
		linkColor: (value: (link: GraphLink) => string) => ForceGraphInstance;
		linkWidth: (value: (link: GraphLink) => number) => ForceGraphInstance;
		linkDirectionalParticles: (value: (link: GraphLink) => number) => ForceGraphInstance;
		linkDirectionalParticleWidth: (value: number) => ForceGraphInstance;
		linkDirectionalParticleSpeed: (value: number) => ForceGraphInstance;
		linkCurvature: (value: (link: GraphLink) => number) => ForceGraphInstance;
		onNodeHover: (value: (node: GraphPoint | null) => void) => ForceGraphInstance;
		onNodeClick: (value: (node: GraphPoint) => void) => ForceGraphInstance;
		onBackgroundClick: (value: () => void) => ForceGraphInstance;
		showPointerCursor: (value: (node?: GraphPoint | GraphLink) => boolean) => ForceGraphInstance;
		d3Force: (name: string) => { strength?: (value: number) => unknown; distance?: (value: number) => unknown } | undefined;
		d3AlphaDecay: (value: number) => ForceGraphInstance;
		d3VelocityDecay: (value: number) => ForceGraphInstance;
		d3ReheatSimulation: () => ForceGraphInstance;
		zoomToFit: (durationMs?: number, padding?: number) => ForceGraphInstance;
		centerAt: (x?: number, y?: number, durationMs?: number) => ForceGraphInstance;
		zoom: (scale?: number, durationMs?: number) => ForceGraphInstance | number;
		_destructor: () => void;
	};

	type Props = {
		nodes: GraphNode[];
		edges: GraphEdge[];
	};

	let { nodes, edges }: Props = $props();

	const colorByType: Record<NodeType, string> = {
		blog: '#1971c2',
		question: '#d3633a',
		project: '#0f766e',
		thinker: '#7c3aed',
		school: '#b45309',
		lab: '#334155',
		'external-article': '#64748b',
		book: '#0f4c81',
		concept: '#111827',
		'ak-varga': '#8a3ffc',
		'ak-word': '#8a3ffc'
	};

	const filterTypes: { label: string; value: NodeType | 'all' }[] = [
		{ label: 'All', value: 'all' },
		{ label: 'Concepts', value: 'concept' },
		{ label: 'Essays', value: 'blog' },
		{ label: 'Questions', value: 'question' },
		{ label: 'Research', value: 'project' },
		{ label: 'Thinkers', value: 'thinker' },
		{ label: 'Schools', value: 'school' },
		{ label: 'Books', value: 'book' }
	];
	const legendFilters = filterTypes.filter(
		(filter): filter is { label: string; value: NodeType } => filter.value !== 'all'
	);

	let graphEl: HTMLDivElement;
	let graph: ForceGraphInstance | undefined;
	let resizeObserver: ResizeObserver | undefined;
	let hoveredId = $state<string | null>(null);
	let selectedId = $state<string | null>(null);
	let activeType = $state<NodeType | 'all'>('all');
	let query = $state('');

	let indexes = $derived.by(() => {
		const degreeById = new Map<string, number>();
		const neighborsById = new Map<string, Set<string>>();

		for (const node of nodes) {
			degreeById.set(node.id, 0);
			neighborsById.set(node.id, new Set());
		}

		for (const edge of edges) {
			degreeById.set(edge.from, (degreeById.get(edge.from) ?? 0) + 1);
			degreeById.set(edge.to, (degreeById.get(edge.to) ?? 0) + 1);
			neighborsById.get(edge.from)?.add(edge.to);
			neighborsById.get(edge.to)?.add(edge.from);
		}

		const pointById = new Map(
			nodes.map((node) => [
				node.id,
				{
					...node,
					degree: degreeById.get(node.id) ?? 0,
					neighbors: neighborsById.get(node.id) ?? new Set<string>()
				}
			])
		);

		return {
			degreeById,
			neighborsById,
			pointById
		};
	});

	let selectedNode = $derived(selectedId ? indexes.pointById.get(selectedId) : undefined);
	let visibleGraph = $derived(buildVisibleGraph(activeType, query, selectedId));
	let visibleCounts = $derived({
		nodes: visibleGraph.nodes.length,
		links: visibleGraph.links.length
	});
	let topNodes = $derived(
		Array.from(indexes.pointById.values())
			.filter((node) => node.type !== 'concept')
			.sort((a, b) => b.degree - a.degree)
			.slice(0, 5)
	);

	function buildVisibleGraph(type: NodeType | 'all', search: string, focusId: string | null) {
		const normalizedSearch = search.trim().toLowerCase();
		const filtered = nodes.filter((node) => {
			if (type !== 'all' && node.type !== type) return false;
			if (!normalizedSearch) return true;

			return `${node.title} ${node.description} ${node.tags?.join(' ') ?? ''}`
				.toLowerCase()
				.includes(normalizedSearch);
		});
		const seedIds = new Set(filtered.map((node) => node.id));
		const visibleIds = new Set(seedIds);

		if (focusId) {
			visibleIds.add(focusId);
			for (const neighborId of indexes.neighborsById.get(focusId) ?? []) {
				visibleIds.add(neighborId);
			}
		}

		if (normalizedSearch && filtered.length <= 36) {
			for (const node of filtered) {
				for (const neighborId of indexes.neighborsById.get(node.id) ?? []) {
					visibleIds.add(neighborId);
				}
			}
		}

		const graphNodes = Array.from(visibleIds)
			.map((id) => indexes.pointById.get(id))
			.filter((node): node is GraphPoint => !!node)
			.slice(0, 260);
		const graphNodeIds = new Set(graphNodes.map((node) => node.id));
		const graphLinks = edges
			.filter((edge) => graphNodeIds.has(edge.from) && graphNodeIds.has(edge.to))
			.slice(0, 520)
			.map((edge) => ({
				id: edge.id,
				source: edge.from,
				target: edge.to,
				type: edge.type,
				meta: edge.meta
			}));

		return {
			nodes: graphNodes,
			links: graphLinks
		};
	}

	function nodeHref(node: GraphNode) {
		return node.meta?.route || `/explorer/${encodeURIComponent(node.id)}`;
	}

	function typeLabel(type: string) {
		return type.replaceAll('-', ' ');
	}

	function selectNode(node: GraphPoint) {
		selectedId = node.id;
		graph?.centerAt(node.x ?? 0, node.y ?? 0, 650);
		graph?.zoom(3.1, 650);
	}

	function resetView() {
		selectedId = null;
		query = '';
		activeType = 'all';
		window.setTimeout(() => graph?.zoomToFit(650, 72), 0);
	}

	function renderNode(node: GraphPoint, context: CanvasRenderingContext2D, globalScale: number) {
		const color = colorByType[node.type] ?? '#1971c2';
		const isSelected = selectedId === node.id;
		const isHovered = hoveredId === node.id;
		const isNeighbor = selectedNode?.neighbors.has(node.id);
		const radius = Math.max(4.5, Math.min(15, 4 + Math.sqrt(node.degree + 1) * 1.15));
		const label = node.title.length > 34 ? `${node.title.slice(0, 31)}...` : node.title;

		context.beginPath();
		context.arc(node.x ?? 0, node.y ?? 0, radius + (isSelected ? 5 : isHovered ? 3 : 0), 0, 2 * Math.PI);
		context.fillStyle = isSelected ? 'rgba(211, 99, 58, 0.18)' : isNeighbor ? 'rgba(25, 113, 194, 0.13)' : 'rgba(255, 255, 255, 0.72)';
		context.fill();

		context.beginPath();
		context.arc(node.x ?? 0, node.y ?? 0, radius, 0, 2 * Math.PI);
		context.fillStyle = color;
		context.fill();
		context.lineWidth = isSelected ? 2.4 : 1.2;
		context.strokeStyle = isSelected ? '#d3633a' : '#ffffff';
		context.stroke();

		if (isSelected || isHovered || node.degree > 12 || globalScale > 1.65) {
			const fontSize = Math.max(4, 12 / globalScale);
			context.font = `600 ${fontSize}px Google Sans, Arial, sans-serif`;
			context.textAlign = 'center';
			context.textBaseline = 'top';
			context.fillStyle = '#111827';
			context.fillText(label, node.x ?? 0, (node.y ?? 0) + radius + 3);
		}
	}

	onMount(async () => {
		const ForceGraph = (await import('force-graph')).default;

		graph = new ForceGraph(graphEl) as unknown as ForceGraphInstance;
		graph
			.backgroundColor('rgba(0,0,0,0)')
			.nodeRelSize(4)
			.nodeVal((node) => Math.max(1, Math.sqrt(node.degree + 1)))
			.nodeColor((node) => colorByType[node.type] ?? '#1971c2')
			.nodeLabel((node) => `${node.title}<br><span>${typeLabel(node.type)}</span>`)
			.nodeCanvasObject(renderNode)
			.nodePointerAreaPaint((node, color, context) => {
				const radius = Math.max(8, Math.min(18, 7 + Math.sqrt(node.degree + 1) * 1.3));
				context.fillStyle = color;
				context.beginPath();
				context.arc(node.x ?? 0, node.y ?? 0, radius, 0, 2 * Math.PI);
				context.fill();
			})
			.linkColor((link) => {
				const source = typeof link.source === 'object' ? link.source.id : link.source;
				const target = typeof link.target === 'object' ? link.target.id : link.target;
				const isActive = selectedId && (source === selectedId || target === selectedId);
				return isActive ? 'rgba(211, 99, 58, 0.46)' : 'rgba(25, 113, 194, 0.12)';
			})
			.linkWidth((link) => {
				const source = typeof link.source === 'object' ? link.source.id : link.source;
				const target = typeof link.target === 'object' ? link.target.id : link.target;
				return selectedId && (source === selectedId || target === selectedId) ? 1.6 : 0.5;
			})
			.linkCurvature((link) => (link.type === 'NARROWER_THAN' ? 0.08 : 0))
			.linkDirectionalParticles((link) => {
				const source = typeof link.source === 'object' ? link.source.id : link.source;
				const target = typeof link.target === 'object' ? link.target.id : link.target;
				return selectedId && (source === selectedId || target === selectedId) ? 2 : 0;
			})
			.linkDirectionalParticleWidth(2)
			.linkDirectionalParticleSpeed(0.004)
			.onNodeHover((node) => {
				hoveredId = node?.id ?? null;
			})
			.onNodeClick((node) => selectNode(node))
			.onBackgroundClick(() => {
				selectedId = null;
			})
			.showPointerCursor((item) => !!item)
			.d3AlphaDecay(0.035)
			.d3VelocityDecay(0.28);

		graph.d3Force('charge')?.strength?.(-90);
		graph.d3Force('link')?.distance?.(42);

		resizeObserver = new ResizeObserver(([entry]) => {
			if (!entry || !graph) return;
			graph.width(entry.contentRect.width);
			graph.height(entry.contentRect.height);
			graph.zoomToFit(450, 72);
		});
		resizeObserver.observe(graphEl);
		graph.graphData(visibleGraph);
		window.setTimeout(() => graph?.zoomToFit(800, 72), 250);
	});

	$effect(() => {
		if (!graph) return;
		graph.graphData(visibleGraph);
		graph.d3ReheatSimulation();
		window.setTimeout(() => graph?.zoomToFit(550, 72), 60);
	});

	onDestroy(() => {
		resizeObserver?.disconnect();
		graph?._destructor();
	});
</script>

<section class="knowledge-map" aria-label="Interactive knowledge graph">
	<div class="map-copy">
		<div>
			<h2 class="source-serif">Bodha Knowledge Map</h2>
			<p>
				Trace how essays, questions, thinkers, schools, books, and concepts pull on each other.
				Select a node to follow its nearby constellation.
			</p>
		</div>
		<div class="map-stats" aria-label="Graph statistics">
			<span>{nodes.length} nodes</span>
			<span>{edges.length} links</span>
			<span>{visibleCounts.nodes} in view</span>
		</div>
	</div>

	<div class="graph-shell">
		<div class="graph-toolbar">
			<label class="search-control">
				<span>Search</span>
				<input bind:value={query} type="search" placeholder="Try dharma, temple, history..." />
			</label>
			<div class="type-filters" aria-label="Filter graph by type">
				{#each filterTypes as filter}
					<button class:active={activeType === filter.value} onclick={() => (activeType = filter.value)}>
						{filter.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="graph-stage">
			<div class="graph-canvas" bind:this={graphEl}></div>
			<aside class="node-panel">
				{#if selectedNode}
					<p class="node-type">{typeLabel(selectedNode.type)}</p>
					<h3>{selectedNode.title}</h3>
					<p>{selectedNode.description}</p>
					{#if selectedNode.tags?.length}
						<div class="tag-row">
							{#each selectedNode.tags.slice(0, 5) as tag}
								<a href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
							{/each}
						</div>
					{/if}
					<div class="panel-actions">
						<a href={nodeHref(selectedNode)}>Open</a>
						<button onclick={() => (selectedId = null)}>Clear</button>
					</div>
				{:else}
					<p class="node-type">start here</p>
					<h3>Choose a node</h3>
					<p>Click any point in the map to reveal its title, tags, and immediate relations.</p>
					<div class="top-list">
						{#each topNodes as node}
							<button onclick={() => selectNode(node)}>
								<span>{node.title}</span>
								<small>{node.degree} links</small>
							</button>
						{/each}
					</div>
				{/if}
			</aside>
		</div>

		<div class="graph-footer">
			<div class="legend">
				{#each legendFilters as filter}
					<span><i style={`--node-color: ${colorByType[filter.value]}`}></i>{filter.label}</span>
				{/each}
			</div>
			<button class="reset-btn" onclick={resetView}>Reset map</button>
		</div>
	</div>
</section>

<style lang="sass">
	.knowledge-map
		display: grid
		gap: 18px
		margin-bottom: 32px

	.map-copy
		display: grid
		gap: 16px
		align-items: end
		h2
			margin: 0
			font-size: clamp(2.1rem, 5vw, 4.4rem)
			line-height: 0.95
			letter-spacing: 0
		p
			max-width: 720px
			margin: 12px 0 0
			color: var(--color-grey-4)
			font-size: 1.02rem
			line-height: 1.55
		@media screen and (min-width: 900px)
			grid-template-columns: 1fr auto

	.map-stats
		display: flex
		flex-wrap: wrap
		gap: 8px
		span
			border: var(--border-dark)
			background: var(--color-white)
			border-radius: 999px
			padding: 8px 12px
			color: var(--color-grey-4)
			font-size: 0.8rem
			text-transform: uppercase
			letter-spacing: 0.06em

	.graph-shell
		position: relative
		overflow: hidden
		border: 1px solid rgba(7, 7, 7, 0.1)
		border-radius: 8px
		background-color: var(--color-stone-3)
		background-image: linear-gradient(135deg, rgba(255,255,255,0.96), rgba(248,247,244,0.86)), radial-gradient(circle at 18% 18%, rgba(211,99,58,0.14), transparent 28%), radial-gradient(circle at 82% 12%, rgba(25,113,194,0.14), transparent 30%)
		box-shadow: var(--shadow3)

	.graph-toolbar
		display: grid
		gap: 12px
		padding: 14px
		border-bottom: 1px solid rgba(7,7,7,0.08)
		background: rgba(255, 255, 255, 0.7)
		backdrop-filter: blur(16px)
		@media screen and (min-width: 900px)
			grid-template-columns: minmax(250px, 360px) 1fr
			align-items: end

	.search-control
		display: grid
		gap: 6px
		span
			color: var(--color-grey-4)
			font-size: 0.76rem
			font-weight: 700
			text-transform: uppercase
			letter-spacing: 0.08em
		input
			width: 100%
			border: 1px solid rgba(7,7,7,0.12)
			border-radius: 6px
			background: var(--color-white)
			padding: 12px 13px
			color: var(--color-black)
			font: inherit
			font-size: 0.96rem
			outline: none
			&:focus
				border-color: var(--color-theme)
				box-shadow: 0 0 0 3px rgba(25,113,194,0.12)

	.type-filters
		display: flex
		flex-wrap: wrap
		gap: 7px
		button
			border: 1px solid rgba(7,7,7,0.1)
			border-radius: 999px
			background: rgba(255,255,255,0.78)
			padding: 9px 12px
			color: var(--color-grey-4)
			font-size: 0.82rem
			font-weight: 650
			cursor: pointer
			transition: var(--transition3)
			&:hover
				border-color: rgba(25,113,194,0.36)
				color: var(--color-theme-2)
			&.active
				background: var(--color-black)
				border-color: var(--color-black)
				color: var(--color-white)

	.graph-stage
		position: relative
		min-height: 620px

	.graph-canvas
		width: 100%
		height: 620px
		background-image: linear-gradient(rgba(7,7,7,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(7,7,7,0.035) 1px, transparent 1px)
		background-size: 34px 34px

	.node-panel
		position: absolute
		right: 14px
		top: 14px
		z-index: 2
		width: min(330px, calc(100% - 28px))
		max-height: calc(100% - 28px)
		overflow: auto
		border: 1px solid rgba(7,7,7,0.1)
		border-radius: 8px
		background: rgba(255,255,255,0.88)
		box-shadow: var(--shadow9)
		backdrop-filter: blur(18px)
		padding: 18px
		h3
			margin: 0
			font-size: 1.28rem
			line-height: 1.12
			letter-spacing: 0
		p
			margin: 10px 0 0
			color: var(--color-grey-4)
			font-size: 0.92rem
			line-height: 1.45
		@media screen and (max-width: 720px)
			position: relative
			inset: auto
			width: auto
			max-height: none
			margin: 0 12px 12px

	.node-type
		margin: 0 0 8px !important
		color: var(--color-anveshi) !important
		font-size: 0.72rem !important
		font-weight: 800
		text-transform: uppercase
		letter-spacing: 0.12em

	.tag-row
		display: flex
		flex-wrap: wrap
		gap: 6px
		margin-top: 14px
		a
			border: 1px solid rgba(25,113,194,0.2)
			border-radius: 999px
			background: var(--color-theme-6)
			padding: 5px 8px
			color: var(--color-theme-2)
			font-size: 0.72rem
			font-weight: 700
			text-decoration: none
			text-transform: uppercase

	.panel-actions
		display: flex
		gap: 8px
		margin-top: 16px
		a,
		button
			border: 1px solid var(--color-black)
			border-radius: 6px
			background: var(--color-black)
			color: var(--color-white)
			padding: 9px 12px
			font-size: 0.84rem
			font-weight: 750
			text-decoration: none
			cursor: pointer
		button
			background: var(--color-white)
			color: var(--color-black)

	.top-list
		display: grid
		gap: 7px
		margin-top: 14px
		button
			display: flex
			align-items: center
			justify-content: space-between
			gap: 12px
			border: 1px solid rgba(7,7,7,0.09)
			border-radius: 6px
			background: rgba(249,248,246,0.8)
			padding: 9px
			text-align: left
			cursor: pointer
			span
				color: var(--color-black)
				font-size: 0.83rem
				font-weight: 650
				line-height: 1.2
			small
				flex: 0 0 auto
				color: var(--color-grey-3)
				font-size: 0.72rem

	.graph-footer
		display: grid
		gap: 12px
		padding: 13px 14px
		border-top: 1px solid rgba(7,7,7,0.08)
		background: rgba(255,255,255,0.74)
		@media screen and (min-width: 900px)
			grid-template-columns: 1fr auto
			align-items: center

	.legend
		display: flex
		flex-wrap: wrap
		gap: 10px 14px
		span
			display: inline-flex
			align-items: center
			gap: 6px
			color: var(--color-grey-4)
			font-size: 0.76rem
			font-weight: 650
		i
			width: 9px
			height: 9px
			border-radius: 50%
			background: var(--node-color)
			box-shadow: 0 0 0 3px rgba(7,7,7,0.04)

	.reset-btn
		width: max-content
		border: 1px solid rgba(7,7,7,0.13)
		border-radius: 6px
		background: var(--color-white)
		padding: 9px 12px
		color: var(--color-black)
		font-size: 0.82rem
		font-weight: 750
		cursor: pointer

	@media screen and (max-width: 720px)
		.graph-stage
			min-height: auto
		.graph-canvas
			height: 520px
</style>
