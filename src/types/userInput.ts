import { MessageType } from "./message";

export interface Command {
    type: MessageType.Command;
    name: string;
    args: string[];
}
export interface ChatMessage {
    type: MessageType.Message;
    content: string;
}
export type UserInput = Command | ChatMessage;
