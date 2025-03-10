import { DEFAULT_HYPOTHESES_CAP, DEFAULT_MODEL, DESERIALIZABLE_OUTPUT_PROMPT } from "@/constants";
import OpenAI from "openai";
import { Prompt } from "./prompt";
import { user } from "./message";

export class ScanTitlePrompt extends Prompt {
    private threadId: string;

    private get model() {
        return DEFAULT_MODEL;
    }

    private client = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    constructor(threadId: string) {
        super();
        this.threadId = threadId;
    }

    public async request(): Promise<string> {
        const response = await this.client.beta.threads.runs.create(
            this.threadId,
            {
                model: this.model,
                assistant_id: ASSISTANT_ID,
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
