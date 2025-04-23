import { Prompt } from "./prompt";
import Client from "../composables/client";

export class ScanTitlePrompt extends Prompt {
    private threadId: string;

    private client: Client;

    constructor(threadId: string) {
        super();
        this.threadId = threadId;
        this.client = new Client(API_SERVER_URL);
    }

    public async request(): Promise<string> {
        const response = await this.client.prompt.generateTitle({
            threadId: this.threadId,
        });

        return response.title;
    }
}
