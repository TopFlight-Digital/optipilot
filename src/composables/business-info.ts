import { ref } from "vue";

interface BusinessInfoResponse {
    message: string | undefined;
}

export function useBusinessInfo() {
    const pending = ref(false);
    const error = ref<string | undefined>(undefined);

    async function analyze(tabTitle: string): Promise<string | undefined> {
        pending.value = true;
        error.value = undefined;

        try {
            const response = await fetch(`${API_SERVER_URL}/business-info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tabTitle }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: BusinessInfoResponse = await response.json();
            return data.message;
        } catch (error_) {
            error.value = error_ instanceof Error ? error_.message : "An error occurred";
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
