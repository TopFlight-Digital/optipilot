import { DUMMY_TAB } from "@/constants";

export function useTab(tab: MaybeRefOrGetter<chrome.tabs.Tab> = DUMMY_TAB) {
    const domain = computed(() => {
        const stringifiedUrl = toValue(tab)?.url;

        if (!stringifiedUrl)
            return ``;

        const url = new URL(stringifiedUrl);
        return url.hostname;
    });

    return {
        domain,
    };
}
