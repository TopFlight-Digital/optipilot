import { DEFAULT_HYPOTHESES_CAP, DEFAULT_MODEL, DESERIALIZABLE_OUTPUT_PROMPT } from "@/constants";
import OpenAI from "openai";
import { Prompt } from "./prompt";
import { ThreadCreateParams } from "openai/resources/beta/index.mjs";
import { dataUrlToFileInstance } from "./upload";

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

function user(strings: TemplateStringsArray, ...values: any[]) {
    const content = strings.reduce((accumulator, string_, index) => accumulator + string_ + (values[index] || ``), ``);

    return {
        role: `user`,
        content: content.trim(),
    } as const;
}

export class HypothesesPrompt extends Prompt {
    private client = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    private screenshots: string[] = [];

    private goal?: string;

    private overview?: string;

    private threadId?: string;

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

    private async messages(): Promise<ThreadCreateParams.Message[]> {
        const fileIds = [];

        for (const screenshot of this.screenshots) {
            const file = await dataUrlToFileInstance(screenshot);

            const response = await this.client.files.create({
                file,
                purpose: `vision`,
            });

            fileIds.push(response.id);
        }

        const screenshotMessages = [
            user`Here are screenshots of "the Page" in my product. Please list all the features you see describe their colors, appearance, contrast ratio and size:`,
            {
                role: `user`,
                content: fileIds.map(fileId => ({
                    type: `image_file` as const,
                    image_file: {
                        file_id: fileId,
                    },
                })),
            } as const,
        ];

        return [
            ...screenshotMessages,
        ];
    }

    private process(data: OpenAI.Beta.Threads.Runs.Run): Hypothesis[] {
        const { choices: [choice] } = data;
        return JSON.parse(choice.message.content!);
    }

    public async request(message?: string): Promise<Hypothesis[]> {
        let hypotheses: Hypothesis[] = [];

        if (this.threadId) {
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

            for await (const message of response) {
                console.log(`message3`, message);
                if (message.event === `thread.message.completed`) {
                    hypotheses = JSON.parse(message.data.content[0].text.value) as Hypothesis[];
                }
            }

        } else {
            const messages = await this.messages();

            const stream = await this.client.beta.threads.createAndRun({
                assistant_id: `asst_epLX3d0mculRUP4LVL1FYexo`,
                thread: {
                    messages,
                },
                model: this.model,
                stream: true,
            });

            for await (const message of stream) {
                if (message.event === `thread.created`) {
                    this.threadId = message.data.id;
                }
                console.log(`message1`, message);
            }

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

            for await (const message of response) {
                console.log(`message2`, message);
                if (message.event === `thread.message.completed`) {
                    hypotheses = JSON.parse(message.data.content[0].text.value) as Hypothesis[];
                }

            }
        }

        console.log(`hypotheses`, hypotheses);

        return hypotheses;
    }

    private get model() {
        return DEFAULT_MODEL;
    }

    private get cap() {
        return DEFAULT_HYPOTHESES_CAP;
    }
}
