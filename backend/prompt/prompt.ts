import { api } from "encore.dev/api";

import { ImageURLContentBlock } from "openai/resources/beta/threads/messages.mjs";

export abstract class Prompt {
    public toJpeg(url: string): ImageURLContentBlock {
        return {
            "type": `image_url`,
            "image_url": {
                url,
            },
        };
    }
}