import { MessageType } from './MessageType';
import { RoomHistory } from './RoomHistory';

export interface RoomHistoryPayload {
    type: MessageType.RoomHistory;
    history: RoomHistory;
}
