import { DEFAULT_ARGS } from '@/dev/constants';
import Button from './button.vue';
import forward from '@/icons/forward.svg';
import backwards from '@/icons/backwards.svg';
import download from '@/icons/download.svg';

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
        icon: backwards,
        variant: `secondary`,
        wide: true,
        leader: `icon`, // icon, text
        ...DEFAULT_ARGS,
    },
};

export const ScanProductPageButton = {
    args: {
        label: `Scan product page`,
        icon: forward,
        variant: `primary`,
        wide: true,
        ...DEFAULT_ARGS,
    },
};

export const EditInputInformationButton = {
    args: {
        label: `Edit input information`,
        icon: forward,
        variant: `secondary`,
        wide: true,
        ...DEFAULT_ARGS,
    },
};

export const DownloadProposalButton = {
    args: {
        label: `Download proposal`,
        icon: download,
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
        icon: forward,
        size: `xsmall`,
        ...DEFAULT_ARGS,
    },
};

export const TryNowButtonB = {
    args: {
        label: `Try now`,
        variant: `primary`,
        size: `small`, // 32.48px
        wide: true,
        ...DEFAULT_ARGS,
    },
};
