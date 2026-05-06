import { elementVisibilityStore } from '$lib/utils/elementVisibility'

let section = $state<HTMLElement | null>(null);
let isFooterVisible = $state(false);

	$effect(() => {
		if (!section) {
			isFooterVisible = false;
			return;
		}
		const visibility = elementVisibilityStore(section);
		const unsubscribe = visibility.isVisible.subscribe((value: boolean) => {
			isFooterVisible = value;
		});
		return () => {
			unsubscribe();
			visibility.stop();
		};
});