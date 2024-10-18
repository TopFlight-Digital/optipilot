import AppCopy from './copy.vue';

export default {
    component: AppCopy,
    render: arguments_ => ({
        components: { AppCopy },
        setup() {
            const { vText, ...props } = arguments_;

            return {
                vText: arguments_.vText,
                props,
            };
        },
        template: `<app-copy v-text="vText" v-bind="props" />`,
    }),
    args: {
        vText: ``,
    },
};

export const ProductPageSummaryCopy = {
    args: {
        vText: `Product page summary`,
        type: `Title/h1`,
        color: `light`,
    },
};

export const ProductPageSummarySubCopy = {
    args: {
        vText: `Prior to scanning, tell us a bit of information about the website, lorem ipsum dolor sit amet consectetur.`,
        type: `Title/h3`,
        color: `mid`,
    },
};

export const ProductPageScanCopy = {
    args: {
        vText: `Product page scan`,
        type: `Title/h1`,
        color: `light`,
    },
};

export const ProductPageScanSubCopy = {
    args: {
        vText: `Tell us about the page you’d like to scan, and find out how you can improve your website.`,
        type: `Title/h3`,
        color: `mid`,
    },
};

export const ScanSetupCopy = {
    args: {
        vText: `Scan setup`,
        type: `Title/h1`,
        color: `light`,
    },
};

export const ScanSetupSubCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur. Feugiat ac arcu tincidunt dignissim.`,
        type: `Title/h3`,
        color: `mid`,
    },
};

export const Step1Of2Copy = {
    args: {
        vText: `Step 1 of 2`,
        type: `Label 2`,
        color: `mid`,
    },
};

export const Step2Of2Copy = {
    args: {
        vText: `Step 2 of 2`,
        type: `Label 2`,
        color: `mid`,
    },
};

export const ScanningPageTitleCopy = {
    args: {
        vText: `Scanning page...`,
        type: `Title/h1`,
        color: `light`,
    },
};

export const ScanningPageUrlCopy = {
    args: {
        vText: `www.urbanthreadsunitedkingdom/womens.co.uk`,
        type: `Title/h3`,
        color: `mid`,
    },
};

export const ScanningPageSubTextCopy = {
    args: {
        vText: `Analysing data for tailored improvements`,
        type: `Title/h4`,
        color: `mid`,
    },
};

export const CraftingSuggestionsCopy = {
    args: {
        vText: `Crafting smarter suggestions for you`,
        type: `Title/h4`,
        color: `mid`,
    },
};

export const ScanResultsTitleCopy = {
    args: {
        vText: `Scan results`,
        type: `Title/h1`,
        color: `mid`,
    },
};

export const ScanResultsSubTextCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur. Feugiat ac arcu tincidunt dignissim.`,
        type: `Title/h3`,
        color: `light`,
    },
};

export const HypothesisLabelCopy = {
    args: {
        vText: `Hypothesis 1`,
        type: `Body/b1-reg`,
        color: `mid`,
    },
};

export const HypothesisTitleCopy = {
    args: {
        vText: `Personalised products`,
        type: `Title/h1`,
        color: `light`,
    },
};

export const HypothesisBodyCopy = {
    args: {
        vText: `Highlighting limited-time discounts on product tiles will increase click-through rate by creating a sense of urgency and value.`,
        type: `Title/h4`,
        color: `mid`,
    },
};

export const OpportunityTitleCopy = {
    args: {
        vText: `Opportunity from insights`,
        type: `Title/h3`,
        color: `light`,
    },
};

export const OpportunityBodyCopy = {
    args: {
        vText: `We see a 44% drop-off from the PLP to the PDP. Returning users are 70% likely to go back to a category they viewed in a previous session. Returning users have an average session time of 20 minutes meaning they are spending a considerable amount of time browsing products. 80% of those users to not purchase and spend longer browsing products.`,
        type: `Body/b1-reg`,
        color: `mid`,
    },
};

export const ExecutionTitleCopy = {
    args: {
        vText: `Execution`,
        type: `Title/h3`,
        color: `light`,
    },
};

export const ExecutionBodyCopy = {
    args: {
        vText: `Under a given product tile on the listing page, display a limited time discount in red bold letters for all products that are currently on sale. As an example, the copy should read 'limited time discount 20% off until 23rd July'`,
        type: `Body/b1-reg`,
        color: `mid`,
    },
};

export const TechnicalConsiderationsTitleCopy = {
    args: {
        vText: `Technical considerations`,
        type: `Title/h3`,
        color: `light`,
    },
};

