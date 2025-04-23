import { DEFAULT_MODEL } from "@/constants";
import OpenAI from "openai";
import { user } from "./message";
import { Prompt } from "./prompt";
import Client from "../composables/client";

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

        const client = new Client(API_SERVER_URL);
        const stream = await client.prompt.sendFeedback({
            threadId: this.threadId,
            message: message || ``,
        });

        let hypotheses: Hypothesis[] = [];
        for await (const response of stream) {
            if (response.hypotheses) {
                hypotheses = response.hypotheses;
            }
            if (Object.prototype.hasOwnProperty.call(response, `message`)) {
                this.recordProgress(response.message);
            }
        }

        return hypotheses;
    }

    private async analyze(): Promise<Hypothesis[]> {
        const client = new Client(API_SERVER_URL);
        const stream = await client.prompt.generateHypotheses();

        await stream.send({
            goal: this.goal || ``,
            overview: this.overview || ``,
            details: this.details || ``,
            screenshots: this.screenshots,
            data: this.data,
        });

        let hypotheses: Hypothesis[] = [];
        this.recordProgress(`Analysing data for tailored improvements`);
        for await (const response of stream) {
            if (response.hypotheses) {
                hypotheses = response.hypotheses;
            }
            if (response.threadId) {
                this.onSetThreadId(response.threadId);
            }
            if (Object.prototype.hasOwnProperty.call(response, `message`)) {
                this.recordProgress(response.message);
            }

        }

        return hypotheses;
    }

    private get model() {
        return DEFAULT_MODEL;
    }

}
