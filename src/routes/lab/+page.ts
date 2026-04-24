import { fullLab } from '$lib/utils/localpulls';

export async function load() {
	const labItems = await fullLab();

	return {
		labItems
	};
}
