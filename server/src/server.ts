import WebSocket, { WebSocketServer } from 'ws';
import {
    handleClose,
    handleConnection,
} from './controllers/connectionController';
import { handleMessage } from './controllers/messageController';

console.log('Starting Termirc server...');
export const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocket server running on port 8080...');

wss.on('connection', async (ws: WebSocket) => {
    await handleConnection(ws);

    ws.on('message', async (data) => {
        await handleMessage(ws, data.toString());
    });

    ws.on('close', async () => {
        await handleClose(ws);
    });
});
