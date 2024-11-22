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
            step: 1,
            message: ref(``),
            numerator: ref(0),
            denominator: computed(() => Math.min(100, screenshotsToTake.value * 20)),

            tick(message?: string) {
                const { numerator, denominator } = bloc.progress;
                if (numerator >= denominator - 2) {
                    bloc.progress.step *= .6;
                    bloc.progress.numerator += bloc.progress.step;
                } else {
                    bloc.progress.numerator = Math.min(
                        numerator + bloc.progress.step,
                        denominator - 2,
                    );
                }

                if (message) bloc.progress.message = message;
            },

            finish() {
                bloc.progress.numerator = bloc.progress.denominator;
            },

            reset(message: string) {
                bloc.progress.step = 1;
                bloc.progress.message = message;
                bloc.progress.numerator = 0;
            },
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
                            bloc.progress.tick();

                            if (top + step < pageHeight) {
                                takeScreenshot();
                            } else resolve();
                        },
                    );
                }

                takeScreenshot(true);
            });
        },

        prompt: new HypothesesPrompt((message?: string) => bloc.progress.tick(message)),
        pending: ref(false),

        async submit() {
            bloc.pending = true;
            bloc.progress.reset(`Gathering screenshots`);

            const currentTab = toValue(tab);
            resizeCurrentTab(BREAKPOINTS[bloc.scan.deviceType](), window.screen.availHeight);

            await bloc.takeScreenshots(currentTab);

            bloc.progress.tick();

            bloc.prompt
                .withScreenshots(bloc.screenshots)
                .withGoal(bloc.scan.objective)
                .withOverview(bloc.product.overview);

            bloc.progress.tick();

            const results = await bloc.prompt.request();

            bloc.progress.finish();

            setTimeout(() => {
                bloc.hypotheses = results;
                bloc.pending = false;
            }, 300);
        },
        async submitFeedback() {
            bloc.pending = true;
            bloc.progress.reset(`Gathering feedback`);

            const results = await bloc.prompt.request(bloc.feedback.message);

            bloc.progress.finish();
            bloc.hypotheses = results;
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
