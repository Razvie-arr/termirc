import { MessageType } from '../../../../shared/src/types/MessageType';
import { handleRoomList } from './roomListHandler';
import { handleServerMessage } from './serverMessageHandler';
import { handleUserMessage } from './userMessageHandler';
import { handleActiveRoom } from './activeRoomHandler';

export const wsHandlers: Partial<Record<MessageType, (msg: any) => void>> = {
    [MessageType.RoomList]: handleRoomList,
    [MessageType.Info]: handleServerMessage,
    [MessageType.System]: handleServerMessage,
    [MessageType.Error]: handleServerMessage,
    [MessageType.Message]: handleUserMessage,
    [MessageType.ActiveRoom]: handleActiveRoom,
};
