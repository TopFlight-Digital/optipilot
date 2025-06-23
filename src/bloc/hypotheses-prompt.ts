import { Prompt } from "./prompt";
import Client from "../composables/client";
import { fileToDataUrl } from "./upload";

export type Hypothesis = {
    title: string;
    description: string;
};

type RecordProgress = (message?: string) => void;
type OnSetThreadId = (threadId?: string) => void;
type OnError = () => void;

export class HypothesesPrompt extends Prompt {
    private recordProgress: RecordProgress;

    private onSetThreadId: OnSetThreadId;

    private onError: OnError;

    constructor(
        recordProgress: RecordProgress,
        onSetThreadId: OnSetThreadId,
        onError: OnError,
    ) {
        super();
        this.recordProgress = recordProgress;
        this.onSetThreadId = onSetThreadId;
        this.onError = onError;
    }

    private screenshots: string[] = [];

    private goal?: string;

    private overview?: string;

    private details?: string;

    private data: File[] = [];

    private _threadId?: string;

    private likedIdeas: Hypothesis[] = [];

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

    public withLikedIdeas(liked: Hypothesis[]) {
        this.likedIdeas = liked;
        return this;
    }

    public async request(
        message?: string,
        threadId?: string,
    ): Promise<Hypothesis[]> {
        this.threadId = threadId ?? undefined;

        const hypotheses = await (this.threadId
            ? this.sendFeedback(message)
            : this.analyze());

        console.log(`hypotheses`, hypotheses);

        return hypotheses;
    }

    private async sendFeedback(message?: string): Promise<Hypothesis[]> {
        if (!this.threadId) {
            throw new Error(`Thread ID is required`);
        }

        const client = new Client(API_SERVER_URL);
        const feedbackPayload: any = {
            threadId: this.threadId,
            message: message || ``,
        };
        if (this.likedIdeas && this.likedIdeas.length > 0) {
            feedbackPayload.likedIdeas = this.likedIdeas;
        }
        const stream = await client.prompt.sendFeedback(feedbackPayload);

        let hypotheses: Hypothesis[] = [];
        for await (const response of stream) {
            if (response.hypotheses) {
                hypotheses = response.hypotheses;
            }
            if (response.error) {
                this.onError();
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

        const serializedData = await Promise.all(
            this.data.map(file => fileToDataUrl(file)),
        );

        const analyzePayload: any = {
            goal: this.goal || ``,
            overview: this.overview || ``,
            details: this.details || ``,
            screenshots: this.screenshots,
            data: serializedData,
        };
        if (this.likedIdeas && this.likedIdeas.length > 0) {
            analyzePayload.likedIdeas = this.likedIdeas;
        }
        await stream.send(analyzePayload);

        let hypotheses: Hypothesis[] = [];
        this.recordProgress(`Analysing data for tailored improvements`);
        for await (const response of stream) {
            if (response.hypotheses) {
                hypotheses = response.hypotheses;
            }
            if (response.threadId) {
                this.onSetThreadId(response.threadId);
            }
            if (response.error) {
                this.onError();
            }
            if (Object.prototype.hasOwnProperty.call(response, `message`)) {
                this.recordProgress(response.message);
            }
        }

        return hypotheses;
    }
}
