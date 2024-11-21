import { HypothesesPrompt, Hypothesis } from "@/bloc/hypotheses-prompt";
import { BREAKPOINTS, DEVICE_TYPE_OPTIONS, DeviceType } from "@/constants";
import useVuelidate from "@vuelidate/core";
import { required, url } from "@vuelidate/validators";

function fields(tab: MaybeRefOrGetter<chrome.tabs.Tab>) {
    const { domain } = useTab(tab);

    function key(value: TemplateStringsArray) {
        return `${domain.value ?? ``}.${value[0]}`;
    }

    const product = {
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
        deviceType: useStorage<DeviceType>(
            key`scan.deviceType`,
            `desktop`,
        ),
    };

    const feedback = {
        message: ref(``),
    };

    const screenshotsToTake = ref(1);

    return {
        product: {
            ...product,
            $validation: useVuelidate({
                overview: { required },
                data: {},
            }, product),
        },
        scan: {
            ...scan,
            $validation: useVuelidate({
                objective: { required },
                data: {},
                deviceType: {
                    required,
                    oneOf(value: string) {
                        // @ts-expect-error — `includes` typing too strict.
                        return DEVICE_TYPE_OPTIONS.map(({ slug }) => slug).includes(value);
                    },
                },
            }, scan),
        },
        feedback: {
            ...feedback,
            $validation: useVuelidate({
                message: { required },
            }, feedback),
        },
        progress: {
            numerator: ref(0),
            denominator: computed(() => screenshotsToTake.value + 3),
            // TODO: bring back increment w/ reassurance.
        },
        screenshots: ref<string[]>([]),
        takeScreenshots(currentTab: chrome.tabs.Tab) {
            type State = {
                top: number, step: number, pageHeight: number
            }

            return new Promise<void>(resolve => {
                function takeScreenshot(first = false) {
                    if (first) bloc.screenshots = [];

                    chrome.scripting.executeScript<[first: boolean], Promise<State>>(
                        {
                            target: { tabId: currentTab.id! },
                            func: async first => {
                                const top = first
                                    ? 0
                                    : window.scrollY + window.innerHeight;

                                window.scrollTo(0, top);
                                await new Promise(resolve => setTimeout(resolve, 500));

                                return { top, step: window.innerHeight, pageHeight: document.body.scrollHeight };
                            },
                            args: [first],
                        },
                        async injectionResults => {
                            const { top, step, pageHeight } = injectionResults[0].result as State;

                            if (first) {
                                screenshotsToTake.value = Math.ceil(pageHeight / step);
                            }

                            if (chrome.runtime.lastError) {
                                console.error(chrome.runtime.lastError.message);
                                return;
                            }

                            const screenshot = await chrome.tabs.captureVisibleTab();

                            bloc.screenshots.push(screenshot);
                            bloc.progress.numerator += 1;

                            if (top + step < pageHeight) {
                                takeScreenshot();
                            } else resolve();
                        },
                    );
                }

                takeScreenshot(true);
            });
        },

        prompt: new HypothesesPrompt(),
        pending: ref(false),

        async submit() {
            bloc.pending = true;
            bloc.progress.numerator = 1;

            const currentTab = toValue(tab);
            resizeCurrentTab(BREAKPOINTS[bloc.scan.deviceType](), window.screen.availHeight);

            await bloc.takeScreenshots(currentTab);

            bloc.progress.numerator += 1;

            bloc.prompt
                .withScreenshots(bloc.screenshots)
                .withGoal(bloc.scan.objective)
                .withOverview(bloc.product.overview);

            bloc.progress.numerator += 1;

            const results = await bloc.prompt.request();
            bloc.hypotheses = results;
            bloc.progress.numerator += 1;
            bloc.pending = false;
        },
        async submitFeedback() {
            bloc.pending = true;
            bloc.progress.numerator = 1;

            const results = await bloc.prompt.request(bloc.feedback.message);

            bloc.hypotheses = results;
            bloc.progress.numerator += 1;
            bloc.pending = false;
        },

        hypotheses: useStorage<Hypothesis[]>(
            key`hypotheses`,
            [],
        ),
        hostFavicon: computed(() => toValue(tab).favIconUrl),
        tab: useStorage(
            key`tab`,
            `website`,
        ),
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


function resizeCurrentTab(width: number, height: number) {
    return new Promise<void>(resolve => {

        chrome.windows.getCurrent(async function(window) {
            const updateInfo = {
                width,
                height,
                focused: false,
            };

            await chrome.windows.update(window.id!, updateInfo);
            resolve();
        });
    });
}
