import { ref } from "vue";
import Client from "./client";

export function useBusinessInfo() {
    const pending = ref(false);
    const error = ref<string | undefined>(undefined);
    const client = new Client(API_SERVER_URL);

    async function analyze(tabTitle: string): Promise<string | undefined> {
        pending.value = true;
        error.value = undefined;

        try {
            const data = await client.prompt.analyze({ tabTitle });
            return data.message;
        } catch (error_) {
            error.value = error_ instanceof Error ? error_.message : `An error occurred`;
            return undefined;
        } finally {
            pending.value = false;
        }
    }

    return {
        pending,
        error,
        analyze,
    };
}
