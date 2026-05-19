import fs from 'node:fs/promises';

const DATA_FILE = 'src/lib/serving/db-temples.json';
const REPORT_FILE = 'src/lib/serving/db-temples-coordinate-report.json';
const ENV_FILE = '.env.local';

const stateNames = [
	'Andaman and Nicobar Islands',
	'Andhra Pradesh',
	'Arunachal Pradesh',
	'Assam',
	'Bihar',
	'Chandigarh',
	'Chhattisgarh',
	'Dadra and Nagar Haveli and Daman and Diu',
	'Delhi',
	'Goa',
	'Gujarat',
	'Haryana',
	'Himachal Pradesh',
	'Jammu and Kashmir',
	'Jharkhand',
	'Karnataka',
	'Kerala',
	'Ladakh',
	'Lakshadweep',
	'Madhya Pradesh',
	'Maharashtra',
	'Manipur',
	'Meghalaya',
	'Mizoram',
	'Nagaland',
	'Odisha',
	'Puducherry',
	'Punjab',
	'Rajasthan',
	'Sikkim',
	'Tamil Nadu',
	'Telangana',
	'Tripura',
	'Uttar Pradesh',
	'Uttarakhand',
	'West Bengal'
];

const aliases = new Map([
	['Orissa', 'Odisha'],
	['Pondicherry', 'Puducherry'],
	['New Delhi', 'Delhi'],
	['NCT of Delhi', 'Delhi'],
	['National Capital Territory of Delhi', 'Delhi'],
	['Daman and Diu', 'Dadra and Nagar Haveli and Daman and Diu'],
	['Dadra and Nagar Haveli', 'Dadra and Nagar Haveli and Daman and Diu']
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function text(value) {
	return typeof value === 'string' ? value : '';
}

function clean(value) {
	return text(value)
		.replace(/\s*,\s*\([^)]*\)/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function normalize(value) {
	return clean(value)
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim()
		.replace(/\s+/g, ' ');
}

function compactTempleName(name) {
	return normalize(name)
		.replace(/^(shri|sri|sree|maa|mata|arulmigu|lord) /, '')
		.replace(/ mandir$/, ' temple');
}

function parseLocation(location) {
	const raw = clean(location);
	const sentenceMatch =
		raw.match(/located in (?:the town of |the city of |the village of |the )?([^.,]+)(?:,| in |$)/i) ??
		raw.match(/situated in (?:the town of |the city of |the village of |the )?([^.,]+)(?:,| in |$)/i);
	const parts = raw.split(',').map((part) => clean(part)).filter(Boolean);
	return {
		raw,
		city: clean(sentenceMatch?.[1] ?? parts[0] ?? ''),
		parts
	};
}

function isInsideIndia(latitude, longitude) {
	return latitude >= 6 && latitude <= 38 && longitude >= 68 && longitude <= 98;
}

function explicitStateFromText(value) {
	const haystack = clean(value);
	for (const state of stateNames) {
		if (new RegExp(`\\b${escapeRegExp(state)}\\b`, 'i').test(haystack)) return state;
	}
	for (const [alias, state] of aliases) {
		if (new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'i').test(haystack)) return state;
	}
	return '';
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function loadEnv() {
	const envText = await fs.readFile(ENV_FILE, 'utf8').catch(() => '');
	for (const line of envText.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
		if (!match) continue;
		const [, key, rawValue] = match;
		if (process.env[key]) continue;
		process.env[key] = rawValue.replace(/^['"]|['"]$/g, '');
	}
}

function queryCandidates(temple) {
	const location = parseLocation(temple.info?.location);
	const name = clean(temple.name);
	const noHonorific = name.replace(/^(Shri|Sri|Sree|Maa|Mata|Arulmigu)\s+/i, '');
	const state = clean(temple.state);
	const city = location.city;
	const rawLocation = location.raw;

	return [
		rawLocation && !rawLocation.toLowerCase().startsWith('the ') ? `${name}, ${rawLocation}` : '',
		city ? `${name}, ${city}, ${state}, India` : '',
		city ? `${noHonorific}, ${city}, ${state}, India` : '',
		`${name}, ${state}, India`,
		`${noHonorific}, ${state}, India`
	]
		.map((query) => query.replace(/\s+/g, ' ').trim())
		.filter(Boolean)
		.filter((query, index, list) => list.indexOf(query) === index);
}

function scoreGoogleResult(temple, result) {
	const display = normalize([result.name, result.formatted_address].filter(Boolean).join(' '));
	const resultName = compactTempleName(result.name ?? '');
	const name = compactTempleName(temple.name);
	const city = normalize(parseLocation(temple.info?.location).city);
	const state = normalize(temple.state);
	const types = result.types ?? [];
	let score = 0;

	if (!display.includes('india')) return -100;
	if (resultName && (resultName === name || resultName.includes(name) || name.includes(resultName))) score += 50;
	if (display.includes(name)) score += 28;
	if (city && city.length > 3 && display.includes(city)) score += 14;
	if (state && display.includes(state)) score += 10;
	if (types.includes('hindu_temple')) score += 20;
	if (types.includes('place_of_worship')) score += 12;
	if (types.includes('tourist_attraction')) score += 6;
	if (types.includes('establishment') || types.includes('point_of_interest')) score += 4;
	if (result.business_status === 'OPERATIONAL') score += 4;
	return score;
}

async function googleJson(url, attempt = 1) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
	const json = await response.json();
	if (['OVER_QUERY_LIMIT', 'RESOURCE_EXHAUSTED'].includes(json.status) && attempt <= 5) {
		await sleep(1000 * attempt);
		return googleJson(url, attempt + 1);
	}
	return json;
}

async function placesTextSearch(query, apiKey) {
	const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
	url.search = new URLSearchParams({
		query,
		region: 'in',
		key: apiKey
	}).toString();
	const json = await googleJson(url);
	if (json.status === 'REQUEST_DENIED') throw new Error(`Google Places request denied: ${json.error_message ?? 'unknown error'}`);
	if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
		throw new Error(`Google Places ${json.status}: ${json.error_message ?? 'unknown error'}`);
	}
	return json.results ?? [];
}

async function geocode(query, apiKey) {
	const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
	url.search = new URLSearchParams({
		address: query,
		components: 'country:IN',
		key: apiKey
	}).toString();
	const json = await googleJson(url);
	if (json.status === 'REQUEST_DENIED') throw new Error(`Google Geocoding request denied: ${json.error_message ?? 'unknown error'}`);
	if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
		throw new Error(`Google Geocoding ${json.status}: ${json.error_message ?? 'unknown error'}`);
	}
	return (json.results ?? []).map((result) => ({
		name: result.address_components?.[0]?.long_name ?? result.formatted_address,
		formatted_address: result.formatted_address,
		geometry: result.geometry,
		place_id: result.place_id,
		types: result.types ?? []
	}));
}

async function coordinateForTemple(temple, apiKey) {
	let best = null;
	for (const query of queryCandidates(temple)) {
		const results = await placesTextSearch(query, apiKey);
		for (const result of results) {
			const latitude = result.geometry?.location?.lat;
			const longitude = result.geometry?.location?.lng;
			if (typeof latitude !== 'number' || typeof longitude !== 'number') continue;
			if (!isInsideIndia(latitude, longitude)) continue;
			const score = scoreGoogleResult(temple, result);
			if (!best || score > best.score) best = { result, score, query, latitude, longitude, source: 'Google Places Text Search' };
		}
		if (best?.score >= 60) break;
		await sleep(120);
	}

	if (!best || best.score < 42) {
		for (const query of queryCandidates(temple)) {
			const results = await geocode(query, apiKey);
			for (const result of results) {
				const latitude = result.geometry?.location?.lat;
				const longitude = result.geometry?.location?.lng;
				if (typeof latitude !== 'number' || typeof longitude !== 'number') continue;
				if (!isInsideIndia(latitude, longitude)) continue;
				const score = scoreGoogleResult(temple, result);
				if (!best || score > best.score) best = { result, score, query, latitude, longitude, source: 'Google Geocoding API' };
			}
			if (best?.score >= 55) break;
			await sleep(120);
		}
	}

	if (!best || best.score < 38) return null;

	const stateFromAddress = explicitStateFromText(best.result.formatted_address);
	return {
		latitude: Number(best.latitude.toFixed(6)),
		longitude: Number(best.longitude.toFixed(6)),
		geo_source: best.source,
		geo_place_id: best.result.place_id,
		geo_match_title: best.result.name,
		geo_match_address: best.result.formatted_address,
		geo_match_query: best.query,
		geo_match_score: best.score,
		geo_match_confidence: best.score >= 55 ? 'high' : 'medium',
		geocoded_state: stateFromAddress
	};
}

async function writeProgress(temples, report) {
	await fs.writeFile(DATA_FILE, JSON.stringify(temples, null, '\t') + '\n');
	await fs.writeFile(
		REPORT_FILE,
		JSON.stringify(
			{
				summary: {
					total: temples.length,
					totalWithCoordinates: temples.filter(
						(temple) => typeof temple.latitude === 'number' && typeof temple.longitude === 'number'
					).length,
					totalWithoutCoordinates: temples.filter(
						(temple) => typeof temple.latitude !== 'number' || typeof temple.longitude !== 'number'
					).length
				},
				report
			},
			null,
			'\t'
		) + '\n'
	);
}

async function main() {
	await loadEnv();
	const apiKey = process.env.GOOGLE_MAPS_API_KEY;
	if (!apiKey) throw new Error('GOOGLE_MAPS_API_KEY is missing. Add it to .env.local or export it in the shell.');

	const refreshAll = process.argv.includes('--refresh-all');
	const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
	const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity;
	const temples = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
	const report = [];
	let processed = 0;

	for (const [index, temple] of temples.entries()) {
		if (!refreshAll && typeof temple.latitude === 'number' && typeof temple.longitude === 'number') {
			report.push({ slug: temple.slug, name: temple.name, status: 'already_had_coordinates' });
			continue;
		}
		if (processed >= limit) break;

		try {
			const coordinate = await coordinateForTemple(temple, apiKey);
			processed++;
			if (!coordinate) {
				report.push({ slug: temple.slug, name: temple.name, status: 'no_confident_google_match' });
				console.log(`${index + 1}/${temples.length} no Google coordinate: ${temple.name}`);
				await writeProgress(temples, report);
				continue;
			}

			Object.assign(temple, coordinate);
			if (
				coordinate.geocoded_state &&
				coordinate.geocoded_state !== temple.state &&
				coordinate.geo_match_confidence === 'high'
			) {
				temple.state_corrected_from ??= temple.state;
				temple.state = coordinate.geocoded_state;
				temple.state_source = coordinate.geo_source;
			}

			report.push({
				slug: temple.slug,
				name: temple.name,
				status: 'coordinate_matched',
				confidence: coordinate.geo_match_confidence,
				score: coordinate.geo_match_score,
				match: coordinate.geo_match_title,
				address: coordinate.geo_match_address
			});
			console.log(
				`${index + 1}/${temples.length} Google coordinate: ${temple.name} -> ${coordinate.latitude}, ${coordinate.longitude}`
			);
			await writeProgress(temples, report);
			await sleep(120);
		} catch (error) {
			processed++;
			report.push({ slug: temple.slug, name: temple.name, status: 'error', error: error.message });
			console.log(`${index + 1}/${temples.length} error: ${temple.name}: ${error.message}`);
			await writeProgress(temples, report);
			await sleep(1000);
		}
	}

	await writeProgress(temples, report);
	console.log(
		JSON.stringify(
			{
				total: temples.length,
				totalWithCoordinates: temples.filter(
					(temple) => typeof temple.latitude === 'number' && typeof temple.longitude === 'number'
				).length,
				processed
			},
			null,
			2
		)
	);
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
