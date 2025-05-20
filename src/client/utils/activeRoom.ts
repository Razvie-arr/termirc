import { roomList } from '../ui/panes';

export function activeRoom(): string | undefined {
    const idx = (roomList as any).selected as number | undefined;
    return typeof idx === 'number' ? roomList.getItem(idx)?.content : undefined;
}
