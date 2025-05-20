export function normalizeRoomName(input: string): string | null {
    const trimmed = input.trim();
    if (!trimmed) return null;
    return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}
