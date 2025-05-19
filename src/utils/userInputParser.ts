import { UserInput } from "../types/UserInput";
import { MessageType } from "../types/MessageType";

export function parseUserInput(text: string): UserInput {
    const trimmed = text.trim();
    if (trimmed.startsWith("/")) {
        const [raw, ...rest] = trimmed.split(/\s+/);
        return { type: MessageType.Command, name: raw.slice(1).toLowerCase(), args: rest };
    }
    return { type: MessageType.Message, content: text };
}
