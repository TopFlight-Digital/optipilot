import OpenAI from "openai";
import { Prompt } from "./prompt";
import { DEFAULT_MODEL } from "@/constants";

type RecordProgress = (message?: string) => void;


export class BusinessInfoPrompt extends Prompt {
    private tabTitle: string;

    private recordProgress: RecordProgress;

    private get model() {
        return DEFAULT_MODEL;
    }

    private client = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    constructor(tabTitle: string, recordProgress: RecordProgress) {
        super();
        this.tabTitle = tabTitle;
        this.recordProgress = recordProgress;
    }

    public async request(): Promise<string | null> {

        const completion = await this.client.chat.completions.create({
            model: this.model,
            messages: [{
                role: `user`,
                content: `Analyze whether you have information about the business at the following URL: ${this.tabTitle}.
                If you have information about this business or brand, please provide details about its activities, products, services, and any other relevant information.
                Return the information in a structured format, JSON, with the following keys: message.
                If you are don't have information about this business or brand, please respond with JSON { message: null }.
                Omit markdown tokens around the actual JSON response.
                `,
            }],
        });
        if (!completion.choices[0].message.content) {
            return ``;
        }
        const content = JSON.parse(completion.choices[0].message.content);
        return content.message;
    }
}
