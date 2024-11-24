import { Hypothesis } from "@/bloc/hypotheses-prompt";
import { RemovableRef } from "@vueuse/core";

export type Scan = {
    id: ReturnType<typeof crypto.randomUUID>;
    threadId: string;
    date: Date;
    title: string;
    icon?: string;
    hypotheses: Hypothesis[];
}

export function useScanById(id: string, initial: Scan = {} as Scan) {
    return useStorage<Scan | undefined>(
        `_scans.${id}`,
        initial,
        undefined,
        {
            serializer: {
                read: (raw: string) => {
                    if (!raw) return;

                    return JSON.parse(
                        raw,
                        (key, value) => {
                            if (key === `date`) {
                                return new Date(value);
                            }

                            return value;
                        },
                    ) as Scan;
                },
                write: JSON.stringify,
            },
        },
    );
}

export default function useScansByIds(ids: string[]) {
    return computed(() => (
        [...new Set(ids)]
            .map(id => useScanById(id))
            .filter(Boolean) as RemovableRef<Scan>[]
    ).sort((a, b) => b.value.date.getTime() - a.value.date.getTime()) );
}
