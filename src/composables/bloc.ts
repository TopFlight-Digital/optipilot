import useVuelidate from "@vuelidate/core";
import { required, url } from "@vuelidate/validators";

function fields(tab: MaybeRefOrGetter<chrome.tabs.Tab>) {
    const { domain } = useTab(tab);

    function key(value: TemplateStringsArray) {
        return `${domain.value ?? ``}.${value[0]}`;
    }

    const product = {
        website: useStorage(
            key`product.website`,
            ``,
        ),
        goal: useStorage(
            key`product.goal`,
            ``,
        ),
        additionalGoals: useStorage(
            key`product.additionalGoals`,
            ``,
        ),
        overview: useStorage(
            key`product.overview`,
            ``,
        ),
        data: useStorage(
            key`product.data`,
            [],
        ),
    };

    const scan = {
        page: useStorage(
            key`scan.page`,
            ``,
        ),
        name: useStorage(
            key`scan.name`,
            ``,
        ),
        objective: useStorage(
            key`scan.objective`,
            ``,
        ),
        overview: useStorage(
            key`scan.overview`,
            ``,
        ),
        data: useStorage(
            key`scan.data`,
            [],
        ),
    };

    return {
        product: {
            ...product,
            $validation: useVuelidate({
                website: { required, url },
                goal: { required },
                additionalGoals: {},
                overview: { required },
                data: { required },
            }, product),
        },
        scan: {
            ...scan,
            $validation: useVuelidate({
                page: { required, url },
                name: { required },
                objective: { required },
                data: { required },
            }, scan),
        },
    };
}

const bloc = reactive(Object.assign(
    {} as ReturnType<typeof fields>,
    {
        ready: ref(false),
    },
));

export function defineBloc() {
    provide(`bloc`, bloc);
    return bloc;
}

export function initBloc(tab: MaybeRefOrGetter<chrome.tabs.Tab>) {
    Object.assign(bloc, fields(tab));
    bloc.ready = true;

    return bloc;
}

type Bloc = ReturnType<typeof initBloc>;

export function useBloc() {
    return inject(`bloc`) as Bloc;
}
