export const joinedRooms: string[] = [];

export function addRoom(name: string) {
    if (!joinedRooms.includes(name)) joinedRooms.push(name);
}

export function removeRoom(name: string) {
    const idx = joinedRooms.indexOf(name);
    if (idx >= 0) joinedRooms.splice(idx, 1);
}

export function switchRoom(name: string) {
    const idx = joinedRooms.indexOf(name);
    if (idx >= 0) (joinedRooms as any).selected = idx;
}
