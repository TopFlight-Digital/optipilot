import OpenAI from "openai";
import { Prompt } from "./prompt";
import { DEFAULT_MODEL } from "./constants";
import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";

export class BusinessInfoPrompt extends Prompt {
    private tabTitle: string;

    private client: OpenAI;

    constructor(tabTitle: string, openaiApiKey: string) {
        super();
        this.tabTitle = tabTitle;
        this.client = new OpenAI({
            apiKey: openaiApiKey,
        });
    }

    private get model() {
        return DEFAULT_MODEL;
    }

    public async request(): Promise<string | undefined> {

        const completion = await this.client.chat.completions.create({
            model: this.model,
            messages: [{
                role: "user",
                content: `Analyze whether you have information about the business at the following URL: ${this.tabTitle}.
                If you have information about this business or brand, please provide details about its activities, products, services, and any other relevant information.
                Return the information in a structured format, JSON, with only one key: message.
                If you are don't have information about this business or brand, please respond with JSON { message: null }.
                Omit markdown tokens around the actual JSON response.
                `,
            }],
        });

        if (!completion.choices[0].message.content) {
            return undefined;
        }

        const content = JSON.parse(completion.choices[0].message.content);
        return content.message;
    }
}

const openaiApiKey = secret("OpenAIAPIKey");

interface BusinessInfoRequest {
    tabTitle: string;
}

interface BusinessInfoResponse {
    message: string | undefined;
}

export const analyze = api(
    { expose: true, method: "POST", path: "/business-info" },
    async({ tabTitle }: BusinessInfoRequest): Promise<BusinessInfoResponse> => {

        const prompt = new BusinessInfoPrompt(tabTitle, openaiApiKey());

        const message = await prompt.request();

        return { message };
    },
);
