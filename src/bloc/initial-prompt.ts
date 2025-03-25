import OpenAI from "openai";
import { Prompt } from "./prompt";
import { user } from "./message";
import { DEFAULT_MODEL } from "@/constants";

type RecordProgress = (message?: string) => void;


export class InitialPrompt extends Prompt {
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
                content: `Analyze whether you have information about the business at the following URL: ${this.tabTitle}. If you have information about this business or brand, please provide details about its activities, products, services, and any other relevant information.`,
            }],
        });

        return completion.choices[0].message.content;
    }
}
