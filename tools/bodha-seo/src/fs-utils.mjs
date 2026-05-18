import fs from 'node:fs/promises';
import path from 'node:path';

export async function pathExists(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

export async function readText(filePath) {
	return fs.readFile(filePath, 'utf8');
}

export async function readJson(filePath) {
	return JSON.parse(await readText(filePath));
}

export async function ensureDir(dirPath) {
	await fs.mkdir(dirPath, { recursive: true });
}

export async function writeJson(filePath, data) {
	await ensureDir(path.dirname(filePath));
	await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

export async function writeText(filePath, data) {
	await ensureDir(path.dirname(filePath));
	await fs.writeFile(filePath, data);
}

export async function walkFiles(root, predicate = () => true) {
	const out = [];

	async function visit(current) {
		const entries = await fs.readdir(current, { withFileTypes: true });
		for (const entry of entries) {
			if (entry.name === 'node_modules' || entry.name === '.svelte-kit' || entry.name === '.git') {
				continue;
			}

			const fullPath = path.join(current, entry.name);
			if (entry.isDirectory()) {
				await visit(fullPath);
			} else if (predicate(fullPath)) {
				out.push(fullPath);
			}
		}
	}

	if (await pathExists(root)) {
		await visit(root);
	}

	return out.sort();
}

