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

export const AboutYourWebsiteCopy = {
    args: {
        vText: `About your website`,
        type: `Title/h1`,
        color: `f6`,
    },
};

export const AboutYourWebsiteSubCopy = {
    args: {
        vText: `Help me understand your website so I can scan and analyse it effectively.`,
        type: `Title/h4`,
        color: `cd`,
    },
};

export const AboutTheWebPageCopy = {
    args: {
        vText: `About the web page`,
        type: `Title/h1`,
        color: `f6`,
    },
};

export const AboutTheWebPageSubCopy = {
    args: {
        vText: `Tell us about the page you’d like to scan, and find out how you can improve your website.`,
        type: `Title/h4`,
        color: `cd`,
    },
};

export const Step1Of2Copy = {
    args: {
        vText: `Step 1 of 2`,
        type: `Label 2`,
        color: `cd`,
    },
};

export const Step2Of2Copy = {
    args: {
        vText: `Step 2 of 2`,
        type: `Label 2`,
        color: `cd`,
    },
};

export const ScanningPageTitleCopy = {
    args: {
        vText: `Scanning page...`,
        type: `Title/h1`,
        color: `f6`,
    },
};

export const ScanningPageUrlCopy = {
    args: {
        vText: `www.urbanthreadsunitedkingdom/womens.co.uk`,
        type: `Title/h3`,
        color: `cd`,
    },
};

export const ScanningPageSubTextCopy = {
    args: {
        vText: `Analysing data for tailored improvements`,
        type: `Title/h4`,
        color: `cd`,
    },
};

export const CraftingSuggestionsCopy = {
    args: {
        vText: `Crafting smarter suggestions for you`,
        type: `Title/h4`,
        color: `cd`,
    },
};

export const AnalysisResultsCopy = {
    args: {
        vText: `Analysis results`,
        type: `Title/h1`,
        color: `cd`,
    },
};

export const AnalysisResultsSubCopy = {
    args: {
        vText: `Discover how to improve your website through the proposed changes below.`,
        type: `Title/h4`,
        color: `cd`,
    },
};

export const ProposalLabelCopy = {
    args: {
        vText: `Proposal 1`,
        type: `Button 2/label 1`,
        color: `cd`,
    },
};

export const ProposalTitleCopy = {
    args: {
        vText: `Optimise product listings`,
        type: `Title/h1`,
        color: `f6`,
    },
};

export const ProposalBodyCopy = {
    args: {
        vText: `Reducing decision fatigue and improving navigation can encourage users to progress and ultimately convert.`,
        type: `Body/b1-med`,
        color: `cd`,
    },
};

export const DataAnalysisTitleCopy = {
    args: {
        vText: `Data analysis`,
        type: `Title/h2`,
        color: `f6`,
    },
};

export const DataAnalysisBodyCopy = {
    args: {
        vText: `From the data you have inputted, I can see an overall drop-off rate of 44% from the PLP to the PDP. Returning users are 70% more likely to go back to a category that they viewed in a previous session. Returning users have an average session time of 20 minutes meaning they are spending a considerable amount of time browsing products. 80% of those users to not purchase and spend longer browsing products.`,
        type: `Body/b1-reg`,
        color: `cd`,
    },
};

export const UserBehaviorTitleCopy = {
    args: {
        vText: `User behaviour insights`,
        type: `Title/h2`,
        color: `f6`,
    },
};

export const UserBehaviorBodyCopy = {
    args: {
        vText: `The data indicates potential friction points or decision paralysis, with users engaging deeply but struggling to make purchase decisions.`,
        type: `Body/b1-reg`,
        color: `cd`,
    },
};

export const OpportunityForImprovementTitleCopy = {
    args: {
        vText: `Opportunity for improvement`,
        type: `Title/h2`,
        color: `f6`,
    },
};

export const OpportunityForImprovementBodyCopy = {
    args: {
        vText: `Optimizing product listings and streamlining the buying process could improve conversions.`,
        type: `Body/b1-reg`,
        color: `cd`,
    },
};

export const ExecutionTitleCopy = {
    args: {
        vText: `Execution`,
        type: `Title/h2`,
        color: `f6`,
    },
};

export const ExecutionBodyCopy = {
    args: {
        vText: `Improving Discoverability: Enhancing search filters, product categories, and sorting options can help users find what they are looking for faster, reducing frustration and drop-offs.`,
        type: `Body/b1-reg`,
        color: `cd`,
    },
};

