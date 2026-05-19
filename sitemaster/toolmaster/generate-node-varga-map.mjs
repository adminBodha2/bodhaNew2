import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const inputPath = process.argv[2] || '/Users/amrit/Downloads/nodes.json';
const outputPath = process.argv[3] || path.join(repoRoot, 'src/lib/ontology/node-varga-map.json');
const vargaPath = path.join(repoRoot, 'src/lib/noder/amarakosha-varga-map.json');

const nodes = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const vargas = JSON.parse(fs.readFileSync(vargaPath, 'utf8'));
const vargaBySlug = new Map(vargas.map((varga) => [varga.slug, varga]));

const rules = {
	'ak-svarga': [
		'cosmology', 'afterlife', 'heaven', 'hell', 'celestial', 'deva', 'devi', 'devata', 'divine',
		'navaratri', 'durga', 'rama', 'krishna', 'vishnu', 'shiva', 'avatar', 'avatara', 'sacred'
	],
	'ak-brahma': [
		'dharma', 'brahman', 'ritual', 'agnihotra', 'brahma-sutra', 'veda', 'vedic', 'upanishad',
		'shastra', 'scriptural', 'sacred', 'yajna', 'puja', 'priest', 'temple', 'tradition',
		'sanatana', 'religious-instruction', 'dharmashastra', 'mimamsa'
	],
	'ak-dhi': [
		'consciousness', 'epistemology', 'aesthetics', 'rasa', 'aesthetic', 'knowledge', 'mind',
		'intellect', 'cognition', 'philosophy', 'darshana', 'logic', 'nyaya', 'pramana',
		'meditation', 'yoga', 'sankhya', 'vedanta', 'advaita', 'non-dualism', 'tattva'
	],
	'ak-kala': [
		'history', 'chronology', 'ancient-india', 'ancient-indian-history', 'itihasa',
		'historiography', 'historical', 'dynasty', 'dynastic', 'lineage', 'genealogy',
		'purana', 'mahabharata', 'ramayana', 'past', 'time', 'periodization', 'civilizational-thought'
	],
	'ak-bhumi': [
		'ecology', 'earth', 'land', 'soil', 'geography', 'archaeobotany', 'environment',
		'environmentalism', 'sustainability', 'river', 'sarasvati', 'ganga', 'landscape',
		'sacred-geography', 'geology', 'settlement', 'agriculture'
	],
	'ak-manushya': [
		'civilizational-consciousness', 'culture', 'human-evolution', 'human', 'society',
		'community', 'family', 'identity', 'being-indian', 'social', 'personhood',
		'transmission', 'education', 'decolonization', 'svayambodha', 'civilization'
	],
	'ak-kshatriya': [
		'war', 'warfare', 'battle', 'state', 'polity', 'politics', 'political', 'king',
		'kingship', 'governance', 'republic', 'constitution', 'strategy', 'defence',
		'defense', 'kshatriya', 'rashtra', 'power', 'conflict', 'violence', 'military'
	],
	'ak-vaishya': [
		'trade', 'commerce', 'economy', 'economic', 'agriculture', 'cattle', 'cow',
		'pastoral', 'livestock', 'market', 'production', 'wealth', 'resource', 'grain',
		'subsistence'
	],
	'ak-shudra': [
		'craft', 'artisan', 'service', 'labor', 'labour', 'skill', 'workshop', 'architecture',
		'building', 'material-arts', 'technology', 'design', 'making', 'production',
		'metal', 'textile'
	],
	'ak-natya': [
		'natya', 'performance', 'drama', 'dance', 'music', 'art', 'artist', 'aesthetic',
		'aesthetics', 'rasa', 'theatre', 'poetry', 'literature', 'narrative', 'story',
		'meaning-making'
	],
	'ak-shabdadi': [
		'language', 'linguistics', 'sanskrit', 'grammar', 'speech', 'sound', 'word',
		'semantic', 'semantics', 'philology', 'bhartrhari', 'sphota', 'translation',
		'vocabulary', 'etymology', 'comparative-linguistics'
	],
	'ak-vanaushadhi': [
		'forest', 'plant', 'plants', 'herb', 'medicine', 'ayurveda', 'botany',
		'archaeobotany', 'flora', 'tree', 'vegetation', 'ecology', 'environment',
		'vanaushadhi'
	],
	'ak-simhadi': [
		'animal', 'animals', 'cattle', 'horse', 'cow', 'bird', 'fauna', 'zooarchaeology',
		'domestication', 'elephant', 'simha', 'lion', 'ecology', 'genomics'
	],
	'ak-vari': [
		'water', 'river', 'ocean', 'sea', 'rain', 'aquatic', 'hydrology', 'sarasvati',
		'ganga', 'waters', 'flood', 'monsoon'
	],
	'ak-shaila': [
		'mountain', 'mountains', 'rock', 'stone', 'hill', 'himalaya', 'geology',
		'elevated', 'shaila'
	],
	'ak-pura': [
		'city', 'urban', 'settlement', 'architecture', 'temple', 'built', 'house',
		'fort', 'pura', 'nagari', 'institution', 'institutions', 'management',
		'temple-management'
	],
	'ak-vyoma': [
		'sky', 'astronomy', 'archaeoastronomy', 'celestial', 'sun', 'moon', 'star',
		'atmosphere', 'heaven', 'vyoma'
	],
	'ak-dig': [
		'direction', 'space', 'spatial', 'geography', 'route', 'routes', 'migration',
		'journey', 'pilgrimage', 'map', 'orientation', 'region', 'north-east', 'northeast'
	],
	'ak-naraka': [
		'naraka', 'hell', 'punishment', 'karma', 'sin', 'suffering', 'destruction',
		'threat', 'terror', 'violence', 'adharma'
	],
	'ak-patalabhogi': [
		'patala', 'underworld', 'naga', 'serpent', 'subterranean', 'cosmology',
		'nether', 'chthonic'
	],
	'ak-nanaartha': [
		'polysemy', 'meaning', 'multiple-meaning', 'categories', 'category',
		'classification', 'lexicon', 'semantic', 'interpretation', 'hermeneutics'
	],
	'ak-sankirana': [
		'mixed', 'miscellaneous', 'comparative', 'cross-cultural', 'interdisciplinary',
		'synthesis', 'overview', 'update', 'review', 'report', 'methodology'
	],
	'ak-avyaya': [
		'indeclinable', 'particle', 'grammar', 'syntax', 'linguistics', 'language',
		'sanskrit', 'vyakarana', 'avyaya'
	],
	'ak-visheshyanighna': [
		'adjective', 'qualifier', 'attribute', 'quality', 'guna', 'description',
		'category', 'classification', 'comparative-darshanas', 'vaisheshika'
	]
};

