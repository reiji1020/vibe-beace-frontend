import { getAllBeads } from '$lib/controllers/beadController';
import { getAllThreads } from '$lib/controllers/threadController';
import { getAllCutCloth } from '$lib/controllers/cutClothController';

export async function load({ url }) {
	const query = url.searchParams.get('query');

	const [beads, threads, cutCloths] = await Promise.all([
		getAllBeads(query),
		getAllThreads(query),
		getAllCutCloth(query)
	]);

	return {
		beads,
		threads,
		cutCloths,
		query
	};
}
