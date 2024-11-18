import { DUMMY_TAB } from "@/constants";

export function useTab(tab: MaybeRefOrGetter<chrome.tabs.Tab> = DUMMY_TAB) {
    const url = computed(() => toValue(tab)?.url);

    const domain = computed(() => {
        const stringifiedUrl = url.value;

        if (!stringifiedUrl)
            return ``;

        return new URL(stringifiedUrl).hostname;
    });

    return {
        domain,
        url,
    };
}
