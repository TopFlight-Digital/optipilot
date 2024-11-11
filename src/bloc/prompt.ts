import { ChatCompletionContentPartImage } from "openai/resources/index.mjs";

export abstract class Prompt {
    public toJpeg(url: string): ChatCompletionContentPartImage {
        return {
            "type": `image_url`,
            "image_url": {
                url,
            },
        };
    }
}
