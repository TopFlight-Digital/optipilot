import { DEFAULT_HYPOTHESES_CAP, DEFAULT_MODEL } from "./constants";
import OpenAI from "openai";
import type { ThreadCreateParams } from "openai/resources/beta/index.mjs";
import type { ImageFileContentBlock } from "openai/resources/beta/threads/messages.mjs";
import { cluster } from "radash";
import { user } from "./message";
import { Prompt } from "./prompt";
import { dataUrlToFileInstance, isImage } from "./upload";
import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { StreamInOut } from "encore.dev/api";

export type Hypothesis = {
    title: string;
    description: string;
}

type RecordProgress = (message?: string) => void;
type OnSetThreadId = (threadId?: string) => void;
type OnEror = (error?: string) => void;

export class HypothesesPrompt extends Prompt {
    private recordProgress: RecordProgress;

    private onSetThreadId: OnSetThreadId;

    private onError: OnEror;

    constructor(recordProgress: RecordProgress, onSetThreadId: OnSetThreadId, onError: OnEror, assistantID: string, openAIAPIKey: string) {
        super();
        this.recordProgress = recordProgress;
        this.onSetThreadId = onSetThreadId;
        this.onError = onError;
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

    public async sendFeedback(message?: string): Promise<Hypothesis[]> {
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
            // console.log(`message3`, message);
            if (!(++streams % 25)) this.recordProgress();

            if (message.event === `thread.message.completed`) {
                return JSON.parse(message.data.content[0].text.value);
            }
        }

        return [];
    }

    // eslint-disable-next-line sonarjs/cognitive-complexity
    public async analyze(): Promise<Hypothesis[]> {
        try {
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
                if (!(++streams % 17)) this.recordProgress();

                if (message.event === `thread.created`) {
                    this.threadId = message.data.id;
                }
                // console.log(`message1`, message);
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
                if (!(++streams % 17)) this.recordProgress();
                // console.log(`message5`, message);
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
                        user`
                            Come up with up to ${this.cap} thoughtful and creative A/B test hypotheses that are specific to the provided web page, goal, and business context.

                            Your output should *not* include vague or generic suggestions like "make the CTA stand out" or "add urgency." Instead, each idea must:

                            1. Be **tailored to the specific product or service offering** — consider what type of user would be visiting this page, what they're likely trying to achieve, and what barriers may prevent them from converting.
                            2. Highlight **specific user pain-points or frictions** observed or implied in the UI, UX, or page content — e.g., trust concerns, choice paralysis, unclear value propositions, technical understanding gaps.
                            3. Propose **creative and brand-relevant test ideas** that aim to solve these issues — ideas should feel insightful, as if crafted by a seasoned CRO strategist.
                            4. Include a short, structured rationale using this format:

                            ---
                            **Test Idea X:**
                            - **Rationale:** [Explain the user problem, the missed opportunity, or friction point.]
                            - **Hypothesis:** [Describe the change and why it could improve conversions.]
                            - **Success metric:** [What outcome are we trying to improve?]
                            ---

                            Where possible:
                            - Reference the **specific section or visual element** of the page (e.g., "beneath the product title", "in the right-hand filter column").
                            - Include **brand-level nuance** if context is provided. For example, if it's a high-trust B2B brand, test ideas should reflect those values (e.g., credibility building, ROI calculators, case study surfacing).
                            - Feel free to suggest use of AI tools or progressive features, but only when it makes sense for this business and user need.

                            Here are some examples of strong hypotheses (do not repeat them, just use them as inspiration for format and tone):

                            **Example 1:**
                            - **Rationale:** DIY shoppers may not understand which sheet material suits their use case.
                            - **Hypothesis:** If we surface an AI-powered assistant that recommends materials based on intended use, we'll reduce choice paralysis and increase conversion.
                            - **Success metric:** Product add-to-cart rate.

                            **Example 2:**
                            - **Rationale:** Trustpilot ratings are excellent but under-leveraged.
                            - **Hypothesis:** Showing Trustpilot badges alongside high-cost items and at checkout will improve confidence and reduce drop-off.
                            - **Success metric:** Checkout initiation rate.

                            ---

                            Make each idea count. Focus on impact, insight, and strategic creativity — like a top-tier CRO consultant would. OPTIPILOT!
                            `,
                    ],
                    stream: true,
                },
            );

            this.recordProgress();
            streams = 0;

            for await (const message of response) {
                if (!(++streams % 27)) this.recordProgress();

                // console.log(`message2`, message);
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
                if (!(++streams % 17)) this.recordProgress();

                // console.log(`message3`, message);
                if (message.event === `thread.message.completed`) {
                    hypotheses = JSON.parse(message.data.content[0].text.value);
                }
            }

            this.recordProgress();

            return hypotheses;
        } catch (error) {
            this.onError(`Error analyzing hypotheses: ${error}`);
            throw error;
        }
    }

    private get model() {
        return DEFAULT_MODEL;
    }

    private get cap() {
        return DEFAULT_HYPOTHESES_CAP;
    }
}

interface HypothesesRequest {
    goal: string;
    overview: string;
    details: string;
    screenshots?: string[];
    data?: string[];
}

interface HypothesesResponse {
    hypotheses?: Hypothesis[];
    message?: string;
    threadId?: string;
    error?: string
}

const openaiApiKey = secret("OpenAIAPIKey");
const assistantId = secret("AssistantID");

export const generateHypotheses = api.streamInOut<HypothesesRequest, HypothesesResponse>(
    { expose: true },
    async(stream: StreamInOut<HypothesesRequest, HypothesesResponse>) => {
        const prompt = new HypothesesPrompt(
            message => {
                stream.send({ message: message ?? `` });
            },
            value => {
                stream.send({ threadId: value });
            },
            error => {
                stream.send({ error: error ?? `` });
                stream.close();
            },
            assistantId(),
            openaiApiKey(),
        );

        for await (const request of stream) {
            const handshake = request as HypothesesRequest;
            const files = handshake.data ? await Promise.all(handshake.data.map(dataUrl => dataUrlToFileInstance(dataUrl))) : [];

            prompt
                .withGoal(handshake.goal)
                .withOverview(handshake.overview)
                .withDetails(handshake.details)
                .withScreenshots(request.screenshots ?? [])
                .withData(files);
            break;
        }

        const hypotheses = await prompt.analyze();

        await stream.send({ hypotheses });
        await stream.close();
    },
);

interface HypothesesFeedbackRequest {
    threadId: string;
    message: string;
}

interface HypothesesFeedbackResponse {
    hypotheses?: Hypothesis[];
    message?: string;
    error?: string;
}

export const sendFeedback = api.streamOut<HypothesesFeedbackRequest, HypothesesFeedbackResponse>(
    { expose: true },
    async(parameters: HypothesesFeedbackRequest, stream) => {
        const prompt = new HypothesesPrompt(
            message => {
                stream.send({ message: message ?? `` });
            },
            () => {},
            error => {
                stream.send({ error: error ?? `` });
                stream.close();
            },
            assistantId(),
            openaiApiKey(),
        );

        prompt.threadId = parameters.threadId;

        const hypotheses = await prompt.sendFeedback(parameters.message);

        await stream.send({ hypotheses });
        await stream.close();
    },
);
