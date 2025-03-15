import { HypothesesPrompt, Hypothesis } from "@/bloc/hypotheses-prompt";
import { ScanTitlePrompt } from "@/bloc/scan-title-prompt";
import { dataUrlToFileInstance, fileToDataUrl } from "@/bloc/upload";
import { BREAKPOINTS, DEVICE_TYPE_OPTIONS, DeviceType } from "@/constants";
import { Body, Meta, UppyFile } from "@uppy/core";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

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
        details: useStorage(
            key`product.details`,
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
        data: useStorageAsync(
            key`scan.data`,
            [],
            undefined,
            {
                serializer: {
                    async read(value: string) {
                        const deserialized: UppyFile<Meta, Body> & { data: string }[] = JSON.parse(value);

                        const files = await Promise.all(
                            deserialized.map(item => dataUrlToFileInstance(item.data)),
                        );

                        return deserialized.map((item, index) => ({
                            ...item,
                            data: files[index],
                        }));
                    },
                    async write(data: UppyFile<Meta, Body>[]) {
                        const files = await Promise.all(
                            data.map(item => fileToDataUrl(item.data as File)),
                        );

                        return JSON.stringify(
                            data.map((item, index) => ({
                                ...item,
                                data: files[index],
                            })),
                        );
                    },
                },
            },
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
                details: {},
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

        prompt: new HypothesesPrompt(
            (message?: string) => bloc.progress.tick(message),
            (value?: string) => (bloc.threadId = value),
        ),

        threadId: useStorage(
            key`threadId`,
            ``,
        ),

        scanId: ref<string>(``),

        scanIds: useStorage(
            `_scans`,
            [],
        ),

        pending: ref(false),

        async submit() {
            bloc.pending = true;
            bloc.progress.reset(`Gathering screenshots`);

            const currentTab = toValue(tab);

            resizeCurrentTab(
                BREAKPOINTS[bloc.scan.deviceType as keyof typeof BREAKPOINTS](),
                window.screen.availHeight,
            );

            await bloc.takeScreenshots(currentTab);

            bloc.progress.tick();

            bloc.prompt
                .withScreenshots(bloc.screenshots)
                .withData(bloc.scan.data.map(({ data }) => data))
                .withGoal(bloc.scan.objective)
                .withOverview(bloc.product.overview)
                .withDetails(bloc.product.details);

            bloc.progress.tick();

            const results = await bloc.prompt.request();

            bloc.progress.finish();

            const scanId = crypto.randomUUID();
            bloc.scanIds = [...bloc.scanIds, scanId];

            const scan = useScanById(
                scanId,
                {
                    id: scanId,
                    threadId: bloc.threadId,
                    title: ``,
                    date: new Date(),
                    icon: toValue(tab).favIconUrl,
                    hypotheses: results,
                },
            );

            bloc.scanId = scanId;

            setTimeout(() => {
                bloc.hypotheses = results;
                bloc.pending = false;
            }, 300);

            new ScanTitlePrompt(bloc.threadId).request().then(title => {
                scan.value!.title = title;
            });
        },

        async submitFeedback(scanId?: string) {
            const scan = scanId ? useScanById(scanId) : undefined;

            bloc.pending = true;
            bloc.progress.reset(`Gathering feedback`);

            const results = await bloc.prompt.request(
                bloc.feedback.message,
                scan?.value?.threadId || bloc.threadId,
            );

            bloc.progress.finish();

            if (scan?.value) {
                scan.value.hypotheses = results;
                bloc.scanId = scanId;
            }

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
            const updateInfo: chrome.windows.UpdateInfo = {
                width,
                height,
                focused: false,
            };

            await chrome.windows.update(window.id!, updateInfo);
            resolve();
        });
    });
}
