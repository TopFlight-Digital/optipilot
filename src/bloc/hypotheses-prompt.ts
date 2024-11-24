import { DEFAULT_HYPOTHESES_CAP, DEFAULT_MODEL, DESERIALIZABLE_OUTPUT_PROMPT } from "@/constants";
import OpenAI from "openai";
import { Prompt } from "./prompt";
import { ThreadCreateParams } from "openai/resources/beta/index.mjs";
import { dataUrlToFileInstance, isImage } from "./upload";
import { cluster } from "radash";
import { ImageFileContentBlock, ImageURLContentBlock } from "openai/resources/beta/threads/messages.mjs";
import { user } from "./message";

export type Hypothesis = {
    title: string;
    description: string;
}

function system(strings: TemplateStringsArray, ...values: any[]) {
    const content = strings.reduce((accumulator, string_, index) => accumulator + string_ + (values[index] || ``), ``);

    return {
        role: `system`,
        content: content.trim(),
    } as const;
}

type RecordProgress = (message?: string) => void;
type OnSetThreadId = (threadId?: string) => void;

export class HypothesesPrompt extends Prompt {
    private recordProgress: RecordProgress;

    private onSetThreadId: OnSetThreadId;

    constructor(recordProgress: RecordProgress, onSetThreadId: OnSetThreadId) {
        super();
        this.recordProgress = recordProgress;
        this.onSetThreadId = onSetThreadId;
    }

    private client = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    private screenshots: string[] = [];

    private goal?: string;

    private overview?: string;

    private data: File[] = [];

    private _threadId?: string;

    get threadId() {
        return this._threadId;
    }

    set threadId(value) {
        this._threadId = value;
        this.onSetThreadId(value);
    }

    public withScreenshots(data: typeof this.screenshots) {
        this.screenshots = data;
        return this;
    }

    public withGoal(value: string) {
        if (value) {
            this.goal = value;
        }

        return this;
    }

    public withOverview(value: string) {
        if (value) {
            this.overview = value;
        }

        return this;
    }

    public withData(value: File[]) {
        if (value) {
            this.data = value;
        }

        return this;
    }

    private async messages(): Promise<ThreadCreateParams.Message[]> {
        const fileIds = await Promise.all(this.screenshots.map(async screenshot => {
            const file = await dataUrlToFileInstance(screenshot);
            this.recordProgress();

            const response = await this.client.files.create({
                file,
                purpose: `vision`,
            });

            this.recordProgress();
            return response.id;
        }));

        this.recordProgress();

        const fileBatches: ImageFileContentBlock[][] = cluster(
            fileIds.map(id => ({
                type: `image_file` as const,
                image_file: {
                    file_id: id,
                },
            })),
            10,
        );

        const screenshotMessages = [
            user`Here are screenshots of "the Page" in my product. Please list all the features you see describe their colors, appearance, contrast ratio and size:`,
            ...fileBatches.map(content => ({
                role: `user` as const,
                content,
            })),
        ];

        return [
            ...screenshotMessages,
        ];
    }

    private async dataMessages(): Promise<ThreadCreateParams.Message[]> {
        const fileIds = await Promise.all(this.data.map(async file => {
            this.recordProgress();

            const response = await this.client.files.create({
                file,
                purpose: isImage(file) ? `vision` : `assistants`,
            });

            this.recordProgress();
            return { id: response.id, isImage: isImage(file) };
        }));

        this.recordProgress();

        const attachments: ThreadCreateParams.Message.Attachment[] = fileIds
            .filter(({ isImage }) => !isImage)
            .map(({ id }) => ({
                file_id: id,
                tools: [
                    { type: `file_search` as const },
                ],
            }));

        const fileBatches: ImageFileContentBlock[][] = cluster(
            fileIds.filter(({ isImage }) => isImage).map(({ id }) => ({
                type: `image_file` as const,
                image_file: {
                    file_id: id,
                },
            })),
            10,
        );

        return [
            {
                role: `user` as const,
                content: `Determine what kind of content is presented in each of these materials, and what key insights about user behaviour can be derived from them.`,
                attachments,
            },
            ...fileBatches.map(content => ({
                role: `user` as const,
                content,
            })),
        ];
    }