export const TechnicalConsiderationsBodyCopy = {
    args: {
        vText: `Since the current listing page does not render discounts, the ability to retrieve the discount for a given product will need to be implemented via an API or a page scrape. you would do tbis by doing XYZ. tjektnekn. rheifnejfne jrjeorejroej oekeotkro hwjDISRT OFGJRDGKS djskrnewkfndgorjtkenf a .`,
        type: `Body/b1-reg`,
        color: `mid`,
    },
};

export const ExpectedImpactTitleCopy = {
    args: {
        vText: `Expected impact`,
        type: `Title/h3`,
        color: `light`,
    },
};

export const Hypothesis1LabelCopy = {
    args: {
        vText: `Hypothesis 1`,
        type: `Label 2`,
        color: `mid`,
    },
};

export const Hypothesis1TitleCopy = {
    args: {
        vText: `Personalised products`,
        type: `Title/h4`,
        color: `light`,
    },
};

export const Hypothesis1BodyCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur. Sagittis sed vitae integer eleifend dictum malesuada morbi.dictum malesuada morbi.`,
        type: `Body/b1-reg`,
        color: `mid`,
    },
};

export const Hypothesis2LabelCopy = {
    args: {
        vText: `Hypothesis 2`,
        type: `Label 2`,
        color: `mid`,
    },
};

export const Hypothesis2TitleCopy = {
    args: {
        vText: `Enhanced product imagery`,
        type: `Title/h4`,
        color: `light`,
    },
};

export const Hypothesis2BodyCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur. Sagittis sed vitae integer eleifend dictum malesuada morbi.dictum malesuada morbi.`,
        type: `Body/b1-reg`,
        color: `mid`,
    },
};

export const Hypothesis3LabelCopy = {
    args: {
        vText: `Hypothesis 3`,
        type: `Label 2`,
        color: `mid`,
    },
};

export const Hypothesis3TitleCopy = {
    args: {
        vText: `Preview customer reviews`,
        type: `Title/h4`,
        color: `light`,
    },
};

export const Hypothesis3BodyCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur. Sagittis sed vitae integer eleifend dictum malesuada morbi.dictum malesuada morbi.`,
        type: `Body/b1-reg`,
        color: `mid`,
    },
};

export const OutOfScansTitleCopy = {
    args: {
        vText: `Out of scans!`,
        type: `Title/h1`,
        color: `light`,
    },
};

export const OutOfScansSubTitleCopy = {
    args: {
        vText: `View packages to access more, and improve your website.`,
        type: `Title/h3`,
        color: `mid`,
    },
};

export const PayOnceTitleCopy = {
    args: {
        vText: `Pay once, use forever`,
        type: `Title/h1`,
        color: `light`,
    },
};

export const PayOnceSubTitleCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur. Feugiat ac arcu tincidunt dignissim.`,
        type: `Title/h3`,
        color: `mid`,
    },
};

export const OneScanTitleCopy = {
    args: {
        vText: `1 scan`,
        type: `Title/h3`,
        color: `light`,
    },
};

export const OneScanSubTextCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur.`,
        type: `Label 2`,
        color: `mid`,
    },
};

export const OneScanPriceCopy = {
    args: {
        vText: `£3.99`,
        type: `Title/h1`,
        color: `light`,
        inline: true,
    },
};

export const UnlimitedScansTitleCopy = {
    args: {
        vText: `Unlimited scans`,
        type: `Title/h3`,
        color: `light`,
    },
};

export const UnlimitedScansSubTextCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur. Feugi.`,
        type: `Label 2`,
        color: `mid`,
    },
};

export const UnlimitedScansPriceCopy = {
    args: {
        vText: `£49.99`,
        type: `Title/h1`,
        color: `light`,
        inline: true,
    },
};

export const UnlimitedScansDurationCopy = {
    args: {
        vText: `/year`,
        type: `Label 2`,
        color: `mid`,
        inline: true,
    },
};

export const TwentyScansTitleCopy = {
    args: {
        vText: `20 scans`,
        type: `Title/h3`,
        color: `light`,
    },
};

export const TwentyScansSubTextCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur.`,
        type: `Label 2`,
        color: `mid`,
    },
};

export const TwentyScansPriceCopy = {
    args: {
        vText: `£19.99`,
        type: `Title/h1`,
        color: `light`,
        inline: true,
    },
};

export const TwentyScansDurationCopy = {
    args: {
        vText: `/year`,
        type: `Label 2`,
        color: `mid`,
        inline: true,
    },
};

export const ExtraMonthsCopy = {
    args: {
        vText: `+3 EXTRA months`,
        type: `Title/h4`,
        color: `accent`,
    },
};

export const TrustedUsCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur.`,
        type: `Title/h4`,
        color: `mid`,
    },
};
