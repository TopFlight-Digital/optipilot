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

    public async request(): Promise<string> {
        const stream = await this.client.beta.threads.createAndRun({
            assistant_id: ASSISTANT_ID,
            thread: {
                messages: [
                    user`Analyze whether you have information about the business at the following URL: ${this.tabTitle}. If you have information about this business or brand, please provide details about its activities, products, services, and any other relevant information`,
                ],
            },
            model: this.model,
            stream: true,
        });

        let text = ``;

        let streams = 0;

        for await (const message of stream) {
            if (!(++streams % 25)) this.recordProgress();
            if (message.event === `thread.message.completed`) {
                this.recordProgress();
                text = message.data.content[0].text.value;
            }
            console.log(`initial msg #1`, message);
        }

        return text;
    }
}
