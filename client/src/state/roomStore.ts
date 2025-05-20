import { roomList } from '../ui/panes';
import { terminalScreen } from '../ui/terminalScreen';
import { RoomInfo } from '../../../shared/src/types/RoomInfo';

const rooms: RoomInfo[] = [];
let active = '';

export function setRooms(roomInfos: RoomInfo[]) {
    rooms.length = 0;
    rooms.push(...roomInfos);
    redraw();
}

export function setActiveRoom(name: string) {
    active = name;
    redraw();
}

function redraw() {
    roomList.clearItems();
    rooms.forEach((r) => roomList.addItem(formatRoom(r)));

    const idx = rooms.findIndex((r) => r.name === active);
    if (idx >= 0) roomList.select(idx);
    else if (rooms.length) roomList.select(0);

    terminalScreen.render();
}

function formatRoom(r: RoomInfo): string {
    return `${r.name} (${r.memberCount})`;
}
