import { DEFAULT_HYPOTHESES_CAP, DEFAULT_MODEL, DESERIALIZABLE_OUTPUT_PROMPT } from "@/constants";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { ChatCompletion } from "openai/src/resources/index.js";
import { Prompt } from "./prompt";

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

    private additionalGoals?: string;

    private overview?: string;

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

    public withAdditionalGoals(value: string) {
        if (value) {
            this.additionalGoals = value;
        }

        return this;
    }

    public withOverview(value: string) {
        if (value) {
            this.overview = value;
        }

        return this;
    }

    public withProductData() {
        return this;
    }

    public withSubject() {
        return this;
    }

    private get messages(): ChatCompletionMessageParam[] {
        const goalMessages = this.goal || this.additionalGoals ? [
            system`Now the user is going to provide the goal(s) of their product:`,
            user`${[this.goal, this.additionalGoals].filter(Boolean).join(`\n`)}`,
        ] as const : [];

        const overviewMessages = this.overview ? [
            system`Now the user is going to provide the overview of their product:`,
            user`${this.overview}`,
        ] as const : [];

        const screenshotMessages = [
            system`The user is going to provide screenshots of the problematic subpage of their product:`,
            {
                role: `user`,
                content: this.screenshots.map(this.toJpeg),
            } as const,
        ];

        const endgamePrompt = system`Come up with up to ${this.cap} ideas for how to improve site to achieve the provided goal, based on the information and screenshots provided.`;

        return [
            system`
                Return what user asks for in a JSON of the following schema:

                type Hypotheses = {
                    title: string;
                    type: 'ab-test' | 'painted-door';
                    description: string;
                }[]
            `,

            DESERIALIZABLE_OUTPUT_PROMPT,

            ...goalMessages,
            ...overviewMessages,
            ...screenshotMessages,

            endgamePrompt,
        ];
    }

    private process(data: ChatCompletion): Hypothesis[] {
        const { choices: [choice] } = data;
        return JSON.parse(choice.message.content!);
    }

    public async request(): Promise<Hypothesis[]> {
        const messages = this.messages;

        const response = await this.client.chat.completions.create({
            messages,
            model: this.model,
        });

        return this.process(response);
    }

    private get model() {
        return DEFAULT_MODEL;
    }

    private get cap() {
        return DEFAULT_HYPOTHESES_CAP;
    }
}
