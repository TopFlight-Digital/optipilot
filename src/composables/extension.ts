import { DUMMY_TAB } from "@/constants";

export function useChromeExtension(callback?: (tab: chrome.tabs.Tab) => void) {
    getCurrentTab().then(callback);
}

function getCurrentTab() {
    return new Promise<chrome.tabs.Tab>((resolve, reject) => {
        if (globalThis.chrome?.extension)
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                const currentTab = tabs[0];

                if (currentTab)
                    resolve(currentTab);
                else reject();

            });
        else
            resolve(DUMMY_TAB);
    });
}
