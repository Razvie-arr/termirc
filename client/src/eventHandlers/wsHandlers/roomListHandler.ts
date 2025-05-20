import { setRooms } from '../../state/roomStore';

export const handleRoomList = (msg: any) => {
    setRooms(msg.rooms);
};