export const Proposal1LabelCopy = {
    args: {
        vText: `Proposal 1`,
        type: `Label 2`,
        color: `cd`,
    },
};

export const Proposal1TitleCopy = {
    args: {
        vText: `Optimise product listings`,
        type: `Title/h3`,
        color: `f6`,
    },
};

export const Proposal1BodyCopy = {
    args: {
        vText: `Reducing decision fatigue and improving navigation can encourage users to progress and ultimately convert.`,
        type: `Body/b1-med`,
        color: `cd`,
    },
};

export const Proposal2LabelCopy = {
    args: {
        vText: `Proposal 2`,
        type: `Label 2`,
        color: `cd`,
    },
};

export const Proposal2TitleCopy = {
    args: {
        vText: `Enhance product imagery`,
        type: `Title/h4`,
        color: `f6`,
    },
};

export const Proposal2BodyCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur. Sagittis sed vitae integer eleifend dictum malesuada morbi.dictum malesuada morbi.`,
        type: `Body/b1-med`,
        color: `cd`,
    },
};

export const Proposal3LabelCopy = {
    args: {
        vText: `Proposal 3`,
        type: `Label 2`,
        color: `cd`,
    },
};

export const Proposal3TitleCopy = {
    args: {
        vText: `Preview customer reviews`,
        type: `Title/h4`,
        color: `f6`,
    },
};

export const Proposal3BodyCopy = {
    args: {
        vText: `Lorem ipsum dolor sit amet consectetur. Sagittis sed vitae integer eleifend dictum malesuada morbi.dictum malesuada morbi.`,
        type: `Body/b1-med`,
        color: `cd`,
    },
};

export const OutOfScansTitleCopy = {
    args: {
        vText: `Out of scans!`,
        type: `Title/h1`,
        color: `f6`,
    },
};

export const OutOfScansSubTitleCopy = {
    args: {
        vText: `View pricing plans to access more, and improve your website.`,
        type: `Title/h3`,
        color: `cd`,
    },
};

export const FlexiblePlansCopy = {
    args: {
        vText: `Flexible plans for your needs`,
        type: `Title/h1`,
        color: `f6`,
    },
};

export const FlexiblePlansSubCopy = {
    args: {
        vText: `Whether you need a quick scan or ongoing optimisation, I’ve got you covered.`,
        type: `Title/h4`,
        color: `cd`,
    },
};

export const OneScanTitleCopy = {
    args: {
        vText: `1 scan`,
        type: `Title/h3`,
        color: `f6`,
    },
};

export const OneScanSubTextCopy = {
    args: {
        vText: `Perfect for one-time diagnostics`,
        type: `Label 2`,
        color: `cd`,
    },
};

export const OneScanPriceCopy = {
    args: {
        vText: `£3.99`,
        type: `Title/h1`,
        color: `f6`,
        inline: true,
    },
};

export const UnlimitedScansTitleCopy = {
    args: {
        vText: `Unlimited scans`,
        type: `Title/h3`,
        color: `f6`,
    },
};

export const UnlimitedScansSubTextCopy = {
    args: {
        vText: `For unlimited optimization and maximum flexibility`,
        type: `Label 2`,
        color: `cd`,
    },
};

export const UnlimitedScansPriceCopy = {
    args: {
        vText: `£49.99`,
        type: `Title/h1`,
        color: `f6`,
        inline: true,
    },
};

export const UnlimitedScansDurationCopy = {
    args: {
        vText: `/year`,
        type: `Label 2`,
        color: `cd`,
        inline: true,
    },
};

export const TwentyScansTitleCopy = {
    args: {
        vText: `20 scans`,
        type: `Title/h3`,
        color: `f6`,
    },
};

export const TwentyScansSubTextCopy = {
    args: {
        vText: `For small businesses with moderate needs`,
        type: `Label 2`,
        color: `cd`,
    },
};

export const TwentyScansPriceCopy = {
    args: {
        vText: `£19.99`,
        type: `Title/h1`,
        color: `f6`,
        inline: true,
    },
};

export const TwentyScansDurationCopy = {
    args: {
        vText: `/year`,
        type: `Label 2`,
        color: `cd`,
        inline: true,
    },
};

export const ExtraMonthsCopy = {
    args: {
        vText: `+3 EXTRA months`,
        type: `Title/h4`,
        color: `ab`,
    },
};

export const TrustedUsCopy = {
    args: {
        vText: `Trusted by industry leaders to analyse and optimise`,
        type: `Body/b1-med`,
        color: `cd`,
    },
};
