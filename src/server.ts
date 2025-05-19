import WebSocket, { WebSocketServer } from "ws";
import { MessageType } from "./types/message";
import { userService } from "./services/userService";
import { parseUserInput } from "./utils/userInputParser";

console.log("Starting Termirc server...");
const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server running on port 8080...");

wss.on("connection", (ws: WebSocket) => {
    ws.send(
        JSON.stringify({
            type: MessageType.System,
            payload: "Welcome to termirc! Please choose a nickname:",
        }),
    );

    ws.on("message", (data) => {
        const text = data.toString();

        if (!userService.getNickname(ws)) {
            const result = userService.setNickname(ws, text);
            const type = result.ok ? MessageType.Info : MessageType.Error;
            ws.send(JSON.stringify({ type, payload: result.message }));
            return;
        }

        const nick = userService.getNickname(ws)!;
        console.log(`[${nick}] ${text}`);

        const userInput = parseUserInput(text);
        if (userInput.type === MessageType.Command) {
            // TODO: implement
            console.log("Command got:", userInput);
        } else if (userInput.type === MessageType.Message) {
            // TODO: implement
            console.log("Message got:", userInput);
        } else {
            ws.send(JSON.stringify({ type: MessageType.Error, payload: "Invalid input" }));
        }
    });

    ws.on("close", () => {
        userService.removeNickname(ws);
        console.log(`Client ${userService.getNickname(ws) ?? ""} disconnected`);
    });
});
