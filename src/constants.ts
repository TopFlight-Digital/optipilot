export const DUMMY_TAB = {
    id: -1,
    index: -1,
    windowId: -1,
    active: false,
    pinned: false,
    highlighted: false,
    discarded: false,
    autoDiscardable: false,
    mutedInfo: { muted: false },
    url: ``,
    title: ``,
    favIconUrl: ``,
    status: ``,
    incognito: false,
    width: 0,
    height: 0,
    sessionId: ``,
    selected: false,
    groupId: -1,
} as const satisfies chrome.tabs.Tab;

export const DEVICE_TYPE_OPTIONS = [
    {
        slug: `mobile`,
        label: `Mobile`,
    },
    {
        slug: `desktop`,
        label: `Desktop`,
    },
] as const;

export type DeviceType = typeof DEVICE_TYPE_OPTIONS[number][`slug`];

export const MIN_DESKTOP_WIDTH = 1024 as const;

export const BREAKPOINTS = {
    mobile: () => 360,
    desktop: () => Math.max(window.screen.availWidth, MIN_DESKTOP_WIDTH),
} as const satisfies Record<DeviceType, () => number>;
