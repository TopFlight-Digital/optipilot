import { DEFAULT_HYPOTHESES_CAP, DEFAULT_MODEL } from "./constants";
import OpenAI from "openai";
import { ThreadCreateParams } from "openai/resources/beta/index.mjs";
import { ImageFileContentBlock } from "openai/resources/beta/threads/messages.mjs";
import { cluster } from "radash";
import { user } from "./message";
import { Prompt } from "./prompt";
import { dataUrlToFileInstance, isImage } from "./upload";


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

    constructor(recordProgress: RecordProgress, onSetThreadId: OnSetThreadId, assistantID: string, openAIAPIKey: string) {
        super();
        this.recordProgress = recordProgress;
        this.onSetThreadId = onSetThreadId;
        this.assistantID = assistantID;
        this.client = new OpenAI({
            apiKey: openAIAPIKey,
        });
    }

    private assistantID: string;

    private client: OpenAI;

    private screenshots: string[] = [];

    private goal?: string;

    private overview?: string;

    private details?: string;

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

    public withDetails(value: string) {
        if (value) {
            this.details = value;
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

        const keyPageAspects = [
            `colors`,
            `appearance`,
            `contrast ratio`,
            `size`,
            `section responsibility`,
            `information density`,
            `cognitive load`,
            `all the elements inside`,
            `problems it currently has disturbing fulfilling its purpose (if any)`,
        ];

        const screenshotMessages = [
            user`Here are screenshots of "the Page" in my product. Please list out all the section headings exactly as you see them, without modifying them. Per section please list all the features you see describe their ${keyPageAspects.join(`, `)}. Don't hesitate to express your opinion describing ideas, like the hitherto version of a section sucks:`,
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
        this.threadId = threadId ?? undefined;
        this.recordProgress();

        const hypotheses = await (this.threadId ? this.sendFeedback(message) : this.analyze());

        console.log(`hypotheses`, hypotheses);
        this.recordProgress();

        return hypotheses;
    }

    private async sendFeedback(message?: string): Promise<Hypothesis[]> {
        if (!this.threadId) {
            throw new Error(`Thread ID is required`);
        }

        this.recordProgress();

        const response = await this.client.beta.threads.runs.create(
            this.threadId,
            {
                model: this.model,
                assistant_id: this.assistantID,
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
                return JSON.parse(message.data.content[0].text.value);
            }
        }

        return [];
    }

    private async analyze(): Promise<Hypothesis[]> {
        let hypotheses: Hypothesis[] = [];
        const messages = await this.messages();
        this.recordProgress(`Analysing data for tailored improvements`);

        const stream = await this.client.beta.threads.createAndRun({
            assistant_id: this.assistantID,
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
                assistant_id: this.assistantID,
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

        const detailsMessages = this.details ? [
            user`Details of this page: ${this.details}`,
        ] as const : [];

        const initialMessages = [
            ...goalMessages,
            ...overviewMessages,
            ...detailsMessages,
        ];

        this.recordProgress(`Crafting smarter suggestions for you`);

        const response = await this.client.beta.threads.runs.create(
            this.threadId!,
            {
                model: this.model,
                assistant_id: this.assistantID,
                additional_messages: [
                    ...initialMessages,
                    user`Come up with up to ${this.cap} ideas for how to improve site to achieve the provided goal, based on the information and screenshots provided. In their descriptions try to:
- refer to specific place on "the Page" like 'above' or 'bottom' etc — if applicable for given idea
- if you're referring to a specific section on the Page, use the section's heading
- highlight if a section is a site's header or footer
- describe why the new experience would be better than the current one by comparing

Please work as if it's a matter of life and death and we have limited time to fulfill the goal. We need ideas that will have maximum impact with balanced effort.
OPTIPILOT!`,
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
                hypotheses = JSON.parse(message.data.content[0].text.value);
            }
        }

        console.log(`Original hypotheses: ${JSON.stringify(hypotheses, null, 2)}`);

        this.recordProgress();

        const refinedResponse = await this.client.beta.threads.runs.create(
            this.threadId!,
            {
                model: this.model,
                assistant_id: this.assistantID,
                additional_messages: [
                    user`
                    Now please return the exact same message as before, just omit very generic ideas especially ones that say no more than "just make it more eye-catching bro". Make an effort to replace these with more thoughtful / insightful ideas.
                    `,
                ],
                stream: true,
            },
        );

        this.recordProgress();
        streams = 0;

        for await (const message of refinedResponse) {
            if (!(++streams % 25)) this.recordProgress();

            console.log(`message3`, message);
            if (message.event === `thread.message.completed`) {
                hypotheses = JSON.parse(message.data.content[0].text.value);
            }
        }

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
