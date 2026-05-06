export type WipeScene = {
	slug: string;
	title: string;
	kicker: string;
	description: string;
	accent: string;
	background: string;
	symbol: string;
};

export const wipeScenes: WipeScene[] = [
	{
		slug: '',
		title: 'Vertical Wipe',
		kicker: 'SvelteKit View Transition',
		description:
			'A route-to-route page transition using document.startViewTransition and a clip-path inset wipe.',
		accent: '#c9ff62',
		background:
			'radial-gradient(circle at 20% 20%, rgba(201,255,98,0.24), transparent 28%), linear-gradient(135deg, #050506 0%, #141b16 55%, #283315 100%)',
		symbol: '01'
	},
	{
		slug: 'indigo',
		title: 'Indigo Field',
		kicker: 'No GSAP, no scroll trigger',
		description:
			'The animation is owned by the browser view-transition layer, so route content can stay ordinary Svelte markup.',
		accent: '#8eb6ff',
		background:
			'radial-gradient(circle at 70% 18%, rgba(142,182,255,0.3), transparent 30%), linear-gradient(135deg, #060816 0%, #111a3b 52%, #324f91 100%)',
		symbol: '02'
	},
	{
		slug: 'copper',
		title: 'Copper Gate',
		kicker: 'Clip-path page reveal',
		description:
			'Reduced-motion users skip the wipe. Older browsers fall back to normal SvelteKit navigation.',
		accent: '#ffb36b',
		background:
			'radial-gradient(circle at 50% 12%, rgba(255,179,107,0.28), transparent 34%), linear-gradient(135deg, #120807 0%, #321915 52%, #8a4c2a 100%)',
		symbol: '03'
	}
];

export function scenePath(scene: WipeScene) {
	return scene.slug ? `/transition/vertical-wipe/${scene.slug}` : '/transition/vertical-wipe';
}

export function getWipeScene(slug = '') {
	return wipeScenes.find((scene) => scene.slug === slug);
}
