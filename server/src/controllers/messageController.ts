import WebSocket from 'ws';
import { userService } from '../services/userService';
import { MessageType } from '../../../shared/src/types/MessageType';
import { parseUserInput } from '../../../shared/src/utils/userInputParser';
import { commandRegistry } from '../commands/CommandRegistry';
import { sendError } from '../messageSenders/directMessageSender';
import { roomService } from '../services/roomService';
import { ChatMessage } from '../../../shared/src/types/UserInput';
import { sendChatMessageBroadcast } from '../messageSenders/broadcaseMessageSender';

export function handleMessage(ws: WebSocket, message: string) {
    if (!userService.getNickname(ws)) {
        const result = userService.setNickname(ws, message);
        const type = result.ok ? MessageType.Info : MessageType.Error;
        ws.send(JSON.stringify({ type, payload: result.message }));
        return;
    }

    const nick = userService.getNickname(ws)!;
    console.log(`[${nick}] ${message}`);

    const userInput = parseUserInput(message);
    switch (userInput.type) {
        case MessageType.Command: {
            console.log('Command got:', userInput);
            commandRegistry.dispatch(ws, userInput);
            break;
        }
        case MessageType.Message: {
            console.log('Message got:', userInput);
            handleChatMessage(ws, userInput);
            break;
        }
        default:
            sendError(ws, 'Invalid input');
    }
}

function handleChatMessage(ws: WebSocket, chatMessage: ChatMessage) {
    const nick = userService.getNickname(ws)!;

    const room = roomService.getActiveRoom(ws);
    if (!room) {
        return sendError(ws, 'Join a room first with /join #room.');
    }

    sendChatMessageBroadcast(room, nick, chatMessage.content);
}
