import { Prompt } from "./prompt";
import Client from "../composables/client";

export class BusinessInfoPrompt extends Prompt {
    private client: Client;

    private tabTitle: string;

    constructor(tabTitle: string) {
        super();
        this.tabTitle = tabTitle;
        this.client = new Client(API_SERVER_URL);
    }

    public async request(): Promise<string | undefined> {
        const data = await this.client.prompt.analyze({ tabTitle: this.tabTitle });
        return data.message;
    }
}
