import { setRooms } from '../../state/roomStore';
import { RoomListPayload } from '../../../../shared/src/types/RoomListPayload';

export const handleRoomList = (msg: RoomListPayload) => {
    setRooms(msg.rooms);
};
