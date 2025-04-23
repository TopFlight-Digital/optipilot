import { DEFAULT_MODEL } from "./constants";
import OpenAI from "openai";
import { Prompt } from "./prompt";
import { user } from "./message";
import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";

export class ScanTitlePrompt extends Prompt {
    private threadId: string;

    private get model() {
        return DEFAULT_MODEL;
    }

    private client: OpenAI;

    private assistantID: string;

    constructor(threadId: string, openaiApiKey: string, assistantID: string) {
        super();
        this.threadId = threadId;
        this.client = new OpenAI({
            apiKey: openaiApiKey,
        });
        this.assistantID = assistantID;
    }

    public async request(): Promise<string> {
        const response = await this.client.beta.threads.runs.create(
            this.threadId,
            {
                model: this.model,
                assistant_id: this.assistantID,
                additional_messages: [
                    user`Please provide a title for this scan. Do not mention site name. 4 words max. Return the title as a JSON string, e.g. \`\`\`"Scan 1"\`\`\``,
                ],
                stream: true,
            },
        );

        let title = ``;

        for await (const message of response) {
            console.log(`message4`, message);
            if (message.event === `thread.message.completed`) {
                console.log(message.data.content[0].text.value);
                title = JSON.parse(message.data.content[0].text.value);
            }
        }

        return title;
    }
}

interface ScanTitleRequest {
    threadId: string;
}

interface ScanTitleResponse {
    title: string;
}

const openaiApiKey = secret("OpenAIAPIKey");
const assistantId = secret("AssistantID");

export const generateTitle = api(
    { expose: true, method: "POST" },
    async(parameters: ScanTitleRequest): Promise<ScanTitleResponse> => {
        const prompt = new ScanTitlePrompt(
            parameters.threadId,
            openaiApiKey(),
            assistantId(),
        );

        const title = await prompt.request();

        return { title };
    },
);

