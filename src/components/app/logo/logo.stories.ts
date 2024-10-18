import { DEFAULT_ARGS } from '@/dev/constants';
import Logo from './logo.vue';

export default {
    component: Logo,
};

export const logo = {
    args: {
        wide: true,
        ...DEFAULT_ARGS,
    },
};
