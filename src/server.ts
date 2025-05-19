import WebSocket, { WebSocketServer } from 'ws';
import {
    handleClose,
    handleConnection,
} from './controllers/connectionController';
import { handleMessage } from './controllers/messageController';

console.log('Starting Termirc server...');
const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocket server running on port 8080...');

wss.on('connection', (ws: WebSocket) => {
    handleConnection(ws);

    ws.on('message', (data) => {
        handleMessage(ws, data.toString());
    });

    ws.on('close', () => {
        handleClose(ws);
    });
});
