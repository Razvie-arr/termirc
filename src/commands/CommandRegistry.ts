import WebSocket from "ws";
import { Command } from "./Command";
import { JoinCommand } from "./JoinCommand";
import { PartCommand } from "./PartCommand";
import { CommandMessage } from "../types/UserInput";
import { SwitchCommand } from "./SwitchCommand";
import { ListCommand } from "./ListCommand";

export class CommandRegistry {
    private map = new Map<string, Command>();

    constructor(commands: Command[]) {
        for (const cmd of commands) {
            this.map.set(cmd.name, cmd);
        }
    }

    dispatch(ws: WebSocket, cmd: CommandMessage) {
        const handler = this.map.get(cmd.name);
        if (!handler) {
            return ws.send(
                JSON.stringify({
                    type: "error",
                    payload: `Unknown command: /${cmd.name}`,
                }),
            );
        }
        handler.execute(ws, cmd.args);
    }
}

export const commandRegistry = new CommandRegistry([
    new JoinCommand(),
    new PartCommand(),
    new SwitchCommand(),
    new ListCommand(),
]);
