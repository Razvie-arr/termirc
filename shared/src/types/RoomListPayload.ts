import { MessageType } from './MessageType';
import { RoomInfo } from './RoomInfo';

export interface RoomListPayload {
    type: MessageType.RoomList;
    rooms: RoomInfo[];
}
