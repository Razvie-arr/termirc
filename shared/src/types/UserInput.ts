import { MessageType } from "./MessageType";

export interface CommandMessage {
    type: MessageType.Command;
    name: string;
    args: string[];
}
export interface ChatMessage {
    type: MessageType.Message;
    content: string;
}

export type UserInput = CommandMessage | ChatMessage;
