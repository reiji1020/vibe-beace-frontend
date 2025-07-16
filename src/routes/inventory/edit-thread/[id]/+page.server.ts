import { getThreadById } from "$lib/controllers/threadController";
import type { PageServerLoad, Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { updateThread } from "$lib/controllers/threadController";

export const load: PageServerLoad = async ({ params }) => {
    const thread = await getThreadById(Number(params.id));
    if (!thread) {
        throw error(404, "Thread not found");
    }
    return { thread };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        const id = Number(params.id);

        const threadData = {
            id,
            brand: data.get("brand") as string,
            colorNumber: data.get("colorNumber") as string,
            colorName: data.get("colorName") as string,
            quantity: Number(data.get("quantity")),
            status: data.get("status") as string,
            wishlist: data.has("wishlist"),
        };

        try {
            await updateThread(threadData);
        } catch (err) {
            return error(500, "Failed to update thread");
        }

        throw redirect(303, "/inventory");
    },
};