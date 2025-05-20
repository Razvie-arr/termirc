import { ActiveRoomPayload } from '../../../../shared/src/types/ActiveRoomPayload';
import { setActiveRoom } from '../../state/roomStore';

export const handleActiveRoom = (msg: ActiveRoomPayload) => {
    setActiveRoom(msg.roomName);
};
