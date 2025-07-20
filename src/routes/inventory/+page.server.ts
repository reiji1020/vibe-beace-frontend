// src/routes/inventory/+page.ts
import { getAllBeads } from '$lib/controllers/beadController';
import { getAllThreads } from '$lib/controllers/threadController';
import { getAllCutCloth } from '$lib/controllers/cutClothController';

export async function load() {
	const [beads, threads, cutCloths] = await Promise.all([
		getAllBeads(),
		getAllThreads(),
		getAllCutCloth()
	]);

	return {
		beads,
		threads,
		cutCloths
	};
}
