import type { ChatModel } from "openai/resources/chat/index.mjs";

export const DEFAULT_MODEL = "gpt-4o" as const satisfies ChatModel;

export const DEFAULT_HYPOTHESES_CAP = 5 as const;
