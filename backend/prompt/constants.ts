import { ChatModel } from "openai/resources/chat/index.mjs";

export const DEFAULT_MODEL = `gpt-4o` as const satisfies ChatModel;