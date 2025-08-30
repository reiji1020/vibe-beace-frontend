import { getAllBeads } from '$lib/controllers/beadController';
import { getAllThreads } from '$lib/controllers/threadController';
import { getAllCutCloth } from '$lib/controllers/cutClothController';
import { getAllXStitchCloth } from '$lib/controllers/xStitchClothController';

export async function load({ url }) {
	const query = url.searchParams.get('query');

	const [beads, threads, cutCloths, xStitchCloths] = await Promise.all([
		getAllBeads(query),
		getAllThreads(query),
		getAllCutCloth(query),
		getAllXStitchCloth(query)
	]);

	return {
		beads,
		threads,
		cutCloths,
		xStitchCloths,
		query
	};
}
