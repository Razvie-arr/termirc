import WebSocket from 'ws';

export class UserService {
    private activeNicks = new Set<string>();
    private clientNicks = new Map<WebSocket, string>();

    setNickname(
        ws: WebSocket,
        desired: string,
    ): { ok: boolean; message: string } {
        desired = desired.trim();
        if (!desired || this.activeNicks.has(desired)) {
            return {
                ok: false,
                message: 'Name taken or invalid, try another:',
            };
        }
        this.activeNicks.add(desired);
        this.clientNicks.set(ws, desired);

        const helpMessage = [
            '',
            'Available commands:',
            '  /join <room>    – join or create a chat room',
            '  /part <room>    – leave a chat room',
            '  /switch <room>  – switch to a joined room',
            '  /list  – list all available rooms',
            '',
        ].join('\n');

        return {
            ok: true,
            message: `Welcome, ${desired}!\n${helpMessage}`,
        };
    }

    getNickname(ws: WebSocket): string | undefined {
        return this.clientNicks.get(ws);
    }

    removeNickname(ws: WebSocket): void {
        const nick = this.clientNicks.get(ws);
        if (nick) this.activeNicks.delete(nick);
        this.clientNicks.delete(ws);
    }
}

export const userService = new UserService();