const typeDefaults = {
	question: ['ak-manushya'],
	project: ['ak-manushya'],
	thinker: ['ak-dhi'],
	school: ['ak-manushya'],
	lab: ['ak-sankirana']
};

function normalize(value) {
	return String(value || '')
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/ṣ/g, 's')
		.replace(/ś/g, 's')
		.replace(/ṇ/g, 'n')
		.replace(/ā/g, 'a')
		.replace(/ī/g, 'i')
		.replace(/ū/g, 'u');
}

function textForNode(node) {
	return normalize([
		node.id,
		node.type,
		node.title,
		node.slug,
		node.description,
		...(node.tags || [])
	].join(' '));
}

function scoreNode(node) {
	const text = textForNode(node);
	const scores = new Map();
	const reasons = new Map();

	for (const [slug, keywords] of Object.entries(rules)) {
		for (const keyword of keywords) {
			const needle = normalize(keyword);
			const hit = text.includes(needle);
			if (!hit) continue;

			const weight = (node.tags || []).some((tag) => normalize(tag) === needle) ? 3 : 1;
			scores.set(slug, (scores.get(slug) || 0) + weight);
			if (!reasons.has(slug)) reasons.set(slug, []);
			reasons.get(slug).push(keyword);
		}
	}

	for (const slug of typeDefaults[node.type] || []) {
		scores.set(slug, (scores.get(slug) || 0) + 0.75);
		if (!reasons.has(slug)) reasons.set(slug, []);
		reasons.get(slug).push(`${node.type} default`);
	}

	if (scores.size === 0) {
		scores.set('ak-sankirana', 0.5);
		reasons.set('ak-sankirana', ['fallback for weak metadata']);
	}

	return Array.from(scores.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, 4)
		.map(([slug, score]) => ({
			slug,
			label: vargaBySlug.get(slug)?.label || slug,
			confidence: Number(Math.min(0.95, 0.45 + score * 0.08).toFixed(2)),
			reason: Array.from(new Set(reasons.get(slug) || [])).slice(0, 6).join(', ')
		}));
}

const classifiedNodes = nodes.filter((node) => node.type !== 'ak-varga');
const mappings = classifiedNodes.map((node) => ({
	nodeId: node.id,
	type: node.type,
	title: node.title,
	route: node.meta?.route || null,
	vargas: scoreNode(node)
}));

const byVarga = Object.fromEntries(vargas.map((varga) => [
	varga.slug,
	mappings
		.filter((mapping) => mapping.vargas.some((entry) => entry.slug === varga.slug))
		.map((mapping) => mapping.nodeId)
]));

const output = {
	generatedAt: new Date().toISOString(),
	source: inputPath,
	method: 'deterministic-keyword-first-pass',
	note: 'First-pass Amarakosha varga classification. Review confidence and reason fields before treating as canonical.',
	vargas: vargas.map(({ slug, label, devanagari, iast, description }) => ({
		slug,
		label,
		devanagari,
		iast,
		description
	})),
	stats: {
		inputNodes: nodes.length,
		classifiedNodes: mappings.length,
		excludedAkVargas: nodes.length - mappings.length,
		unmappedNodes: mappings.filter((mapping) => mapping.vargas.length === 0).length,
		vargaCounts: Object.fromEntries(
			vargas.map((varga) => [varga.slug, byVarga[varga.slug].length])
		)
	},
	mappings,
	byVarga
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Wrote ${outputPath}`);
console.log(JSON.stringify(output.stats, null, 2));
