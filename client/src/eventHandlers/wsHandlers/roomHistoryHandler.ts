import { RoomHistoryPayload } from '../../../../shared/src/types/RoomHistoryPayload';
import { RoomHistory } from '../../../../shared/src/types/RoomHistory';
import { printUserMessage } from './userMessageHandler';

export const handleRoomHistory = (msg: RoomHistoryPayload) => {
    const history: RoomHistory = msg.history;
    history.forEach((historyEntry) =>
        printUserMessage(
            historyEntry.roomName,
            historyEntry.nickname,
            historyEntry.body,
        ),
    );
};
