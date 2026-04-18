// src/routes/categories/[category]/+page.ts
import { error } from '@sveltejs/kit';

const categories = [
		{ label: 'Essentials', href: '/library/categories/essentials', type: 'essentials', forLink: 'essentials', desc: 'Foundational readings for entering the civilisational and philosophical landscape of Bodha.' },
		{ label: 'Aryan Issue', href: '/library/categories/aryan-issue', type: 'aryan-issue', forLink: 'aryanissue', desc: 'Texts on the Aryan debate, migration theory, archaeology, philology, and civilizational argument.' },
		{ label: 'Darshanas', href: '/library/categories/darshanas', type: 'darshanas', forLink: 'darshana', desc: 'Primary and secondary works on Indian philosophical systems, debates, and metaphysical frameworks.' },
		{ label: 'Indian Knowledge Systems', href: '/library/categories/iks', type: 'iks', forLink: 'iks', desc: 'Works on organised traditions of knowledge, method, science, language, and pedagogy.' },
		{ label: 'Scriptural', href: '/library/categories/scriptural', type: 'scriptural', forLink: 'scriptural', desc: 'Sources in shruti, smriti, puranic, and sacred-historical traditions.' },
		{ label: 'Shatrubodha', href: '/library/categories/shatrubodha', type: 'shatrubodha', forLink: 'shatrubodha', desc: 'Texts dealing with critique, conflict, ideology, and civilisational self-understanding.' },
		{ label: 'Svayambodha', href: '/library/categories/svayambodha', type: 'svayambodha', forLink: 'svayambodha', desc: 'Books oriented toward self-understanding, cultural continuity, and Hindu civilisational confidence.' }
];

export function load({ params }) {
	const category = categories.find(c => c.type === params.category);

	if (!category) {
		throw error(404, 'Category not found');
	}

	return {
		category
	};
}