import { DEFAULT_ARGS } from '@/dev/constants';
import Button from './button.vue';
import forward from '@/icons/forward.svg';

export default {
    component: Button,
};

export const NextButton = {
    args: {
        label: `Next`,
        icon: forward,
        variant: `primary`,
        wide: true,
        ...DEFAULT_ARGS,
    },
};

export const BackButton = {
    args: {
        label: `Back`,
        icon: `backwards`, // replace string with imported icon
        variant: `secondary`,
        wide: true,
        leader: `icon`, // icon, text
        ...DEFAULT_ARGS,
    },
};

export const ScanProductPageButton = {
    args: {
        label: `Scan product page`,
        icon: `forward`, // replace string with imported icon
        variant: `primary`,
        wide: true,
        ...DEFAULT_ARGS,
    },
};

export const EditInputInformationButton = {
    args: {
        label: `Edit input information`,
        icon: `forward`, // replace string with imported icon
        variant: `secondary`,
        wide: true,
        ...DEFAULT_ARGS,
    },
};

export const DownloadProposalButton = {
    args: {
        label: `Download proposal`,
        icon: `download`, // replace string with imported icon
        variant: `primary`,
        wide: true,
        ...DEFAULT_ARGS,
    },
};

export const DiscardButton = {
    args: {
        label: `Discard`,
        variant: `secondary`,
        wide: true,
        size: `xsmall`, // xsmall, small, regular
        ...DEFAULT_ARGS,
    },
};

export const PackagesButton = {
    args: {
        label: `Packages`,
        variant: `primary`,
        wide: true,
        ...DEFAULT_ARGS,
    },
};

export const TryNowButtonA = {
    args: {
        label: `Try now`,
        variant: `secondary`,
        icon: `forward`, // replace string with imported icon
        size: `xsmall`,
        ...DEFAULT_ARGS,
    },
};

export const TryNowButtonB = {
    args: {
        label: `Try now`,
        variant: `primary`,
        size: `small`, // 32.48px
        ...DEFAULT_ARGS,
    },
};