    public async request(message?: string, threadId?: string): Promise<Hypothesis[]> {
        let hypotheses: Hypothesis[] = [];
        this.threadId = threadId ?? undefined;

        this.recordProgress();

        if (this.threadId) {
            this.recordProgress();

            const response = await this.client.beta.threads.runs.create(
                this.threadId,
                {
                    model: this.model,
                    assistant_id: `asst_epLX3d0mculRUP4LVL1FYexo`,
                    additional_messages: [
                        user`Now please return new hypotheses based on feedback provided below. Change only the ones that my feedback pertains to. Leave others intact but still return them in the same order as before.

                        Feedback:
                        ${message}
                        OPTIPILOT!`,
                    ],
                    stream: true,
                },
            );

            this.recordProgress();
            let streams = 0;

            for await (const message of response) {
                console.log(`message3`, message);
                if (!(++streams % 25)) this.recordProgress();

                if (message.event === `thread.message.completed`) {
                    hypotheses = JSON.parse(message.data.content[0].text.value) as Hypothesis[];
                }
            }

        } else {
            const messages = await this.messages();
            this.recordProgress(`Analysing data for tailored improvements`);

            const stream = await this.client.beta.threads.createAndRun({
                assistant_id: `asst_epLX3d0mculRUP4LVL1FYexo`,
                thread: {
                    messages,
                },
                model: this.model,
                stream: true,
            });

            this.recordProgress();
            let streams = 0;

            for await (const message of stream) {
                if (!(++streams % 25)) this.recordProgress();

                if (message.event === `thread.created`) {
                    this.threadId = message.data.id;
                }
                console.log(`message1`, message);
            }

            this.recordProgress();

            const dataMessages = await this.dataMessages();
            this.recordProgress();

            const dataResponse = await this.client.beta.threads.runs.create(
                this.threadId!,
                {
                    model: this.model,
                    assistant_id: `asst_epLX3d0mculRUP4LVL1FYexo`,
                    additional_messages: dataMessages,
                    stream: true,
                },
            );

            this.recordProgress();
            streams = 0;

            for await (const message of dataResponse) {
                if (!(++streams % 25)) this.recordProgress();
                console.log(`message5`, message);
            }

            this.recordProgress();

            const goalMessages = this.goal ? [
                user`The goal of my product: ${this.goal}`,
            ] as const : [];

            const overviewMessages = this.overview ? [
                user`Overview of my product: ${this.overview}`,
            ] as const : [];

            const initialMessages = [
                ...goalMessages,
                ...overviewMessages,
            ];

            this.recordProgress(`Crafting smarter suggestions for you`);

            const response = await this.client.beta.threads.runs.create(
                this.threadId!,
                {
                    model: this.model,
                    assistant_id: `asst_epLX3d0mculRUP4LVL1FYexo`,
                    additional_messages: [
                        ...initialMessages,
                        user`Come up with up to ${this.cap} ideas for how to improve site to achieve the provided goal, based on the information and screenshots provided. In their descriptions try to — refer to specific place on "the Page" like 'above' or 'bottom' etc — if applicable for given idea. OPTIPILOT!`,
                    ],
                    stream: true,
                },
            );

            this.recordProgress();
            streams = 0;

            for await (const message of response) {
                if (!(++streams % 25)) this.recordProgress();

                console.log(`message2`, message);
                if (message.event === `thread.message.completed`) {
                    hypotheses = JSON.parse(message.data.content[0].text.value) as Hypothesis[];
                }
            }

            this.recordProgress();
        }

        console.log(`hypotheses`, hypotheses);
        this.recordProgress();

        return hypotheses;
    }

    private get model() {
        return DEFAULT_MODEL;
    }

    private get cap() {
        return DEFAULT_HYPOTHESES_CAP;
    }
}
