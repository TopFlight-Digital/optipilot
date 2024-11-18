import type { ChatCompletionMessageParam, ChatModel } from "openai/resources/index.mjs";

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

export const DEFAULT_MODEL = `gpt-4o` as const satisfies ChatModel;
export const DEFAULT_HYPOTHESES_CAP = 5 as const;

export const DESERIALIZABLE_OUTPUT_PROMPT = {
    role: `system`,
    content: `Returning your response, omit markdown tokens`.trim(),
} as const satisfies ChatCompletionMessageParam;

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

export const BREAKPOINTS = {
    mobile: 360,
    desktop: 1024,
} as const satisfies Record<DeviceType, number>;
