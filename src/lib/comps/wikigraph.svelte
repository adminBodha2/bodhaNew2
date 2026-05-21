<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { WikiGraphEdge, WikiGraphNode } from '$lib/wiki-graph';

	type WikiNodeType = 'domain' | 'wiki' | 'thinker' | 'school' | 'question' | 'project' | 'blog' | 'book' | 'external-article' | 'lab' | 'concept';

	type GraphLink = {
		id: string;
		source: string | GraphPoint;
		target: string | GraphPoint;
		type: WikiGraphEdge['type'];
		meta: WikiGraphEdge['meta'];
	};

	type GraphPoint = WikiGraphNode & {
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
		nodes: WikiGraphNode[];
		edges: WikiGraphEdge[];
		maxNodes?: number;
		maxLinks?: number;
		layout?: 'overlay' | 'split';
	};

	let { nodes, edges, maxNodes = 300, maxLinks = 1400, layout = 'overlay' }: Props = $props();

	// ── Colours ────────────────────────────────────────────────────────────────
	const colorByType: Record<string, string> = {
		domain: '#D9480F', // dark slate — the 13 hub rings
		wiki: '#F59F00', // violet — synthesised knowledge pages
		thinker: '#15AABF', // purple
		school: '#22B8CF', // amber-brown
		question: '#7048E8', // terracotta
		project: '#F03E3E', // teal
		blog: '#2F9E44', // blue
		book: '#0CA678', // navy
		'external-article': '#66A80F', // slate
		lab: '#3BC9DB', // dark slate
		concept: '#374151'
	};

	const SEMANTIC_LABEL: Record<string, string> = {
		authored: 'authored',
		founded: 'founded',
		member_of: 'member of',
		influences: 'influences',
		investigates: 'investigates',
		draws_on: 'draws on',
		responds_to: 'responds to',
		addresses: 'addresses',
		path_step: 'pathway step',
		has_topic: 'topic',
		supports_project: 'supports project',
		domain_assignment: 'in domain'
	};

	const filterTypes: { label: string; value: WikiNodeType | 'all' }[] = [
		{ label: 'All', value: 'all' },
		{ label: 'Domains', value: 'domain' },
		{ label: 'Wiki', value: 'wiki' },
		{ label: 'Thinkers', value: 'thinker' },
		{ label: 'Schools', value: 'school' },
		{ label: 'Questions', value: 'question' },
		{ label: 'Research', value: 'project' },
		{ label: 'Essays', value: 'blog' },
		{ label: 'Books', value: 'book' }
	];

	let graphEl: HTMLDivElement;
	let graph: ForceGraphInstance | undefined;
	let resizeObserver: ResizeObserver | undefined;
	let hoveredId = $state<string | null>(null);
	let selectedId = $state<string | null>(null);
	let activeType = $state<WikiNodeType | 'all'>('all');
	let query = $state('');

	// ── Indexes ────────────────────────────────────────────────────────────────
	let indexes = $derived.by(() => {
		const degreeById = new Map<string, number>();
		const neighborsById = new Map<string, Set<string>>();

		for (const node of nodes) {
			degreeById.set(node.id, 0);
			neighborsById.set(node.id, new Set());
		}

		for (const edge of edges) {
			// domain_assignment edges inflate degree — weight them less
			const w = (edge.meta as Record<string, unknown>)?.semantic === 'domain_assignment' ? 0.5 : 1;
			degreeById.set(edge.from, (degreeById.get(edge.from) ?? 0) + w);
			degreeById.set(edge.to, (degreeById.get(edge.to) ?? 0) + w);
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
		return { degreeById, neighborsById, pointById };
	});

	let selectedNode = $derived(selectedId ? indexes.pointById.get(selectedId) : undefined);
	let visibleGraph = $derived(buildVisibleGraph(activeType, query, selectedId));

	// Edges attached to selected node, with their semantic labels
	let selectedEdges = $derived.by(() => {
		if (!selectedId) return [];
		return edges
			.filter((e) => (e.from === selectedId || e.to === selectedId) && (e.meta as Record<string, unknown>)?.semantic !== 'domain_assignment')
			.slice(0, 12)
			.map((e) => {
				const otherId = e.from === selectedId ? e.to : e.from;
				const direction = e.from === selectedId ? 'out' : 'in';
				const sem = ((e.meta as Record<string, unknown>)?.semantic as string) ?? '';
				const notes = ((e.meta as Record<string, unknown>)?.notes as string) ?? '';
				const otherNode = indexes.pointById.get(otherId);
				return {
					semantic: sem || e.type,
					label: SEMANTIC_LABEL[sem] ?? e.type,
					notes,
					otherId,
					otherTitle: otherNode?.title ?? otherId,
					otherType: otherNode?.type ?? '',
					direction
				};
			});
	});

	// Top hub nodes for the default panel
	let topNodes = $derived.by(() => {
		return Array.from(indexes.pointById.values())
			.filter((n) => ['domain', 'question', 'thinker', 'school'].includes(n.type))
			.sort((a, b) => b.degree - a.degree || a.title.localeCompare(b.title))
			.slice(0, 8);
	});

	// ── Visible graph ─────────────────────────────────────────────────────────
	function buildVisibleGraph(type: WikiNodeType | 'all', search: string, focusId: string | null) {
		const norm = search.trim().toLowerCase();
		const filtered = nodes.filter((node) => {
			if (type !== 'all' && node.type !== type) return false;
			if (!norm) return true;
			return `${node.title} ${node.description ?? ''} ${(node.tags ?? []).join(' ')}`.toLowerCase().includes(norm);
		});

		const seedIds = new Set(filtered.map((n) => n.id));
		const visibleIds = new Set(seedIds);

		if (focusId) {
			visibleIds.add(focusId);
			for (const nid of indexes.neighborsById.get(focusId) ?? []) visibleIds.add(nid);
		}
		if (norm && filtered.length <= 40) {
			for (const node of filtered) {
				for (const nid of indexes.neighborsById.get(node.id) ?? []) visibleIds.add(nid);
			}
		}

		const graphNodes = Array.from(visibleIds)
			.map((id) => indexes.pointById.get(id))
			.filter((n): n is GraphPoint => !!n)
			.slice(0, maxNodes);

		const graphNodeIds = new Set(graphNodes.map((n) => n.id));
		const graphLinks = edges
			.filter((e) => graphNodeIds.has(e.from) && graphNodeIds.has(e.to))
			.slice(0, maxLinks)
			.map((e) => ({
				id: e.id,
				source: e.from,
				target: e.to,
				type: e.type,
				meta: e.meta
			}));

		return { nodes: graphNodes, links: graphLinks as unknown as GraphLink[] };
	}

	// ── Rendering ─────────────────────────────────────────────────────────────
	function renderNode(node: GraphPoint, ctx: CanvasRenderingContext2D, scale: number) {
		const color = colorByType[node.type] ?? '#1971c2';
		const isDomain = (node.type as string) === 'domain';
		const isSelected = selectedId === node.id;
		const isHovered = hoveredId === node.id;
		const isNeighbor = selectedNode?.neighbors.has(node.id);

		const baseR = isDomain ? Math.max(12, Math.min(20, 12 + Math.sqrt(node.degree) * 0.5)) : Math.max(5, Math.min(16, 5 + Math.sqrt(node.degree + 1) * 1.1));
		const radius = baseR + (isSelected ? 5 : isHovered ? 3 : 0);

		// Glow ring
		ctx.beginPath();
		ctx.arc(node.x ?? 0, node.y ?? 0, radius + (isDomain ? 6 : 4), 0, 2 * Math.PI);
		ctx.fillStyle = isSelected ? 'rgba(211,99,58,0.18)' : isNeighbor ? 'rgba(25,113,194,0.11)' : isDomain ? 'rgba(15,23,42,0.07)' : 'rgba(255,255,255,0.6)';
		ctx.fill();

		// Main circle
		ctx.beginPath();
		ctx.arc(node.x ?? 0, node.y ?? 0, radius, 0, 2 * Math.PI);
		ctx.fillStyle = color;
		ctx.fill();

		// Border
		ctx.lineWidth = isSelected ? 2.5 : isDomain ? 2 : 1.2;
		ctx.strokeStyle = isSelected ? '#d3633a' : isDomain ? 'rgba(255,255,255,0.6)' : '#ffffff';
		ctx.stroke();

		// Inner ring for domain nodes
		if (isDomain && scale > 0.5) {
			ctx.beginPath();
			ctx.arc(node.x ?? 0, node.y ?? 0, radius * 0.55, 0, 2 * Math.PI);
			ctx.strokeStyle = 'rgba(255,255,255,0.3)';
			ctx.lineWidth = 1;
			ctx.stroke();
		}

		// Label
		const showLabel = isSelected || isHovered || isDomain || node.degree > 14 || scale > 1.8;
		if (showLabel) {
			const fontSize = isDomain ? Math.max(6, 13 / scale) : Math.max(4, 11 / scale);
			const label = node.title.length > 32 ? node.title.slice(0, 29) + '…' : node.title;
			ctx.font = `${isDomain ? '700' : '500'} ${fontSize}px Google Sans, Arial, sans-serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			// Shadow for legibility
			ctx.shadowColor = 'rgba(255,255,255,0.9)';
			ctx.shadowBlur = 3;
			ctx.fillStyle = '#0f172a';
			ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + radius + 3);
			ctx.shadowBlur = 0;
		}
	}

	function selectNode(node: GraphPoint) {
		selectedId = node.id;
		graph?.centerAt(node.x ?? 0, node.y ?? 0, 650);
		graph?.zoom(3.2, 650);
	}

	function resetView() {
		selectedId = null;
		query = '';
		activeType = 'all';
		window.setTimeout(() => graph?.zoomToFit(650, 72), 0);
	}

	function typeLabel(t: string) {
		return t.replaceAll('-', ' ');
	}

	function nodeHref(node: GraphPoint) {
		return ((node.meta as Record<string, unknown>)?.route as string | null) ?? null;
	}

	// ── Lifecycle ─────────────────────────────────────────────────────────────
	onMount(async () => {
		const ForceGraph = (await import('force-graph')).default;
		graph = new ForceGraph(graphEl) as unknown as ForceGraphInstance;

		graph
			.backgroundColor('rgba(0,0,0,0)')
			.nodeRelSize(4)
			.nodeVal((n) => {
				if ((n.type as string) === 'domain') return 18;
				return Math.max(1, Math.sqrt(n.degree + 1));
			})
			.nodeColor((n) => colorByType[n.type] ?? '#1971c2')
			.nodeLabel((n) => `${n.title}<br><span style="opacity:.7">${typeLabel(n.type)}</span>`)
			.nodeCanvasObject(renderNode)
			.nodePointerAreaPaint((node, color, ctx) => {
				const r = (node.type as string) === 'domain' ? 18 : Math.max(6, Math.min(16, 6 + Math.sqrt(node.degree + 1) * 1.2));
				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);
				ctx.fill();
			})
			.linkColor((link) => {
				const src = typeof link.source === 'object' ? link.source.id : link.source;
				const tgt = typeof link.target === 'object' ? link.target.id : link.target;
				const active = selectedId && (src === selectedId || tgt === selectedId);
				const sem = (link.meta as Record<string, unknown>)?.semantic as string;
				if (active) {
					if (sem === 'responds_to' || sem === 'addresses') return 'rgba(211,99,58,0.55)';
					if (sem === 'draws_on' || sem === 'influences') return 'rgba(91,33,182,0.55)';
					if (sem === 'investigates' || sem === 'member_of') return 'rgba(15,118,110,0.55)';
					return 'rgba(25,113,194,0.45)';
				}
				if (sem === 'domain_assignment') return 'rgba(15,23,42,0.06)';
				return 'rgba(25,113,194,0.1)';
			})
			.linkWidth((link) => {
				const src = typeof link.source === 'object' ? link.source.id : link.source;
				const tgt = typeof link.target === 'object' ? link.target.id : link.target;
				const active = selectedId && (src === selectedId || tgt === selectedId);
				const sem = (link.meta as Record<string, unknown>)?.semantic as string;
				if (active) return sem === 'domain_assignment' ? 0.8 : 1.8;
				return sem === 'domain_assignment' ? 0.3 : 0.5;
			})
			.linkCurvature(() => 0)
			.linkDirectionalParticles((link) => {
				const src = typeof link.source === 'object' ? link.source.id : link.source;
				const tgt = typeof link.target === 'object' ? link.target.id : link.target;
				const active = selectedId && (src === selectedId || tgt === selectedId);
				const sem = (link.meta as Record<string, unknown>)?.semantic as string;
				if (!active) return 0;
				if (sem === 'domain_assignment') return 0;
				return 2;
			})
			.linkDirectionalParticleWidth(2)
			.linkDirectionalParticleSpeed(0.004)
			.onNodeHover((n) => {
				hoveredId = n?.id ?? null;
			})
			.onNodeClick((n) => selectNode(n))
			.onBackgroundClick(() => {
				selectedId = null;
			})
			.showPointerCursor((item) => !!item)
			.d3AlphaDecay(0.028)
			.d3VelocityDecay(0.3);

		graph.d3Force('charge')?.strength?.(-120);
		graph.d3Force('link')?.distance?.(55);

		resizeObserver = new ResizeObserver(([entry]) => {
			if (!entry || !graph) return;
			graph.width(entry.contentRect.width);
			graph.height(entry.contentRect.height);
			graph.zoomToFit(450, 80);
		});
		resizeObserver.observe(graphEl);
		graph.graphData(visibleGraph);
		window.setTimeout(() => graph?.zoomToFit(900, 80), 300);
	});

	$effect(() => {
		const data = visibleGraph; // read before guard so Svelte always tracks this dep
		if (!graph) return;
		graph.graphData(data);
		graph.d3ReheatSimulation();
		window.setTimeout(() => graph?.zoomToFit(550, 72), 60);
	});

	onDestroy(() => {
		resizeObserver?.disconnect();
		graph?._destructor();
	});
</script>

<section class="wiki-graph" class:split={layout === 'split'} aria-label="Bodha knowledge graph">
	<div class="graph-shell">
		<div class="graph-toolbar row mcol ycenter">
			<label class="search-control">
				<input bind:value={query} type="search" placeholder="Search. Ex- dharma, Aurobindo, temple, karma…" />
			</label>
			<div class="filter-tray">
				{#each filterTypes as f}
					<button class="filter-btn" class:active={activeType === f.value} onclick={() => (activeType = f.value)}>
						{#if f.value !== 'all'}
							<i class="dot" style="--c: {colorByType[f.value] ?? '#999'}"></i>
						{/if}
						{f.label}
					</button>
				{/each}
			</div>
		</div>
		<div class="graph-stage">
			<div class="graph-canvas" bind:this={graphEl}></div>
		</div>
		<aside class="node-panel box">
			{#if selectedNode}
				<p class="txt-xs tt-u grey0 w500 pbot8">{typeLabel(selectedNode.type)}</p>
				<h3 class="txt-lg w600 pbot8">{selectedNode.title}</h3>
				{#if selectedNode.description}
					<p class="grey1 pbot8">{selectedNode.description}</p>
				{/if}
				{#if (selectedNode.meta as Record<string, unknown>)?.domain}
					<p class="txt-00 tt-u w500 theme">Domain: <span>{(selectedNode.meta as Record<string, unknown>).domain as string}</span></p>
				{/if}
				{#if (selectedNode.meta as Record<string, unknown>)?.lens}
					<p class="txt-00 tt-u w500 theme">Lens: <span>{(selectedNode.meta as Record<string, unknown>).lens as string}</span></p>
				{/if}
				{#if selectedEdges.length}
					<div class="edge-list box rgap16">
						{#each selectedEdges as edge}
							<div class="edge-item">
								<span class="txt-00 tt-u w500 grey0">{edge.label}</span>
								<button
									class="edge-target"
									onclick={() => {
										const n = indexes.pointById.get(edge.otherId);
										if (n) selectNode(n);
									}}>
									<i class="dot sm" style="--c: {colorByType[edge.otherType] ?? '#999'}"></i>
									<p class="txt-bs">{edge.otherTitle}</p>
								</button>
								{#if edge.notes}
									<p class="edge-notes">{edge.notes}</p>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
				<div class="panel-actions">
					{#if nodeHref(selectedNode)}
						<a href={nodeHref(selectedNode)} class="btn-primary">Open</a>
					{/if}
					<button class="btn-secondary" onclick={() => (selectedId = null)}>Clear</button>
					<button class="btn-secondary" onclick={resetView}>Reset</button>
				</div>
			{:else}
				<p class="txt-xs tt-u grey0 pbot8">Knowledge map</p>
				<p class="txt-lg w600 pbot8">Click any node to explore</p>
				<p class="grey1">13 domain hubs connect {nodes.length} nodes across thinkers, schools, questions, research, and the wiki.</p>
				<div class="top-list">
					{#each topNodes as node}
						<button class="top-node-btn" onclick={() => selectNode(node)}>
							<i class="dot" style="--c: {colorByType[node.type] ?? '#999'}"></i>
							<span>{node.title}</span>
							<small>{Math.round(node.degree)} links</small>
						</button>
					{/each}
				</div>
			{/if}
		</aside>
		<div class="graph-footer">
			<div class="legend">
				{#each filterTypes.filter((f) => f.value !== 'all') as f}
					<span class="legend-item">
						<i class="dot" style="--c: {colorByType[f.value] ?? '#999'}"></i>
						{f.label}
					</span>
				{/each}
			</div>
			<div class="footer-right">
				<span class="stat">{visibleGraph.nodes.length} nodes</span>
				<span class="stat">{visibleGraph.links.length} links</span>
				<button class="reset-btn" onclick={resetView}>Reset</button>
			</div>
		</div>
	</div>
</section>

<style lang="sass">

.wiki-graph
	display: grid

.graph-shell
	position: relative
	border: var(--border-main)
	border-radius: 8px
	overflow: hidden
	background: var(--color-stone-2)
	background-image: linear-gradient(135deg, rgba(255,255,255,0.97), rgba(248,247,244,0.9)), radial-gradient(circle at 14% 14%, rgba(211,99,58,0.1), transparent 26%), radial-gradient(circle at 86% 10%, rgba(25,113,194,0.1), transparent 28%), radial-gradient(circle at 50% 90%, rgba(91,33,182,0.06), transparent 32%)

.graph-toolbar
	gap: 14px
	padding: 16px
	border-bottom: var(--border-main)
	background: var(--color-back)
	backdrop-filter: blur(20px)

.search-control
	display: grid
	gap: 6px
	input
		width: 100%
		border: var(--border-main)
		border-radius: 6px
		background: var(--color-back)
		padding: 11px 13px
		color: var(--color-black)
		font: inherit
		font-size: 0.94rem
		outline: none
		&:focus
			border-color: var(--color-theme)
			box-shadow: 0 0 0 3px rgba(25,113,194,0.1)

.filter-tray
	display: flex
	flex-wrap: wrap
	gap: 5px
	.filter-btn
		display: inline-flex
		align-items: center
		gap: 5px
		border: var(--border-main)
		border-radius: 999px
		background: var(--color-back)
		padding: 6px 12px
		color: var(--color-grey-2)
		font-size: 0.78rem
		font-weight: 500
		cursor: pointer
		transition: all 0.15s
		&:hover
			border: var(--border-dark)
			color: var(--color-black)
		&.active
			border-color: var(--color-theme)
			background: var(--color-theme)
			color: #fff

.graph-stage
	position: relative
	min-height: 660px

.graph-canvas
	width: 100%
	height: 660px
	background-image: linear-gradient(rgba(7,7,7,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(7,7,7,0.025) 1px, transparent 1px)
	background-size: 36px 36px

.node-panel
	position: absolute
	right: 14px
	top: 78px
	z-index: 2
	width: min(340px, calc(100% - 28px))
	max-height: calc(100% - 92px)
	overflow-y: auto
	border: 1px solid rgba(7,7,7,0.09)
	border-radius: 8px
	background: rgba(255,255,255,0.9)
	backdrop-filter: blur(20px)
	box-shadow: 0 12px 28px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.03)
	padding: 18px
	@media (max-width: 720px)
		position: relative
		inset: auto
		width: auto
		max-height: none
		margin: 0 12px 12px

.wiki-graph.split
	.graph-shell
		display: grid
		grid-template-columns: minmax(0, 1fr) minmax(300px, 380px)
		grid-template-rows: auto minmax(0, 1fr) auto
		align-items: stretch
		height: clamp(620px, calc(100vh - 180px), 820px)
		background-image: none
	.graph-toolbar
		grid-column: 1
		grid-row: 1
	.graph-stage
		grid-column: 1
		grid-row: 2
		min-height: 0
		border-right: var(--border-main)
	.graph-canvas
		height: 100%
	.node-panel
		position: static
		grid-column: 2
		grid-row: 1 / 4
		z-index: 1
		width: auto
		min-height: 0
		max-height: 100%
		overflow-y: auto
		border: none
		border-radius: 0
		box-shadow: none
		background: var(--color-back)
		backdrop-filter: none
		padding: 32px
	.graph-footer
		grid-column: 1
		grid-row: 3
		border-right: var(--border-main)
	@media (max-width: 900px)
		.graph-shell
			display: block
			height: auto
		.graph-stage
			min-height: auto
			border-right: none
		.graph-canvas
			height: 540px
		.node-panel
			border-top: var(--border-main)
			min-height: 0
			max-height: min(520px, 70vh)
			padding: 18px
		.graph-footer
			border-right: none

.edge-list
	margin-top: 14px
	display: grid
	border-top: 1px solid rgba(7,7,7,0.07)
	padding-top: 12px

.edge-item
	display: grid
	gap: 3px

.edge-target
	display: inline-flex
	align-items: center
	gap: 6px
	border: none
	background: none
	padding: 0
	font-size: 0.88rem
	font-weight: 600
	color: var(--color-theme-dark)
	text-align: left
	cursor: pointer
	&:hover
		color: var(--color-theme)
		text-decoration: underline

.edge-notes
	font-size: 0.74rem
	color: var(--color-grey-2)
	line-height: 1.45
	margin: 2px 0 0 !important

.panel-actions
	display: flex
	flex-wrap: wrap
	gap: 7px
	margin-top: 16px

.btn-primary, .btn-secondary
	border-radius: 5px
	padding: 8px 12px
	font-size: 0.82rem
	font-weight: 700
	cursor: pointer
	text-decoration: none

.btn-primary
	border: 1px solid var(--color-primary)
	background: var(--color-primary)
	color: var(--color-back)

.btn-secondary
	border: 1px solid rgba(7,7,7,0.14)
	background: var(--color-back)
	color: var(--color-grey-2)
	&:hover
		color: var(--color-black)

.top-list
	display: grid
	gap: 6px
	margin-top: 14px

.top-node-btn
	display: flex
	align-items: center
	gap: 8px
	border: var(--border-main)
	border-radius: 4px
	background: var(--color-stone-1-2)
	padding: 8px 10px
	text-align: left
	cursor: pointer
	span
		flex: 1
		color: var(--color-black)
		font-size: 0.86rem
		line-height: 1.2
	small
		flex: 0 0 auto
		color: var(--color-grey-1)
		font-size: 0.7rem

.graph-footer
	display: flex
	flex-wrap: wrap
	align-items: center
	justify-content: space-between
	gap: 12px
	padding: 12px 16px
	border-top: 1px solid rgba(7,7,7,0.08)
	background: rgba(255,255,255,0.7)

.legend
	display: flex
	flex-wrap: wrap
	gap: 8px 14px

.legend-item
	display: inline-flex
	align-items: center
	gap: 5px
	color: var(--color-grey-2)
	font-size: 0.72rem
	font-weight: 650

.footer-right
	display: flex
	align-items: center
	gap: 10px

.stat
	color: var(--color-grey-1)
	font-size: 0.74rem

.reset-btn
	border: 1px solid rgba(7,7,7,0.12)
	border-radius: 5px
	background: var(--color-back)
	padding: 7px 11px
	color: var(--color-grey-2)
	font-size: 0.78rem
	font-weight: 700
	cursor: pointer
	&:hover
		color: var(--color-black)

.dot
	flex: 0 0 auto
	width: 9px
	height: 9px
	border-radius: 50%
	background: var(--c, #999)
	&.sm
		width: 7px
		height: 7px

@media (max-width: 720px)
	.graph-stage
		min-height: auto
	.graph-canvas
		height: 520px

</style>
