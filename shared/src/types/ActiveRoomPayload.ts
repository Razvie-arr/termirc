import { MessageType } from './MessageType';

export interface ActiveRoomPayload {
    type: MessageType.ActiveRoom;
    roomName: string;
}
