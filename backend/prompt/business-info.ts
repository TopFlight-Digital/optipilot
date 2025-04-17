import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { BusinessInfoPrompt } from "./business-info-prompt";

// Define the OpenAI API key as a secret
const openaiApiKey = secret("OpenAIAPIKey");

interface BusinessInfoRequest {
    tabTitle: string;
}

interface BusinessInfoResponse {
    message: string | undefined;
}

export const analyze = api(
    { expose: true, method: "POST", path: "/business-info" },
    async ({ tabTitle }: BusinessInfoRequest): Promise<BusinessInfoResponse> => {

        const prompt = new BusinessInfoPrompt(tabTitle, openaiApiKey());

        const message = await prompt.request();

        return { message };
    }
);
