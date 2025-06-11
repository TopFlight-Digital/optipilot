export type TabSlug = typeof tabs[number][`slug`];

export const tabs = [
    {
        slug: `current`,
        label: `Ideas`,
    },
    {
        slug: `history`,
        label: `History`,
    },
] as const;
