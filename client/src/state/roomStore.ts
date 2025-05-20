import { roomList } from '../ui/panes';
import { screen } from '../ui/screen';

const rooms: string[] = [];

export function setRooms(list: string[]) {
    rooms.length = 0;
    rooms.push(...list);
    redraw();
}

export function currentRooms() {
    return rooms; // read-only copy if you want
}

function redraw() {
    roomList.clearItems();
    rooms.forEach((r) => roomList.addItem(r));
    // keep selection sane
    // if (roomList.selected === -1 && rooms.length) roomList.select(0);
    screen.render();
}
